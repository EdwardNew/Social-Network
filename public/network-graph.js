//creating graph data (Hardcoded, which isn't preffered, but it can be for this specific use case)
let pages = {
    nodes: [
        /* {id: "Antoine",
            group: "standard",
            numVisits: 0,
            x: -50,
            y: 20,
            fill: {
                src: "assets/download (1).png"
            }
        },
        {id: "Belle",
            group: "standard",
            numVisits: 0,
            x: 381,
            y: 13.5,
            fill: {
                src: "assets/download (1).png"
            }
        },
        {id: "Charles",
            group: "standard",
            numVisits: 0,
            x: 560,
            y: 120,
            fill: {
                src: "assets/download (1).png"
            }
        },
        {id: "Dawn",
            group: "standard",
            numVisits: 0,
            x: 328.5,
            y: 238.5,
            fill: {
                src: "assets/download (1).png"
            }
        },
        {id: "Emil",
            group: "standard",
            numVisits: 0,
            x: -44,
            y: 243.5,
            fill: {
                src: "assets/download (1).png"
            }
        }, 
        {id: "Frances",
            group: "standard",
            numVisits: 0,
            x: 687.5,
            y: 232.5,
            fill: {
                src: "assets/download (1).png"
            }
        },*/

        //duplicate ghost noddes
        //we need these because anychart doesn't support duplicate references
        {id: "B-A", group: "ghost", x: 168.5, y: -22},
        {id: "C-A", group: "ghost", x: 215, y: 115.5},
        {id: "C-B", group: "ghost", x: 514.5, y: 33},
        {id: "E-A", group: "ghost", x: 8, y: 136}, 
        {id: "E-D", group: "ghost", x: 144, y: 197},
        {id: "F-D", group: "ghost", x: 511, y: 204} 
      ],

    edges: [
        //displayFrom and displayTo properties are custom for accurate tooltip displays
        //not the most elegant solution, but it's the one that works :/
        {from: "Antoine", to: "Belle", displayFrom: "Antoine", displayTo: "Belle"},
        {from: "Antoine", to: "Charles", displayFrom: "Antoine", displayTo: "Charles"},
        {from: "Antoine", to: "Emil", displayFrom: "Antoine", displayTo: "Emil"},

        
        {from: "Belle", to: "Antoine", displayFrom: "Belle", displayTo: "Antoine"},
        {from: "Belle", to: "Charles", displayFrom: "Belle", displayTo: "Charles"},
        {from: "Belle",   to: "B-A", displayFrom: "Belle", displayTo: "Antoine"},
        {from: "B-A", to: "Antoine", displayFrom: "Belle", displayTo: "Antoine"},

        {from: "Charles",   to: "Antoine", displayFrom: "Charles", displayTo: "Antoine"},
        {from: "Charles",   to: "Belle", displayFrom: "Charles", displayTo: "Belle"},
        {from: "Charles",   to: "Dawn", displayFrom: "Charles", displayTo: "Dawn"},
        {from: "Charles",   to: "C-A", displayFrom: "Charles", displayTo: "Antoine"},
        {from: "C-A",   to: "Antoine", displayFrom: "Charles", displayTo: "Antoine"},
        {from: "Charles",   to: "C-B", displayFrom: "Charles", displayTo: "Belle"},
        {from: "C-B",   to: "Belle", displayFrom: "Charles", displayTo: "Belle"},        

        {from: "Dawn",   to: "Emil", displayFrom: "Dawn", displayTo: "Emil"},
        {from: "Dawn",   to: "Frances", displayFrom: "Dawn", displayTo: "Frances"},

        {from: "Emil",    to: "Antoine", displayFrom: "Emil", displayTo: "Antoine"},
        {from: "Emil",    to: "Dawn", displayFrom: "Emil", displayTo: "Dawn"},
        {from: "Emil",    to: "E-A", displayFrom: "Emil", displayTo: "Antoine"},
        {from: "E-A",    to: "Antoine", displayFrom: "Emil", displayTo: "Antoine"},
        {from: "Emil",    to: "E-D", displayFrom: "Emil", displayTo: "Dawn"},
        {from: "E-D",    to: "Dawn", displayFrom: "Emil", displayTo: "Antoine"},

        {from: "Frances",   to: "Dawn", displayFrom: "Frances", displayTo: "Dawn"},
        {from: "Frances",    to: "F-D", displayFrom: "Frances", displayTo: "Dawn"},
        {from: "F-D",    to: "Dawn", displayFrom: "Frances", displayTo: "Dawn"}
    ],
};

//get reference to current page title
const pageTitle = document.querySelector("title").innerHTML;

