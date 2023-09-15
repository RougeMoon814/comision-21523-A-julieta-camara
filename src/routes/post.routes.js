import { Router } from "express";
import { ctrlCreatePost, ctrlDeletePost, ctrlGetPosts, ctrlUpdatePost } from "../controllers/post.controllers.js";
import { createPostSchema, editPostSchema } from "../models/schemas/post.schema.js";
import { validator } from "../middlewares/validator.js"
import { PostModel } from "../models/Posts.js";

const postRouter = Router();

// endpoint para traer todas las tareas
postRouter.get('/api/posts', ctrlGetPosts)

// endpoint para crear una tarea
postRouter.post('/api/posts', createPostSchema, validator, ctrlCreatePost)

// endpoint para modificar una tarea
postRouter.put('/api/posts/:id', editPostSchema, validator, ctrlUpdatePost)

// endpoint para eliminar una tarea
postRouter.delete('/api/posts/:id', ctrlDeletePost)

export { postRouter }