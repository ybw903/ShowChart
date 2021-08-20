import React, { useState } from 'react';
import './style.css';
import Chart from '../Chart';
import ChartSelection from '../ChartSelection';
import InputFile from '../Input/InputFile';

type data = {
    index: number
    label: string
    value: number[]
}

export default function Content() {

    const [data, setData] = useState([25,30,45,60,20,65,75]);
    const [seletedChart, setSelectedChart] = useState("");

    const selectedChartHandler =(e:React.MouseEvent) => {
        const {currentTarget} = e;
        setSelectedChart(currentTarget.id); 
    }

    return(
        <div className='content'>
            <InputFile/>
            <ChartSelection selectedChart={seletedChart} selectedChartHandler={selectedChartHandler}/>
            <Chart selectedChart={seletedChart} data={data}/>
        </div>
    );
}