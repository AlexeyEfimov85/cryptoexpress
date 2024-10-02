import { Data } from "./App";

import { FC, useEffect, useState } from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
} from "recharts";

type ChartProps = {
    recivedData: Data[] | null;
    count: number;
}

const Chart: FC<ChartProps> = ({ recivedData, count }) => {
    const [data, setData] = useState([
        {
            name: "1",
            курс: 61300,
        },
        {
            name: "2",
            курс: 61700,
        },
        {
            name: "3",
            курс: 61500,
        },
        {
            name: "4",
            курс: 62000,
        },
        {
            name: "5",
            курс: 61000,
        },
        {
            name: "6",
            курс: 64000,
        },
        {
            name: "7",
            курс: 65000,
        },
    ])




    useEffect(() => {
        if (recivedData) {
            generateData(recivedData, count)
        }
    }, [count, recivedData])



    const generateData = (recivedData: Data[], count: number) => {
        const slicedData = recivedData.slice(recivedData.length - count)
        const chartData = slicedData.map((item, i) => {
            const курс = +item.currentRate;
            const name = i.toString();
            return { курс, name }
        })
        setData(chartData)
    }



    return (
        <>
            <div>
                <AreaChart
                    width={500}
                    height={400}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis domain={[50000, 70000]} />
                    <Tooltip />
                    <Area type="monotone" dataKey="курс" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </div>


        </>
    )
}

export default Chart;
