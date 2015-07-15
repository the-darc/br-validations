var should = require('should'),
	BrV = require('../releases/br-validations');

describe('br-validations', function(){
	describe('PIS ', function() {
		it('should validate 120.5825.883-7', function(done) {
			should(BrV.pis.validate('120.5825.883-7')).be.true;
			done();
		});
		it('should validate 120.4664.181-9', function(done) {
			should(BrV.pis.validate('120.4664.181-9')).be.true;
			done();
		});
		it('should validate 120.6505.135-5', function(done) {
			should(BrV.pis.validate('120.6505.135-5')).be.true;
			done();
		});
		it('should not validate 124.3302.435-1', function(done) {
			should(BrV.pis.validate('124.3302.435-1')).be.false;
			done();
		});
		it('should not validate 120.6505.135-4', function(done) {
			should(BrV.pis.validate('120.6505.135-4')).be.false;
			done();
		});
	});
});
