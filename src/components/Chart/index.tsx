import { useEffect, useRef } from "react";
import {select} from 'd3';
import Bar from "./Bar";
import Line from "./Line";

interface selectedChartProps {
    selectedChart: string,
    data: Array<{[key: string]: string}>
}

export default function Chart({selectedChart, data}:selectedChartProps) {



    return (
        <div>
            { (data.length!==0 && selectedChart === 'bar') ?
                <Bar data={data}/>:
                (data.length!==0 && selectedChart === 'line')?
                    <Line data={data}/> :'' }
        </div>
    )
}