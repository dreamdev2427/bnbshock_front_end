import React from 'react';
import TradeViewChart from "react-crypto-chart";

export const Chart = ({currentPairId}) => {

  return (
    <div>
    {
      currentPairId === "BTCUSDT" && 
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
      pair={"BTCUSDT"}
    />   
    }
    { 
      currentPairId === "ETCUSDT" && 
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
      pair={"ETCUSDT"}
    />
    }
    { 
      currentPairId === "BCHUSDT" && 
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
      pair={"BCHUSDT"}
    />
    }
    { 
      currentPairId === "EOSUSDT" && 
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
      pair={"EOSUSDT"}
    />
    }
    { 
      currentPairId === "XRPUSDT" && 
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
      pair={"XRPUSDT"}
    />
    }
    { 
      currentPairId === "ETHUSDT" && 
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
      pair={"ETHUSDT"}
    />
    }
    { 
      currentPairId === "LTCUSDT" && 
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
      pair={"LTCUSDT"}
    />
    }
    { 
      currentPairId === "XMRUSDT" && 
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
      pair={"XMRUSDT"}
    />
    }
    
    { 
      currentPairId === "BNBUSDT" && 
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
      pair={"BNBUSDT"}
    />
    }    
    { 
      currentPairId === "ADAUSDT" && 
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
      pair={"ADAUSDT"}
    />
    }
  </div>
  );
}

export default Chart