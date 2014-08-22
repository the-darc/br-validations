var ieRules = require('./ie.rules.js');

var BrV = (function() {
	'use strict';

	var IE = function(uf) {
		if (!(this instanceof IE)) {
			return new IE(uf);
		}

		this.rules = ieRules[uf] || [];
		this.rule;
		IE.prototype._defineRule = function(value) {
			this.rule = undefined;
			for (var r = 0; r < this.rules.length && this.rule === undefined; r++) {
				var str = value.replace(/[^\d]/g,'');
				var ruleCandidate = this.rules[r];
				if (str.length === ruleCandidate.chars && (!ruleCandidate.match || ruleCandidate.match.test(value))) {
					this.rule = ruleCandidate;
					// console.log('>> rule'+this.rules[r].chars);
				}
			}
			return !!this.rule;
		};

		IE.prototype.validate = function(value) {
			if (!value || !this._defineRule(value)) {
				// console.log('[!] rule undefined!');
				return false;
			}
			return this.rule.validate(value);
		};
	};


	return {
		ie: IE
	};
}());

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
	module.exports = BrV;	
}
