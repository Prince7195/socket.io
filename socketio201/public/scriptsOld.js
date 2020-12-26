const socket = io("http://localhost:9000"); // / namespace
const socketAdmin = io("http://localhost:9000/admin"); // /admin namespace

socket.on("connect", () => {
    console.log(socket.id);
});

socketAdmin.on("connect", () => {
    console.log(socketAdmin.id);
});

socket.on("welcome", (msg) => {
    console.log(msg);
});

socketAdmin.on("welcome", (msg) => {
    console.log(msg);
});

socket.on("messageFromServer", data => {
    socket.emit("messageToServer", { data: "This is from client!" });
});
document.querySelector("#message-form").addEventListener("submit", event => {
    event.preventDefault();
    const text = document.querySelector("#user-message").value;
    socket.emit("newMessageToServer", { text });
});
socket.on("messageToClients", msg => {
    console.log(msg);
    document.querySelector("#messages").innerHTML += `<li>${msg.text}</li>`;
});