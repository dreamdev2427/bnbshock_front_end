import React from 'react';
import { useState } from 'react';
import { useEffect } from 'react';
import TradeViewChart from "react-crypto-chart";

export const Chart = ({currentPairId}) => {

  const [ flag, setFlag ] = useState(false);
  console.log("currentPairId = ", currentPairId);

  useEffect(() => {
    console.log("here");
    setFlag(!flag);
  }, [currentPairId])

  return (
    <div >
      {/* <TradeViewChart
      interval="2m"
      containerStyle={{
        minHeight: "80vh",
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
      pair={"BTCUSDT"}
    />    */}
    {/* {
      currentPairId === "BTCUSDT" && 
      <TradeViewChart
      interval="2m"
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
      pair={"BTCUSDT"}
    />   
    }
     { 
      currentPairId === "ETCUSDT" && 
      <TradeViewChart
      interval="2m"
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
      pair={"ETCUSDT"}
    />
    }
    { 
      currentPairId === "BCHUSDT" && 
      <TradeViewChart
      interval="2m"
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
      pair={"BCHUSDT"}
    />
    }
    { 
      currentPairId === "EOSUSDT" && 
      <TradeViewChart
      interval="2m"
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
      pair={"EOSUSDT"}
    />
    }
    { 
      currentPairId === "XRPUSDT" && 
      <TradeViewChart
      interval="2m"
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
      pair={"XRPUSDT"}
    />
    }
    { 
      currentPairId === "ETHUSDT" && 
      <TradeViewChart
      interval="2m"
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
      pair={"ETHUSDT"}
    />
    }
    { 
      currentPairId === "LTCUSDT" && 
      <TradeViewChart
      interval="2m"
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
      pair={"LTCUSDT"}
    />
    }
    { 
      currentPairId === "XMRUSDT" && 
      <TradeViewChart
      interval="2m"
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
      pair={"XMRUSDT"}
    />
    }
    
    { 
      currentPairId === "BNBUSDT" && 
      <TradeViewChart
      interval="2m"
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
      pair={"BNBUSDT"}
    />
    }    
    { 
      currentPairId === "ADAUSDT" && 
      <TradeViewChart
      interval="2m"
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
      pair={"ADAUSDT"}
    />
    } */}
  </div>
  );
}

export default Chart