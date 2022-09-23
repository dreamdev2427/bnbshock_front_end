import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TradeViewChart from "react-crypto-chart";
import { useSelector } from 'react-redux';

export const Chart = () => {

  const currentPairId = useSelector(state => state.auth.consideringPairId);

  console.log("currentPairId = ", currentPairId);

  return (
    <TradeViewChart
      interval="1m"
      containerStyle={{
        minHeight: "85vh",
        minWidth: "70vw",
        marginBottom: "30px"
      }}
      chartLayout={{
        layout: {
          backgroundColor: "transparent",
          textColor: "white"
        },
        grid: {
          vertLines: {
            color: "black"
            // style: LineStyle.SparseDotted,
          },
          horzLines: {
            color: "black"
            // style: LineStyle.SparseDotted,
          }
        },
        priceScale: {
          borderColor: "#485c7b"
        },
        timeScale: {
          borderColor: "#485c7b",
          timeVisible: true,
          secondsVisible: false
        }
      }}
      histogramConfig={{
        base: 0,
        lineWidth: 2,
        priceFormat: {
            type: "volume",
        },
        overlay: true,
        scaleMargins: {
            top: 0.8,
            bottom: 0,
        },
      }}
      pair={currentPairId}
    />
  );
}

export default Chart