var should = require('should'),
	BrV = require('../releases/br-validations.min');

describe('br-validations', function(){
	describe('CNPJ ', function() {
		it('should validate 10.157.471/0001-61', function(done) {
			should(BrV.cnpj.validate('10.157.471/0001-61')).be.true;
			done();
		});
		it('should validate 54.506.158/0001-67', function(done) {
			should(BrV.cnpj.validate('54.506.158/0001-67')).be.true;
			done();
		});
		it('should validate 79.121.383/0001-06', function(done) {
			should(BrV.cnpj.validate('79.121.383/0001-06')).be.true;
			done();
		});
		it('should not validate 12.871.891/0001-34', function(done) {
			should(BrV.cnpj.validate('12.871.891/0001-34')).be.false;
			done();
		});
		it('should not validate 01.781.192/0001-20', function(done) {
			should(BrV.cnpj.validate('01.781.192/0001-20')).be.false;
			done();
		});
		it('should not validate equal numbers sequence', function(done) {
			var template = '##.###.###/####-##';
			for (var i = 0; i < 10; i++) {
				var cnpj = template.replace(/#/g,i);
				should(BrV.cnpj.validate(cnpj)).be.false;
			}
			done();
		});
	});
});
