function Calculator(){
}

Calculator.prototype.render = function() {
  var html = `<div style="text-align: center;">
  <input id = "seed" style = "width: 20%; height: 6%">
  <br/>
  <br/>
  <select id = "cal_method" style = "width: 20%; height: 6%">
    <option value="fact">n - Factorial</option>
    <option value="sum">Summation Series</option>
  </select>
  <br/>
  <br/>
  <button style = "width: 25%; height: 6%" onclick = "runCalculation()">Click to Calculate!</button>
  <br/>
  <br/>
  </div>
  <div id = "output" style="text-align: center;"> </div>`;
  return html;
}

Calculator.prototype.computeFactorial = function(seed) {
  // Check if input is valid
  if(isNaN(seed) || seed <= 0 ) {
    return "Invalid Input!";
  } else {
    var fac = 1;
    var n = seed;
    while(n > 1) {
      fac *= n;
      n--;
    }
    return "The factorial for " + seed + " is " + fac + ".";
  }
}

Calculator.prototype.computeSummation = function(seed) {
  // Check if input is valid
  if(isNaN(seed) || seed < 0 ) {
    return "Invalid Input!";
  } else {
    var sum = 0;
    var n = seed;
    while(n >= 0) {
      sum += n;
      n--;
    }
    return "The summation for " + seed + " is " + sum + ".";
  }
}
module.exports = Calculator;
