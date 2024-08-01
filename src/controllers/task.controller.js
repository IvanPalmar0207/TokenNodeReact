//Model Task
import task from "../models/task.model.js"

export const allTasks = async (req, res) => {
    try{
        const tasks = await task.findAll({
            where : {
                idUser : req.user.id
            },
            include : ['user'],
            attributes : {
                exclude : ['idUser']
            }
        })

        res.json({
            tasks
        })
    }
    catch(err){
        return res.status(500).json({ message : 'Internal Server Error' })
    }
}

export const getTasks = async (req, res) => {
    try{
        const tasks = await task.findByPk(
            req.params.id,
            {
                where : {
                    idUser : req.user.id
                },
                include : ['user'],
                attributes : {
                    exclude : ['idUser']
                }
            }
        )    
            if (!tasks) return res.status(404).json({message : 'Task not found'})
            res.json(tasks)
    }
    catch(err){
        return res.status(500).json({ message : 'Internal server error' })
    }
}

export const createTask = async (req, res) => { 
    try{
        const { title, description, dateSuccess} = req.body

        const newTask = new task({
            title,
            description,
            dateSuccess,
            idUser : req.user.id
        })

        const saveTask = await newTask.save()

        res.json(saveTask)    
    }catch(err){
        return res.status(500).json({ message : 'Internal server erro' })
    }
}

export const deleteTask = async (req, res) => {
    try{

        const { id } = req.params

        await task.destroy({
            where : {
                id : id
            }
        })

        res.sendStatus(204)

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}

export const updateTask = async (req, res) => {
    try{
        const {title, description, dateSuccess} = req.body

        const tasks = await task.findByPk(
            req.params.id,
            {
                where : {
                    idUser : req.user.id
                },
                include : ['user'],
                attributes : {
                    exclude : ['idUser']
                }
            }
        )    

        tasks.title = title
        tasks.description = description
        tasks.dateSuccess = dateSuccess

        const saveTask = await tasks.save()

        res.json(saveTask)

    }catch(err){
        return res.status(500).json({message : err.message})
    }
}