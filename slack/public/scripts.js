const username = prompt("What's your username?");
// const socket = io("http://localhost:9000"); // / namespace
const socket = io("http://localhost:9000", {
    query: {
        username
    }
}); // / namespace
let nsSocket = "";

// listen for nsList for all the namespace list
socket.on("nsList", nsList => {
    const namespacesDiv = document.querySelector(".namespaces");
    namespacesDiv.innerHTML = "";
    nsList.forEach(ns => {
        namespacesDiv.innerHTML += `<div class="namespace" ns="${ns.endpoint}"><img src="${ns.img}"></div>`;
    });

    Array.from(document.getElementsByClassName("namespace")).forEach(elem => {
        elem.addEventListener("click", ev => {
            const nsEndpoint = elem.getAttribute("ns");
            console.log(`${nsEndpoint} is where we go.`);
            joinNS(nsEndpoint);
        });
    });

    joinNS("/wiki");
});
