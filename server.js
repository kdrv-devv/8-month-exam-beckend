import express from 'express'
import dotenv from 'dotenv'
import cors from 'cors'
import { router } from './routes/router.js'
import { CustomError } from './errors/index.js'
import { ResData } from './utils/responseHelpers.js'
import { connectDb } from './db/db.connect.js'
dotenv.config()
const app = express()
app.use(cors())
app.use(express.json());
const PORT  = process.env.PORT || 7070


app.use(router)


app.use((req, res, next) => {
    try {
      throw new CustomError(404, `This ${req.url} page not found`);
    } catch (error) {
      next(error);
    }
  });
  

  app.use((error, req, res, next) => {
    const statusCode = error.status || 500;
    const resData = new ResData(statusCode, error.message);
    res.status(resData.status).json(resData);
  });

app.listen(PORT , ()=>{
    connectDb()
    console.log(`server started : http://localhost:${PORT}`);
    
})