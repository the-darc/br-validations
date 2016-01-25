var should = require('should'),
  BrV = require('../releases/br-validations');

describe('RG', function(){
  it('should be valid', function(done){
    should(BrV.rg.validate('418757896')).be.true;
    done();
  });
  it('should be valid', function(done){
    should(BrV.rg.validate('911225341')).be.true;
    done();
  });
  it('should NOT be valid with empty entry', function(done){
    should(BrV.rg.validate('')).be.false;
    done();
  });
  it('should NOT be valid RG since its not a General Registry', function(done){
    should(BrV.rg.validate('2977269')).be.false;
    done();
  });    
})