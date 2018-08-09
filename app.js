var percentFilled = 50;

var borderColor = "#2c3e50";
var borderPadding = 3;
var borderWidth = 0;

var gaugeFaceColor = "white";
var gaugeColor1 = "#339933";
var gaugeColor2 = "#cccc66";
var gaugeColor3 = "#ff3333";

var tickCount = 30;
var tickOutlineWidth = 0;
var tickPadding = 0;

var textCenterOffset = 5;
var valueCenterOffset = 30;

var textColor = "#7a7979";
var fontFamily = "Tahoma";
var fontSizeText = "18.0pt";
var fontSizeValue = "11.0pt";

var startEnd = 2.4;

var colors = [];
var data = [];
var fills=[];

function shadeColor(color, percent) {   
    var f=parseInt(color.slice(1),16),t=percent<0?0:255,p=percent<0?percent*-1:percent,R=f>>16,G=f>>8&0x00FF,B=f&0x0000FF;
    return "#"+(0x1000000+(Math.round((t-R)*p)+R)*0x10000+(Math.round((t-G)*p)+G)*0x100+(Math.round((t-B)*p)+B)).toString(16).slice(1);
}

var padAngle = (tickOutlineWidth === 0) ? 0 : tickPadding;

var width = 225 ,
    height = 225,
    radius = Math.min(width, height) / 2 - 10,
    gaugeWidth = radius * 0.2;// Math.PI / (2*radius);

var filled = tickCount * (percentFilled / 100);

var borderStop = Math.ceil(100 - (100 * (borderWidth / radius))) + "%";
console.log(borderStop);

//padAngle = Math.max(0.025, padAngle);
//padAngle = Math.min(0.035, padAngle);

var outerRadius = radius - borderWidth - borderPadding;
var innerRadius = outerRadius - gaugeWidth;

for (i=0; i<tickCount; i++){  
  data.push(10)
  if (i >= filled) {
     if (i <= (tickCount * 0.33)) {
        fills.push(shadeColor(gaugeColor1, 0.75));
        colors.push(shadeColor(gaugeColor1, -0.25)); //colors.push('#ccffcc');
      }
    else {
      if ((i > (tickCount * 0.33)) && (i <= (tickCount * 0.66))) {
        fills.push(shadeColor(gaugeColor2, 0.75));
        colors.push(shadeColor(gaugeColor2, -0.25)); //colors.push('#ffff99');
      }
      else {
        fills.push(shadeColor(gaugeColor3, 0.75));
        colors.push(shadeColor(gaugeColor3, -0.25));//colors.push('#ff9999');
      }
    }
  }
  else
    if (i <= (tickCount * 0.33)) {
        fills.push(gaugeColor1);
        colors.push(shadeColor(gaugeColor1, 0.25));//colors.push('#339933');
      }
    else {
      if ((i > (tickCount * 0.33)) && (i <= (tickCount * 0.66))) {
        fills.push(gaugeColor2);
        colors.push(shadeColor(gaugeColor2, 0.25));//colors.push('#ffff00');
      }
      else {
        fills.push(gaugeColor3);
        colors.push(shadeColor(gaugeColor3, 0.25));//colors.push('#cc0000');
      }
    }
  }


var pie = d3.layout.pie()
    .value(function(d) { return d; })
    .sort(null)
    .startAngle(-startEnd)
    .endAngle(startEnd)
    .padAngle(padAngle);

var arc = d3.svg.arc()
    .innerRadius(innerRadius)
    .outerRadius(outerRadius);


var parent = d3.select("#app").append("svg")
    .attr("width", width)
    .attr("height", height);


var radialGradient = parent.append("defs")
  .append("radialGradient")
    .attr("id", "radial-gradient");

radialGradient.append("stop")
    .attr("offset", "0%")
    .attr("stop-color", gaugeFaceColor);

radialGradient.append("stop")
    .attr("offset", borderStop)
    .attr("stop-color", gaugeFaceColor);

radialGradient.append("stop")
    .attr("offset", borderStop)
    .attr("stop-color", borderColor);

var finalColor = (borderStop === "100%") ? gaugeFaceColor : borderColor;

radialGradient.append("stop")
    .attr("offset", "100%")
    .attr("stop-color", finalColor);

var circle = parent.append("circle")
    .attr("id", "circle")
    .attr("cx", width/2)
    .attr("cy", height/2)
    .attr("r", radius)
    .attr('stroke', '#444444')
    .attr('stroke-width', 8)
    .attr('padding', 10)
    .attr("fill", "url(#radial-gradient)");

var svg = parent.append("g")
    .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");


