import React from "react";

import drawCircle from "./uitilities/canvasLoadAnimation";

function Mem(props) {
    const { freeMem,totalMem,usedMem,memUseage } = props.memData;
    const canvas = document.querySelector(`.${props.memWidgetId}`);
    drawCircle(canvas, memUseage*100);
    const totalInGB = (totalMem/1073741824*100)/100;
    const freeInGB = Math.floor(freeMem/1073741824*100)/100;
    return (
        <div className="col-sm-3 mem">
            <h3>Memory Usage</h3>
            <div className="canvas-wrapper">
                <canvas className={props.memWidgetId} width="200" height="200"></canvas>
                <div className="mem-text">{memUseage*100}%</div>
            </div>
            <div>
                Total Memory: {totalInGB}GB
            </div>
            <div>
                Free Memory: {freeInGB}GB
            </div>
        </div>
    );
}

export default Mem;
