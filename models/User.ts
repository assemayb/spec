import { DataTypes, Op, ModelDefined, Model, Association, Optional } from 'sequelize'
import { dbConfig } from '../config/database'

type PasswordType = String | Number

interface UserAttributes {
    id: Number
    username: String
    password: PasswordType
    email: String
}

interface UserCreationAttributes extends Optional<UserAttributes, "email" | "id"> { }

const User: ModelDefined<UserAttributes, UserCreationAttributes> = dbConfig.define("User", {
    id: {
        type: DataTypes.INTEGER,
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

export default User;