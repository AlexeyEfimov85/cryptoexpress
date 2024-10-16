import axios from "axios";
import { Currency, CurrencyDay, CurrencyWeek } from "../entity/currency.entity";
import { myDataSource } from './../../app-data-source';
import { io } from './../../index';

export function initialSetData() {
    io.on('connection', async socket => {
     const dataForHour = await myDataSource.getRepository(Currency).find({
        order: {
          currentDate: "DESC",
        },
        take: 60,
      });
      io.emit('oneHour', dataForHour);
    });
    }

export async function getDataByHour() {
    try {
      const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
      const currentRate = response.data.bpi.USD.rate_float;
      const currentDate = response.data.time.updatedISO;
      const newData = await myDataSource.getRepository(Currency).create({
        currentRate: currentRate,
        currentDate: currentDate,
      })
      const results = await myDataSource.getRepository(Currency).save(newData)
      const data = await myDataSource.getRepository(Currency).find({
        order: {
          currentDate: "DESC",
        },
        take: 60,
      });
      io.emit('oneHour', data);
    } catch (error) {
      console.error(error);
    }
  }

  export async function getDataByDay() {
    try {
      const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
      const currentRate = response.data.bpi.USD.rate_float;
      const currentDate = response.data.time.updatedISO;
      const newData = await myDataSource.getRepository(CurrencyDay).create({
        currentRate: currentRate,
        currentDate: currentDate,
      })
      const results = await myDataSource.getRepository(CurrencyDay).save(newData)
      const data = await myDataSource.getRepository(CurrencyDay).find({
        order: {
          currentDate: "DESC",
        },
        take: 96,
      });
      io.emit('oneDay', data);
    } catch (error) {
      console.error(error);
    }
  }

  export async function getDataByWeek() {
    try {
      const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
      const currentRate = response.data.bpi.USD.rate_float;
      const currentDate = response.data.time.updatedISO;
      const newData = await myDataSource.getRepository(CurrencyWeek).create({
        currentRate: currentRate,
        currentDate: currentDate,
      })
      const results = await myDataSource.getRepository(CurrencyWeek).save(newData)
      const data = await myDataSource.getRepository(CurrencyWeek).find({
        order: {
          currentDate: "DESC",
        },
        take: 168,
      });
      io.emit('oneWeek', data);
    } catch (error) {
      console.error(error);
    }
  }