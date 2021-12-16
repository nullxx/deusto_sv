const Config = require('../config')
const tools = require('../cs/tools')
const $ = require('cheerio').default;
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
    studentInfo(all, consExpHTML, student) {
        return new Promise((s, f) => {
            try {
                for (let i = 0; i < all.length; i++) {
                    let tdCampo = tools.parseText($('td[class="Campo"]', consExpHTML)[i].children[0].data)
                    let tdValor = tools.parseText($('td[class="Valor"]', consExpHTML)[i].children[0].data)
                    if (tdCampo == "Apellidos y nombre") {
                        student.fullName = tdValor
                    } else if (tdCampo == "N.I.P") {
                        student.nip = tdValor
                    } else if (tdCampo == "DNI") {
                        student.dni = tdValor
                    } else if (tdCampo == "Rama") {
                        student.studiesBranch = tdValor
                    } else if (tdCampo == "N.I.A") {
                        student.nia = tdValor
                    } else if (tdCampo == "Centro") {
                        student.faculty = tdValor
                    } else if (tdCampo == "Tipo de estudio") {
                        student.studyType = tdValor
                    } else if (tdCampo == "Estudios") {
                        student.studies = tdValor
                    } else if (tdCampo == "Plan estudios") {
                        student.syllabus = tdValor
                    } else if (tdCampo == "Especialidad") {
                        student.specialty = tdValor
                    } else if (tdCampo == "Estado expediente") {
                        student.fileStatus = tdValor
                    } else if (tdCampo == "Régimen de permanencia") {
                        student.permanency = tdValor
                    } else if (tdCampo == "Grupo censal") {
                        student.censusGroup = tdValor
                    }
                }
            } catch (error) {
                f(error)
            }
            s(student)
        })
    }
    studentMarks(consExpHTML, student) {
        let subject;

        try {
            const colCount = $('#table1 > thead > tr > th[class="sort"]', consExpHTML).length;
            const rowCount = $('#table1 > tbody > tr', consExpHTML).length;
            for (let j = 0; j < rowCount; j++) {

                subject = new Subject();
                const row = $('#table1 > tbody > tr:nth-child(' + (j + 1) + ') > td', consExpHTML);

                for (let i = 0; i < colCount; i++) {
                    const colName = tools.parseText($('#table1 > thead > tr > th[class="sort"]', consExpHTML)[i].children[0].data);
                    const rowText = tools.parseText($(row[i + 1]).text());
                    switch (colName) {
                        case 'Año académ.':
                            subject.year = rowText;
                            break;
                        case 'Código':
                            subject.code = rowText;
                            break;
                        case 'Código':
                            subject.code = rowText;
                            break;
                        case 'Descripción':
                            subject.description = rowText;
                            break;
                        case 'Cr.':
                            subject.credits = rowText;
                            break;
                        case 'Gr.':
                            subject.gr = rowText;
                            break;
                        case 'Convocatoria':
                            subject.announcement = rowText;
                            break;
                        case 'Calificación':
                            subject.markDescription = rowText;
                            break;
                        case 'C.N.':
                            subject.mark = rowText;
                            break;
                        case 'Conv. agotadas':
                            subject.wastedCalls = rowText;
                            break;
                        case 'Cvl.':
                            subject.cvl = rowText;
                            break;
                        case 'Tipo Asig.':
                            subject.type = rowText;
                            break;
                        case 'Cic.':
                            subject.cycle = rowText;
                            break;
                        case 'Cur.':
                            subject.studiesYear = rowText;
                            break;
                        case 'Materia':
                            subject.subjectRef = rowText;
                            break;
                        case 'Observaciones':
                            subject.observations = rowText;
                            break;
                        case 'Sem.':
                            subject.sem = rowText;
                            break;
                        default:
                            break;
                    }
                }
                student.subjects.push(subject);
            }
        } catch (error) {
            f(error)
        }

        return student;
    }
}
module.exports = Student
