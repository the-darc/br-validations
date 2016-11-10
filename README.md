br-validations
==============
[![npm version](https://img.shields.io/npm/v/br-validations.svg)](https://www.npmjs.com/package/br-validations) 
[![Bower version](https://img.shields.io/bower/v/br-validations.svg)](https://bower.io/search/?q=br-validations) 
[![Build Status](https://travis-ci.org/the-darc/br-validations.svg)](https://travis-ci.org/the-darc/br-validations)
[![Coverage Status](https://coveralls.io/repos/the-darc/br-validations/badge.svg)](https://coveralls.io/r/the-darc/br-validations)

[![NPM](https://nodei.co/npm/br-validations.png?downloads=true&stars=true)](https://nodei.co/npm/br-validations/)


A library of validations applicable to several Brazilian data like I.E., CNPJ, CPF and others.

## Instalation ##

### With npm

```bash
    npm install --save br-validations
```

### With bower

```bash
    bower install --save br-validations
```

### Runing tests ###

```bash
	gulp test
```

## Validations ##

### Inscrição Estadual ###

```javascript
	var BrV = require('./br-validations');
	var uf = 'PE';
	var ie = '1321418-40';
	var isValid = BrV.ie(uf).validate(ie);
```
See: [Conferência de Inscrições Estaduais](http://www.sintegra.gov.br/insc_est.html)

### CPF ###

```javascript
	var BrV = require('./br-validations');
	var cpf = '219.841.712-08';
	var isValid = BrV.cpf.validate(cpf);
```

### CNPJ ###

```javascript
	var BrV = require('./br-validations');
	var cnpj = '10.157.471/0001-61';
	var isValid = BrV.cnpj(uf).validate(cnpj);
```

### RG ###

__Not implemented yet__

### PIS/PASEP ###

```javascript
	var BrV = require('./br-validations');
	var pis = '120.5825.883-7';
	var isValid = BrV.pis.validate(pis);
```

## Contributing

We'd love for you to contribute to our source code! We just ask for you to: 

 - Follow the commit conventions of [conventional-changelog](https://github.com/ajoslin/conventional-changelog) described in 
[conventional-conventions](https://github.com/ajoslin/conventional-changelog/blob/master/conventions/angular.md)
 - Write tests for the new feature or bug fix that you are solving
 - Ensure all tests pass before send the pull-request (Use: `$ gulp test-coverage`)
