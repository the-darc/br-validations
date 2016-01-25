var RG = {};

RG.validate = function(rg){
  rg = rg.split('');
  var vd;
  var multiplier = 2;
  var total = 0;

  for (var i = 0; i < rg.length - 1; i++) {
    total += rg[i] * multiplier;
    multiplier += 1;
  }

  vd = 11 - total % 11;
  return  (parseInt(rg[rg.length - 1]) === vd);
};