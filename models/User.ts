import { DataTypes, Op, ModelDefined, Model, Association, Optional } from 'sequelize'
import { dbConfig } from '../config/database'

import Thread from "./Thread"

type PasswordType = String | Number

export interface UserAttributes {
    id: Number
    username: String
    password: PasswordType
    email: String
}

export interface UserCreationAttributes extends Optional<UserAttributes, "email" | "id"> { }

const User: ModelDefined<UserAttributes, UserCreationAttributes> = dbConfig.define("User", {
    id: {
        type: DataTypes.INTEGER(),
        autoIncrement: true,
        primaryKey: true
    },
    username: {
        type: DataTypes.STRING(60),
        allowNull: false
    },
    email: {
        type: DataTypes.STRING(120)
    },
    password: {
        type: DataTypes.STRING(50),
        allowNull: false
    }
}, {
    tableName: "users"
})


User.hasMany(Thread, {
    foreignKey: "threadCreator"
})

export default User;