import { Data } from "./App";
import { socket } from "./socket";

import { FC, useEffect, useState } from 'react'
import {
    AreaChart,
    Area,
    XAxis,
    YAxis,
    Tooltip,
} from "recharts";
import { initialChartData } from "./utils/data";
import { useAppDispatch, useAppSelector } from "./types/hooks";
import { GET_DATA_BY_DAYS_SUCCESS } from "./services/actions/getdatabydays";

type ChartProps = {
    recivedData: Data[] | null;
    count: string;
}

const Chart: FC<ChartProps> = ({ recivedData, count }) => {
    const [data, setData] = useState(initialChartData);
    const [fooEvents, setFooEvents] = useState<Data[]>([]);
    const [yAxis, setYAxis] = useState<number[]>([60000, 66000]);
    const dispatch = useAppDispatch();
    const arr: Data[] | null = useAppSelector((store) => store.getDataByDaysReducer.data);
    console.log(arr)
    useEffect(() => {
        if (arr) {
            generateData(arr)
            generateYAxis(arr)
        }
    }, [recivedData, fooEvents])

    useEffect(() => {
        function onFooEvent(value: Data[]) {
            setFooEvents(value);
            dispatch({
                type: GET_DATA_BY_DAYS_SUCCESS,
                data: value
            })
        }
        socket.on(count, onFooEvent);
        return () => {
            socket.off(count, onFooEvent);
        };
    }, [count]);


    const generateData = (recivedData: Data[]) => {
        const rotatedArr = recivedData.map((e, i) => recivedData[recivedData.length - i - 1])
        const chartData = rotatedArr.map((item) => {
            const курс = +item.currentRate;
            const name = item.currentDate.slice(11, 16);
            return { курс, name }
        })
        setData(chartData)
    }

    const generateYAxis = (recivedData: Data[]) => {
        const arr = recivedData.map((item) => {
            return +item.currentRate
        })
        const min = Math.min(...arr);
        const minAround = Math.floor(min / 1000) * 1000;
        const max = Math.max(...arr);
        const maxAround = Math.ceil(max / 1000) * 1000;
        setYAxis([minAround, maxAround])
    }
    return (
        <>
            <div>
                <AreaChart
                    width={500}
                    height={300}
                    data={data}
                    margin={{
                        top: 10,
                        right: 30,
                        left: 0,
                        bottom: 0,
                    }}
                >
                    <XAxis dataKey="name" interval={18} />
                    <YAxis domain={yAxis} orientation={"right"} />
                    <Tooltip />
                    <Area type="monotone" dataKey="курс" stroke="#8884d8" fill="#8884d8" />
                </AreaChart>
            </div>
        </>
    )
}
export default Chart;
