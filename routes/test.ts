import express, {Request , Response} from 'express'


const router =  express.Router()
router.get("/sss", (req: Request, res: Response) => {
    res.json("sasfsmflaskmflkasmfkm")
})

module.exports = router