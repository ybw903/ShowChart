import { useEffect, useRef } from "react";
import {select} from 'd3';
export default function Chart() {
    const data = [25, 30, 45, 60, 20];
    const svgRef = useRef<SVGSVGElement|null>(null);
    useEffect(()=> {
        const svg = select(svgRef.current);
        svg
            .selectAll("circle")
            .data(data)
            .join(
                enter => enter.append("circle"),
                update => update.attr("class", "updated"),
                exit => exit.remove()
            )
            .attr("r", value => value)
            .attr("cx", value => value * 2)
            .attr("cy", value => value * 2)
            .attr("stroke", "red");
    }, []);
    return (
        <div>
            <svg ref={svgRef}></svg>
        </div>
    )
}