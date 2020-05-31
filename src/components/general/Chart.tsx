import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DyGraph from "dygraphs";
import { ThemeContext, ThemeType } from "../../styles/GlobalUserTheme";
import { ChartContainer } from "./styles/ChartStyles";


function Chart(props: Props): React.ReactElement {
    const [ohlcs, setOHLCs] = useState([]);
    const [forceUpdateVal, forceUpdate] = useState(false);
    const [graph, setGraph] = useState();
    const chartRef = useRef(null);
    useEffect(() => {
        setGraph(new DyGraph(chartRef.current, [[0, 0]], { labels: ["Time", "Close"] }));
    }, []);

    const update = () => {
        axios.get("http://localhost:8081/api/v1/ohlc?symbol=EURUSD&interval=15%20SECOND").then((val) => {
            if (val.data === ohlcs) forceUpdate(!forceUpdateVal); // TODO: Test rmeoving this, probs not needed since obj never eq another obj
            else setOHLCs(val.data);
        }).catch(() => forceUpdate(!forceUpdateVal));
    };


    setTimeout(update, 100);
    if (graph) {
        let data = [];
        for (const ohlc of ohlcs) {
            data.push([new Date(ohlc.time), ohlc.close]);
        }
        if (data[0]) (graph as DyGraph).updateOptions({ file: data });
    }

    return (
        <ChartContainer ref={chartRef} />
    );
}

export default Chart;
