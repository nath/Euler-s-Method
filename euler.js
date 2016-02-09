"use strict";

$(document).ready(function() {
  $('#calculate').click(euler);
  $('#stepSize').change(resultUpdate);
  $('#numSteps').change(resultUpdate);
  canvas = $('#canvas')[0];
  canvas.width = 800;
  canvas.height = 800;
  ctx = canvas.getContext('2d');
});

var canvas;
var ctx;

var points = [];
var minx;
var maxx;
var miny;
var maxy;

function euler() {
  //clear the table
  var table = $('#values');
  table.find('tr:gt(0)').remove();

  points = [];

  var x = Number($('#x0').val());
  var y = Number($('#y0').val());
  var deltaFn = $('#derivative').val();
  var h = Number($('#stepSize').val());
  var n = Number($('#numSteps').val());

  minx = x;
  maxx = x;
  miny = y;
  maxy = y;

  var delta = eval(deltaFn);
  table.append('<tr><td>'+x+'</td><td>'+y+'</td><td>'+delta.toFixed(6)+'</td></tr>');

  for (var i=0; i<n; i++) {
    y += delta;
    x += h;
    delta = h*eval(deltaFn);
    table.append('<tr><td>'+x.toFixed(6)+'</td><td>'+y.toFixed(6)+'</td><td>'+delta.toFixed(6)+'</td></tr>');

    minx = Math.min(minx, x);
    maxx = Math.max(maxx, x);
    miny = Math.min(miny, y);
    maxy = Math.max(maxy, y);

    points.push({x: x, y: y});
  }
  $('#result').text(y.toFixed(6));

  console.log(minx + ' ' + maxx + ' ' + miny + ' ' + maxy);
  plotPoints();
}

function resultUpdate() {
  var h = Number($('#stepSize').val());
  var n = Number($('#numSteps').val());

  $('#yFinal').text((h*n).toFixed(3));
  $('#result').text('???');
}

function plotPoints() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  var xscale = 700/(maxx-minx);
  var yscale = 700/(maxy-miny);

  console.log(xscale + ' ' + yscale);

  for (var i=0; i<points.length; i++) {
    ctx.beginPath();
    ctx.fillStyle = "black";
    ctx.arc((points[i].x-minx) * xscale + 50, 750 - ((points[i].y-miny) * yscale), 3, 0, 2*Math.PI);
    ctx.fill();
  }

  ctx.font='16pt Arial';

  ctx.beginPath();
  ctx.moveTo(0, 750);
  ctx.lineTo(800, 750);
  ctx.fillText('y='+miny.toFixed(6), 375, 775);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(0, 50);
  ctx.lineTo(800, 50);
  ctx.fillText('y='+maxy.toFixed(6), 375, 25);
  ctx.stroke();

  ctx.beginPath();
  ctx.moveTo(50, 0);
  ctx.lineTo(50, 800);
  ctx.stroke();

  var minXText = 'x='+minx.toFixed(6);
  var metric = ctx.measureText(minXText);
  ctx.save();
  var tx = 25;
  var ty = 375 + (metric.width/2);
  ctx.translate(tx,ty);
  ctx.rotate(-Math.PI/2);
  ctx.translate(-tx,-ty);
  ctx.fillText(minXText, 25, ty);
  ctx.restore();

  ctx.beginPath();
  ctx.moveTo(750, 0);
  ctx.lineTo(750, 800);
  ctx.stroke();

  var maxXText = 'x='+maxx.toFixed(6);
  metric = ctx.measureText(maxXText);
  ctx.save();
  tx = 775;
  ty = 360 + (metric.width/2);
  ctx.translate(tx,ty);
  ctx.rotate(Math.PI/2);
  ctx.translate(-tx,-ty);
  ctx.fillText(maxXText, 700, ty);
  ctx.restore();
}
