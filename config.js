const origin = "gaude.deusto.es"
const originUrl = `https://${origin}`
const contrUrl = `https://${origin}/exps-war/Controlador/`
const baseUrl = `${contrUrl}?apl=Uninavs&gu=a&idNav=inicio&NuevaSesionUsuario=true&NombreUsuarioAlumno=ALUMNO&idioma=es&pais=ES`
const loginUrl = `${contrUrl}?@d2e9d205e120747b=@a8d11ec374aa5324f5c94b5786369fba&@ebf2f349580da806=@1bedd0984ff1624c`
const applications = {
    gradoMasterDoctorado: 0,
} // se implementarán más en el futuro
var tempStudent = null
var sessionCookie = null
var originHTML = null
var appHTML = null
var applicationURL = null
const encoding = 'latin1';
module.exports = {
    contrUrl,
    baseUrl,
    originUrl,
    loginUrl,
    tempStudent,
    sessionCookie,
    originHTML,
    appHTML,
    applications,
    applicationURL,
    encoding,
}