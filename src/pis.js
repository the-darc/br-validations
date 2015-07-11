
var PIS = {};

PIS.validate = function(pis) {
	pis = pis.replace(/[^\d]+/g,'');
	var r = /^(0{11}|1{11}|2{11}|3{11}|4{11}|5{11}|6{11}|7{11}|8{11}|9{11})$/;
	
	if (!pis || pis.length !== 11 || r.test(pis)) {
		return false;
	}
	
	var pisi = pis.substring(0,10);
	var pisd = pis.substring(10);
	
	function calculateDigit(pis){
        var p = [3,2,9,8,7,6,5,4,3,2];
        var s = 0;
        for(var i = 0; i <= 9; i++){
            s += parseInt(pis.charAt(i)) * p[i];
        }
        var r = 11 - (s%11);
        return (r == 10 || r == 11) ? 0 : r;
	}	
	
	return pisd == calculateDigit(pisi);
};
