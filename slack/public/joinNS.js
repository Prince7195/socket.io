function joinNS(endpoint) {
    if (nsSocket) {
        // check to see if nsSocket is actually a socket
        nsSocket.close();
        // remove the eventlisteners before its added
        document.querySelector(".message-form").removeEventListener("submit", formSubmission);
    }
    nsSocket = io(`http://localhost:9000${endpoint}`);

    // getting selected namesapce rooms
    nsSocket.on("nsRoomsList", nsRooms => {
        const roomsList = document.querySelector(".room-list");
        roomsList.innerHTML = "";
        nsRooms.forEach(room => {
            roomsList.innerHTML += `
            <li class="room">
                <span class="glyphicon glyphicon-${room.privateRoom ? "lock" : "globe"}"></span>
                ${room.roomTitle}
            </li>
            `;
        });

        // add click listeners to the rooms
        const roomNodes = document.getElementsByClassName("room");
        Array.from(roomNodes).forEach(elem => {
            elem.addEventListener("click", ev => {
                // console.log("Clicked " + ev.target.innerText);
                joinRoom(ev.target.innerText.trim());
            });
        });

        // add room automatically for the first time here
        const topRoom = document.querySelector(".room");
        const topRoomName = topRoom.innerText.trim();
        joinRoom(topRoomName);
    });

    nsSocket.on("messageToClients", msg => {
        console.log(msg);
        document.querySelector("#messages").innerHTML += buildHTML(msg);
    });

    document.querySelector(".message-form").addEventListener("submit", formSubmission);
}

function formSubmission(event) {
    event.preventDefault();
    const newMessage = document.querySelector("#user-message").value;
    nsSocket.emit("newMessageToServer", { text: newMessage });
}

function buildHTML(msg) {
    return `
        <li>
            <div class="user-image">
                <img src="${msg.avatar}" />
            </div>
            <div class="user-message">
                <div class="user-name-time">${msg.username} <span>${new Date(msg.time).toLocaleString()}</span></div>
                <div class="message-text">${msg.text}</div>
            </div>
        </li>
    `;
}