//function to convert objects into JSON strings for session storage
const convertData = object => {
    string = JSON.stringify(object);
    return string;
}

//function to convert JSON strings from session storage back to objects
const revertData = string => {
    object = JSON.parse(string);
    return object;
}

//function that checks if a webpage's graph object is already in storage and adds 1 to numVisits if it is and adds the graph object to strage if it isn't
const checkStorage = page => {
    //runs through each existing element in storage to check if the object is already there
    for(let i=0; i<window.sessionStorage.length; i++){
        const key = window.sessionStorage.key(i);
        if(pageTitle.includes(key)){
            //get data from storage
            let dataObj = revertData(window.sessionStorage.getItem(key));

            //update numVisits for specific object
            dataObj.numVisits++;

            //push data back to storage
            window.sessionStorage.setItem(key, convertData(dataObj));
            return;
        }
    }
    //if the object does for the visited page does not yet exist, add the specific page to storage
    switch(pageTitle){
        case "Antoine's Page":
            window.sessionStorage.setItem("Antoine", convertData(
                {id: "Antoine",
                    group: "standard",
                    numVisits: 1,
                    x: -50,
                    y: 20,
                    fill: {
                        src: "assets/download (1).png"
                    }
                }
            ));
            break;
        case "Belle's Page":
            window.sessionStorage.setItem("Belle", convertData(
                {id: "Belle",
                    group: "standard",
                    numVisits: 1,
                    x: 381,
                    y: 13.5,
                    fill: {
                        src: "assets/download (1).png"
                    }
                }
            ));
            break;
        case "Charles' Page":
            window.sessionStorage.setItem("Charles", convertData(
                {id: "Charles",
                    group: "standard",
                    numVisits: 1,
                    x: 560,
                    y: 120,
                    fill: {
                        src: "assets/download (1).png"
                    }
                }
            ));
            break;
        case "Dawn's Page":
            window.sessionStorage.setItem("Dawn", convertData(
                {id: "Dawn",
                    group: "standard",
                    numVisits: 1,
                    x: 328.5,
                    y: 238.5,
                    fill: {
                        src: "assets/download (1).png"
                    }
                }
            ));
            break;
        case "Emil's Page":
            window.sessionStorage.setItem("Emil", convertData(
                {id: "Emil",
                    group: "standard",
                    numVisits: 1,
                    x: -44,
                    y: 243.5,
                    fill: {
                        src: "assets/download (1).png"
                    }
                }
            ));
            break;
        case "Frances' Page":
        window.sessionStorage.setItem("Frances", convertData(
            {id: "Frances",
                group: "standard",
                numVisits: 1,
                x: 687.5,
                y: 232.5,
                fill: {
                    src: "assets/download (1).png"
                }
            }
        ));
        break;
    }
}

//*******!!!!!!make sure to wrap this in an if to trigger only when url changes, so the numVisits doens't update everytime you reload!!!!******
checkStorage(pageTitle);


//function that iterates through the values in storage and adds them to the nodes array in the pages object so anychart can graph it
const updateGraph = () => {
    //runs through each existing element in storage and adds it to the nodes array
    for(let i=0; i<window.sessionStorage.length; i++){
        const key = window.sessionStorage.key(i);
        //get data from storage
        let dataObj = revertData(window.sessionStorage.getItem(key));
        
        //adds object to nodes array to graph
        pages.nodes.push(dataObj);
    }
}

updateGraph();







//creating the graph and passing in the data
let chart = anychart.graph(pages);

//getting DOM reference to the canvas div and placing the graph into it
const canvas = document.getElementById("network-graph-canvas");
chart.container("network-graph-canvas");

//setting the chart layout to fixed so we can specify starting locations for each node
chart.layout().type("fixed");


//styling Ghost nodes to be invisible
const ghostNodes = chart.group("ghost");
ghostNodes.normal().height(0);
ghostNodes.normal().labels().enabled(false);

//styling non-ghost nodes to be rectangles
const nodes = chart.group("standard");
nodes.normal().shape("rectangle");
nodes.normal().height(70);
nodes.normal().width(80);

//configure the node labels
chart.nodes().labels().enabled(true);
chart.nodes().labels().format(`{%id}: {%numVisits}`);
chart.nodes().labels().fontSize(12);
chart.nodes().labels().fontWeight(600);

//configure duplicate edge labels
chart.edges().tooltip().useHtml(true);
chart.edges().tooltip().format("From: {%displayFrom} </br> To: {%displayTo}");

//adding arrows to each edge
chart.edges().arrows({
    enabled: true,
    size: 10,
    position: '50%'
  });

  
chart.draw();