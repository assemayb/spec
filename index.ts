import express from "express"
import cors from "cors"
import morgan from 'morgan'
import { dbConfig } from "./config/database"
import * as dotenv from "dotenv"

const app = express()

// Middlewares
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
app.use(morgan("dev"))

// environment variables
dotenv.config({
    path: `${__dirname}/config/config.env`,
})
// Database Configuration
dbConfig.authenticate()
    .then(() => console.log("Database connection is successful"))
    .then(() => dbConfig.sync( /*    { force: true }  */))
    .catch((err) => console.log(err));


// API Routes 
app.use("/users", require("./routes/user"))
app.use("/thread", require("./routes/thread"))


// Port
const PORT = 8000;
app.listen(PORT, () => {
    console.log(`App is running at port ${PORT}`)
})
