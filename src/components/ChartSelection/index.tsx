import './style.css';

interface chartSelectionProps {
    selectedChart : string,
    selectedChartHandler: (e:React.MouseEvent) =>void
}

export default function ChartSelection({selectedChart,selectedChartHandler}:chartSelectionProps) {
    const onClickHandler = (e:React.MouseEvent) => {
        selectedChartHandler(e);
    }

    return (
        <nav>
            <div className="icon-wrap" id ='line' onClick={onClickHandler}>
                라인차트
            </div>
            <div className="icon-wrap" id ='bar' onClick={onClickHandler}>
                바차트
            </div>
            <div className="icon-wrap" id='pie' onClick={onClickHandler}>
                파이차트
            </div>
        </nav>
    )
}