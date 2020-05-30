const Config = require('../config')
const tools = require('../cs/tools')
const $ = require('cheerio');
const Subject = require('../cs/subject')

class Student {
    constructor(username, password) {
        var private_username = username;
        var private_password = password;
        this.username = () => { return private_username; }
        this.password = () => { return private_password; }
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
    get info() {
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
    studentInfo(all, consExpHTML) {
        return new Promise((s, f) => {
            try {
                for (let i = 0; i < all.length; i++) {
                    let tdCampo = tools.parseText($('td[class="Campo"]', consExpHTML)[i].children[0].data)
                    let tdValor = tools.parseText($('td[class="Valor"]', consExpHTML)[i].children[0].data)
                    if (tdCampo == "Apellidos y nombre") {
                        Config.tempStudent.fullName = tdValor
                    } else if (tdCampo == "N.I.P") {
                        Config.tempStudent.nip = tdValor
                    } else if (tdCampo == "DNI") {
                        Config.tempStudent.dni = tdValor
                    } else if (tdCampo == "Rama") {
                        Config.tempStudent.studiesBranch = tdValor
                    } else if (tdCampo == "N.I.A") {
                        Config.tempStudent.nia = tdValor
                    } else if (tdCampo == "Centro") {
                        Config.tempStudent.faculty = tdValor
                    } else if (tdCampo == "Tipo de estudio") {
                        Config.tempStudent.studyType = tdValor
                    } else if (tdCampo == "Estudios") {
                        Config.tempStudent.studies = tdValor
                    } else if (tdCampo == "Plan estudios") {
                        Config.tempStudent.syllabus = tdValor
                    } else if (tdCampo == "Especialidad") {
                        Config.tempStudent.specialty = tdValor
                    } else if (tdCampo == "Estado expediente") {
                        Config.tempStudent.fileStatus = tdValor
                    } else if (tdCampo == "Régimen de permanencia") {
                        Config.tempStudent.permanency = tdValor
                    } else if (tdCampo == "Grupo censal") {
                        Config.tempStudent.censusGroup = tdValor
                    }
                }
            } catch (error) {
                f(error)
            }
            s()
        })
    }
    studentMarks(allCalif) {
        return new Promise((s, f) => {
            var subject;
            try {
                allCalif.each((i, el) => {
                    switch (i % 17) { // 17 columns
                        case 0:
                            if (subject == null) {
                                subject = new Subject()
                            } else {
                                Config.tempStudent.subjects.push(subject)
                                subject = new Subject()
                            }
                            break;
                        case 1:
                            subject.year = tools.parseText($(el).text())
                            break;
                        case 2:
                            subject.code = tools.parseText($(el).text())
                            break;
                        case 3:
                            subject.description = tools.parseText($(el).text())
                            break;
                        case 4:
                            subject.credits = tools.parseText($(el).text())
                            break;
                        case 5:
                            subject.gr = tools.parseText($(el).text())
                            break;
                        case 6:
                            subject.announcement = tools.parseText($(el).text())
                            break;
                        case 7:
                            subject.markDescription = tools.parseText($(el).text())
                            break;
                        case 8:
                            subject.mark = tools.parseText($(el).text())
                            break;
                        case 9:
                            subject.wastedCalls = tools.parseText($(el).text())
                            break;
                        case 10:
                            subject.cvl = tools.parseText($(el).text())
                            break;
                        case 11:
                            subject.type = tools.parseText($(el).text())
                            break;
                        case 12:
                            subject.cycle = tools.parseText($(el).text())
                            break;
                        case 13:
                            subject.studiesYear = tools.parseText($(el).text())
                            break;
                        case 14:
                            subject.subjectRef = tools.parseText($(el).text())
                            break;
                        case 15:
                            subject.observations = tools.parseText($(el).text())
                            break;
                        case 16:
                            subject.sem = tools.parseText($(el).text())
                            break;
                        default:
                            break;
                    }
                })
            } catch (error) {
                f(error)
            }
            s()
        })
    }
}
module.exports = Student