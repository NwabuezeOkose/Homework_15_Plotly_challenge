function getPlots(id) {
    // To read the samples.json file
    d3.json("samples.json").then(sampleData => {
        console.log(sampleData)
        var ids = sampleData.samples[0].otu_ids;
        console.log(ids)
        var sampleValues = sampleData.samples[0].sample_values.slice(0, 10).reverse();
        console.log(sampleValues)
        var labels = sampleData.samples[0].otu_labels.slice(0, 10);
        console.log(labels)

        //to get the top 10 otu_ids
        var OTU_top = (sampleData.samples[0].otu_ids.slice(0, 10)).reverse();

        var OTU_id = OTU_top.map(d => "OTU" + d);
        console.log(`OTU IDS: ${OTU_id}`)

        var labels = sampleData.samples[0].otu_labels.slice(0, 10);
        console.log(`OTU_labels: ${labels}`)
        var trace = {
            x: sampleValues,
            y: OTU_id,
            text: labels,
            marker: {
                color: 'blue'
            },
            type: "bar",
            orientation: "h",
        };

        //The trace variable
        var data = [trace];

        var layout = {
            title: "Top 10 OTU",
            yaxis:{
                tickmode:"linear",
            },
            margin: {
                l: 100,
                r: 100,
                t: 100,
                b: 30,
            }
        };

    //The following code will be for the plots
    Plotly.newPlot("bar1", data, layout);
        var trace1 = {
            x: sampleData.samples[0].otu_ids,
            y: sampleData.samples[0].sample_values,
            mode: "markers",
            marker: {
                size: sampleData.samples[0].sample_values,
                color: sampleData.samples[0].otu_ids
            },
            text: sampleData.samples[0].otu_labels

        };

        var layout_2 = {
            xaxis: {title: "OTU ID"},
            height: 600,
            width: 1000
        };

        var data1 = [trace1];

    Plotly.newPlot("bubble", data1, layout_2);

    });
}

// To create the function to get necessary dats

function getInfo(id) {
    //then to read the json file to get the data from there
    d3.json("samples.json").then((data) => {

        var metadata = data.metadata;

        console.log(metadata)


        var result = metadata.filter(meta => meta.id.toString() === id)[0];
        
        var demoGraphicInfo = d3.select("#sample-metadata");

        demoGraphicInfo.html(" ");

        Object.entries(result).forEach((key) => {
            demoGraphicInfo.append('h5').text(key[0].toUpperCase() + ": " + key[1] + "\n")
        });
    });
}

function changedOption(id) {
    getPlots(id);
    getInfo(id);
}


function init() {

    var dropdown = d3.select("#selDataset");
    
    //this is to read the data
    d3.json("samples.json").then((data) => {
        console.log(data)

        //this is to get the data for the id to the dropdown
        data.names.forEach(function(name){
            dropdown.append("option").text(name).property("value");
        });

        getPlots(data.names[0]);
        getInfo(data.names[0]);
    })
}

init();