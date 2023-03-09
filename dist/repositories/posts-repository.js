"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const db_1 = require("../database/db");
exports.postsRepository = {
    testingDeleteAllPosts() {
        return db_1.db.allPosts = [];
    },
    returnOfAllPosts: db_1.db.allPosts,
    addNewPost(title, shortDescription, content, blogId) {
        const searchOutputBlogName = this.searchBlogIdForPost(blogId).name;
        const createNewPost = {
            id: (+(new Date())).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId: blogId,
            blogName: searchOutputBlogName
        };
        db_1.db.allPosts.push(createNewPost);
        return createNewPost;
    },
    findPostById(id) {
        return db_1.db.allPosts.find(el => el.id === id);
    },
    updatePostById(id, title, shortDescription, content, blogId) {
        if (this.findPostById(id)) {
            db_1.db.allPosts.forEach(el => {
                el.title = title;
                el.shortDescription = shortDescription;
                el.content = content;
                el.blogId = blogId;
            });
            return true;
        }
        return false;
    },
    searchBlogIdForPost(blogId) {
        const outputInPostRepository = db_1.db.allBlogs.find(el => el.id === blogId);
        return outputInPostRepository;
    },
    searchForPostByIdDelete(id) {
        const findDeletePost = db_1.db.allPosts.find(el => el.id === id);
        if (findDeletePost) {
            db_1.db.allPosts.forEach((id, index) => {
                if (id === findDeletePost) {
                    db_1.db.allPosts.splice(index, 1);
                }
            });
            return true;
        }
        return false;
    }
};
