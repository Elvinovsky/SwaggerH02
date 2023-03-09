import {NextFunction,Request, Response, Router} from "express";
import {postsRepository} from "../repositories/posts-repository";
import {checkErrors} from "../errors/check-errors";

const authGuardMiddleware = ((req: Request, res: Response, next: NextFunction) => {

    // -----------------------------------------------------------------------
    // authentication middleware

    const auth = {login: 'admin', password: 'qwerty'} // change this

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (req.headers.authorization === 'Basic YWRtaW46cXdlcnR5' && login && password && login === auth.login && password === auth.password) {
        // Access granted...
        return next();
    }

    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"') // change this
    res.status(401).send('Authentication required.') // custom message

    // -----------------------------------------------------------------------

})
export const postsRouter = Router()

postsRouter.get('/', (req: Request, res: Response) => {
    const getAllPosts = postsRepository.returnOfAllPosts
    res.send(getAllPosts)})
postsRouter.post('/', authGuardMiddleware, (req: Request, res: Response) => {
    checkErrors.errorsMessages = [];
    if(!req.body.shortDescription
        || typeof req.body.shortDescription !== "string"
        || !req.body.shortDescription.trim()
        || req.body.shortDescription.length > 100 ) {
        checkErrors.errorsMessages.push({message: "errors", field: "shortDescription"})
    }
    if(!req.body.title
        || typeof req.body.title !== "string"
        || !req.body.title.trim()
        || req.body.title.length > 30) {
        checkErrors.errorsMessages.push( {message: "errors", field: "title"})
    }
    if(!req.body.content
        || typeof req.body.content !== "string"
        || !req.body.content.trim()
        || req.body.content.length > 1000) {
        checkErrors.errorsMessages.push( {message: "errors", field: "content"})
    }
    const validationInputBlogId = postsRepository.searchBlogIdForPost(req.body.blogId)
    if(!req.body.blogId
        || typeof req.body.blogId !== "string"
        || !validationInputBlogId) {
        checkErrors.errorsMessages.push( {message: "errors", field: "blogId"})
    }
    if(checkErrors.errorsMessages.length > 0) {
        res.status(400).send(checkErrors)
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
postsRouter.put('/:id', authGuardMiddleware, (req: Request, res: Response) => {
    const searchPostByIdForUpdate = postsRepository.findPostById(req.params.id)
    if(!searchPostByIdForUpdate) {
        res.sendStatus(404)
    }
    checkErrors.errorsMessages = [];
    if(!req.body.shortDescription
        || typeof req.body.shortDescription !== "string"
        || !req.body.shortDescription.trim()
        || req.body.shortDescription.length > 100 ) {
        checkErrors.errorsMessages.push( {message: "errors", field: "shortDescription"})
    }
    if(!req.body.title
        || typeof req.body.title !== "string"
        || !req.body.title.trim()
        || req.body.title.length > 30) {
        checkErrors.errorsMessages.push( {message: "errors", field: "title"})
    }
    if(!req.body.content
        || typeof req.body.content !== "string"
        || !req.body.content.trim()
        || req.body.content.length > 1000) {
        checkErrors.errorsMessages.push( {message: "errors", field: "content"})
    }
const validationInputBlogId = postsRepository.searchBlogIdForPost(req.body.blogId)
    if(!req.body.blogId
        || typeof req.body.blogId !== "string"
        || !validationInputBlogId) {
        checkErrors.errorsMessages.push( {message: "errors", field: "blogId"})
    }
    if(checkErrors.errorsMessages.length > 0) {
        res.status(400).send(checkErrors)
    }
   const foundPostForUpdate = postsRepository.updatePostById(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId)
    if(foundPostForUpdate) {
        res.sendStatus(204)
    } else {
        res.status (304).send({"errorMessages": "Unexpected Error"})
    }
})
postsRouter.delete('/:id', authGuardMiddleware, (req: Request, res: Response) => {
    const foundPostDelete = postsRepository.searchForPostByIdDelete(req.params.id)
    if(!foundPostDelete) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
})