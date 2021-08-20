import { axisBottom, axisRight,  scaleBand, scaleLinear, select } from "d3";
import { useEffect, useRef } from "react";

import './style.css';

interface dataProps {
    data: Array<Object>
}
export default function Line({data}:dataProps) {

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
            //.attr("fill",colorScale)
            .attr("height",(value,index) => 150 - yScale(index));

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