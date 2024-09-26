import express from 'express';
import { Request, Response } from 'express';
import { Currency } from './src/entity/currency.entity'
import { myDataSource } from './app-data-source';
import axios from 'axios';
import { Between } from 'typeorm';
var cors = require('cors');

const { PORT = 3000 } = process.env;

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


myDataSource
    .initialize()
    .then(() => {
        console.log("Data Source has been initialized!")
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err)
    })

async function getData() {
    try {
        const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
        const currentRate = response.data.bpi.USD.rate_float;
        const currentDate = response.data.time.updatedISO;
        const newData = await myDataSource.getRepository(Currency).create({
            currentRate : currentRate,
            currentDate : currentDate,
        }) 
        const results = await myDataSource.getRepository(Currency).save(newData)

    } catch (error) {
        console.error(error);
    }
}

setInterval(getData, 8500000);

app.get("/days", async function (req: Request, res: Response) {
    const days = req.body.days;
    console.log(req.body)
    const data = await myDataSource.getRepository(Currency).find(/* {
        take: days,
      } */);
    return res.send(data)
})

app.post("/range", async function (req: Request, res: Response) {
    const data = await myDataSource.getRepository(Currency).findAndCount({
        where: [
          {
              currentDate: Between(
              new Date(req.body.begining).toISOString(),
              new Date(req.body.ending).toISOString(),
            ),
          },
        ],
      });
    return res.send(data)
})



app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`)
})

