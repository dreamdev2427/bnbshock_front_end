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
    const [prviouspair, setPrevPair] = useState("BTCUSDT");
    const [timerID, setTimerId] = useState(-1);

    useEffect(() => {
        init();
        return () => { if (timerID > 0) clearInterval(timerID); }
    }, []);

    useEffect(() => {
        if (pairPrice == 0) {
            return;
        }
        let consideringPair = localStorage.getItem("pairId");
        console.log("consideringPair = ", consideringPair)
        let prevdata = data;
        let tempTime = new Date(graphLoadingTime.setDate(graphLoadingTime.getDate() + 1));
        prevdata.push({ time: moment(tempTime).format("YYYY-MM-DD"), value: Number(pairPrice) });
        setGraphLoadingTime(tempTime);
        setSeriesData(prevdata);
        if (areaSeries != null) {
            areaSeries.setData(prevdata);
        }
        if (prviouspair !== consideringPair) {
            let tempTime;
            setGraphLoadingTime(tempTime);
            setSeriesData([]);
            setPrevPair(consideringPair);
            if (areaSeries != null) {
                areaSeries.setData([]);
            }
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
        const getData = async function () {
            let consideringPair = localStorage.getItem("pairId");
            console.log("consideringPair = ", consideringPair)
            let binanceResponse = await axios.get(
                `${BACKEND_URL}/api/price/pairPrice`
            );
            let currentPrices = binanceResponse?.data ? binanceResponse.data.pairPrices : [];
            let pairPrice =
                currentPrices.find(
                    (item) => item.symbol === consideringPair
                )?.price || 0;
            setPairPrice(pairPrice);
            setUpdateInterval((prev) => {
                return prev + 1;
            });
            if (prviouspair !== consideringPair) {
                let tempTime;
                setGraphLoadingTime(tempTime);
                setSeriesData([]);
                setPrevPair(consideringPair);
                if (areaSeries != null) {
                    areaSeries.setData([]);
                }
            }
        }
        let interval = setInterval(() => {
            getData()
        }, 2000);
        setTimerId(interval);
    }, []);

    return (
        <div className="App">
            <div id="chart1" />
        </div>
    );
}
