import { DataTypes, ModelDefined, Optional } from "sequelize"
import Specialist from './Specialist'
import Thread from "./Thread"

import { dbConfig } from "../config/database"

interface ReplyAttributes {
    id: Number
    text: String
    upvotes: Number
}

const Reply: ModelDefined<ReplyAttributes, {}> = dbConfig.define("reply", {
    id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true,
    },
    text: {
        type: DataTypes.STRING(500),
        allowNull: false
    },
    upvotes: {
        type: DataTypes.INTEGER(),
        allowNull: false,
        defaultValue: 0
    }
}, {
    tableName: 'replies'
})

Reply.belongsTo(Thread,
    {
        foreignKey: "replyThread"
    })

export default Reply;