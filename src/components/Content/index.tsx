import React, { useState } from 'react';
import './style.css';
import XLSX from 'xlsx';
import Chart from '../Chart';
import Line from '../Chart/Line';
import ChartSelection from '../ChartSelection';
export default function Content() {

    const [seletedChart, setSelectedChart] = useState("line");

    const selectedChartHandler =(e:React.MouseEvent) => {
        const {currentTarget} = e;
        setSelectedChart(currentTarget.id); 
    }

    const fileHandler = (e:React.ChangeEvent<HTMLInputElement>) => {
        const file = e.currentTarget.files?.[0];
        if(!(file instanceof File))
            return;
        const fileReader = new FileReader();
        fileReader.readAsArrayBuffer(file);
        fileReader.onload = (e) => {
            const bufferArray = e.target?.result;
            const wb = XLSX.read(bufferArray, {type: 'buffer'});

            const wsname = wb.SheetNames[0];
            const ws = wb.Sheets[wsname];
            const data = XLSX.utils.sheet_to_json(ws);

            console.log(data);
        }
        
    }

    return(
        <div className='content'>
            <input type='file' onChange={fileHandler}/>
            <ChartSelection selectedChart={seletedChart} selectedChartHandler={selectedChartHandler}/>
            <Chart/>
            <Line/>
        </div>
    );
}