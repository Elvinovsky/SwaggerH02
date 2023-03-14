import {Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {errorsArray} from "../errors/errorsArray";
import {authenticationMiddleware} from "../middlewares/authentication-middleware";
import {RequestInputBody, RequestParamsAndInputBody, ResponseViewBody, RequestParamsId} from "../req-res-types";
import {blogInputModel} from "../models/modelsBlogs/blogInputModel";
import {blogViewModel} from "../models/modelsBlogs/blogViewModel";
import {ErrorsMessages} from "../models/modelsErrorsArray/ErrorsMessages";

export const blogsRouter = Router ()


blogsRouter.get('/', (req: Request, res: Response) => {
   const getAllBlogs: blogViewModel[] = blogsRepository.returnOfAllBlogs
    res.send(getAllBlogs)
})
blogsRouter.post('/',  authenticationMiddleware,
                             (req: RequestInputBody<blogInputModel>,
                              res: ResponseViewBody<blogViewModel | ErrorsMessages>) => {
    errorsArray.errorsMessages = []

    const checkRegEx: RegExp = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    if(!req.body.websiteUrl
        || req.body.websiteUrl.length > 100
        || !checkRegEx.test(req.body.websiteUrl)) {
        errorsArray.errorsMessages.push({ message: "errors", field: "websiteUrl"})
    }
    if(!req.body.name
        || typeof req.body.name !== "string"
        || !req.body.name.trim()
        || req.body.name.length > 15) {
        errorsArray.errorsMessages.push({ message: "errors", field: "name"})
    }
    if(!req.body.description
        || typeof req.body.description !== "string"
        || !req.body.description.trim()
        || req.body.description.length > 500) {
        errorsArray.errorsMessages.push({ message: "errors", field: "description"})
    }
    if(errorsArray.errorsMessages.length > 0) {
        res.status(400).send(errorsArray)
    }
    const createdBlog: blogViewModel = blogsRepository.addNewBlog(req.body.name,req.body.description,req.body.websiteUrl)
    res.status(201).send(createdBlog)
})
blogsRouter.get('/:id', (req: RequestParamsId<{ id: string }>,
                                       res: ResponseViewBody<blogViewModel>) => {
    const getByIdBlog = blogsRepository.findBlogById(req.params.id)
    if(!getByIdBlog) {
        res.sendStatus(404)
    }
    res.send(getByIdBlog)
})
blogsRouter.put('/:id', authenticationMiddleware,
                              (req: RequestParamsAndInputBody<{ id: string },blogInputModel>,
                               res: ResponseViewBody<ErrorsMessages>) => {

    const searchBlogByIdForUpdate = blogsRepository.findBlogById(req.params.id)
    if(!searchBlogByIdForUpdate) {
        res.sendStatus(404)
    }
    errorsArray.errorsMessages = [];

    const checkRegEx = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    if(!req.body.websiteUrl
        || !checkRegEx.test(req.body.websiteUrl)
        || req.body.websiteUrl.length > 100) {
        errorsArray.errorsMessages.push({ message: "errors", field: "websiteUrl" })
    }
    if(!req.body.name
        || typeof req.body.name !== "string"
        || !req.body.name.trim()
        || req.body.name.length > 15) {
        errorsArray.errorsMessages.push({ message: "errors", field: "name"})
    }
    if(!req.body.description
        || typeof req.body.description !== "string"
        || !req.body.description.trim()
        || req.body.description.length > 500) {
        errorsArray.errorsMessages.push({ message: "errors", field: "description"})
    }
    if(errorsArray.errorsMessages.length > 0) {
        res.status(400).send(errorsArray)
    }
    const foundBlogForUpdate = blogsRepository
          .updateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)

    if(foundBlogForUpdate) {
        res.sendStatus(204)
    }
})
blogsRouter.delete('/:id', authenticationMiddleware,
                                 (req: RequestParamsId<{ id: string }>,
                                  res: Response) => {
    const foundBlogDelete = blogsRepository.searchBlogByIdDelete(req.params.id)
    if(!foundBlogDelete) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
})

