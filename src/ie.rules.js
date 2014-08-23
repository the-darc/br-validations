function _debug(/*msg*/) {
	// console.log(msg);
}

var algorithmSteps = {
	handleStr: {
		onlyNumbers: function(str) {
			return str.replace(/[^\d]/g,'').split('');
		},
		mgSpec: function(str) {
			var s = str.replace(/[^\d]/g,'');
			s = s.substr(0,3)+'0'+s.substr(3, s.length);
			return s.split('');
		}
	},
	sum: {
		normalSum: function(handledStr, pesos) {
			var nums = handledStr;
			var sum = 0;
			for (var i = 0; i < pesos.length; i++) {
				sum += parseInt(nums[i]) * pesos[i];
			}
			return sum;
		},
		individualSum: function(handledStr, pesos) {
			var nums = handledStr;
			var sum = 0;
			for (var i = 0; i < pesos.length; i++) {
				var mult = parseInt(nums[i]) * pesos[i];
				sum += mult%10 + parseInt(mult/10);
			}
			return sum;
		},
		apSpec: function(handledStr, pesos) {
			var sum = this.normalSum(handledStr, pesos);
			var ref = parseInt(handledStr.join(''));
			if (ref >= 030000010 && ref <= 030170009) {
				return sum + 5;
			}
			if (ref >= 030170010 && ref <= 030190229) {
				return sum + 9;
			}
			return sum;
		}
	},
	rest: {
		mod11: function(sum) {
			return sum%11;
		},
		mod10: function(sum) {
			return sum%10;
		},
		mod9: function(sum) {
			return sum%9;
		}
	},
	expectedDV: {
		minusRestOf11: function(rest) {
			return rest < 2 ? 0 : 11 - rest;
		},
		minusRestOf11v2: function(rest) {
			return rest < 2 ? 11 - rest - 10 : 11 - rest;
		},
		minusRestOf10: function(rest) {
			return rest < 1 ? 0 : 10 - rest;
		},
		mod10: function(rest) {
			return rest%10;
		},
		goSpec: function(rest, handledStr) {
			var ref = parseInt(handledStr.join(''));
			if (rest === 1) {
				return ref >= 101031050 && ref <= 101199979 ? 1 : 0;
			}
			return rest === 0 ? 0 : 11 - rest;
		},
		apSpec: function(rest, handledStr) {
			var ref = parseInt(handledStr.join(''));
			if (rest === 0) {
				return ref >= 030170010 && ref <= 030190229 ? 1 : 0;
			}
			return rest === 1 ? 0 : 11 - rest;
		},
		voidFn: function(rest) {
			return rest;
		}
	}
};


/**
 * options {
 *     pesos: Array of values used to operate in sum step
 *     dvPos: Position of the DV to validate considering the handledStr
 *     algorithmSteps: The four DV's validation algorithm steps names
 * }
 */
function validateDV(value, options) {
	var steps = options.algorithmSteps;
	
	// Step 01: Handle String
	var handledStr = algorithmSteps.handleStr[steps[0]](value);
	_debug('      handledStr:' + handledStr);

	// Step 02: Sum chars
	var sum = algorithmSteps.sum[steps[1]](handledStr, options.pesos);
	_debug('      pesos:     ' + options.pesos);

	// Step 03: Rest calculation
	var rest = algorithmSteps.rest[steps[2]](sum);
	_debug('      rest:      ' + rest + '    sum: ' + sum);

	// Fixed Step: Get current DV
	var currentDV = parseInt(handledStr[options.dvpos]);

	// Step 04: Expected DV calculation
	var expectedDV = algorithmSteps.expectedDV[steps[3]](rest, handledStr);
	_debug('      currentDV: ' + currentDV + '    expectedDV: ' + expectedDV);

	// Fixed step: DV verification
	return currentDV === expectedDV;
}

function validateIE(value, rule) {
	if (rule.match && !rule.match.test(value)) {
		return false;
	}
	for (var i = 0; i < rule.dvs.length; i++) {
		// console.log('>> >> dv'+i);
		if (!validateDV(value, rule.dvs[i])) {
			return false;
		}
	}
	return true;
}

