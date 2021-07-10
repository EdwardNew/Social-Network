//creating graph data (Hardcoded, which isn't preferred, but it can be for this specific use case)
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
        /* {id: "B-A", group: "ghost", x: 168.5, y: -22},
        {id: "C-A", group: "ghost", x: 215, y: 115.5},
        {id: "C-B", group: "ghost", x: 514.5, y: 33},
        {id: "E-A", group: "ghost", x: 8, y: 136}, 
        {id: "E-D", group: "ghost", x: 144, y: 197},
        {id: "F-D", group: "ghost", x: 511, y: 204}  */
      ],

    edges: [
        //displayFrom and displayTo properties are custom for accurate tooltip displays
        //not the most elegant solution, but it's the one that works :/
        /* {from: "Antoine", to: "Belle", displayFrom: "Antoine", displayTo: "Belle"},
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
        {from: "F-D",    to: "Dawn", displayFrom: "Frances", displayTo: "Dawn"} */
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

//these variables use storage to make numVisits only increases when visiting a different page (not on page reload)
//when previousPage = currentPage, that means the page is just being reloaded
//pulling previous page url from session storage
let previousPage = window.sessionStorage.getItem("currentPage");
previousPage = revertData(previousPage);
//updating current page url
let currentPage = pageTitle;
//updating/pushing current page url to storage for next page
window.sessionStorage.setItem("currentPage", convertData(currentPage));


//function that checks if a webpage's node object is already in storage and adds 1 to numVisits if it is and adds the node object to storage if it isn't
const checkNodes = () => {
    //declare and initialize the count variable here so it has a larger scope and can be used in a condition
    let count = 0;
    //runs through each existing element in storage to check if the nodes array is already there
    for(let i=0; i<window.sessionStorage.length; i++){
        const key = window.sessionStorage.key(i);
        if(key === "nodes"){
            count++;
        }
    }
    if(!count){
        //create an empty nodes array in storage to hold all of the nodes
        window.sessionStorage.setItem("nodes", convertData({}));
    }

    //getting reference to the nodes array from storage
    let nodes = window.sessionStorage.getItem("nodes");
    //reverting nodes back into a js array from a JSON string
    nodes = revertData(nodes);

    //runs through each existing element in the nodes array to check if the object is already there
    for(node in nodes){
        if(pageTitle.includes(node)){

            //update numVisits for specific object
            nodes[node].numVisits++;

            //push data back to storage
            window.sessionStorage.setItem("nodes", convertData(nodes));
            return;
        }
    }

    //if the object for the visited page does not yet exist, add the specific page to the nodes object
    switch(pageTitle){
        case "Antoine's Page":
            nodes.Antoine = 
                {id: "Antoine",
                    group: "standard",
                    numVisits: 1,
                    x: -50,
                    y: 20,
                    fill: {
                        src: "assets/download (1).png"
                    }
                };
            break;
        case "Belle's Page":
            nodes.Belle = 
                {id: "Belle",
                    group: "standard",
                    numVisits: 1,
                    x: 381,
                    y: 13.5,
                    fill: {
                        src: "assets/download (1).png"
                    }
                };
            break;
        case "Charles' Page":
            nodes.Charles = 
                {id: "Charles",
                    group: "standard",
                    numVisits: 1,
                    x: 560,
                    y: 120,
                    fill: {
                        src: "assets/download (1).png"
                    }
                };
            break;
        case "Dawn's Page":
            nodes.Dawn = 
                {id: "Dawn",
                    group: "standard",
                    numVisits: 1,
                    x: 328.5,
                    y: 238.5,
                    fill: {
                        src: "assets/download (1).png"
                    }
                };
            break;
        case "Emil's Page":
            nodes.Emil = 
                {id: "Emil",
                    group: "standard",
                    numVisits: 1,
                    x: -44,
                    y: 243.5,
                    fill: {
                        src: "assets/download (1).png"
                    }
                };
            break;
        case "Frances' Page":
            nodes.Frances = 
            {id: "Frances",
                group: "standard",
                numVisits: 1,
                x: 687.5,
                y: 232.5,
                fill: {
                    src: "assets/download (1).png"
                }
            };
        break;
    }

    //push the updated nodes array back into storage
    window.sessionStorage.setItem("nodes", convertData(nodes));
}

const checkEdges = () => {
    //declare and initialize the count variable here so it has a larger scope and can be used in a condition
    let count = 0;
    //runs through each existing element in storage to check if the edges array is already there
    for(let i=0; i<window.sessionStorage.length; i++){
        const key = window.sessionStorage.key(i);
        if(key === "edges"){
            count++;
        }
    }
    if(!count){
        //create an empty edges array in storage to hold all of the edges
        window.sessionStorage.setItem("edges", convertData({}));
    }

    //getting reference to the nodes and edges arrays from storage
    let nodes = window.sessionStorage.getItem("nodes");
    let edges = window.sessionStorage.getItem("edges");
    //reverting nodes and edges back into a js array from a JSON string
    nodes = revertData(nodes);
    edges = revertData(edges);

    if(previousPage == "Antoine's Page"){
        switch (currentPage) {
            case "Belle's Page":
                edges.AB = {from: "Antoine", to: "Belle", displayFrom: "Antoine", displayTo: "Belle"};
                break;
            case "Charles' Page":
                edges.AC = {from: "Antoine", to: "Charles", displayFrom: "Antoine", displayTo: "Charles"};
                break;
            case "Emil's Page":
                edges.AE = {from: "Antoine", to: "Emil", displayFrom: "Antoine", displayTo: "Emil"};
                break;
        }
    }
    if(previousPage == "Belle's Page"){
        switch (currentPage) {
            case "Antoine's Page":
                edges.BA = [{from: "Belle", to: "B-A", displayFrom: "Belle", displayTo: "Antoine"},
                {from: "B-A", to: "Antoine", displayFrom: "Belle", displayTo: "Antoine"}];

                //inserting the ghost node into storage
                nodes.BA = {id: "B-A", group: "ghost", x: 168.5, y: -22};
                break;
            case "Charles' Page":
                edges.BC = {from: "Belle", to: "Charles", displayFrom: "Belle", displayTo: "Charles"};
                break;
        }
    }
    if(previousPage == "Charles' Page"){
        switch (currentPage) {
            case "Antoine's Page":
                edges.CA = [{from: "Charles",   to: "C-A", displayFrom: "Charles", displayTo: "Antoine"},
                {from: "C-A", to: "Antoine", displayFrom: "Charles", displayTo: "Antoine"}];
                
                nodes.CA = {id: "C-A", group: "ghost", x: 215, y: 115.5};
                break;
            case "Belle's Page":
                edges.CB = [{from: "Charles",   to: "C-B", displayFrom: "Charles", displayTo: "Belle"},
                {from: "C-B", to: "Belle", displayFrom: "Charles", displayTo: "Belle"}];

                nodes.CB = {id: "C-B", group: "ghost", x: 514.5, y: 33};
                break;
            case "Dawn's Page":
                edges.CD = {from: "Charles", to: "Dawn", displayFrom: "Charles", displayTo: "Dawn"};
                break;
        }
    }
    if(previousPage == "Dawn's Page"){
        switch (currentPage) {
            case "Emil's Page":
                edges.DE = {from: "Dawn", to: "Emil", displayFrom: "Dawn", displayTo: "Emil"};
                break;
            case "Frances' Page":
                edges.DF = {from: "Dawn", to: "Frances", displayFrom: "Dawn", displayTo: "Frances"};
                break;
        }
    }
    if(previousPage == "Emil's Page"){
        switch (currentPage) {
            case "Antoine's Page":
                edges.EA = [{from: "Emil", to: "E-A", displayFrom: "Emil", displayTo: "Antoine"},
                {from: "E-A", to: "Antoine", displayFrom: "Emil", displayTo: "Antoine"}];

                nodes.EA = {id: "E-A", group: "ghost", x: 8, y: 136};
                break;
            case "Dawn's Page":
                edges.ED = [{from: "Emil", to: "E-D", displayFrom: "Emil", displayTo: "Dawn"},
                {from: "E-D", to: "Dawn", displayFrom: "Emil", displayTo: "Antoine"}];

                nodes.ED = {id: "E-D", group: "ghost", x: 144, y: 197};
                break;
        }
    }
    if(previousPage == "Frances' Page"){
        switch (currentPage) {
            case "Dawn's Page":
                edges.FD = [{from: "Frances", to: "F-D", displayFrom: "Frances", displayTo: "Dawn"},
                {from: "F-D", to: "Dawn", displayFrom: "Frances", displayTo: "Dawn"}];

                nodes.FD = {id: "F-D", group: "ghost", x: 511, y: 204};
                break;
        }
    }

    //push the updated nodes and edges arrays back into storage
    window.sessionStorage.setItem("nodes", convertData(nodes));
    window.sessionStorage.setItem("edges", convertData(edges));
}

//function that iterates through the values in storage and adds them to the nodes array in the pages object so anychart can graph it
const updateNodes = () => {
    //getting the edges object from storage
    let storedNodes = window.sessionStorage.getItem("nodes");

    //reverting the JSON string back to a js object
    storedNodes = revertData(storedNodes);

    //iterates through each property in the edges object
    for(storedNode in storedNodes){
            //updates/pushes the contents of each property to the local pages.edges array
            pages.nodes.push(storedNodes[storedNode]);
    }
}

//function that iterates through each property in the edge object in storage and updates the local graph edges array 
const updateEdges = () => {
    //getting the edges object from storage
    let storedEdges = window.sessionStorage.getItem("edges");

    //reverting the JSON string back to a js object
    storedEdges = revertData(storedEdges);

    //iterates through each property in the edges object
    for(storedEdge in storedEdges){
        //checks if the property contains an array
        if(Array.isArray(storedEdges[storedEdge])){
            //if there is an array, it means this is a duplicate branch that uses a ghost node.
            for(let i=0; i<storedEdges[storedEdge].length; i++){
                //updates/pushes each element/object within the array to the local pages.edges array
                pages.edges.push((storedEdges[storedEdge])[i]);
            }
        }
        //if there isn't an array, just push the single object in the property
        else{
            //updates/pushes the contents of each property to the local pages.edges array
            pages.edges.push(storedEdges[storedEdge]);
        }
    }
}

//Triggers only when url changes, so the numVisits doens't update everytime the page reloads
if(currentPage !== previousPage){
    checkNodes();
    checkEdges();
}

updateNodes();
updateEdges();




//creating the graph and passing in the data
let chart = anychart.graph(pages);

//getting DOM reference to the canvas div and placing the graph into it
const canvas = document.getElementById("network-graph-canvas");
chart.container("network-graph-canvas");

//setting the chart layout to fixed so we can specify starting locations for each node
chart.layout().type("fixed");

//funtion that checks if the updated local nodes array contains certain group nodes
const styleNodes = () => {
    //iterates through every node in the nodes array
    for(let i=0; i<pages.nodes.length; i++){
        if(pages.nodes[i].group == "standard"){
            //styling non-ghost nodes to be rectangles
            const nodes = chart.group("standard");
            nodes.normal().shape("rectangle");
            nodes.normal().height(70);
            nodes.normal().width(80);
        }
        if(pages.nodes[i].group == "ghost"){
            //styling Ghost nodes to be invisible
            const ghostNodes = chart.group("ghost");
            ghostNodes.normal().height(0);
            ghostNodes.normal().labels().enabled(false);
        }
    }
}

styleNodes();

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