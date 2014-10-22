var should = require('should'),
	BrV = require('../releases/br-validations.min');

describe('br-validations', function(){
	describe('CPF ', function() {
		it('should validate 970.708.686-69', function(done) {
			should(BrV.cpf.validate('970.708.686-69')).be.true;
			done();
		});
		it('should validate 219.841.712-08', function(done) {
			should(BrV.cpf.validate('219.841.712-08')).be.true;
			done();
		});
		it('should validate 246.535.110-98', function(done) {
			should(BrV.cpf.validate('246.535.110-98')).be.true;
			done();
		});
		it('should not validate 246.505.120-70', function(done) {
			should(BrV.cpf.validate('246.505.120-70')).be.false;
			done();
		});
		it('should not validate 143.515.120-13', function(done) {
			should(BrV.cpf.validate('143.515.120-13')).be.false;
			done();
		});
		it('should not validate equal numbers sequence', function(done) {
			var template = '###.###.###-##';
			for (var i = 0; i < 10; i++) {
				var cpf = template.replace(/#/g,i);
				should(BrV.cpf.validate(cpf)).be.false;
			}
			done();
		});
	});
});