var line1 = parent.append("text")
    .attr("text-anchor", "middle")
    .style('font-family', fontFamily)
    .style('font-size', fontSizeText)
    .attr("fill", textColor)
    .text('System');

var line2 = parent.append("text")
    .attr("text-anchor", "middle")
    .style('font-family', fontFamily)
    .style('font-size', fontSizeText)
    .attr("fill", textColor)
    .text('Efficiency');

var tmpVal = (percentFilled / 100).toFixed(2);

var value = parent.append("text")
    .style('font-family', fontFamily)
    .style('font-size', fontSizeValue)
    .style('font-weight', 'bold')
    .attr("fill", 'black')
    .attr("text-anchor", "middle")
    .text(tmpVal + ' kW/tR');

var th = line1.node().getBBox().height;

line1.attr("transform", "translate(" + width / 2 + "," + ((height / 2.25) - (th / 2) + textCenterOffset) + ")");
line2.attr("transform", "translate(" + width / 2 + "," + ((height / 2.25) + (th / 2) + textCenterOffset) + ")");
value.attr("transform", "translate(" + width / 2 + "," + ((height / 2) + (th / 1.5) + valueCenterOffset) + ")");

// d3.tsv("data.tsv", type, function(error, data) {
 var actStroke = (tickOutlineWidth === 0) ? 1 : tickOutlineWidth;

 var path = svg.datum(data).selectAll("path")
  .data(pie(data));

path.enter().append("path")
    //   .data(pie)
    // .enter().append("path")
      .attr("stroke", function(d, i) { 
            if (tickOutlineWidth === 0)
              {return fills[i]}
            else {
                return colors[i]; 
            }
            })
      .attr("stroke-width", actStroke)
      .attr("fill", function(d, i) { return fills[i]; })
      .attr("d", arc); // store the initial angles

path.exit().remove();



















































// 'use strict';

// console.log('js running');

// const tR = 3000
// const kW = 1625
// const kWPerTR = kW / tR
// // .06 kW/tR each
// // 30 bars * .06 = 1.8
// // gauge goes from 0 to 1.8.

// // const canvas = d3.select('#app').append('svg')
// //     .attr('width', 500)
// //     .attr('height', 500)

// // const group = canvas.append('g')
// //     .attr('transform', 'translate(100, 100)')

// // const r = 100;
// // const p = Math.PI * 2

// // const arc = d3.svg.arc()
// //     .innerRadius(r - 30)    //center to inside of donut
// //     .outerRadius(r)    //center to outside of donut
// //     .startAngle(p - 2.45)     //angle at which arc starts (measured in radians)
// //     .endAngle(p + 2.45)     //angle at which arc ends (pi * 2 radians === a full circle)

// // group.append('path')
// //     .attr('d', arc)





//     // EXAMPLE



//     var width = 960,
//     height = 500,
//     twoPi = 2 * Math.PI,
//     progress = 0,
//     total = 1308573, // must be hard-coded if server doesn't report Content-Length
//     formatUnit = d3.format(".00");

// var arc = d3.svg.arc()
//     .startAngle(0)
//     .innerRadius(180)
//     .outerRadius(240);

// var svg = d3.select("#app").append("svg")
//     .attr("width", width)
//     .attr("height", height)
//   .append("g")
//     .attr("transform", "translate(" + width / 2 + "," + height / 2 + ")");

// var meter = svg.append("g")
//     .attr("class", "progress-meter");

// meter.append("path")
//     .attr("class", "background")
//     .attr("d", arc.endAngle(twoPi));

// var foreground = meter.append("path")
//     .attr("class", "foreground");

// var text = meter.append("text")
//     .attr("text-anchor", "middle")
//     .attr("dy", ".35em");

// var i = d3.interpolateNumber(kWPerTR, 1.8)
// var efficiency = i(kWPerTR)
// foreground.attr('d', arc.endAngle(twoPi * efficiency))
// text.text(kWPerTR)

// // d3.transition()
// //     .tween('units', () => () => {})

// // d3.json("https://api.github.com/repos/mbostock/d3/git/blobs/2e0e3b6305fa10c1a89d1dfd6478b1fe7bc19c1e?" + Math.random())
// //     .on("progress", function() {
// //       var i = d3.interpolate(progress, d3.event.loaded / total);
// //       d3.transition().tween("progress", function() {
// //         return function(t) {
// //           progress = i(t);
// //           foreground.attr("d", arc.endAngle(twoPi * progress));
// //           text.text(formatPercent(progress));
// //         };
// //       });
// //     })
// //     .get(function(error, data) {
// //       meter.transition().delay(250).attr("transform", "scale(0)");
// //     });
