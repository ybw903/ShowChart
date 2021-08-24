import React, { useState } from 'react';
import './style.css';
import Chart from '../Chart';
import ChartSelection from '../ChartSelection';
import InputFile from '../Input/InputFile';

type data = {
    [key: string]: string
}

export default function Content() {

    const [data, setData] = useState<data[]>([]);
    const [seletedChart, setSelectedChart] = useState("");

    const selectedChartHandler =(e:React.MouseEvent) => {
        const {currentTarget} = e;
        setSelectedChart(currentTarget.id); 
    }

    const setDataHandler = (data:any) => {
        setData(data);
    }

    return(
        <div className='content'>
            <InputFile setDataHandler={setDataHandler}/>
            <ChartSelection selectedChart={seletedChart} selectedChartHandler={selectedChartHandler}/>
            <Chart selectedChart={seletedChart} data={data}/>
        </div>
    );
}