import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DyGraph from "dygraphs";
import { ThemeContext, ThemeType } from "../../styles/GlobalUserTheme";
import { ChartContainer } from "./styles/ChartStyles";
import { OHLCPlotter } from "./OHLCPlotter";


function Chart(props: Props): React.ReactElement {
    const [ohlcs, setOHLCs] = useState([]);
    const [forceUpdateVal, forceUpdate] = useState(false);
    const [graph, setGraph] = useState();
    const chartRef = useRef(null);
    useEffect(() => {
        //TODO: pass args to plotter for EMA etc.
        setGraph(new DyGraph(chartRef.current, [[new Date(), 0, 0, 0, 0]], { labels: ["time", "open", "high", "low", "close"], digitsAfterDecimal: 5, plotter: (e) => { OHLCPlotter(e, "Hell", "poo"); } }));
    }, []);

    const update = () => {
        axios.get("http://localhost:8081/api/v1/ohlc?symbol=AUDUSDp&interval=15%20SECOND").then((val) => {
            if (graph) {
                let data = [];
                for (const ohlc of val.data) {
                    data.push([new Date(ohlc.time), ohlc.open, ohlc.high, ohlc.low, ohlc.close]);
                }
                if (data[0]) {
                    (graph as DyGraph).updateOptions({ file: data });
                }
            }
        }).catch(() => { }).finally(() => setTimeout(update, 100));
    };

    setTimeout(update, 100);

    return (
        <ChartContainer ref={chartRef} />
    );
}

export default Chart;
