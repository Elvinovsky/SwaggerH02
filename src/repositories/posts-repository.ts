import {db} from "../database/db";
export const postsRepository = {
    testingDeleteAllPosts(){
       return db.allPosts = []
    },
    returnOfAllPosts: db.allPosts,
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
    findPostById(id: string) {
        return  db.allPosts.find(el => el.id === id)
    },
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
    searchBlogIdForPost(blogId: string) {
        const outputInPostRepository = db.allBlogs.find(el => el.id === blogId)
        return outputInPostRepository
    },
    searchForPostByIdDelete(id: string) {
        const findDeletePost = db.allPosts.find(el => el.id === id)
        if(findDeletePost) {
            db.allPosts.forEach((id, index) => {
                if (id === findDeletePost) {
                    db.allPosts.splice(index, 1);
                }
            })
            return true;
        }
        return false;
    }

}