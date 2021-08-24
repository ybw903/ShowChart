import { useEffect, useRef } from "react";
import {select} from 'd3';
import Bar from "./Bar";

interface selectedChartProps {
    selectedChart: string,
    data: Array<{[key: string]: string}>
}

export default function Chart({selectedChart, data}:selectedChartProps) {



    return (
        <div>
            { (data.length!==0 && selectedChart === 'bar') ?
                <Bar data={data}/>:
                ''}
        </div>
    )
}