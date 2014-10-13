var should = require('should'),
	BrV = require('../releases/br-validations.min');

describe('br-validations', function(){
	describe('I.E. ', function() {
		describe('I.E.: Group02', function() {
			describe('- Invalid UF', function() {
				it('should ivalidate for unknown UF', function(done) {
					should(BrV.ie('XX').validate('0321418-40')).be.false;
					done();
				});
				it('should ivalidate for undefined uf', function(done) {
					should(BrV.ie(undefined).validate('0321418-40')).be.false;
					done();
				});
				it('should ivalidate for NULL uf', function(done) {
					should(BrV.ie(null).validate('0321418-40')).be.false;
					done();
				});
			});
			describe('- PE', function() {
				var uf = 'PE';
				it('should validate 0321418-40', function(done) {
					should(BrV.ie(uf).validate('0321418-40')).be.true;
					done();
				});
				it('should invalidate 1321418-40', function(done) {
					should(BrV.ie(uf).validate('1321418-40')).be.false;
					done();
				});
				it('should validate 18.1.001.0000004-9', function(done) {
					should(BrV.ie(uf).validate('18.1.001.0000004-9')).be.true;
					done();
				});
				it('should invalidate 18.1.001.0000005-9', function(done) {
					should(BrV.ie(uf).validate('18.1.001.0000005-9')).be.false;
					done();
				});
			});
			describe('- RS', function() {
				var uf = 'RS';
				it('should validate 224/3658792', function(done) {
					should(BrV.ie(uf).validate('224/3658792')).be.true;
					done();
				});
				it('should invalidate 224/4658792', function(done) {
					should(BrV.ie(uf).validate('224/4658792')).be.false;
					done();
				});
			});
			describe('- AC', function() {
				var uf = 'AC';
				it('should validate 01.004.823/001-12', function(done) {
					should(BrV.ie(uf).validate('01.004.823/001-12')).be.true;
					done();
				});
				it('should invalidate 01.004.923/201-12', function(done) {
					should(BrV.ie(uf).validate('01.004.923/201-12')).be.false;
					done();
				});
				it('should invalidate 02.004.923/201-55', function(done) {
					should(BrV.ie(uf).validate('02.004.923/201-55')).be.false;
					done();
				});
			});
			describe('- MG', function() {
				var uf = 'MG';
				it('should validate 062.307.904/0081', function(done) {
					should(BrV.ie(uf).validate('062.307.904/0081')).be.true;
					done();
				});
				it('should invalidate 062.347.934/0081', function(done) {
					should(BrV.ie(uf).validate('062.347.934/0081')).be.false;
					done();
				});
			});
			describe('- SP', function() {
				var uf = 'SP';
				it('should validate 110.042.490.114', function(done) {
					should(BrV.ie(uf).validate('110.042.490.114')).be.true;
					done();
				});
				it('should invalidate 110.045.490.124', function(done) {
					should(BrV.ie(uf).validate('110.045.490.124')).be.false;
					done();
				});
				it('should invalidate 011.004.243.002', function(done) {
					should(BrV.ie(uf).validate('011.004.243.002')).be.false;
					done();
				});
				it('should validate P-01100424.3/002', function(done) {
					should(BrV.ie(uf).validate('P-01100424.3/002')).be.true;
					done();
				});
				it('should invalidate P-358874770.9/710', function(done) {
					should(BrV.ie(uf).validate('P-358874770.9/710')).be.false;
					done();
				});
				it('should validate p-01100524.3/002', function(done) {
					should(BrV.ie(uf).validate('p-01100524.0/002')).be.true;
					done();
				});
				it('should invalidate A-01100524.3/002', function(done) {
					should(BrV.ie(uf).validate('A-01100524.0/002')).be.false;
					done();
				});
			});
			describe('- DF', function() {
				var uf = 'DF';
				it('should validate 07300001001-09', function(done) {
					should(BrV.ie(uf).validate('07300001001-09')).be.true;
					done();
				});
				it('should invalidate 07301002001-09', function(done) {
					should(BrV.ie(uf).validate('07301002001-09')).be.false;
					done();
				});
			});
			describe('- ES', function() {
				var uf = 'ES';
				it('should validate 99999999-0', function(done) {
					should(BrV.ie(uf).validate('99999999-0')).be.true;
					done();
				});
				it('should validate 19871230-8', function(done) {
					should(BrV.ie(uf).validate('19871230-8')).be.true;
					done();
				});
				it('should invalidate 99912999-0', function(done) {
					should(BrV.ie(uf).validate('99912999-0')).be.false;
					done();
				});
			});
			describe('- BA', function() {
				var uf = 'BA';
				describe('BA: 8 digits', function() {
					it('should validate 090493-87', function(done) {
						should(BrV.ie(uf).validate('090493-87')).be.true;
						done();
					});
					it('should validate 123456-63', function(done) {
						should(BrV.ie(uf).validate('123456-63')).be.true;
						done();
					});
					it('should validate 290493-30', function(done) {
						should(BrV.ie(uf).validate('290493-03')).be.true;
						done();
					});
					it('should validate 390493-60', function(done) {
						should(BrV.ie(uf).validate('390493-66')).be.true;
						done();
					});
					it('should validate 490493-29', function(done) {
						should(BrV.ie(uf).validate('490493-29')).be.true;
						done();
					});
					it('should validate 590493-20', function(done) {
						should(BrV.ie(uf).validate('590493-82')).be.true;
						done();
					});
					it('should validate 890493-10', function(done) {
						should(BrV.ie(uf).validate('890493-61')).be.true;
						done();
					});
					it('should invalidate 026456-63', function(done) {
						should(BrV.ie(uf).validate('026456-63')).be.false;
						done();
					});

					it('should validate 612345-57', function(done) {
						should(BrV.ie(uf).validate('612345-57')).be.true;
						done();
					});
					it('should validate 723024-69', function(done) {
						should(BrV.ie(uf).validate('723024-69')).be.true;
						done();
					});
					it('should validate 923024-76', function(done) {
						should(BrV.ie(uf).validate('923024-76')).be.true;
						done();
					});
					it('should invalidate 602355-57', function(done) {
						should(BrV.ie(uf).validate('602355-57')).be.false;
						done();
					});
				});
				describe('BA: 9 digits', function() {
					it('should validate 0629333-16', function(done) {
						should(BrV.ie(uf).validate('0629333-16')).be.true;
						done();
					});
					it('should validate 1000003-06', function(done) {
						should(BrV.ie(uf).validate('1000003-06')).be.true;
						done();
					});
					it('should validate 2190493-84', function(done) {
						should(BrV.ie(uf).validate('2190493-84')).be.true;
						done();
					});
					it('should validate 3190493-56', function(done) {
						should(BrV.ie(uf).validate('3190493-56')).be.true;
						done();
					});
					it('should validate 4190493-28', function(done) {
						should(BrV.ie(uf).validate('4190493-28')).be.true;
						done();
					});
					it('should validate 5190493-00', function(done) {
						should(BrV.ie(uf).validate('5190493-90')).be.true;
						done();
					});
					it('should validate 8190493-06', function(done) {
						should(BrV.ie(uf).validate('8190493-06')).be.true;
						done();
					});
					it('should invalidate 1010203-06', function(done) {
						should(BrV.ie(uf).validate('1010203-06')).be.false;
						done();
					});

					it('should validate 6112345-05', function(done) {
						should(BrV.ie(uf).validate('6112345-35')).be.true;
						done();
					});
					it('should validate 7123024-06', function(done) {
						should(BrV.ie(uf).validate('7123024-56')).be.true;
						done();
					});
					it('should validate 9123024-90', function(done) {
						should(BrV.ie(uf).validate('9123024-90')).be.true;
						done();
					});
					it('should invalidate 6102355-57', function(done) {
						should(BrV.ie(uf).validate('6102355-57')).be.false;
						done();
					});
				});
			});
			describe('- AM', function() {
				var uf = 'AM';
				it('should validate 99.999.999-0', function(done) {
					should(BrV.ie(uf).validate('99.999.999-0')).be.true;
					done();
				});
				it('should validate 19.871.230-8', function(done) {
					should(BrV.ie(uf).validate('19.871.230-8')).be.true;
					done();
				});
				it('should invalidate 99.912.999-0', function(done) {
					should(BrV.ie(uf).validate('99.912.999-0')).be.false;
					done();
				});
			});
			describe('- RN', function() {
				var uf = 'RN';
				it('should validate 20.040.040-1', function(done) {
					should(BrV.ie(uf).validate('20.040.040-1')).be.true;
					done();
				});
				it('should invalidate 20.042.140-1', function(done) {
					should(BrV.ie(uf).validate('20.042.140-1')).be.false;
					done();
				});
				it('should validate 20.0.040.040-0', function(done) {
					should(BrV.ie(uf).validate('20.0.040.040-0')).be.true;
					done();
				});
				it('should validate 20.0.340.040-0', function(done) {
					should(BrV.ie(uf).validate('20.0.340.040-0')).be.true;
					done();
				});
				it('should invalidate 20.0.341.140-0', function(done) {
					should(BrV.ie(uf).validate('20.0.341.140-0')).be.false;
					done();
				});
			});
			describe('- RO', function() {
				var uf = 'RO';
				it('should validate 0000000062521-3', function(done) {
					should(BrV.ie(uf).validate('0000000062521-3')).be.true;
					done();
				});
				it('should validate 0601230662521-7', function(done) {
					should(BrV.ie(uf).validate('0601230662521-7')).be.true;
					done();
				});
				it('should invalidate 0601230662521-3', function(done) {
					should(BrV.ie(uf).validate('0601230662521-3')).be.false;
					done();
				});
			});
			describe('- PR', function() {
				var uf = 'PR';
				it('should validate 123.45678-50', function(done) {
					should(BrV.ie(uf).validate('123.45678-50')).be.true;
					done();
				});
				it('should validate 153.07274-47', function(done) {
					should(BrV.ie(uf).validate('153.07274-47')).be.true;
					done();
				});
				it('should invalidate 153.07274-50', function(done) {
					should(BrV.ie(uf).validate('153.07274-50')).be.false;
					done();
				});
			});
		});
		describe('I.E.: Group02', function() {
			describe('- SC', function() {
				var uf = 'SC';
				it('should validate 251.040.852', function(done) {
					should(BrV.ie(uf).validate('251.040.852')).be.true;
					done();
				});
				it('should validate 251.341.852', function(done) {
					should(BrV.ie(uf).validate('251.341.852')).be.true;
					done();
				});
				it('should invalidate 251.321.852', function(done) {
					should(BrV.ie(uf).validate('251.321.852')).be.false;
					done();
				});
			});
			describe('- RJ', function() {
				var uf = 'RJ';
				it('should validate 99.999.99-3', function(done) {
					should(BrV.ie(uf).validate('99.999.99-3')).be.true;
					done();
				});
				it('should validate 40.732.12-8', function(done) {
					should(BrV.ie(uf).validate('40.732.12-8')).be.true;
					done();
				});
				it('should invalidate 40.732.12-3', function(done) {
					should(BrV.ie(uf).validate('40.732.12-3')).be.false;
					done();
				});
			});
			describe('- PA', function() {
				var uf = 'PA';
				it('should validate 15-999999-5', function(done) {
					should(BrV.ie(uf).validate('15-999999-5')).be.true;
					done();
				});
				it('should validate 15-740351-3', function(done) {
					should(BrV.ie(uf).validate('15-740351-3')).be.true;
					done();
				});
				it('should invalidate 15-740351-5', function(done) {
					should(BrV.ie(uf).validate('15-740351-5')).be.false;
					done();
				});
				it('should invalidate 14-740351-0', function(done) {
					should(BrV.ie(uf).validate('14-740351-0')).be.false;
					done();
				});
			});
			describe('- SE', function() {
				var uf = 'SE';
				it('should validate 27123456-3', function(done) {
					should(BrV.ie(uf).validate('27123456-3')).be.true;
					done();
				});
				it('should validate 14740351-0', function(done) {
					should(BrV.ie(uf).validate('14-740351-0')).be.true;
					done();
				});
				it('should invalidate 15740351-5', function(done) {
					should(BrV.ie(uf).validate('15740351-5')).be.false;
					done();
				});
			});
			describe('- PB', function() {
				var uf = 'PB';
				it('should validate 06000001-5', function(done) {
					should(BrV.ie(uf).validate('06000001-5')).be.true;
					done();
				});
				it('should validate 14740351-0', function(done) {
					should(BrV.ie(uf).validate('14-740351-0')).be.true;
					done();
				});
				it('should invalidate 15740351-5', function(done) {
					should(BrV.ie(uf).validate('15740351-5')).be.false;
					done();
				});
			});
			describe('- CE', function() {
				var uf = 'CE';
				it('should validate 06000001-5', function(done) {
					should(BrV.ie(uf).validate('06000001-5')).be.true;
					done();
				});
				it('should validate 14740351-0', function(done) {
					should(BrV.ie(uf).validate('14-740351-0')).be.true;
					done();
				});
				it('should invalidate 15740351-5', function(done) {
					should(BrV.ie(uf).validate('15740351-5')).be.false;
					done();
				});
			});
			describe('- PI', function() {
				var uf = 'PI';
				it('should validate 012345679', function(done) {
					should(BrV.ie(uf).validate('012345679')).be.true;
					done();
				});
				it('should validate 060000015', function(done) {
					should(BrV.ie(uf).validate('060000015')).be.true;
					done();
				});
				it('should validate 147403510', function(done) {
					should(BrV.ie(uf).validate('147403510')).be.true;
					done();
				});
				it('should invalidate 157403515', function(done) {
					should(BrV.ie(uf).validate('157403515')).be.false;
					done();
				});
			});
			describe('- MA', function() {
				var uf = 'MA';
				it('should validate 120000385', function(done) {
					should(BrV.ie(uf).validate('120000385')).be.true;
					done();
				});
				it('should invalidate 060000015', function(done) {
					should(BrV.ie(uf).validate('060000015')).be.false;
					done();
				});
				it('should invalidate 127403510', function(done) {
					should(BrV.ie(uf).validate('127403510')).be.false;
					done();
				});
				it('should validate 127403515', function(done) {
					should(BrV.ie(uf).validate('127403515')).be.true;
					done();
				});
			});
			describe('- MT', function() {
				var uf = 'MT';
				it('should validate 0013000001-9', function(done) {
					should(BrV.ie(uf).validate('0013000001-9')).be.true;
					done();
				});
				it('should validate 0013046011-7', function(done) {
					should(BrV.ie(uf).validate('0013046011-7')).be.true;
					done();
				});
				it('should invalidate 0013046011-9', function(done) {
					should(BrV.ie(uf).validate('0013046011-9')).be.false;
					done();
				});
			});
			describe('- MS', function() {
				var uf = 'MS';
				it('should validate 285730383', function(done) {
					should(BrV.ie(uf).validate('280000383')).be.true;
					done();
				});
				it('should invalidate 127403515', function(done) {
					should(BrV.ie(uf).validate('127403515')).be.false;
					done();
				});
				it('should invalidate 280000015', function(done) {
					should(BrV.ie(uf).validate('280000015')).be.false;
					done();
				});
			});
			describe('- TO', function() {
				var uf = 'TO';
				it('should validate 29010227836', function(done) {
					should(BrV.ie(uf).validate('29010227836')).be.true;
					done();
				});
				it('should invalidate 29010237336', function(done) {
					should(BrV.ie(uf).validate('29010237336')).be.false;
					done();
				});
				it('should invalidate 29090227836', function(done) {
					should(BrV.ie(uf).validate('29090227836')).be.false;
					done();
				});
			});
			describe('- AL', function() {
				var uf = 'AL';
				it('should validate 240000048', function(done) {
					should(BrV.ie(uf).validate('240000048')).be.true;
					done();
				});
				it('should validate 240273044', function(done) {
					should(BrV.ie(uf).validate('240273044')).be.true;
					done();
				});
				it('should invalidate 241178045', function(done) {
					should(BrV.ie(uf).validate('241178045')).be.false;
					done();
				});
				it('should invalidate 213178044', function(done) {
					should(BrV.ie(uf).validate('213178044')).be.false;
					done();
				});
				it('should invalidate 240178040', function(done) {
					should(BrV.ie(uf).validate('240178040')).be.false;
					done();
				});
			});
			describe('- RR', function() {
				var uf = 'RR';
				it('should validate 24006628-1', function(done) {
					should(BrV.ie(uf).validate('24006628-1')).be.true;
					done();
				});
				it('should validate 24001755-6', function(done) {
					should(BrV.ie(uf).validate('24001755-6')).be.true;
					done();
				});
				it('should validate 24003429-0', function(done) {
					should(BrV.ie(uf).validate('24003429-0')).be.true;
					done();
				});
				it('should validate 24001360-3', function(done) {
					should(BrV.ie(uf).validate('24001360-3')).be.true;
					done();
				});
				it('should validate 24008266-8', function(done) {
					should(BrV.ie(uf).validate('24008266-8')).be.true;
					done();
				});
				it('should invalidate 24002676-8', function(done) {
					should(BrV.ie(uf).validate('24002676-8')).be.false;
					done();
				});
			});
			describe('- GO', function() {
				var uf = 'GO';
				it('should validate 10.987.654-7', function(done) {
					should(BrV.ie(uf).validate('10.987.654-7')).be.true;
					done();
				});
				it('should validate 11.094.402-0', function(done) {
					should(BrV.ie(uf).validate('11.094.402-0')).be.true;
					done();
				});
				it('should validate 10.115.996-1', function(done) {
					should(BrV.ie(uf).validate('10.115.996-1')).be.true;
					done();
				});
				it('should validate 10.113.995-0', function(done) {
					should(BrV.ie(uf).validate('10.113.995-0')).be.true;
					done();
				});
				it('should invalidate 10.957.654-7', function(done) {
					should(BrV.ie(uf).validate('10.957.654-7')).be.false;
					done();
				});
			});
			describe('- AP', function() {
				var uf = 'AP';
				it('should validate 030123459', function(done) {
					should(BrV.ie(uf).validate('030123459')).be.true;
					done();
				});
				it('should validate 030183458', function(done) {
					should(BrV.ie(uf).validate('030183458')).be.true;
					done();
				});
				it('should validate 030173452', function(done) {
					should(BrV.ie(uf).validate('030173452')).be.true;
					done();
				});
				it('should validate 030153455', function(done) {
					should(BrV.ie(uf).validate('030153455')).be.true;
					done();
				});
				it('should validate 030193451', function(done) {
					should(BrV.ie(uf).validate('030193451')).be.true;
					done();
				});
				it('should validate 030223458', function(done) {
					should(BrV.ie(uf).validate('030223458')).be.true;
					done();
				});
				it('should validate 037123459', function(done) {
					should(BrV.ie(uf).validate('037123459')).be.true;
					done();
				});
				it('should invalidate 031123459', function(done) {
					should(BrV.ie(uf).validate('031123459')).be.false;
					done();
				});
			});
		});
	});
});
