import React, { useEffect, useCallback, useState } from "react";
import { createChart } from "lightweight-charts";
import moment from 'moment';
import axios from "axios";
import { BACKEND_URL } from "../config";

export default function RealTimeChart({ }) {
    const [areaSeries, setArea] = useState(null);
    const [data, setSeriesData] = useState([]);
    const [updateInterval, setUpdateInterval] = useState(0);
    const [pairPrice, setPairPrice] = useState(0);
    const [graphLoadingTime, setGraphLoadingTime] = useState(new Date());

    useEffect(() => {
        init();

    }, []);

    useEffect(() => {
        if (pairPrice == 0) {
            return;
        }
        let prevdata = data;
        let tempTime = new Date(graphLoadingTime.setDate(graphLoadingTime.getDate() + 1));
        prevdata.push({ time: moment(tempTime).format("YYYY-MM-DD"), value: Number(pairPrice) });
        setGraphLoadingTime(tempTime);
        setSeriesData(prevdata);
        if (areaSeries != null) {
            areaSeries.setData(prevdata);
        }
    }, [updateInterval]);

    const init = useCallback(() => {
        var chart = createChart(document.getElementById("chart1"), {
            priceScale: {
                scaleMargins: {
                    top: 0.3,
                    bottom: 0.25
                },
                borderVisible: false
            },
            layout: {
                backgroundColor: "#2f3136",
                textColor: "#d1d4dc"
            },
            grid: {
                vertLines: {
                    color: "rgba(42, 46, 57, 0)"
                },
                horzLines: {
                    color: "rgba(42, 46, 57, 0.6)"
                }
            },
            timeScale: {
                visible: false,
            },
        });

        setArea(
            chart.addAreaSeries({
                topColor: "rgba(243,126,86, 0.56)",
                bottomColor: "rgba(200,150,86, 0.04)",
                lineColor: "rgba(231,81,30, 1)",
                lineWidth: 2
            })
        );
        let prviouspair = "BTCUSDT";
        let tempTime = new Date().getTime();
        const getData = async function () {
            if (new Date().getTime() - tempTime > 1000) {
                let consideringPair = localStorage.getItem("pairId");
                if (consideringPair) {
                    let binanceResponse = await axios.post(
                        `${BACKEND_URL}/api/price/pairPrice`,
                        {
                            pairId: consideringPair
                        }, {}
                    );
                    // console.log("binanceResponse = ", binanceResponse);
                    let pairPrice = binanceResponse?.data ? binanceResponse.data.pairPrice : 0;
                    // console.log("activePair = ", consideringPair);
                    setPairPrice(pairPrice);
                    setUpdateInterval((prev) => {
                        return prev + 1;
                    });
                    tempTime = new Date().getTime();
                    if (prviouspair !== consideringPair) {
                        let tempTime;
                        setGraphLoadingTime(tempTime);
                        setSeriesData([]);
                        prviouspair = consideringPair;
                        if (areaSeries != null) {
                            areaSeries.setData([]);
                        }
                    }
                }
            }
        }
        setInterval(() => {
            getData()
        }, 1000);
    }, []);

    return (
        <div className="App">
            <div id="chart1" />
        </div>
    );
}
