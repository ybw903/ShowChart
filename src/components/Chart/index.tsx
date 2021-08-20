import { useEffect, useRef } from "react";
import {select} from 'd3';
import Line from "./Line";

interface selectedChartProps {
    selectedChart: string,
    data: Array<Object>
}

export default function Chart({selectedChart, data}:selectedChartProps) {

    return (
        <div>
            {selectedChart === 'line' ?
                <Line data={data}/>:
                ''}
        </div>
    )
}