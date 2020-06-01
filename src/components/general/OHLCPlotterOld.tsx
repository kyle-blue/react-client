import DyGraph from "dygraphs";
import { DyEvent } from "../../typings/DyGraph";

enum index { // Indexes for OHLC
    OPEN = 0,
    HIGH = 1,
    LOW = 2,
    CLOSE = 3,
}

function OHLCPlotter(e: DyEvent, x, y) { //TODO: use x and y as args for other things in chart
    let setCount = e.seriesCount;
    if (setCount !== 4) throw Error("Exactly 4 prices each point must be provided for candle chart (open high low close)");

    let prices = [];
    let price;
    let sets = e.allSeriesPoints;
    // Only draw if your dealing with the whole series (miss index 1-3)
    if (e.seriesIndex !== 0 || sets[0].length <= 2) return;
    let barWidth = (2 / 3) * (sets[1][1].canvasx - sets[3][0].canvasx);
    for (let p = 0; p < sets[0].length; p++) {
        price = {
            open: sets[0][p].yval,
            high: sets[1][p].yval,
            low: sets[2][p].yval,
            close: sets[3][p].yval,
            openY: sets[0][p].y,
            highY: sets[1][p].y,
            lowY: sets[2][p].y,
            closeY: sets[3][p].y,
        };
        prices.push(price);
    }

    let area = e.plotArea;
    let ctx = e.drawingContext;
    ctx.strokeStyle = "#202020";
    ctx.lineWidth = 0.6;

    for (let p = 0; p < prices.length; p++) {
        ctx.beginPath();

        price = prices[p];
        let topY = area.h * price.highY + area.y;
        let bottomY = area.h * price.lowY + area.y;
        let centerX = area.x + sets[0][p].x * area.w;
        ctx.moveTo(centerX, topY);
        ctx.lineTo(centerX, bottomY);
        ctx.closePath();
        ctx.stroke();
        let bodyY;
        let bodyHeight = area.h * Math.abs(price.openY - price.closeY);
        if (price.open > price.close) {
            ctx.fillStyle = "rgba(244,44,44,1.0)";
            bodyY = area.h * price.openY + area.y;
        } else if (price.open < price.close) {
            ctx.fillStyle = "rgba(44,244,44,1.0)";
            bodyY = area.h * price.closeY + area.y;
        } else {
            ctx.fillStyle = "#202020";
            bodyY = area.h * price.closeY + area.y;
            bodyHeight = 1;
        }

        ctx.fillRect(centerX - barWidth / 2, bodyY, barWidth, bodyHeight);
    }
}

export { OHLCPlotter };
