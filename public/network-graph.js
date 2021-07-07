let pages = {
    nodes: [
        {id: "Antoine"},
        {id: "Belle"},
        {id: "Charles"},
        {id: "Dawn"},
        {id: "Emil"},
        {id: "Frances"}
      ],

    edges: [
    {from: "Antoine", to: "Belle"},
    {from: "Antoine", to: "Charles"},
    {from: "Antoine", to: "Emil"},

    {from: "Belle", to: "Antoine"},
    {from: "Belle", to: "Charles"},

    {from: "Charles",   to: "Antoine"},
    {from: "Charles",   to: "Belle"},
    {from: "Charles",   to: "Dawn"},

    {from: "Dawn",   to: "Emil"},
    {from: "Dawn",   to: "Frances"},

    {from: "Emil",    to: "Antoine"},
    {from: "Emil",    to: "Dawn"},

    {from: "Frances",   to: "Dawn"}
    ],
};


const canvas = document.getElementById("network-graph-canvas");

let chart = anychart.graph(pages);

chart.container("network-graph-canvas");


chart.nodes().labels().enabled(true);
 
// configure the labels of nodes
chart.nodes().labels().format(`{%id}`);
chart.nodes().labels().fontSize(12);
chart.nodes().labels().fontWeight(600);

chart.draw();
