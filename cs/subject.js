
class Subject {

    constructor(year = null, code = null, description = null, credits = null, gr = null, announcement = null, markDescription = null, mark = null, cvl = null, type = null, cycle = null, studiesYear = null, subjectRef = null, observations = null, sem) {
        this.year = year
        this.code = code
        this.description = description
        this.credits = credits
        this.gr = gr
        this.announcement = announcement
        this.markDescription = markDescription
        this.mark = mark
        this.cvl = cvl
        this.type = type
        this.cycle = cycle
        this.studiesYear = studiesYear
        this.subjectRef = subjectRef
        this.observations = observations
        this.sem = sem
    }


  }
module.exports = Subject