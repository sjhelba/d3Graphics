'use strict';

console.log('js running');

// (function start () {
//     // LESS RECTANGLES THAN DATA POINTS
//     const dataArray = [5, 40, 50, 60];
//     const width = 500;
//     const height = 500;

//     const widthScale = d3.scale.linear()
//         .domain([0, dataArray[dataArray.length - 1]])
//         .range([0, width]);

//     const color = d3.scale.linear()
//         .domain([0, dataArray[dataArray.length - 1]])
//         .range(['red', 'blue']);

//     const axis = d3.svg.axis()
//         .ticks(5)   //without this, default is 10
//         .scale(widthScale);

//     const firstCanvas = d3.select("#app").append("svg")
//         .attr('width', width)
//         .attr('height', height)
        

//     const barGraphGroup = firstCanvas.append('g')
//         .attr('transform', 'translate(50, 20)')

//     const bars = barGraphGroup.selectAll('rect')
//         .data(dataArray)
//         .enter()
//             .append('rect')
//             .attr('width', d => widthScale(d))
//             .attr('height', 50)
//             .attr('fill', d => color(d))
//             .attr('y', (d, i) => i * 100);

//     const axisGroup = barGraphGroup.append('g')
//         .attr('transform', `translate(0, ${dataArray.length * 100})`)
//         .call(axis);



//     // MORE CIRCLES THAN DATA POINTS
//     const data = [10];

//     const secondCanvas = d3.select('#app').append('svg')
//         .attr('width', 500)
//         .attr('height', 500)

//     const circle1 = secondCanvas.append('circle')
//         .attr('cx', 50)
//         .attr('cy', 100)
//         .attr('r', 25)
//         .attr('stroke', "purple")


//     const circle2 = secondCanvas.append('circle')
//         .attr('cx', 50)
//         .attr('cy', 200)
//         .attr('r', 25)
//         .attr('stroke', "yellow")

//     const circles = secondCanvas.selectAll('circle')
//         .data(data)
//         .attr('fill', 'green')  // if num of circles === num of data points, just adding attr here would update them all, no exit or enter or anything req
//         .exit()
//             .attr('fill', 'blue')


//     // ANIMATIONS

//     const thirdCanvas = d3.select('#app').append('svg')
//         .attr('width', 500)
//         .attr('height', 500)

//     const circle3 = thirdCanvas.append('circle')
//         .attr('cx', 50)
//         .attr('cy', 50)
//         .attr('r', 25);

//     circle3.transition()
//         .duration(1500) //default is 500 (in m-secs)
//         .delay(2000)    //wait two seconds before animating
//         .attr('cx', 150)
//         .transition()
//             .attr('cy', 200)
//             .attr('fill', 'green')
//         .transition()
//             .attr('cx', 50)
//         .transition()
//             .attr('cy', 50)
//             .each('start', function () {d3.select(this).attr('fill', 'blue')})
//             .each('end', function () {d3.select(this).attr('fill', 'red')})


//     // d3's ARRAY METHODS

//     const dataArr = [10, 20, 30, 40, 50];

//     dataArr.sort(d3.descending);    // d3 has sorting funcs to pass in to native js sort()
//     d3.min(dataArr);    // returns min val in arr
//     d3.max(dataArr);    // returns max val in arr
//     d3.extent(dataArr); // returns [minVal, maxVal] of arr
//     d3.sum(dataArr);    // returns sum of arr elements (150)
//     d3.mean(dataArr);   // returns 30
//     d3.median(dataArr); // returns 30
//     //etc.
//     d3.shuffle(dataArr) // returns array of elements in random order

//     // d3 USING EXTERNAL DATA

//     // d3.csv()    // can be used same way as json below
//     d3.json("myDataFile.json", function (error, data) {
//         if (error) throw error;
//         const canvas = d3.select('#app').append('svg')
//             .attr('width', 500)
//             .attr('height', 500)

