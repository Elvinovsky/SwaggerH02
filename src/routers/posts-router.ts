import {Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {errorsArray} from "../errors/errorsArray";
import {authenticationMiddleware} from "../middlewares/authentication-middleware";

export const postsRouter = Router()

postsRouter.get('/', (req: Request, res: Response) => {
    const getAllPosts = postsRepository.returnOfAllPosts
    res.send(getAllPosts)})
postsRouter.post('/', (req: Request, res: Response) => {
    errorsArray.errorsMessages = [];
    if(!req.body.shortDescription
        || typeof req.body.shortDescription !== "string"
        || !req.body.shortDescription.trim()
        || req.body.shortDescription.length > 100 ) {
        errorsArray.errorsMessages.push({message: "errors", field: "shortDescription"})
    }
    if(!req.body.title
        || typeof req.body.title !== "string"
        || !req.body.title.trim()
        || req.body.title.length > 30) {
        errorsArray.errorsMessages.push( {message: "errors", field: "title"})
    }
    if(!req.body.content
        || typeof req.body.content !== "string"
        || !req.body.content.trim()
        || req.body.content.length > 1000) {
        errorsArray.errorsMessages.push( {message: "errors", field: "content"})
    }
    const validationInputBlogId = postsRepository.searchBlogIdForPost(req.body.blogId)
    if(!req.body.blogId
        || typeof req.body.blogId !== "string"
        || !validationInputBlogId) {
        errorsArray.errorsMessages.push( {message: "errors", field: "blogId"})
    }
    if(errorsArray.errorsMessages.length > 0) {
        res.status(400).send(errorsArray)
    }
    const createdNewPost = postsRepository.addNewPost
    (req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    res.status(201).send(createdNewPost)
})
postsRouter.get('/:id', (req: Request, res: Response) => {
    const getByIdPost = postsRepository.findPostById(req.params.id)
    if(!getByIdPost) {
        res.sendStatus(404)
    }
    res.send(getByIdPost)
})
postsRouter.put('/:id', authenticationMiddleware, (req: Request, res: Response) => {
    const searchPostByIdForUpdate = postsRepository.findPostById(req.params.id)
    if(!searchPostByIdForUpdate) {
        res.sendStatus(404)
    }
    errorsArray.errorsMessages = [];
    if(!req.body.shortDescription
        || typeof req.body.shortDescription !== "string"
        || !req.body.shortDescription.trim()
        || req.body.shortDescription.length > 100 ) {
        errorsArray.errorsMessages.push( {message: "errors", field: "shortDescription"})
    }
    if(!req.body.title
        || typeof req.body.title !== "string"
        || !req.body.title.trim()
        || req.body.title.length > 30) {
        errorsArray.errorsMessages.push( {message: "errors", field: "title"})
    }
    if(!req.body.content
        || typeof req.body.content !== "string"
        || !req.body.content.trim()
        || req.body.content.length > 1000) {
        errorsArray.errorsMessages.push( {message: "errors", field: "content"})
    }
const validationInputBlogId = postsRepository.searchBlogIdForPost(req.body.blogId)
    if(!req.body.blogId
        || typeof req.body.blogId !== "string"
        || !validationInputBlogId) {
        errorsArray.errorsMessages.push( {message: "errors", field: "blogId"})
    }
    if(errorsArray.errorsMessages.length > 0) {
        res.status(400).send(errorsArray)
    }
   const foundPostForUpdate = postsRepository.updatePostById(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    if(foundPostForUpdate) {
        res.sendStatus(204)
    } else {
        res.status (304).send({"errorMessages": "Unexpected Error"})
    }
})
postsRouter.delete('/:id', authenticationMiddleware, (req: Request, res: Response) => {
    const foundPostDelete = postsRepository.searchForPostByIdDelete(req.params.id)
    if(!foundPostDelete) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
})