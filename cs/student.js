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
                    } else if (tdCampo == "R�gimen de permanencia") {
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
            var count = 1
            var subject = new Subject()
            try {
                for (let i = 0; i < allCalif.length; i++) {
                    const element = allCalif[i];
                    if (i != 0) {
                        if (element.children.length > 0) {
                            if (count == 16) {
                                count = 0
                                Config.tempStudent.subjects.push(subject)
                                subject = new Subject()
                            } else if (count == 1) {
                                subject.year = tools.parseText(element.children[0].data)
                            } else if (count == 2) {
                                subject.code = tools.parseText(element.children[2].data)
                            } else if (count == 3) {
                                subject.description = tools.parseText(element.children[0].data)
                            } else if (count == 4) {
                                subject.credits = tools.parseText(element.children[0].data)
                            } else if (count == 5) {
                                subject.gr = tools.parseText(element.children[0].data)
                            } else if (count == 6) {
                                subject.announcement = tools.parseText(element.children[0].data)
                            } else if (count == 7) {
                                subject.markDescription = tools.parseText(element.children[0].data)
                            } else if (count == 8) {
                                subject.mark = tools.parseText(element.children[0].data)
                            } else if (count == 9) {
                                subject.cvl = tools.parseText(element.children[0].data)
                            } else if (count == 10) {
                                subject.type = tools.parseText(element.children[0].data)
                            } else if (count == 11) {
                                subject.cycle = tools.parseText(element.children[0].data)
                            } else if (count == 12) {
                                subject.studiesYear = tools.parseText(element.children[0].data)
                            } else if (count == 13) {
                                subject.subjectRef = tools.parseText(element.children[0].data)
                            } else if (count == 14) {
                                subject.observations = tools.parseText(element.children[0].data)
                            } else if (count == 15) {
                                subject.sem = tools.parseText(element.children[0].data)
                            }
                        }
                        count++
                    }
                }
            } catch (error) {
                f(error)
            }
            s()
        })
    }
}
module.exports = Student