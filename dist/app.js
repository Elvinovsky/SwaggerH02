"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const posts_router_1 = require("./routers/posts-router");
const blogs_router_1 = require("./routers/blogs-router");
const Testing_Delete_router_1 = require("./routers/Testing-Delete-router");
const app = (0, express_1.default)();
const port = 3678;
app.use(body_parser_1.default.json());
app.use('/testing', Testing_Delete_router_1.deleteAllDataRouter);
app.use('/posts', posts_router_1.postsRouter);
app.use('/blogs', blogs_router_1.blogsRouter);
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});
