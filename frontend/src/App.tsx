import { SetStateAction, useEffect, useState } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './types/hooks';
import { getDataByDaysAction } from './services/actions/getdatabydays';
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export type Data = {
  id: number,
  currentDate: string,
  currentRate: string
}

function App() {
  const [count, setCount] = useState(7);
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

  const recivedData: Data[] | null = useAppSelector((store) => store.getDataByDaysReducer.data);

  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDataByDaysAction())
    if (recivedData) {
      generateData(recivedData, count)
    }
  }, [count])
  


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
      <div className="card">
        <button onClick={() => {
          setCount(3)
        }}>
          курс за 3 дня
        </button>
        <button onClick={() => {
          setCount(7)
        }}>
          курс за 7 дней
        </button>
        <button onClick={() => {
          setCount(30)
        }}>
          курс за 30 дней
        </button>

      </div>

    </>
  )
}

export default App
