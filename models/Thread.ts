import { DataTypes, ModelDefined } from "sequelize";
import { dbConfig } from "../config/database"

import Reply from './Reply'

 
export interface ThreadAttributes {
    id: Number
    question: String
    specialization: String 
}

const Thread: ModelDefined<ThreadAttributes, {}> = dbConfig.define("thread", {
    id: {
        type: DataTypes.INTEGER(),
        primaryKey: true,
        autoIncrement: true
    },
    question: {
        type: DataTypes.STRING(300),
        allowNull: false
    },
    specialization: {
        type: DataTypes.STRING(100),
        allowNull: false
    }
}, {
    tableName: "threads"
})

Thread.hasMany(Reply, { 
    foreignKey: "replyThread"
 })

export default Thread;