"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.postsRepository = void 0;
const db_1 = require("../database/db");
exports.postsRepository = {
    // тестовое удаление базы данных Постовю
    testingDeleteAllPosts() {
        return db_1.db.allPosts = [];
    },
    // все существующие посты.
    returnOfAllPosts: db_1.db.allPosts,
    //создание и добавление нового поста в базу данных.
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
    //поиск поста по ID.
    findPostById(id) {
        return db_1.db.allPosts.find(el => el.id === id);
    },
    // обновление поста по ID.
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
    //поиск ID блога для поста.
    searchBlogIdForPost(blogId) {
        const validatorBlogId = db_1.db.allBlogs.find(el => el.id === blogId);
        return validatorBlogId;
    },
    // поиск и удаление поста по ID.
    searchForPostByIdDelete(id) {
        const index = db_1.db.allBlogs.findIndex(b => b.id === id);
        if (index > -1) {
            db_1.db.allBlogs.splice(index, 1);
            return true;
        }
        return false;
    }
};
