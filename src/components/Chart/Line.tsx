import { axisBottom, axisRight,  curveCardinal,  line,  scaleBand, scaleLinear, select } from "d3";
import { useEffect, useRef } from "react";

import './style.css';

interface dataProps {
    data: Array<{[key: string]: string}>
}
export default function Line({data}:dataProps) {

    const svgRef = useRef<SVGSVGElement|null>(null);
    useEffect(()=> {
        const svg = select(svgRef.current);
        const numberArr = [];
        for(let key in data[0]) {
            if( typeof data[0][key] === 'number') {
                numberArr.push(data.map((col) => parseInt(col[key])) );
            }
        }
        console.log(numberArr);
        const max = Math.max(...numberArr[2]);
        const min = Math.min(...numberArr[2]);
        const xScale:any  = scaleBand<number>()
            .domain(data.map((_value,index) => index) )
            .range([0,300])
            .padding(0.5);

        const yScale = scaleLinear()
            .domain([0,max])
            .range([150,0]);

        const lineGenerator = line<number>()
            .x((d, index) => xScale(index))
            .y( d => yScale(d))
            .curve(curveCardinal)

        const xAxis:any = axisBottom(xScale);
        svg.select('.x-axis')
            .style("transform", "translateY(150px)")
            .call(xAxis);
        //xAxis(svg.select('.x-axis'));

        const yAxis:any = axisRight(yScale);
        svg.select('.y-axis')
            .style("transform", "translateX(300px)")
            .call(yAxis);
        console.log(lineGenerator(numberArr[2]));

        svg
            .selectAll('.myLine')
            .data(numberArr[2])
            .join("path")
            .attr("class", "myLine")
            .attr("stroke", "black")
            .attr("fill", "none")
            .attr("d",lineGenerator(numberArr[2]))
            
    }, [data]);
    return (
        <div>
            <svg ref={svgRef}>
                <g className="x-axis"></g>
                <g className="y-axis"></g>
            </svg>
        </div>
    )
}