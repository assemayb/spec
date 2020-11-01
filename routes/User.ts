import { dbConfig } from "../config/database"
import User from "../models/User"
import express, { Request, Response } from "express"

const router = express.Router();

// Get all Users 
router.get("/", (req: Request, res: Response) => {
    User.findAll().then(data => {
        if (!data) {
            console.log("cool")

        }
        return res.status(200).json(data)
    }
    ).catch(err => {
        res.status(500).json({
            message: "Error"
        })
        console.error(err)
    })
})
// Create A User
router.post("/create", (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ message: "this is not a valid request" })
    }
    const { username, password, email } = req.body
    if (username && password) {
        User.create({
            username,
            password
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
    }
})

module.exports = router;


