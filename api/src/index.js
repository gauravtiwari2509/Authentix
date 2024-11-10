import dotenv from 'dotenv'
import dbConnect from './db/dbConnect.js'
import { app } from './app.js'
dotenv.config({
    path: './.env'
})
dbConnect()
    .then(() => {
        app.listen(process.env.PORT, () => { console.log(`server is running at port ${process.env.PORT}`) })
    })
    .catch(err => console.log(err))