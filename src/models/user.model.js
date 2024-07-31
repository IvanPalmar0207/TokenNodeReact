//DB
import sequelize from "../db.js"
import { DataTypes } from "sequelize"
//Foreign Key Models
import tasks from "./task.model.js"

const user = sequelize.define('user',{
    username : {
        type : DataTypes.STRING(80),
        required : true,
        trim: true
    },
    email : {
        type : DataTypes.STRING(150),
        required : true,
        trim: true,
        unique : true,
    },
    password : {
        type : DataTypes.STRING,
        required : true
    }
})

user.hasMany(tasks,{
    foreignKey : 'idUser',
    sourceKey : 'id',
    required : true
})

tasks.belongsTo(user,{
    foreignKey: "idUser",
})

export default user