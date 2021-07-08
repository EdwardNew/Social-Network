//creating graph data (Hardcoded, which isn't preffered, but it can be for this specific use case)
let pages = {
    nodes: [
        {id: "Antoine",
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
        },

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
        {from: "Antoine", to: "Belle"},
        {from: "Antoine", to: "Charles"},
        {from: "Antoine", to: "Emil"},

        
        {from: "Belle", to: "Antoine"},
        {from: "Belle", to: "Charles"},
        {from: "Belle",   to: "B-A"},
        {from: "B-A", to: "Antoine"},

        {from: "Charles",   to: "Antoine"},
        {from: "Charles",   to: "Belle"},
        {from: "Charles",   to: "Dawn"},
        {from: "Charles",   to: "C-A"},
        {from: "C-A",   to: "Antoine"},
        {from: "Charles",   to: "C-B"},
        {from: "C-B",   to: "Belle"},        

        {from: "Dawn",   to: "Emil"},
        {from: "Dawn",   to: "Frances"},

        {from: "Emil",    to: "Antoine"},
        {from: "Emil",    to: "Dawn"},
        {from: "Emil",    to: "E-A"},
        {from: "E-A",    to: "Antoine"},
        {from: "Emil",    to: "E-D"},
        {from: "E-D",    to: "Dawn"},

        {from: "Frances",   to: "Dawn"},
        {from: "Frances",    to: "F-D"},
        {from: "F-D",    to: "Dawn"}
    ],
};

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

//adding arrows to each edge
chart.edges().arrows({
    enabled: true,
    size: 10,
    position: '50%'
  });

  
chart.draw();
