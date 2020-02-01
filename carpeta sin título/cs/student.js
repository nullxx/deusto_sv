const Config = require('../config')
const tools = require('../cs/tools')
const $ = require('cheerio');
const Subject = require('../cs/subject')

class Student {
    constructor(username, password) {
        this.username = username;
        this.password = password;
        this.fullName = null
        this.nip = null
        this.faculty = null
        this.studyType = null
        this.syllabus = null
        this.fileStatus = null
        this.permanency = null
        this.dni = null
        this.nia = null
        this.studiesBranch = null
        this.studies = null
        this.specialty = null
        this.censusGroup = null

        this.subjects = []
    }
    get info(){
        return {
            fullName: this.fullName,
            nip: this.nip,
            faculty: this.faculty,
            studyType: this.studyType,
            syllabus: this.syllabus,
            fileStatus: this.fileStatus,
            permanency: this.permanency,
            dni: this.dni,
            nia: this.nia,
            studiesBranch: this.studiesBranch,
            studies: this.studies,
            specialty: this.specialty,
            censusGroup: this.censusGroup,
        }
    }
    studentInfo(all, consExpHTML){
        return new Promise((s, f) => {
        for (let i = 0; i < all.length; i++) {
            let tdCampo = tools.parseText($('td[class="Campo"]', consExpHTML)[i].children[0].data)
            let tdValor = tools.parseText($('td[class="Valor"]', consExpHTML)[i].children[0].data)
            if (tdCampo == "Apellidos y nombre"){
                Config.tempStudent.fullName = tdValor
            }else if (tdCampo == "N.I.P"){
                Config.tempStudent.nip = tdValor
            }else if (tdCampo == "DNI"){
                Config.tempStudent.dni = tdValor
            }else if (tdCampo == "Rama"){
                Config.tempStudent.studiesBranch = tdValor
            }else if (tdCampo == "N.I.A"){
                Config.tempStudent.nia = tdValor
            }else if (tdCampo == "Centro"){
                Config.tempStudent.faculty = tdValor
            }else if (tdCampo == "Tipo de estudio"){
                Config.tempStudent.studyType = tdValor
            }else if (tdCampo == "Estudios"){
                Config.tempStudent.studies = tdValor
            }else if (tdCampo == "Plan estudios"){
                Config.tempStudent.syllabus = tdValor
            }else if (tdCampo == "Especialidad"){
                Config.tempStudent.specialty = tdValor
            }else if (tdCampo == "Estado expediente"){
                Config.tempStudent.fileStatus = tdValor
            }else if (tdCampo == "R�gimen de permanencia"){
                Config.tempStudent.permanency = tdValor
            }else if (tdCampo == "Grupo censal"){
                Config.tempStudent.censusGroup = tdValor
            }
        }
        s()
    })
    }
    studentMarks(allCalif){
        return new Promise((s, f) => {
            console.log(allCalif)
            s()
        for (let i = 0; i < allCalif.length; i++) {
            let calif = allCalif[i].children
            if (calif) {
                try {
                    let year = null
                    let code = null
                    let description = tools.parseText(calif[5].children[0].data)
                    let credits = tools.parseText(calif[9].children[0].data)
                    let gr = tools.parseText(calif[11].children[0].data)
                    let announcement = tools.parseText(calif[13].children[0].data)
                    let markDescription = tools.parseText(calif[15].children[0].data)
                    let mark = tools.parseText(calif[19].children[0].data)
                    let cvl = tools.parseText(calif[21].children[0].data)
                    let type = tools.parseText(calif[23].children[0].data)
                    let cycle = tools.parseText(calif[25].children[0].data)
                    let studiesYear = tools.parseText(calif[27].children[0].data)
                    let subjectRef = tools.parseText(calif[31].children[0].data)
                    let observations = tools.parseText(calif[35].children[0].data)
                    let sem = tools.parseText(calif[37].children[0].data)
                    Config.tempStudent.subjects.push(new Subject(year, code, description, credits, gr, announcement, markDescription, mark, cvl, type, cycle, studiesYear, subjectRef, observations, sem))
                } catch (error) {
                   // f(error)
                }

s()
            }
        }
    })
    }
}
module.exports = Student