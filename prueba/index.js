const deusto = require('deusto_sv');

const username = "446652"
const password = "Xkc4rgPEM8A3UXx"
deusto.login(username, password)
    .then(() => {
        deusto.selectApplication("gradoMasterDoctorado")
            .then(s => {
                deusto.consultaExpediente()
                    .then(a => {
                        console.log(a.marks)
                    })
                    .catch(err => {
                        console.log(err)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    })
    .catch((err) => {
        console.log(err)
    })

