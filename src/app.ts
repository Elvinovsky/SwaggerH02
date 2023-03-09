import express from 'express'
import bodyParser from "body-parser";
import {postsRouter} from "./routers/posts-router";
import {blogsRouter} from "./routers/blogs-router";
import {deleteAllDataRouter} from "./routers/Testing-Delete-router";

const app = express()
const port = 3078

app.use(bodyParser())
app.use('/posts', postsRouter)
app.use('/blogs', blogsRouter)
app.use('/testing', deleteAllDataRouter)
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})

