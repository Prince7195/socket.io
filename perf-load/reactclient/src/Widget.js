import React, { Component } from "react";

import Cpu from "./Cpu";
import Mem from "./Mem";
import Info from "./Info";
import "./widget.css";

class Widget extends Component {
    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        const {macA,freeMem,totalMem,usedMem,memUseage,osType,upTime,cpuModel,numCores,cpuSpeed,cpuLoad,isActive} = this.props.data;
        const cpu = {cpuLoad};
        const mem = {freeMem,totalMem,usedMem,memUseage};
        const info = {macA,osType,upTime,cpuModel,numCores,cpuSpeed};
        let notActiveDiv = "";
        if (!isActive) {
            notActiveDiv = <div className="not-active">OFFLINE</div>;
        }
        const cpuWidgetId = `cpu-widget-${this.props.index}`;
        const memWidgetId = `mem-widget-${this.props.index}`;
        return (
            <div className="widget col-sm-12">
                {notActiveDiv}
                <Cpu cpuData={cpu} cpuWidgetId={cpuWidgetId} />
                <Mem memData={mem} memWidgetId={memWidgetId} />
                <Info infoData={info} />
            </div>
        );
    }
}

export default Widget;
