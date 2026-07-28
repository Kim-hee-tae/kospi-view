import { useEffect, useState } from "react";
import ReactECharts from "echarts-for-react";
import { fetchChart } from "../api/chart";

interface Props {
  code: string;
}

export default function StockChart({ code }: Props) {

  const [option, setOption] = useState({});

  useEffect(() => {

    async function load() {

      const data = await fetchChart(code);

      const dates = data.map(v => v.stck_bsop_date).reverse();

      const values = data.map(v => [
        Number(v.stck_oprc),
        Number(v.stck_clpr),
        Number(v.stck_lwpr),
        Number(v.stck_hgpr)
      ]).reverse();

      const volumes = data.map(v => ({
            value: Number(v.acml_vol),
            itemStyle: {
                color:
                    Number(v.stck_clpr) >= Number(v.stck_oprc)
                        ? "#e53935"
                        : "#1565c0"
            }
        })).reverse();

const closes = data
  .map(v => Number(v.stck_clpr))
  .reverse();

function calculateMA(dayCount: number) {

    const result: (number | "-")[] = [];

    for (let i = 0; i < closes.length; i++) {

        if (i < dayCount - 1) {

            result.push("-");

            continue;

        }

        let sum = 0;

        for (let j = 0; j < dayCount; j++) {

            sum += closes[i - j];

        }

        result.push(Number((sum / dayCount).toFixed(2)));

    }

    return result;

}

const ma5 = calculateMA(5);    
const ma20 = calculateMA(20);
const ma60 = calculateMA(60);    

      setOption({

        animation: false,

        tooltip: {

            trigger: "axis",

            axisPointer: {
                type: "cross"
            },

            formatter(params: any) {

                const candle = params.find((p: any) => p.seriesName === "일봉");

                const volume = params.find((p: any) => p.seriesName === "거래량");

                if (!candle) return "";

                return `
                <b>${params[0].axisValue}</b><br/><br/>

                시가 : ${Number(candle.data[0]).toLocaleString()}<br/>
                종가 : ${Number(candle.data[1]).toLocaleString()}<br/>
                저가 : ${Number(candle.data[2]).toLocaleString()}<br/>
                고가 : ${Number(candle.data[3]).toLocaleString()}<br/><br/>

                거래량 : ${
                    volume
                        ? Number(volume.data.value ?? volume.data).toLocaleString()
                        : "-"
                }
                `;

            }

        },

        legend: {
            top: 10,
            right: 20,
            data: ["일봉", "MA5", "MA20", "MA60"],

        },

        axisPointer: {
          link: [
            {
              xAxisIndex: "all"
            }
          ]
        },

        grid: [
            {
                left: "8%",
                right: "4%",
                top: 50,
                height: "58%"
            },
            {
                left: "8%",
                right: "4%",
                top: "74%",
                height: "14%"
            }
        ],
        dataZoom: [
            // 아래 슬라이더
            {
                type: "slider",
                xAxisIndex: [0, 1],
                start: Math.max(0, ((dates.length - 120) / dates.length) * 100),
                end: 100
            },
            // 마우스 휠 확대/축소
            {
                type: "inside",
                xAxisIndex: [0, 1],
                start: Math.max(0, ((dates.length - 120) / dates.length) * 100),
                end: 100
            }
        ],
        xAxis: [
          {
                type: "category",

                data: dates,

                scale: true,

                boundaryGap: true,

                axisLine: {
                    onZero: false
                },

                splitLine: {
                    show: false
                },

                min: "dataMin",

                max: "dataMax"

            },
          {
            type: "category",
            gridIndex: 1,
            data: dates,
            scale: true,
            boundaryGap: true,

                axisLine: {
                    onZero: false
                },

                splitLine: {
                    show: false
                },

                min: "dataMin",

                max: "dataMax"

          }
        ],

        yAxis: [
          {
            scale: true,
                    splitArea: {
                show: true
            },
          },
          {
            gridIndex: 1,
            scale: true
          }
        ],

        series: [

          {
                name: "일봉",
                type: "candlestick",
                data: values,
                itemStyle: {
                    color: "#e53935",          // 상승 몸통
                    color0: "#1565c0",         // 하락 몸통
                    borderColor: "#c62828",    // 상승 테두리
                    borderColor0: "#0d47a1"    // 하락 테두리
                }
          },
          {
            name: "MA5",

            type: "line",

            data: ma5,

            smooth: true,

            showSymbol: false,

            lineStyle: {

                width: 2,

                color: "#ff9800"

            }

          },
          {
                name: "MA20",

                type: "line",

                data: ma20,

                smooth: true,

                showSymbol: false,

                lineStyle: {

                    width: 2,

                    color: "#1976d2"

                }

            },
            {
                name: "MA60",

                type: "line",

                data: ma60,

                smooth: true,

                showSymbol: false,

                lineStyle: {

                    width: 2,

                    color: "#7b1fa2"

                }
           },
          {
            name: "거래량",
            type: "bar",
            xAxisIndex: 1,
            yAxisIndex: 1,
            data: volumes
          }

        ]

      });

    }

    load();

  }, [code]);

  return (

    <ReactECharts
      option={option}
      style={{
        height: "420px",
        width: "100%"
      }}
    />

  );

}