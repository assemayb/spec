import express from "express"
import cors from "cors"
import morgan from 'morgan'


import { dbConfig } from "./config/database"
import { type } from "os"
const app = express()


// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))


// Database Configuration
dbConfig.authenticate()
    .then(() => console.log("Database connection is successful"))
    .then(() => dbConfig.sync( /* { force: true } */  ))
    .catch((err: Error) => console.log(err));


// API Routes 
app.use("/users", require("./routes/User"))

// Port
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})
