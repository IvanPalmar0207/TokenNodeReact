import z from 'zod'

export const createTaskValidate = z.object({
    title : z.string({
        required_error : 'Title is required'
    }),
    description : z.string({
        required_error : 'Description is required'
    }),
    dateSucces : z.string({
        required_error : 'DateSuccess is required'
    }).datetime().optional()
})

export const updateTaskValidate = z.object({
    title : z.string({
        required_error : 'Title is required'
    }),
    description : z.string({
        required_error : 'Description is required'
    }),
    dateSucces : z.string({
        required_error : 'DateSuccess is required'
    }).datetime().optional()
})