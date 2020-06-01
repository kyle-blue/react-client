import DyGraph from "dygraphs";
import { DyEvent } from "../../typings/DyGraph";

// Indexes for OHLC
const OPEN = 0;
const HIGH = 1;
const LOW = 2;
const CLOSE = 3;


function OHLCPlotter(e: DyEvent, x, y) { //TODO: use x and y as args for other things in chart
    let setCount = e.seriesCount;
    if (setCount !== 4) throw Error("Exactly 4 prices each point must be provided for candle chart (open high low close)");
    if (e.seriesIndex !== 0) return; // Only draw once (miss index 1-3)

    let sets = e.allSeriesPoints;
    if (sets[0].length < 2) return; // Need 2 bars to calc bar width
    let barWidth = (5 / 6) * (sets[0][1].canvasx - sets[0][0].canvasx);

    let area = e.plotArea;
    let ctx = e.drawingContext;
    ctx.strokeStyle = "#202020";
    ctx.lineWidth = 0.6;

    for (let i = 0; i < sets[0].length; i++) {
        ctx.beginPath();
        ctx.moveTo(sets[HIGH][i].canvasx, sets[HIGH][i].canvasy);
        ctx.lineTo(sets[LOW][i].canvasx, sets[LOW][i].canvasy);
        ctx.closePath();
        ctx.stroke();
        const barX = sets[HIGH][i].canvasx - (barWidth / 2);
        let barY;
        let bodyHeight = area.h * Math.abs(sets[OPEN][i].y - sets[CLOSE][i].y);
        if (sets[OPEN][i].yval > sets[CLOSE][i].yval) {
            ctx.fillStyle = "#f75c5c";
            barY = sets[OPEN][i].canvasy;
        } else if (sets[OPEN][i].yval < sets[CLOSE][i].yval) {
            ctx.fillStyle = "#3ccf5e";
            barY = sets[CLOSE][i].canvasy;
        } else { // OPEN and CLOSE are the same
            ctx.fillStyle = "#202020";
            barY = sets[CLOSE][i].canvasy;
            bodyHeight = 1;
        }

        ctx.fillRect(barX, barY, barWidth, bodyHeight);
    }
}

export { OHLCPlotter };
