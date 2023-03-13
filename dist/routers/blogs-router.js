"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
const errorsArray_1 = require("../errors/errorsArray");
const authentication_middleware_1 = require("../middlewares/authentication-middleware");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', (req, res) => {
    const getAllBlogs = blogs_repository_1.blogsRepository.returnOfAllBlogs;
    res.send(getAllBlogs);
});
exports.blogsRouter.post('/', authentication_middleware_1.authenticationMiddleware, (req, res) => {
    errorsArray_1.errorsArray.errorsMessages = [];
    const checkRegEx = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (!req.body.websiteUrl
        || req.body.websiteUrl.length > 100
        || !checkRegEx.test(req.body.websiteUrl)) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "websiteUrl" });
    }
    if (!req.body.name
        || typeof req.body.name !== "string"
        || !req.body.name.trim()
        || req.body.name.length > 15) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "name" });
    }
    if (!req.body.description
        || typeof req.body.description !== "string"
        || !req.body.description.trim()
        || req.body.description.length > 500) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "description" });
    }
    if (errorsArray_1.errorsArray.errorsMessages.length > 0) {
        res.status(400).send(errorsArray_1.errorsArray);
    }
    const createdBlog = blogs_repository_1.blogsRepository.addNewBlog(req.body.name, req.body.description, req.body.websiteUrl);
    res.status(201).send(createdBlog);
});
exports.blogsRouter.get('/:id', (req, res) => {
    const getByIdBlog = blogs_repository_1.blogsRepository.findBlogById(req.params.id);
    if (!getByIdBlog) {
        res.sendStatus(404);
    }
    res.send(getByIdBlog);
});
exports.blogsRouter.put('/:id', authentication_middleware_1.authenticationMiddleware, (req, res) => {
    const searchBlogByIdForUpdate = blogs_repository_1.blogsRepository.findBlogById(req.params.id);
    if (!searchBlogByIdForUpdate) {
        res.sendStatus(404);
    }
    errorsArray_1.errorsArray.errorsMessages = [];
    const checkRegEx = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (!req.body.websiteUrl
        || !checkRegEx.test(req.body.websiteUrl)
        || req.body.websiteUrl.length > 100) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "websiteUrl" });
    }
    if (!req.body.name
        || typeof req.body.name !== "string"
        || !req.body.name.trim()
        || req.body.name.length > 15) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "name" });
    }
    if (!req.body.description
        || typeof req.body.description !== "string"
        || !req.body.description.trim()
        || req.body.description.length > 500) {
        errorsArray_1.errorsArray.errorsMessages.push({ message: "errors", field: "description" });
    }
    if (errorsArray_1.errorsArray.errorsMessages.length > 0) {
        res.status(400).send(errorsArray_1.errorsArray);
    }
    const foundBlogForUpdate = blogs_repository_1.blogsRepository.UpdateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (foundBlogForUpdate) {
        res.sendStatus(204);
    }
    else {
        res.status(304).send({ "errorMessages": "Unexpected Error" });
    }
});
exports.blogsRouter.delete('/:id', authentication_middleware_1.authenticationMiddleware, (req, res) => {
    const foundBlogDelete = blogs_repository_1.blogsRepository.searchBlogByIdDelete(req.params.id);
    if (!foundBlogDelete) {
        res.sendStatus(404);
    }
    res.sendStatus(204);
});
