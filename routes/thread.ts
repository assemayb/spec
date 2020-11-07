import express, { Response, Request } from "express"
import { Model, Op } from "sequelize"
import Thread, { ThreadAttributes } from "../models/Thread"
import Reply from "../models/Reply";


const threadRouter = express.Router()

// Get 10 random threads
threadRouter.get("/", (req: Request, res: Response) => {
    let allThreads;
    Thread.findAll({
        include: "replies",
        limit: 10,
    }).then((data) => {
        allThreads = data
        return res.status(200).json(allThreads)
    }).catch(err => {
        console.error(err)
        res.status(400).json(err)
    })

})

// Get A list of threads from a specific type 
threadRouter.get("/:type", (req: Request, res: Response) => {
    const threadType: string = req.params.type;
    const firstHalf: string = threadType.substring(0, threadType.length / 2)
    const SecHalf: string = threadType.substring(threadType.length / 2, threadType.length)

    Thread.findAndCountAll(
        {
            where: {
                specialization: {
                    [Op.or]: [
                        { [Op.eq]: threadType },
                        { [Op.startsWith]: threadType.slice(0, 2) },
                        { [Op.like]: `%${firstHalf}` },
                        { [Op.like]: `%${SecHalf}` }
                    ]
                }
            },
            include: "replies"
        }
    ).then(result => {
        res.status(200).json({
            count: result.count,
            data: result.rows
        })
        // console.log(result.rows)
    }).catch(err => {
        res.status(400).json(err)
        console.error(err)
    })
})

// creating a thread
threadRouter.post("/create", (req: Request, res: Response) => {
    const { question, specialization, threadCreator } = req.body;
    Thread.create({
        question,
        threadCreator,
        specialization,
    }).then(modelData => {
        return res.status(200).json({
            message: "thread has been created successfully"
        })
    }).catch(err => {
        console.error(err)
        res.status(400).json(err)
    })
})

// delete a specific thread
threadRouter.delete("/delete", (req: Request, res: Response) => {
    // Check if the creator and the request sender match

    const threadId = req.body.id;
    Thread.destroy({
        benchmark: true,
        where: {
            id: threadId
        }
    }).then(data => {
        console.log(data)
        return res.status(200).json(data)
    }).catch(err => {
        res.sendStatus(400)
        console.error(err)
    })
})

// Reply Creatiion
threadRouter.post("/create-reply", (req: Request, res: Response) => {
    const { text, replyThread, replySpecialist } = req.body;
    Reply.create({
        text,
        replyThread,
        replySpecialist
    }).then(() => {
        res.status(201).json({
            message: "Reply Added."
        })
    }).catch(err => {
        res.status(500).json(err)
    })
})

// Reply Deletion
threadRouter.delete("/delete-reply", (req: Request, res: Response) => {
    const relplyId = req.body.id;
    Reply.destroy({
        where: {
            "id": relplyId
        }
    }).then(data => {
        console.log(data)
        res.status(200).json({
            message: data
        })
    }).catch(err => {
        console.error(err)
        res.status(400).json({
            message: "some error happened"
        })
    })

})

// Reply Editing

// handle an upvote click
// handle a rpely text change


module.exports = threadRouter;