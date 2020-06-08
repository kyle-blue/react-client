import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import DyGraph from "dygraphs";
import { ThemeContext, ThemeType } from "../../styles/GlobalUserTheme";
import { ChartContainer } from "./styles/ChartStyles";
import { OHLCPlotter } from "./OHLCPlotter";

const TIME_OFFSET = 0;
const OPEN_OFFSET = 1;
const HIGH_OFFSET = 2;
const LOW_OFFSET = 3;
const CLOSE_OFFSET = 4;
const VOLUME_OFFSET = 5;

interface Props { }

let graphData = [];
function Chart(props: Props): React.ReactElement {
    const [ohlcs, setOHLCs] = useState([]);
    const [forceUpdateVal, forceUpdate] = useState(false);
    const [graph, setGraph] = useState();
    const chartRef = useRef(null);
    useEffect(() => {
        //TODO: pass args to plotter for EMA etc.
        setGraph(new DyGraph(chartRef.current, [[new Date(), 0, 0, 0, 0]],
            {
                labels: ["time", "open", "high", "low", "close"],
                digitsAfterDecimal: 5,
                plotter: (e) => { OHLCPlotter(e, "Hell", "poo"); },
            }));
    }, []);

    const update = () => {
        let utcString;
        if (graphData.length > 0) {
            utcString = (graphData[graphData.length - 1][0] as Date).toUTCString().replace(" ", "%20");
        } else {
            utcString = new Date(1980, 1, 1).toUTCString().replace(" ", "%20");
        }
        axios.get(`http://localhost:8081/api/v1/ohlc?symbol=EURUSD&interval=1%20MINUTE&from=${utcString}`).then((val) => {
            if (graph) {
                /** 0 is time, 1 is open, 2 is close etc. //TODO: make documentation for this */
                const { data } = val;
                for (let i = 0; i < data.length; i += 6) { // There are 6 attributes, TOHLCV
                    if (graphData.length > 0 && (graphData[graphData.length - 1][0] as Date).getTime() === data[i]) {
                        graphData[graphData.length - 1] = [graphData[graphData.length - 1][0], data[i + 1], data[i + 2], data[i + 3], data[i + 4]];
                    } else {
                        graphData.push([new Date(data[i]), data[i + 1], data[i + 2], data[i + 3], data[i + 4]]);
                    }
                }
                if (graphData[0]) {
                    (graph as DyGraph).updateOptions({ file: graphData });
                }
            }
        }).catch(() => { }).finally(() => setTimeout(update, 50));
    };

    setTimeout(update, 100);

    return (
        <ChartContainer ref={chartRef} />
    );
}

export default Chart;
