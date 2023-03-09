"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRouter = void 0;
const express_1 = require("express");
const blogs_repository_1 = require("../repositories/blogs-repository");
const check_errors_1 = require("../errors/check-errors");
exports.blogsRouter = (0, express_1.Router)();
exports.blogsRouter.get('/', (req, res) => {
    const getAllBlogs = blogs_repository_1.blogsRepository.returnOfAllBlogs;
    res.send(getAllBlogs);
});
exports.blogsRouter.post('/', (req, res) => {
    check_errors_1.checkErrors.errorsMessages = [];
    if (!req.body.name
        || typeof req.body.name !== "string"
        || !req.body.name.trim()
        || req.body.name.length > 15) {
        check_errors_1.checkErrors.errorsMessages.push({ messages: "errors", field: "name" });
    }
    if (!req.body.description
        || typeof req.body.description !== "string"
        || !req.body.description.trim()
        || req.body.description.length > 500) {
        check_errors_1.checkErrors.errorsMessages.push({ messages: "errors", field: "description" });
    }
    const checkRegEx = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (!req.body.websiteUrl
        || !checkRegEx.test(req.body.websiteUrl
            || req.body.websiteUrl.length > 100)) {
        check_errors_1.checkErrors.errorsMessages.push({ messages: "errors", field: "websiteUrl" });
    }
    if (check_errors_1.checkErrors.errorsMessages.length > 0) {
        res.status(400).send(check_errors_1.checkErrors);
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
exports.blogsRouter.put('/:id', (req, res) => {
    const searchBlogByIdForUpdate = blogs_repository_1.blogsRepository.findBlogById(req.params.id);
    if (!searchBlogByIdForUpdate) {
        res.sendStatus(404);
    }
    check_errors_1.checkErrors.errorsMessages = [];
    if (!req.body.name
        || typeof req.body.name !== "string"
        || !req.body.name.trim()
        || req.body.name.length > 15) {
        check_errors_1.checkErrors.errorsMessages.push({ messages: "errors", field: "name" });
    }
    if (!req.body.description
        || typeof req.body.description !== "string"
        || !req.body.description.trim()
        || req.body.description.length > 500) {
        check_errors_1.checkErrors.errorsMessages.push({ messages: "errors", field: "description" });
    }
    const checkRegEx = /^(http(s)?:\/\/)[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\(\)\*\+,;=.]+$/;
    if (!req.body.websiteUrl
        || !checkRegEx.test(req.body.websiteUrl)
        || req.body.websiteUrl.length > 100) {
        check_errors_1.checkErrors.errorsMessages.push({ messages: "errors", field: "websiteUrl" });
    }
    if (check_errors_1.checkErrors.errorsMessages.length > 0) {
        res.status(400).send(check_errors_1.checkErrors);
    }
    const foundBlogForUpdate = blogs_repository_1.blogsRepository.UpdateBlogById(req.params.id, req.body.name, req.body.description, req.body.websiteUrl);
    if (foundBlogForUpdate) {
        res.sendStatus(204);
    }
    else {
        res.status(304).send({ "errorMessages": "Unexpected Error" });
    }
});
exports.blogsRouter.delete('/:id', (req, res) => {
    const foundBlogDelete = blogs_repository_1.blogsRepository.searchForBlogByIdDelete(req.params.id);
    if (!foundBlogDelete) {
        res.sendStatus(404);
    }
    res.sendStatus(204);
});
