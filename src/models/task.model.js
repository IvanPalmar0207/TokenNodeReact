//database
import sequelize from "../db.js";
import { DataTypes } from "sequelize";
import user from "./user.model.js";

const task = sequelize.define('task',{
    title : {
        type : DataTypes.STRING(30),
        required : true
    },

    description : {
        type : DataTypes.STRING(30),
        required : true
    },
    dateSuccess : {
        type : DataTypes.DATE(),
        defaultValue : Date.now
    }
},
{
    timestamps : true
}
)
export default task