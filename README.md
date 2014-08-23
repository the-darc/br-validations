# br-validations #

A library of validations applicable to several Brazilian data.

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

__Not implemented yet__

### CNPJ ###

__Not implemented yet__

### RG ###

__Not implemented yet__

