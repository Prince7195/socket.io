
// =======================================
// =================DRAWING===============
// =======================================

// player.locX = Math.floor(500 * Math.random() + 100);
// player.locY = Math.floor(500 * Math.random() + 100);
function draw() {
    
    // reset transform to default
    context.setTransform(1,0,0,1,0,0);

    // clear the screen out so that the old stuff is gone from the last frame
    context.clearRect(0,0,canvas.width, canvas.height);

    // clamp the camera to the player
    const camX = -player.locX + canvas.width/2;
    const camY = -player.locY + canvas.height/2;
    context.translate(camX, camY);

    // draw all the players
    players.forEach(player => {
        context.beginPath();
        context.fillStyle = player.color;
        // https://www.w3schools.com/tags/canvas_arc.asp
        context.arc(player.locX, player.locY, player.radius, 0, Math.PI * 2);
        context.fill();
        context.lineWidth = 3;
        context.strokeStyle = "rgb(0,250,0)";
        context.stroke();
    });

    // draw all the orbs
    orbs.forEach(orb => {
        context.beginPath();
        context.fillStyle = orb.color;
        context.arc(orb.locX, orb.locY, orb.radius, 0, Math.PI * 2);
        context.fill();
    });

    requestAnimationFrame(draw);
}
