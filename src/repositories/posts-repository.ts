import {db} from "../database/db";
export const postsRepository = {
    // тестовое удаление базы данных Постовю
    testingDeleteAllPosts(){
       return db.allPosts = []
    },
    // все существующие посты.
    returnOfAllPosts: db.allPosts,
    //создание и добавление нового поста в базу данных.
    addNewPost(title: string, shortDescription: string, content: string, blogId: string) {
        const searchOutputBlogName = this.searchBlogIdForPost(blogId)!.name
        const createNewPost = {
            id: (+(new Date())).toString(),
            title: title,
            shortDescription: shortDescription,
            content: content,
            blogId:	blogId,
            blogName: searchOutputBlogName
        }
        db.allPosts.push(createNewPost)
        return createNewPost;
    },
    //поиск поста по ID.
    findPostById(id: string) {
        return  db.allPosts.find(el => el.id === id)
    },
    // обновление поста по ID.
    updatePostById(id: string, title: string, shortDescription: string, content: string, blogId: string) {
        if(this.findPostById(id)){
            db.allPosts.forEach(el => {
                el.title = title
                el.shortDescription = shortDescription
                el.content = content
                el.blogId = blogId
            })
            return true;
        }
        return false;
    },
    //поиск ID блога для поста.
    searchBlogIdForPost(blogId: string) {
        const validatorBlogId = db.allBlogs.find(el => el.id === blogId)
        return validatorBlogId;
    },
    // поиск и удаление поста по ID.
    searchForPostByIdDelete(id: string) {
        const index = db.allBlogs.findIndex(b => b.id === id)
        if (index > -1) {
            db.allBlogs.splice(index, 1)
            return true;
        }
        return false;
    }
}