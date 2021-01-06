const Student = require('./cs/student')
const Config = require('./config')
const $ = require('cheerio');
const tools = require('./cs/tools')
module.exports.login = (username, password) => {
    return new Promise((s, f) => {
        const student = new Student(username, password)
        tools.loginRequest(student)
            .then(({ html: r, cookie }) => {
                if (r.includes('Mi perfil')) {
                    s({ student, originHTML: r, cookie });
                } else {
                    f("An error has occured logging in. Please check your credentials.")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })
}
module.exports.selectApplication = (app, prevInfo) => {
    return new Promise((s, f) => {
        let selApplication = Config.applications[app]
        if (selApplication != null) {
            let html = prevInfo.originHTML
            let launchAppJS = $('div[class="row contenedorBotonera"]', html).children()[selApplication].children[1].attribs.href;
            tools.gtS(launchAppJS).then(partialUrl => {
                let fullLaunchURL = `${Config.contrUrl}${partialUrl}`
                prevInfo.applicationURL = fullLaunchURL
                tools.getHTML(fullLaunchURL, Config.baseUrl, prevInfo.cookie).then(html => {
                    prevInfo.appHTML = html;
                    if (html.includes('Inicio')) {
                        s(prevInfo)
                    } else {
                        f(`An error occurred launching application: '${app}'`)
                    }
                })
            })
        } else {
            f(`An error occurred launching application: '${app}'. App was not found.`)
        }

    })
}
module.exports.consultaExpediente = (prevInfo) => {
    return new Promise((s, f) => {
        let html = prevInfo.appHTML
        let menu = $('ul[id=sidebar]', html).children()
        let openMENUTitle = menu[8].children[0].children[0].children[0].data
        let openMenuJS = menu[8].children[0].attribs.href
        tools.gtS(openMenuJS).then(partialUrl => {
            let fullopenMenuURL = `${Config.contrUrl}${partialUrl}`
            tools.getHTML(fullopenMenuURL, prevInfo.applicationURL, prevInfo.cookie).then((a) => {
                tools.gtA(a).then(consultaExpJS => {
                    let consultaExpFullURL = `${Config.contrUrl}${consultaExpJS}`
                    tools.getHTML(consultaExpFullURL, undefined, prevInfo.cookie).then(consExpHTML => {
                        if (consExpHTML.includes('Consulta de Expediente ')) {
                            let all = $('td[class="Campo"]', consExpHTML)
                            prevInfo.student.studentInfo(all, consExpHTML, prevInfo.student)
                            let allCalif = $('#table1 > tbody:nth-child(2) > tr > td', consExpHTML)
                            prevInfo.student.studentMarks(allCalif, prevInfo.student)
                            s({
                                student: prevInfo.student.info,
                                marks: prevInfo.student.subjects
                            })

                        } else {
                            f("An error had occurred launching 'Consulta expediente'")
                        }
                    })

                })

            })
        })
    })
}
