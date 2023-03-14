"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRouter = void 0;
const express_1 = require("express");
const posts_repository_1 = require("../repositories/posts-repository");
const errorsArray_1 = require("../errors/errorsArray");
const authentication_middleware_1 = require("../middlewares/authentication-middleware");
exports.postsRouter = (0, express_1.Router)();
exports.postsRouter.get('/', (req, res) => {
    const getAllPosts = posts_repository_1.postsRepository.returnOfAllPosts;
    res.send(getAllPosts);
});
exports.postsRouter.post('/', authentication_middleware_1.authenticationMiddleware, (req, res) => {
    errorsArray_1.errorsArray.errorsMessages = [];
    if (!req.body.shortDescription
        || typeof req.body.shortDescription !== "string"
        || !req.body.shortDescription.trim()
        || req.body.shortDescription.length > 100) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "shortDescription" });
    }
    if (!req.body.title
        || typeof req.body.title !== "string"
        || !req.body.title.trim()
        || req.body.title.length > 30) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "title" });
    }
    if (!req.body.content
        || typeof req.body.content !== "string"
        || !req.body.content.trim()
        || req.body.content.length > 1000) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "content" });
    }
    const validationInputBlogId = posts_repository_1.postsRepository.searchBlogIdForPost(req.body.blogId);
    if (!req.body.blogId
        || typeof req.body.blogId !== "string"
        || !validationInputBlogId) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "blogId" });
    }
    if (errorsArray_1.errorsArray.errorsMessages.length > 0) {
        res.status(400).send(errorsArray_1.errorsArray);
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
exports.postsRouter.put('/:id', authentication_middleware_1.authenticationMiddleware, (req, res) => {
    const searchPostByIdForUpdate = posts_repository_1.postsRepository.findPostById(req.params.id);
    if (!searchPostByIdForUpdate) {
        res.sendStatus(404);
    }
    errorsArray_1.errorsArray.errorsMessages = [];
    if (!req.body.shortDescription
        || typeof req.body.shortDescription !== "string"
        || !req.body.shortDescription.trim()
        || req.body.shortDescription.length > 100) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "shortDescription" });
    }
    if (!req.body.title
        || typeof req.body.title !== "string"
        || !req.body.title.trim()
        || req.body.title.length > 30) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "title" });
    }
    if (!req.body.content
        || typeof req.body.content !== "string"
        || !req.body.content.trim()
        || req.body.content.length > 1000) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "content" });
    }
    const validationInputBlogId = posts_repository_1.postsRepository.searchBlogIdForPost(req.body.blogId);
    if (!req.body.blogId
        || typeof req.body.blogId !== "string"
        || !validationInputBlogId) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "blogId" });
    }
    if (errorsArray_1.errorsArray.errorsMessages.length > 0) {
        res.status(400).send(errorsArray_1.errorsArray);
    }
    const foundPostForUpdate = posts_repository_1.postsRepository
        .updatePostById(req.params.id, req.body.title, req.body.shortDescription, req.body.content, req.body.blogId);
    if (foundPostForUpdate) {
        res.sendStatus(204);
    }
});
exports.postsRouter.delete('/:id', authentication_middleware_1.authenticationMiddleware, (req, res) => {
    const foundPostDelete = posts_repository_1.postsRepository.searchForPostByIdDelete(req.params.id);
    if (!foundPostDelete) {
        res.sendStatus(404);
    }
    res.sendStatus(204);
});
