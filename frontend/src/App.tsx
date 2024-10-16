import { useEffect, useState } from 'react'
import './App.css'
import { useAppDispatch, useAppSelector } from './types/hooks';
import { getDataByDaysAction } from './services/actions/getdatabydays';
import Chart from './Chart';

export type Data = {
  id: number,
  currentDate: string,
  currentRate: string
}



function App() {
  const [count, setCount] = useState('oneHour');
  const recivedData: Data[] | null = useAppSelector((store) => store.getDataByDaysReducer.data);
  const dispatch = useAppDispatch();
  useEffect(() => {
    dispatch(getDataByDaysAction(count))
  }, [count])

  
  return (
    <>
      <Chart recivedData = {recivedData} count = {count} />
      <div className="card">
        <button onClick={() => {
          setCount('oneHour')
        }}>
          курс за 1 час
        </button>
        <button onClick={() => {
          setCount('oneDay')
        }}>
          курс за 1 день
        </button>
        <button onClick={() => {
          setCount('oneWeek')
        }}>
          курс за 1 неделю
        </button>

      </div>

    </>
  )
}

export default App
