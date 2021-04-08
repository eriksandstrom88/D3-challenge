// @TODO: YOUR CODE HERE!
var svgWidth = 900;
var svgHeight = 500;
var margin = {top:20, right:20, bottom:40, left:40};
var width = svgWidth-margin.left-margin.right;
var height = svgHeight-margin.top-margin.bottom;
var svg=d3.select("#scatter")
            .append("svg")
            .attr("width", svgWidth)
            .attr("height", svgHeight);
var chartGroup = svg.append("g")
                    .attr("transform",`translate(${margin.left}, ${margin.top})`);

var chosenXAxis = "income";
var chosenYAxis = "obesity";
// function xScale(healthData, chosenXAxis) {
//     var xLinearScale = d3.scaleLinear().domain([d3.min(healthData, d=>d[chosenXAxis])*}
d3.csv("data/data.csv").then(function(stateData) {
    // console.log(stateData);
    var state_abbrs=stateData.map(data=>data.abbr);
    var incomes=stateData.map(data=>data.income);
    var obesity=stateData.map(data=>data.obesity);
    // var o_v_i=stateData.map(data=>data.income:data.obesity)
    console.log(state_abbrs);
    // console.log(incomes);
    // console.log(obesity);
    var xLinearScale=d3.scaleLinear().domain([d3.min(incomes)-1000,d3.max(incomes)]).range([0,width]);
    var yLinearScale=d3.scaleLinear().domain([d3.min(obesity)-1,d3.max(obesity)+1]).range([height,0]);
    var leftAxis=d3.axisLeft(yLinearScale);
    var bottomAxis=d3.axisBottom(xLinearScale);
    chartGroup.append("g").attr("transform",`translate(0,${height})`).call(bottomAxis);
    chartGroup.append("g").call(leftAxis);
    chartGroup.selectAll("circle")
        .data(stateData)
        .enter()
        .append("circle")
        .attr("cx",d => xLinearScale(d.income))//function(d) {return +d.income})
        .attr("cy",d => yLinearScale(d.obesity))//function(d) {return +d.obesity})
        .attr("r","10")
        .attr("fill","lightblue")
        .text(d=>d.abbr);
    chartGroup.selectAll("text")
        .data(stateData)
        .enter()
        .append("text")
        .text(d=>d.abbr)
        .attr("x",d => xLinearScale(d.income)-5)
        .attr("y",d => yLinearScale(d.obesity)+3)
        .attr("font_family", "sans_serif")
        .attr("font-size","8px")
        .attr("fill","black");
        // var abbrs = d => 
}).catch(function(error) {console.log(error)});//closes d3.csv
// var abbrs=d=>