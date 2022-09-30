import React, { useEffect, useCallback, useState } from "react";
import { createChart } from "lightweight-charts";
import { useSelector } from "react-redux";
import moment from 'moment';
import axios from "axios";

export default function RealTimeChart({ consideringPair }) {
    const [areaSeries, setArea] = useState(null);
    const [data, setSeriesData] = useState([]);
    const [updateInterval, setUpdateInterval] = useState(0);
    const [pairPrice, setPairPrice] = useState(0);
    const [aictvePair, setActivePair] = useState("BTCUSDT");
    const [graphLoadingTime, setGraphLoadingTime] = useState(new Date());
    const [timer, setTimer] = useState(-1);

    useEffect(() => {
        init();
        let interval = 0;
        interval = setInterval(() => {
            getData();
            setTimer(interval);
        }, 2000);
        return () => {
            if (timer > 0) clearInterval(timer);
        }
    }, []);

    useEffect(() => {
        console.log("consideringPair = ", consideringPair);
        if (timer > 0) clearInterval(timer);
        setSeriesData([]);
        setGraphLoadingTime(new Date());
        areaSeries.setData([]);
        setPairPrice(0);
        setActivePair(consideringPair);
        setTimeout(() => {
            let interval = 0;
            interval = setInterval(() => {
                getData();
                setTimer(interval);
            }, 2000);
        }, 500);
    }, [consideringPair]);

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
    }, [updateInterval, pairPrice]);

    const getData = async function () {
        let binanceResponse = await axios.get(
            "https://api.binance.com/api/v3/ticker/price"
        );
        let currentPrices = binanceResponse?.data ? binanceResponse.data : [];
        console.log("activePair = ", aictvePair)
        let pairPrice =
            currentPrices.find(
                (item) => item.symbol === aictvePair
            )?.price || 0;
        setPairPrice(pairPrice);
        setUpdateInterval((prev) => {
            return prev + 1;
        });
        setTimeout(getData, 2000);
    }

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
    }, []);

    return (
        <div className="App">
            <div id="chart1" />
        </div>
    );
}
