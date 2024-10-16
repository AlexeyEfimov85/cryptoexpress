import express from 'express';
import { Request, Response } from 'express';
import { Currency, CurrencyDay } from './src/entity/currency.entity'
import { myDataSource } from './app-data-source';
import { Between } from 'typeorm';
var cors = require('cors');
import { createServer } from "http";
import { Server } from "socket.io";
import { getDataByDay, getDataByHour, getDataByWeek, initialSetData } from './src/utils/get-and-emit-data';

const { PORT = 4000 } = process.env;

const app = express();


const httpServer = createServer();
export const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173"
  }
});

io.on("connection", (socket) => {
  // ...
});
httpServer.listen(3030);


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());


myDataSource
  .initialize()
  .then(() => {
    console.log("Data Source has been initialized!")
  })
  .then(() => {
    initialSetData()
  })
  .catch((err) => {
    console.error("Error during Data Source initialization:", err)
  })

setInterval(getDataByHour, 60000);
setInterval(getDataByDay, 900000);
setInterval(getDataByWeek, 15000);


app.get("/onehour", async function (req: Request, res: Response) {
  console.log(req.body)
  const data = await myDataSource.getRepository(Currency).find({
    order: {
      currentDate: "DESC",
    },
    take: 60,
  });
  return res.send(data)
})

app.get("/oneday", async function (req: Request, res: Response) {
  console.log(req.body)
  const data = await myDataSource.getRepository(CurrencyDay).find({
    order: {
      currentDate: "DESC",
    },
    take: 96,
  });
  return res.send(data)
})

app.get("/oneweek", async function (req: Request, res: Response) {
  console.log(req.body)
  const data = await myDataSource.getRepository(CurrencyDay).find({
    order: {
      currentDate: "DESC",
    },
    take: 168,
  });
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

