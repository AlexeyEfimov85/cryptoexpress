import { useEffect, useState } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './types/hooks';
import { getDataByDaysAction } from './services/actions/getdatabydays';
import Chart from './chart';

export type Data = {
  id: number,
  currentDate: string,
  currentRate: string
}

function App() {
  const [count, setCount] = useState(7);
  const recivedData: Data[] | null = useAppSelector((store) => store.getDataByDaysReducer.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDataByDaysAction())
  }, [count])
  
  return (
    <>
      <Chart recivedData = {recivedData} count = { count } />
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