//         canvas.selectAll('rect')
//             .data(data) // references data arg
//             .enter()
//                 .append('rect')
//                 .attr('width', d => d.age * 10)
//                 .attr('height', 46)
//                 .attr('y', (d, i) => i * 50)
//                 .attr('fill', 'green')

//         canvas.selectAll('text')
//             .data(data)
//             .enter()
//                 .append('text')
//                     .attr('fill', 'white')
//                     .attr('y', (d, i) => i * 50 + 23)
//                     .text(d => d.name)
//     })
// })()

// //PATHS

// (function pathsSection () {
//     const canvas = d3.select('#app').append('svg')
//         .attr('width', 500)
//         .attr('height', 500)

//     const data = [
//         {x: 10, y: 160},
//         {x: 30, y: 40},
//         {x: 150, y: 10}
//     ]

//     const group = canvas.append('g')

//     const line = d3.svg.line()
//         .x(d => d.x)    //each x axis
//         .y(d => d.y)    //each y axis

//     group.selectAll('path')
//         .data([data]) //stores array within array so that all of the data is being passed in as just one element in the array
//         .enter()
//             .append('path')
//                 .attr('d', line)
//                 .attr('fill', 'none')
//                 .attr('stroke', '#000')
//                 .attr('stroke-width', 10)


// })()

// // ARCS AND PIE/DONUT CHART

// (function arcs () {
//     const canvas = d3.select('#app').append('svg')
//         .attr('width', 500)
//         .attr('height', 500)
    
//     const group = canvas.append('g')
//         .attr('transform', 'translate(100, 100)')
    
//     const r = 100;
//     const p = Math.PI * 2

//     const arc = d3.svg.arc()
//         .innerRadius(r - 20)    //center to inside of donut
//         .outerRadius(r)    //center to outside of donut
//         .startAngle(0)     //angle at which arc starts (measured in radians)
//         .endAngle(p - 1)     //angle at which arc ends (pi * 2 radians === a full circle)

//     group.append('path')
//         .attr('d', arc)



// })()


// // DONUT CHART
// const data = [10, 50, 80]
// const r = 300
// const color = d3.scale.ordinal()
//     .range(['red', 'blue', 'orange'])

// const canvas = d3.select('#app').append('svg')
//     .attr('width', 1500)
//     .attr('height', 1500)

// const group = canvas.append('g')
//     .attr('transform', 'translate(300, 300)')

// const arc = d3.svg.arc()        //arc path generator
//     .innerRadius(200)
//     .outerRadius(r)

// const pie = d3.layout.pie()
//     .value(d => d)

// const arcs = group.selectAll('.arc')
//     .data(pie(data))
//     .enter()
//         .append('g')
//             .attr('class', 'arc')

// arcs.append('path')
//     .attr('d', arc)
//     .attr('fill', d => color(d.data))

// arcs.append('text')
//     .attr('transform', d => `translate(${arc.centroid(d)})`)
//     .attr('text-anchor', 'middle')
//     .attr('font-size', '1.5em')
//     .text(d => d.data)


// PIE CHART
const data = [10, 50, 80]
const r = 300
const color = d3.scale.ordinal()
    .range(['red', 'blue', 'orange'])

const canvas = d3.select('#app').append('svg')
    .attr('width', 1500)
    .attr('height', 1500)

const group = canvas.append('g')
    .attr('transform', 'translate(300, 300)')

const arc = d3.svg.arc()        //arc path generator
    .innerRadius(0) //ONLY CHANGE FROM DONUT CHART
    .outerRadius(r)

const pie = d3.layout.pie()
    .value(d => d)

const arcs = group.selectAll('.arc')
    .data(pie(data))
    .enter()
        .append('g')
            .attr('class', 'arc')

arcs.append('path')
    .attr('d', arc)
    .attr('fill', d => color(d.data))

arcs.append('text')
    .attr('transform', d => `translate(${arc.centroid(d)})`)
    .attr('text-anchor', 'middle')
    .attr('font-size', '1.5em')
    .text(d => d.data)