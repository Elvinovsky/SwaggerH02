import {db} from "../database/db";
export const blogsRepository = {
    testingDeleteAllBlogs(){
        return db.allBlogs = []
    },
    returnOfAllBlogs: db.allBlogs,
    addNewBlog(name: string, description:string, websiteUrl: string) {
        const createNewBlog = {
            id:	(+(new Date())).toString(13),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        db.allBlogs.push(createNewBlog)
        return createNewBlog;
    },
    findBlogById(id: string) {
        return  db.allBlogs.find(el => el.id === id)
    },
    UpdateBlogById(id: string, name: string, description: string, websiteUrl: string) {
        if(this.findBlogById(id)){
            db.allBlogs.forEach(el => {
                el.name = name
                el.description = description
                el.websiteUrl = websiteUrl
            })
            return true;
        }
            return false;
    },
    searchForBlogByIdDelete(id: string) {
        const findDeleteBlog = db.allBlogs.find(el => el.id === id)
        if(findDeleteBlog) {
            db.allBlogs.forEach((id, index) => {
                if (id === findDeleteBlog) {
                    db.allBlogs.splice(index, 1);
                }
            })
            return true;
        }
        return false;
    }
}