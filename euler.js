"use strict";

$(document).ready(function() {
  $('#calculate').click(euler);
  $('#stepSize').change(resultUpdate);
  $('#numSteps').change(resultUpdate);
});

function euler() {
  //clear the table
  var table = $('#values');
  table.find('tr:gt(0)').remove();

  var x = Number($('#x0').val());
  var y = Number($('#y0').val());
  var deltaFn = $('#derivative').val();
  var h = Number($('#stepSize').val());
  var n = Number($('#numSteps').val());

  var delta = eval(deltaFn);
  table.append('<tr><td>'+x+'</td><td>'+y+'</td><td>'+delta.toFixed(6)+'</td></tr>');

  for (var i=0; i<n; i++) {
    y += delta;
    x += h;
    delta = h*eval(deltaFn);
    table.append('<tr><td>'+x.toFixed(6)+'</td><td>'+y.toFixed(6)+'</td><td>'+delta.toFixed(6)+'</td></tr>');
  }
  $('#result').text(y.toFixed(6));
}

function resultUpdate() {
  var h = Number($('#stepSize').val());
  var n = Number($('#numSteps').val());

  $('#yFinal').text((h*n).toFixed(3));
  $('#result').text('???');
}
