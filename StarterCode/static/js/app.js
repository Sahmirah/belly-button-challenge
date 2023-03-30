const url = "https://2u-data-curriculum-team.s3.amazonaws.com/dataviz-classroom/v1.1/14-Interactive-Web-Visualizations/02-Homework/samples.json";

// Use a Promise
//const dataPromise = d3.json(url)
//console.log(dataPromise);



// Get the data 
let data = d3.json(url).then(function(data) {
    console.log(data);

    // Get the names
    let sampleNames = data.names;
    console.log(sampleNames);

    // Create the Dropdown Menu
    let dropdownMenu = d3.selectAll("#selDataset");
    sampleNames.forEach(function(sampleNames){dropdownMenu.append('option').text(sampleNames).property('value')});

    // Find the initial values
    let init = sampleNames[0]
    console.log(init)
    
    //Create the initial plots
    plots(init);

    // Create the initial demographics
    infoDem(init);

});
    
    // Set the function for the Dropdown Menu
    function optionChanged(init_id) {
        plots(init_id);
        infoDem(init_id);
    };

    // Create the function for plots
    function plots(init_id) {
    
        // Get the top 10 
        //Samples
        let samples = 
        data.samples.filter(top => top.id == init_id);
        console.log(samples);

        //OTU IDS
        let otu_ids = 
        samples[0].otu_ids.map(top => "OTU" + top);
        console.log(otu_ids);

        //Sample Values 
        let sample_values = 
        samples[0].sample_values;
        console.log(sample_values);

        //OTU Labels
        let otu_labels = samples[0].otu_labels;
        console.log(otu_labels);

        // Find the top 10 OTU IDS
        let top_otu_ids = 
        samples[0].otu_ids.slice(0,10).reverse().map()
        (top => "OTU" + top);
        console.log(top_otu_ids);

        // Find the top 10 sample values 
        let top_sample_values = 
        samples[0].sample_values.slice(0,10).reverse();
        console.log(top_sample_values);

        // Find the top 10 OTU Labels 
        let top_otu_labels = 
        samples[0].otu_labels.slice(0,10).reverse();
        console.log(top_otu_labels);

        // Get Handwashing data
        let wash_freq = 
        data.metadata.filter
        (top => top.id == init_id)[0].wfreq;
        console.log(wash_freq);

        // Create Bar Graph
        let barChart = {
            x: top_sample_values,
            y: top_otu_ids,
            text: top_otu_labels,
            name: "OTU",
            type: "bar",
            orientation: "h"
        };
        // Choose a new name for Bar
        let barData = [barChart];

        let barlayout = {
            title: "Top 10 OTU IDs",
        };

        //Plot horizontal bar graph
        Plotly.newPlot("bar", barData, barlayout);

         // Create the Bubble Chart
        let bubbleChart = {
            x: samples[0].otu_ids,
            y: samples[0].sample_values, 
            text: samples[0].otu_labels,
            mode: "markers",
            marker: {
                size: samples[0].sample_values, 
                color: samples[0].otu_ids,
                colorscale: "Earth"
            } 
        };

        console.log(bubbleChart);

        // Define the layout for the bubble chart
        let bubbleLayout = {
            xaxis: {title: "OTU ID", automargin: true},
            yaxis: {automargin: true},
            hovermode: "closest"
        };
        console.log(bubbleLayout);

        // Plot the bubble Chart
        Plotly.newPlot("bubble", bubbleChart, 
        bubbleLayout, {responsive: true}); 


    };
    

// Create the demographic Information
function infoDem(init_id) {
    // Get the data  
    //d3.json(url).then(function(data) {
    
        // Get the metadata
    let demoData = data.metadata.filter(top => top.id == init_id);

    // Get demoraphic Info
    let demoInfo = d3.selectAll("#sample-metadata");

    demoInfo.html("");

    demoInfo.append("p").text("id: " + init_id),
    demoInfo.append("p").text('ethnicity: ' + demoData[0].ethnicity),
    demoInfo.append("p").text('gender: ' + demoData[0].gender),
    demoInfo.append("p").text('age: ' + demoData[0].age),
    demoInfo.append("p").text('location: ' + demoData[0].location),
    demoInfo.append("p").text('bbtype: ' + demoData[0].bbtype),
    demoInfo.append("p").text('wfreq: ' + demoData[0].wfreq)
};