const Student = require('./cs/student')
const Config = require('./config')
const $ = require('cheerio');
const tools = require('./cs/tools')
module.exports.login = (username, password) => {
    return new Promise((s, f) => {
        const student = new Student(username, password)
        Config.tempStudent = student
        tools.loginRequest(student.username, student.password)
            .then((r) => {
                if (r.includes('Mi perfil')) {
                    s(true)
                    Config.originHTML = r
                } else {
                    f("An error has occured logging in")
                }
            })
            .catch((err) => {
                console.log(err)
            })
    })
}
module.exports.selectApplication = (app) => {
    return new Promise((s, f) => {
        let selApplication = Config.applications[app]
        if (selApplication != null) {
            let html = Config.originHTML
            let launchAppJS = $('div[class="row contenedorBotonera"]', html).children()[selApplication].children[1].attribs.href;
            tools.gtS(launchAppJS).then(partialUrl => {
                let fullLaunchURL = `${Config.contrUrl}${partialUrl}`
                Config.applicationURL = fullLaunchURL
                tools.getHTML(fullLaunchURL, Config.baseUrl).then(html => {
                    Config.appHTML = html
                    if (html.includes('Inicio')) {
                        s(true)
                    } else {
                        f(`An error occurred launching application: '${app}'`)
                    }
                })
            })
        }

    })
}
module.exports.consultaExpediente = () => {
    return new Promise((s, f) => {
        let html = Config.appHTML
        let menu = $('ul[id=sidebar]', html).children()
        let openMENUTitle = menu[8].children[0].children[0].children[0].data
        let openMenuJS = menu[8].children[0].attribs.href
        tools.gtS(openMenuJS).then(partialUrl => {
            let fullopenMenuURL = `${Config.contrUrl}${partialUrl}`
            tools.getHTML(fullopenMenuURL, Config.applicationURL).then((a) => {
                tools.gtA(a).then(consultaExpJS => {
                    let consultaExpFullURL = `${Config.contrUrl}${consultaExpJS}`
                    tools.getHTML(consultaExpFullURL).then(consExpHTML => {
                        if (consExpHTML.includes('Consulta de Expediente ')) {
                            let all = $('td[class="Campo"]', consExpHTML)
                            Config.tempStudent.studentInfo(all, consExpHTML)
                            let allCalif = $('table[id="table1"]', consExpHTML).children()[1].children
                            Config.tempStudent.studentMarks(allCalif)
                            s(Config.tempStudent)

                        } else {
                            f("An error had occurred launching 'Consulta expediente'")
                        }
                    })

                })

            })
        })
    })
}