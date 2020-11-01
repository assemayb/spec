import express, { Request, Response } from "express"
import { dbConfig } from "../config/database"

import User from "../models/User"
import Specialist from "../models/Specialist"
import Thread from "../models/Thread"

const router = express.Router();

// Get all Users 
router.get("/", (req: Request, res: Response) => {
    User.findAll().then(data => {
        return res.status(200).json(data)
    }
    ).catch(err => {
        res.status(500).json({
            message: "Error"
        })
        console.error(err)
    })
})

// Create A Regular User
router.post("/create", (req: Request, res: Response) => {
    const { username, password, email } = req.body.regularUser
    User.create({
        username,
        password,
        email
    }).then(user => {
        console.log(user)
        res.status(201).json({
            message: "User has been created Successfully"
        })
    }).catch(err => {
        console.error(err)
        res.status(400).json({
            message: "Something Wrong happened"
        })
    })

})

// Create a Specialist
router.post("/create-spec", (req: Request, res: Response) => {
    const { username, password, email, specialization, fullName, age } = req.body.specialist
    Specialist.create({
        age,
        email,
        fullName,
        password, 
        specialization,
        username
    }).then(modelData => {
        res.status(200).json({
            message: `user ${username} has been created`
        })
    }).catch(err => {
        res.status(400).json({
            message: err
        })
        console.error(err)
    })
})
module.exports = router;



// TODO:  ====>>  MOVE ROUTE FROM THIS FILE

// creating a thread
router.post("/thread-create", (req: Request, res: Response) => {
    const {question,  specialization, threadCreator} = req.body.threadData;
    Thread.create({
        question,
        threadCreator,
        specialization,
    }).then(modelData => {
        console.log(modelData)
        return res.status(200).json({
            message: "thread has been created successfully"
        })
    }).catch(err => {
        console.error(err)
        return res.status(400).json(err)
    })
})