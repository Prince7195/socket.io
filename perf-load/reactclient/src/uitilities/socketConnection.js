import io from "socket.io-client";

const socket = io.connect("http://localhost:8181");

socket.on("connect", () => {
    // client auth with single key value
    socket.emit("clientAuth", "nsv3neiwmi39mcmsodmclsfo84nvkjldnve");
});
export default socket;
