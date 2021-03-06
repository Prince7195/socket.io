const socket = io("http://localhost:9000"); // / namespace
const socketAdmin = io("http://localhost:9000/admin"); // /admin namespace

socketAdmin.on("welcome", (msg) => {
    console.log(msg);
});

socket.on("messageFromServer", data => {
    console.log(data);
    socket.emit("messageToServer", { data: "This is from client!" });
});
document.querySelector("#message-form").addEventListener("submit", event => {
    event.preventDefault();
    const text = document.querySelector("#user-message").value;
    socket.emit("newMessageToServer", { text });
});
