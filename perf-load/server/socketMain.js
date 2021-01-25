const DB = require("./mongoDB");
const db = new DB();

function socketMain(io,socket) {
    // console.log("Some one called me, Im in socketMain!");
    let macA;
    socket.on("clientAuth", key => {
        if (key === "sf43fn93mfncnwxmd9cnv8nvedvhdn3") {
            // valid nodeClient
            socket.join("clients");
        } else if (key === "nsv3neiwmi39mcmsodmclsfo84nvkjldnve") {
            // valid UI client has joined
            socket.join("ui");
            console.log("react client has joined!");
            // db.find().then(res => {
            //     console.log("res---", res);
            //     if (res.length > 0) {
            //         io.to("ui").emit("data", res);
            //     }
            // });
        } else {
            // invalid client has joined, Goodbye
            socket.disconnet(true);
        }
    });

    socket.on("disconnect", () => {
        db.findAll(macA).then((data) => {
            if (data.length > 0) {
                data[0].isActive = false;
                io.to("ui").emit("data", data);
            }
        });
    });

    socket.on("initPerfData", async (data) => {
        // update out socket scoped variable
        macA = data.macA;
        const response = await checkAndAdd(data);
        console.log(response);
    });

    socket.on("perfData", data => {
        // console.log("data---", data);
        io.to("ui").emit("data", data);
    });
}

function checkAndAdd(data) {
    // bcoz we are doing DB stuff js will not work for DB so we are doing as Promise
    return new Promise((resolve, reject) => {
        db.findOne("macA", data.macA).then(doc => {
            if (!doc) {
                db.add(data).then((res) => {
                    console.log("all---", res);
                });
                resolve("added");
            } else {
                console.log("doc---", doc);
                resolve("found");
            }
        });
    });
}

module.exports = socketMain;
