import express, { Request, Response, NextFunction, RequestHandler } from "express"
import { Model, Op } from "sequelize"
import jwt, { Secret } from "jsonwebtoken"
import User from "../models/User"
import Specialist from "../models/Specialist"
import { UserAttributes, UserCreationAttributes } from "../models/User"

const userRouter = express.Router();

// Get all Users 
userRouter.get("/", authenticateUser, (req: Request, res: Response) => {
    let notAhmedUsers: Model<UserAttributes, UserCreationAttributes>[];
    User.findAll({
        where: {
            username: {
                [Op.or]: [
                    { [Op.not]: "ahmed" },
                    { [Op.startsWith]: "as" }
                ]
            }
        },
        include: "threads"
    }).then(data => {
        notAhmedUsers = data
    }).catch(err => {
        console.error(err)
    })

    User.findAll({
        include: "threads"
    }).then(data => {
        res.status(200).json({
            data: data,
            otherData: notAhmedUsers ? notAhmedUsers : null
        })
    }
    ).catch(err => {
        res.status(500).json({
            message: "Error"
        })
        console.error(err)
    })
})

// Create A Regular User
userRouter.post("/create", (req: Request, res: Response) => {

    const { username, password, email } = req.body

    // Check if a user with the same email and username does not exist

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
userRouter.post("/create-spec", (req: Request, res: Response) => {
    const { username, password, email, specialization, fullName, age } = req.body

    // check if a specialist with the same email and username does exist in database

    Specialist.create({
        username,
        email,
        password,
        fullName,
        age,
        specialization,
    }).then(() => {
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

// Get all Specs
userRouter.get("/spec", (req: Request, res: Response) => {
    Specialist.findAll().then(data => {
        return res.status(200).json(data)
    }
    ).catch(err => {
        res.status(500).json({
            message: "Error"
        })
        console.error(err)
    })
})

function authenticateUser(req: Request, res: Response, next: NextFunction) {

    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1];
    if (!token) {
        // return res.status(401).json({ msg: "You are not logged in" });
    } else {
        // jwt.verify(token, process.env.ACCESS_TOKEN_SECRET,  (error, user) => {
        //     if (error) {
        //         console.error(error);
        //         // res.status(403).json({ msg: "Not Authenticated" });
        //         // return res.status(403).json(error);
        //     }

        //     next();
        // });

        console.log(token)
        console.log(process.env.ACCESS_TOKEN_SECRET)
        next();
    }
}
module.exports = userRouter;


