"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.blogsRepository = void 0;
const db_1 = require("../database/db");
exports.blogsRepository = {
    testingDeleteAllBlogs() {
        return db_1.db.allBlogs = [];
    },
    returnOfAllBlogs: db_1.db.allBlogs,
    addNewBlog(name, description, websiteUrl) {
        const createNewBlog = {
            id: (+(new Date())).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        };
        db_1.db.allBlogs.push(createNewBlog);
        return createNewBlog;
    },
    findBlogById(id) {
        return db_1.db.allBlogs.find(el => el.id === id);
    },
    UpdateBlogById(id, name, description, websiteUrl) {
        if (this.findBlogById(id)) {
            db_1.db.allBlogs.forEach(el => {
                el.name = name;
                el.description = description;
                el.websiteUrl = websiteUrl;
            });
            return true;
        }
        return false;
    },
    searchForBlogByIdDelete(id) {
        const findDeleteBlog = db_1.db.allBlogs.find(el => el.id === id);
        if (findDeleteBlog) {
            db_1.db.allBlogs.forEach((id, index) => {
                if (id === findDeleteBlog) {
                    db_1.db.allBlogs.splice(index, 1);
                }
            });
            return true;
        }
        return false;
    }
};