var ieRules = {
	'PE': [{ 
		//DVerf.: 2;	DIG1: 	Multiplique PESOS;	SOMA PRODUTOS;	%11;	Digito=11-RESTO;	SeMaior9:0 
		//          	DIG2: NovosPesos;	ConsideraPrimDigitoVerf;	=PE1;
		//mask: new StringMask('0000000-00'),
		chars: 9,
		dvs: [{
			dvpos: 7,
			pesos: [8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		},{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	},{ 
		//DVerf.: 1;	DIG1: 	Multiplique PESOS;	SOMA PRODUTOS;	%11;	Digito=11-RESTO;	SeMaior9:-10
		// mask: new StringMask('00.0.000.0000000-0'),
		chars: 14,
		pesos: [[1,2,3,4,5,9,8,7,6,5,4,3,2]],
		dvs: [{
			dvpos: 13,
			pesos: [5,4,3,2,1,9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11v2']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],

	'RS': [{
		// Dverf.: 1;	DIG1: =PE1;
		// mask: new StringMask('000/0000000'),
		chars: 10,
		dvs: [{
			dvpos: 9,
			pesos: [2,9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],

	'AC': [{
		//DVerf.: 2;	DIG1: 	=PE1;	DIG2: =PE1;		[!] Pesos
		// [!] Dois primeiros digitos são sempre "01"
		// mask: new StringMask('00.000.000/000-00'),
		chars: 13,
		match: /^01/,
		dvs: [{
			dvpos: 11,
			pesos: [4,3,2,9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		},{
			dvpos: 12,
			pesos: [5,4,3,2,9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],

	'MG': [{
		//DVerf.: 2;	DIG1: 	Multiplique PESOS;	SOMA_ALGS_DOS_PRODUTOS;
		//				        Digito=(RESULTADO + 1 NO ALG. DAS DEZENAS E COM ZERO NAS UNIDADES) - RESULTADO
		//				DIG2: 	=PE1;	[!] Pesos diferentes
		// [!] Insere um '0' (Zero) entre o terceiro e o quarto digito para calcular os PRIMEIRO digisto verificador
		// mask: new StringMask('000.000.000/0000'),
		chars: 13,
		dvs: [{
			dvpos: 12,
			pesos: [1,2,1,2,1,2,1,2,1,2,1,2],
			algorithmSteps: ['mgSpec', 'individualSum', 'mod10', 'minusRestOf10']
		},{
			dvpos: 12,
			pesos: [3,2,11,10,9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],

	'SP': [{
		// DVerf.: 2; [!] O último e o 9o.;	[!] Digito igual a unidade do resto da divisão da soma dos pesos por 11
		// mask: new StringMask('000.000.000.000'),
		chars: 12,
		match: /^[0-9]/,
		dvs: [{
			dvpos: 8,
			pesos: [1,3,4,5,6,7,8,10],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'mod10']
		},{
			dvpos: 11,
			pesos: [3,2,10,9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'mod10']
		}],
		validate: function(value) { return validateIE(value, this); }
	},{
		//DVerf.: 1; [!] O 10o. contando com o p; _SP1
		// mask: new StringMask('P-00000000.0/000')
		chars: 12,
		match: /^P/i,
		dvs: [{
			dvpos: 8,
			pesos: [1,3,4,5,6,7,8,10],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'mod10']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],

	'DF': [{
		//DVerf.: 2;	DIG1: 	=PE1;	DIG2: =PE1;		[!] Pesos
		// mask: new StringMask('00000000000-00'),
		chars: 13,
		dvs: [{
			dvpos: 11,
			pesos: [4,3,2,9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		},{
			dvpos: 12,
			pesos: [5,4,3,2,9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],

	'ES': [{
		//DVerf.: 1;	DIG1: 	=PE1;	[!] Pesos
		// mask: new StringMask('000.000.00-0')
		chars: 9,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],

	'BA': [{
		//Dverf.: 2;	TODO DIFERENTE: Usa MOD10 ou MOD11 dependendo do 1o. numero;
		//              Calcula o ultimo antes do primeiro e usa o ultimo no primeiro
		// mask: new StringMask('000000-00')
		chars: 8,
		match: /^[0123458]/,
		dvs: [{
			dvpos: 7,
			pesos: [7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod10', 'minusRestOf10']
		},{
			dvpos: 6,
			pesos: [8,7,6,5,4,3,0,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod10', 'minusRestOf10']
		}],
		validate: function(value) { return validateIE(value, this); }
	},{
		chars: 8,
		match: /^[679]/,
		dvs: [{
			dvpos: 7,
			pesos: [7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		},{
			dvpos: 6,
			pesos: [8,7,6,5,4,3,0,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	},{
		//Dverf.: 2;	SEMELHANTE AO ANTIGO mas varia entre MOD10 e MOD11 dependendo do 2o.
		// mask: new StringMask('0000000-00')
		chars: 9,
		match: /^[0-9][0123458]/,
		dvs: [{
			dvpos: 8,
			pesos: [8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod10', 'minusRestOf10']
		},{
			dvpos: 7,
			pesos: [9,8,7,6,5,4,3,0,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod10', 'minusRestOf10']
		}],
		validate: function(value) { return validateIE(value, this); }
	},{
		chars: 9,
		match: /^[0-9][679]/,
		dvs: [{
			dvpos: 8,
			pesos: [8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		},{
			dvpos: 7,
			pesos: [9,8,7,6,5,4,3,0,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],

	'AM': [{
		//Dverf.: 1;	DIG1: 	=PE1;	[!] Pesos
		//mask: new StringMask('00.000.000-0')
		chars: 9,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],

	'RN': [{ // [!] Dois primeiros são sempre 20
		// Dverf.: 1;	DIG1: ~PE1:(SOMA PRODUTOS * 10) antes de obter MOD11.
		// {mask: new StringMask('00.000.000-0')
		chars: 9,
		match: /^20/,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	},{
		// Dverf.: 1;	DIG1: _RN1
		// {mask: new StringMask('00.0.000.000-0'), chars: 10}
		chars: 10,
		match: /^20/,
		dvs: [{
			dvpos: 8,
			pesos: [10,9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'RO': [{
		// Dverf.: 1;	DIG1: =PE2;
		// mask: new StringMask('0000000000000-0')
		chars: 14,
		dvs: [{
			dvpos: 13,
			pesos: [6,5,4,3,2,9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'PR': [{
		// Dvref.: 2;	DIG1: =PE1;	DIG2: =PE1;		[!] Pesos
		// mask: new StringMask('00000000-00')
		chars: 10,
		dvs: [{
			dvpos: 8,
			pesos: [3,2,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		},{
			dvpos: 9,
			pesos: [4,3,2,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'SC': [{
		// Dverf.: 1;	DIG1: =PE1;
		// {mask: new StringMask('000.000.000'), uf: 'SANTA CATARINA'}
		chars: 9,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'RJ': [{
		// Dverf.: 1;	DIG1: =PE1;
		// {mask: new StringMask('00.000.00-0'), uf: 'RIO DE JANEIRO'}
		chars: 8,
		dvs: [{
			dvpos: 7,
			pesos: [2,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'PA': [{
		// Dverf.: 1;	DIG1: =PE1;	[!] Dois primeiros são sempre 15
		// {mask: new StringMask('00-000000-0')
		chars: 9,
		match: /^15/,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'SE': [{
		// Dverf.: 1;	DIG1: =PE1;
		// {mask: new StringMask('00000000-0')
		chars: 9,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'PB': [{
		// Dvref.: 1;	DIG1: =PE1;
		// {mask: new StringMask('00000000-0')
		chars: 9,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'CE': [{
		// Dvref.: 1;	DIG1: =PE1;
		// {mask: new StringMask('00000000-0')
		chars: 9,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'PI': [{
		// Dvref.: 1;	DIG1: =PE1;
		// {mask: new StringMask('000000000')
		chars: 9,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'MA': [{
		// Dvref.: 1;	DIG1: =PE1; [!] Tem que iniciar com 12
		// {mask: new StringMask('000000000')
		chars: 9,
		match: /^12/,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'MT': [{
		// Dvref.: 1;	DIG1: =PE1;
		// {mask: new StringMask('0000000000-0'), uf: 'MATO GROSSO'}
		chars: 11,
		dvs: [{
			dvpos: 10,
			pesos: [3,2,9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'MS': [{
		// Dvref.: 1;	DIG1: =PE1; [!] Dois primeiros são sempre 28
		// {mask: new StringMask('000000000'), uf: 'MATO GROSSO DO SUL'}
		chars: 9,
		match: /^28/,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'TO': [{
		// Dvref.: 1;	DIG1: =PE1; [!] Digitos 3 e 4 não considerados no cáculo do DV
		// {mask: new StringMask('00000000000'), [!] Digitos 3 e 4 devem ser: [01], [02], [03] ou [99]
		chars: 11,
		match: /^[0-9]{2}((0[123])|(99))/,
		dvs: [{
			dvpos: 10,
			pesos: [9,8,0,0,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'AL': [{
		// Dvref.: 1;	DIG1: =RN; [!] Terceiro tem que ser: 0, 3, 5, 7 ou 8
		// {mask: new StringMask('000000000') // [!] Dois primeiros são sempre 24
		chars: 9,
		match: /^24[03578]/,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'minusRestOf11']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],
	'RR': [{
		// Dvref.: 1;	DIG1: DV calculado pelo MOD9 [!] Dois primeiros são sempre 24
		// {mask: new StringMask('00000000-0')
		chars: 9,
		match: /^24/,
		dvs: [{
			dvpos: 8,
			pesos: [1,2,3,4,5,6,7,8],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod9', 'voidFn']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],																		

	'GO': [{
		// Dverf.: 1;	DIG1: ~PE: Quando resto igual a 11, DV pode ser 0 ou 1 dependendo da faixa da I.E.
		// {mask: new StringMask('00.000.000-0'), uf: 'GOIÁS'}
		chars: 9,
		match: /^1[015]/,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'normalSum', 'mod11', 'goSpec']
		}],
		validate: function(value) { return validateIE(value, this); }
	}],

	'AP': [{
		// Dvref.: 1;	DIG1: ALG PROPRIO;
		// {mask: new StringMask('000000000')
		chars: 9,
		match: /^03/,
		dvs: [{
			dvpos: 8,
			pesos: [9,8,7,6,5,4,3,2],
			algorithmSteps: ['onlyNumbers', 'apSpec', 'mod11', 'apSpec']
		}],
		validate: function(value) { return validateIE(value, this); }
	}]
};


/** Used to determine if values are of the language type Object */
var objectTypes = {
	'boolean': false,
	'function': true,
	'object': true,
	'number': false,
	'string': false,
	'undefined': false
};

if (objectTypes[typeof module]) {
	module.exports = ieRules;	
}