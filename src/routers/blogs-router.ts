import {NextFunction, Request, Response, Router} from "express";
import {blogsRepository} from "../repositories/blogs-repository";
import {checkErrors} from "../errors/check-errors";

const authGuardMiddleware = ((req: Request, res: Response, next: NextFunction) => {

    // -----------------------------------------------------------------------
    // authentication middleware

    const auth = {login: 'admin', password: 'qwerty'} // change this

    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || ''
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':')

    // Verify login and password are set and correct
    if (login && password && login === auth.login && password === auth.password) {
        // Access granted...
        return next()
    }

    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"') // change this
    res.status(401).send('Authentication required.') // custom message

    // -----------------------------------------------------------------------

})
export const blogsRouter = Router ()


blogsRouter.get('/', (req: Request, res: Response) => {
   const getAllBlogs = blogsRepository.returnOfAllBlogs
    res.send(getAllBlogs)
})
blogsRouter.post('/', authGuardMiddleware, (req: Request, res: Response) => {
    checkErrors.errorsMessages = []

    if(!req.body.name
        || typeof req.body.name !== "string"
        || !req.body.name.trim()
        || req.body.name.length > 15) {
        checkErrors.errorsMessages.push({messages: "errors", field: "name"})
    }
    if(!req.body.description
        || typeof req.body.description !== "string"
        || !req.body.description.trim()
        || req.body.description.length > 500) {
        checkErrors.errorsMessages.push({messages: "errors", field: "description"})
    }

    const checkRegEx = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    if(!req.body.websiteUrl
        || !checkRegEx.test(req.body.websiteUrl
            || req.body.websiteUrl.length > 100)) {
        checkErrors.errorsMessages.push({messages: "errors", field: "websiteUrl"})
    }
    if(checkErrors.errorsMessages.length > 0) {
        res.status(400).send(checkErrors)
    }
    const createdBlog = blogsRepository.addNewBlog(req.body.name,req.body.description,req.body.websiteUrl)
    res.status(201).send(createdBlog)
})
blogsRouter.get('/:id', (req: Request, res: Response) => {
    const getByIdBlog = blogsRepository.findBlogById(req.params.id)
    if(!getByIdBlog) {
        res.sendStatus(404)
    }
    res.send(getByIdBlog)
})
blogsRouter.put('/:id', authGuardMiddleware, (req: Request, res: Response) => {
    const searchBlogByIdForUpdate = blogsRepository.findBlogById(req.params.id)
    if(!searchBlogByIdForUpdate) {
        res.sendStatus(404)
    }
    checkErrors.errorsMessages = []

    if(!req.body.name
        || typeof req.body.name !== "string"
        || !req.body.name.trim()
        || req.body.name.length > 15) {
        checkErrors.errorsMessages.push({messages: "errors", field: "name"})
    }
    if(!req.body.description
        || typeof req.body.description !== "string"
        || !req.body.description.trim()
        || req.body.description.length > 500) {
        checkErrors.errorsMessages.push({messages: "errors", field: "description"})
    }
    const checkRegEx = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/
    if(!req.body.websiteUrl
        || !checkRegEx.test(req.body.websiteUrl)
        || req.body.websiteUrl.length > 100) {
        checkErrors.errorsMessages.push({messages: "errors", field: "websiteUrl"})
    }
    if(checkErrors.errorsMessages.length > 0) {
        res.status(400).send(checkErrors)
    }
    const foundBlogForUpdate = blogsRepository.UpdateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl)
    if(foundBlogForUpdate) {
        res.sendStatus(204)
    } else {
        res.status (304).send({"errorMessages": "Unexpected Error"})
    }
})
blogsRouter.delete('/:id', authGuardMiddleware, (req: Request, res: Response) => {
    const foundBlogDelete = blogsRepository.searchForBlogByIdDelete(req.params.id)
    if(!foundBlogDelete) {
        res.sendStatus(404)
    }
    res.sendStatus(204)
})

