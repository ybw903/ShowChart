import { axisBottom, axisRight,  scaleBand, scaleLinear, select } from "d3";
import { useEffect, useRef } from "react";

import './style.css';



interface dataProps {
    data: Array<{[key: string]: string}>
}
export default function Bar({data}:dataProps) {

    const svgRef = useRef<SVGSVGElement|null>(null);
    useEffect(()=> {
        const svg = select(svgRef.current);
        console.log(data);

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

        const colorScale = scaleLinear<string>()
            .domain([min,max])
            .range(["yellow",'red'])
            .clamp(true)

        const xAxis:any = axisBottom(xScale);
        svg.select('.x-axis')
            .style("transform", "translateY(150px)")
            .call(xAxis);
        //xAxis(svg.select('.x-axis'));

        const yAxis:any = axisRight(yScale);
        svg.select('.y-axis')
            .style("transform", "translateX(300px)")
            .call(yAxis);

        svg
            .selectAll('.bar')
            .data(data)
            .join("rect")
            .attr("class", "bar")
            .style("transform", "scale(1,-1)")
            .attr("x", (value,index) => xScale(index))
            .attr("y",-150) 
            .attr("width", xScale.bandwidth())
            .transition()
            .attr("fill",(value) => colorScale(value['공급대가'] as unknown as number))
            .attr("height",(value) => {
                console.log(150 - yScale(value['공급대가'] as unknown as number))
                return 150 - yScale(value['공급대가'] as unknown as number)
            });

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