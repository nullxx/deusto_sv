 <h3 align="center">DEUSTO SECRETARÍA VIRTUAL</h3>

  <p align="center">
    Módulo para obtener la información de la web de secretaría virtual


## Tabla de contenidos

* [Sobre este proyecto](#sobre-este-proyecto)
* [Uso](#uso)
  * [Instalación](#installation)
* [Licencia](#licencia)
* [Contacto](#contacto)

### [Ver documentación](https://github.com/nullxx/deusto_sv/wiki/Documentaci%C3%B3n)


## Sobre este proyecto

Este repositorio ha sido creado con fines únicamente educativos. Cualquier uso de este que infrinja alguna de las normas establecidas por el centro queda bajo su propia responsabilidad.



## Uso

This is an example of how you may give instructions on setting up your project locally.
To get a local copy up and running follow these simple example steps.

### Installation

We will need npm
* npm
```sh
npm install npm@latest -g
```

### Installation


1. Install the package
```sh
npm install --save deusto_sv
```

2. Usage
```JS
const  deusto  =  require('deusto_sv');

const  username  =  "<your_username>";
const  password  =  "<your_password>";

deusto.login(username, password)
.then(() => {
	deusto.selectApplication("gradoMasterDoctorado")
	.then(() => {
		deusto.consultaExpediente()
		.then(result => {
			console.log(result)
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
```

## Licencia

Distributed under the MIT License. See `LICENSE` for more information.

## Contacto
Jon Lara - [@nullxme](https://twitter.com/nullxme)

Project Link: [https://github.com/nullxx/deusto_sv](https://github.com/your_username/repo_name)
