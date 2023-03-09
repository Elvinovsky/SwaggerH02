"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const check_errors_1 = require("../errors/check-errors");
const authGuardMiddleware = ((req, res, next) => {
    // -----------------------------------------------------------------------
    // authentication middleware
    const auth = { login: 'admin', password: 'qwerty' }; // change this
    // parse login and password from headers
    const b64auth = (req.headers.authorization || '').split(' ')[1] || '';
    const [login, password] = Buffer.from(b64auth, 'base64').toString().split(':');
    // Verify login and password are set and correct
    if (req.headers.authorization === 'Basic YWRtaW46cXdlcnR5' && login && password && login === auth.login && password === auth.password) {
        // Access granted...
        return next();
    }
    // Access denied...
    res.set('WWW-Authenticate', 'Basic realm="401"'); // change this
    res.status(401).send('Authentication required.'); // custom message
    // -----------------------------------------------------------------------
});
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', (req, res) => {
    const getAllPosts = posts_repository_1.postsRepository.returnOfAllPosts;
    res.send(getAllPosts);
});
exports.postsRouter.post('/', authGuardMiddleware, (req, res) => {
    check_errors_1.checkErrors.errorsMessages = [];
    if (!req.body.shortDescription
        || typeof req.body.shortDescription !== "string"
        || !req.body.shortDescription.trim()
        || req.body.shortDescription.length > 100) {
        check_errors_1.checkErrors.errorsMessages.push({ message: "errors", field: "shortDescription" });
    }
    if (!req.body.title
        || typeof req.body.title !== "string"
        || !req.body.title.trim()
        || req.body.title.length > 30) {
        check_errors_1.checkErrors.errorsMessages.push({ message: "errors", field: "title" });
    }
    if (!req.body.content
        || typeof req.body.content !== "string"
        || !req.body.content.trim()
        || req.body.content.length > 1000) {
        check_errors_1.checkErrors.errorsMessages.push({ message: "errors", field: "content" });
    }
    const validationInputBlogId = posts_repository_1.postsRepository.searchBlogIdForPost(req.body.blogId);
    if (!req.body.blogId
        || typeof req.body.blogId !== "string"
        || !validationInputBlogId) {
        check_errors_1.checkErrors.errorsMessages.push({ message: "errors", field: "blogId" });
    }
    if (check_errors_1.checkErrors.errorsMessages.length > 0) {
        res.status(400).send(check_errors_1.checkErrors);
    }
    const createdNewPost = posts_repository_1.postsRepository.addNewPost(req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    res.status(201).send(createdNewPost);
});
exports.postsRouter.get('/:id', (req, res) => {
    const getByIdPost = posts_repository_1.postsRepository.findPostById(req.params.id);
    if (!getByIdPost) {
        res.sendStatus(404);
    }
    res.send(getByIdPost);
});
exports.postsRouter.put('/:id', authGuardMiddleware, (req, res) => {
    const searchPostByIdForUpdate = posts_repository_1.postsRepository.findPostById(req.params.id);
    if (!searchPostByIdForUpdate) {
        res.sendStatus(404);
    }
    check_errors_1.checkErrors.errorsMessages = [];
    if (!req.body.shortDescription
        || typeof req.body.shortDescription !== "string"
        || !req.body.shortDescription.trim()
        || req.body.shortDescription.length > 100) {
        check_errors_1.checkErrors.errorsMessages.push({ message: "errors", field: "shortDescription" });
    }
    if (!req.body.title
        || typeof req.body.title !== "string"
        || !req.body.title.trim()
        || req.body.title.length > 30) {
        check_errors_1.checkErrors.errorsMessages.push({ message: "errors", field: "title" });
    }
    if (!req.body.content
        || typeof req.body.content !== "string"
        || !req.body.content.trim()
        || req.body.content.length > 1000) {
        check_errors_1.checkErrors.errorsMessages.push({ message: "errors", field: "content" });
    }
    const validationInputBlogId = posts_repository_1.postsRepository.searchBlogIdForPost(req.body.blogId);
    if (!req.body.blogId
        || typeof req.body.blogId !== "string"
        || !validationInputBlogId) {
        check_errors_1.checkErrors.errorsMessages.push({ message: "errors", field: "blogId" });
    }
    if (check_errors_1.checkErrors.errorsMessages.length > 0) {
        res.status(400).send(check_errors_1.checkErrors);
    }
    const foundPostForUpdate = posts_repository_1.postsRepository.updatePostById(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (foundPostForUpdate) {
        res.sendStatus(204);
    }
    else {
        res.status(304).send({ "errorMessages": "Unexpected Error" });
    }
});
exports.postsRouter.delete('/:id', authGuardMiddleware, (req, res) => {
    const foundPostDelete = posts_repository_1.postsRepository.searchForPostByIdDelete(req.params.id);
    if (!foundPostDelete) {
        res.sendStatus(404);
    }
    res.sendStatus(204);
});
