import { axisBottom, axisRight,  scaleBand, scaleLinear, select } from "d3";
import { useEffect, useRef, useState } from "react";

import './style.css';
export default function Line() {
    const [data, setData] = useState([25,30,45,60,20,65,75]);
    const svgRef = useRef<SVGSVGElement|null>(null);
    useEffect(()=> {
        const svg = select(svgRef.current);

        const xScale:any  = scaleBand<number>()
            .domain(data.map((_value,index) => index) )
            .range([0,300])
            .padding(0.5);

        const yScale = scaleLinear()
            .domain([0,150])
            .range([150,0]);

        const colorScale = scaleLinear<string>()
            .domain([75,150])
            .range(["green", "red"])
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
            .attr("fill",colorScale)
            .attr("height",value => 150 - yScale(value));

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