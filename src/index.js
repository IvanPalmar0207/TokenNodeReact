import app from "./app.js";
import sequelize from "./db.js";
//Database Model
import './models/user.model.js'

async function mainRun(){
    try{
        await sequelize.sync({force : false})
        app.listen(3000, () => {
            console.log(`Server on port 3000`)
        })
    }catch(err){
        console.error(err)
    }
}

mainRun()