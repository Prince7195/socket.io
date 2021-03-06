import React from "react";

import drawCircle from "./uitilities/canvasLoadAnimation";

function Cpu(props) {
    const canvas = document.querySelector(`.${props.cpuWidgetId}`);
    drawCircle(canvas, props.cpuData.cpuLoad);
    return (
        <div className="col-sm-3 cpu">
            <h3>CPU load</h3>
            <div className="canvas-wrapper">
                <canvas className={props.cpuWidgetId} width="200" height="200"></canvas>
                <div className="cpu-text">{props.cpuData.cpuLoad}%</div>
            </div>
        </div>
    );
}

export default Cpu;
