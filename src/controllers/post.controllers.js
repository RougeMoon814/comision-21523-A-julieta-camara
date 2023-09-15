import { PostModel } from "../models/Posts.js"

//controlador para traer todas las tareas
export const ctrlGetPosts = async (req, res) => {
    try {
        const post = await PostModel.findAll();
        if (!post) return res.status(404)
        return res.status(200).json(post)

    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Error Server'
        })
    }
}

//controlador para crear una tarea
export const ctrlCreatePost = async (req, res) => {
    try {
        const newPost = await PostModel.create(req.body)
        return res.status(201).json(newPost)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Error Server'
        })
    }
}

//controlador para modificar una tarea
export const ctrlUpdatePost = async (req, res) => {
    const { id } = req.params
    try {
        const post = await PostModel.findByPk(id)

        if (!post) {
            return res.status(404).json({
                message: 'Tarea no encontrada'
            })
        }

        post.update(req.body)

        return res.status(200).json(post)
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Error Server'
        })
    }
}

//controlador para eliminar una tarea
export const ctrlDeletePost = async (req, res) => {
    const { id } = req.params
    try {
        const postDeleted = await PostModel.destroy({
            where: {
                id: id
            }
        })
        if (!postDeleted) {
            return res.status(404).json({
                message: 'Tarea no encontrada'
            })
        }
        return res.status(200).json({
            message: 'Tarea eliminada'
        })
    } catch (error) {
        console.error(error)
        return res.status(500).json({
            message: 'Error Server'
        })
    }
}
