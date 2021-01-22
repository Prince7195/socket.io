function joinRoom(roomName) {
    console.log(roomName);
    // send this room name to server
    nsSocket.emit("joinRoom", roomName, newNumOfMembers => {
        // we have to update the room number total now that we have joined
        document.querySelector(".curr-room-num-users").innerHTML = `${newNumOfMembers} <span class="glyphicon glyphicon-user"></span>`;
    });

    nsSocket.on("historyCatchUp", (history = []) => {
        // console.log(history);
        const messagesUl = document.querySelector("#messages");
        messagesUl.innerHTML = "";
        history.forEach(msg => {
            const newMsg = buildHTML(msg);
            const currentMsg = messagesUl.innerHTML;
            messagesUl.innerHTML = currentMsg + newMsg;
        });
        messagesUl.scrollTo(0, messagesUl.scrollHeight);
    });

    nsSocket.on("updateMembers", numMembers => {
        document.querySelector(".curr-room-num-users").innerHTML = `${numMembers} <span class="glyphicon glyphicon-user"></span>`;
        document.querySelector(".curr-room-text").innerText = roomName;
    });

    const searchBox = document.querySelector("#search-box");
    searchBox.addEventListener("input", event => {
        const messages = Array.from(document.getElementsByClassName("message-text"));
        messages.forEach(msg => {
            if (msg.innerText.toLowerCase().indexOf(event.target.value.toLowerCase()) === -1) {
                msg.style.display = "none";
            } else {
                msg.style.display = "block";
            }
        })
    });
}
