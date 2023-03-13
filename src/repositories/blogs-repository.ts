import {db} from "../database/db";
export const blogsRepository = {
    //тестовое удаление базны данных о блогах.
    testingDeleteAllBlogs(){
        return db.allBlogs = []
    },
    //все существующие блоги.
    returnOfAllBlogs: db.allBlogs,
    //создание и добавление нового блога.
    addNewBlog(name: string, description:string, websiteUrl: string) {
        const createNewBlog = {
            id:	(+(new Date())).toString(),
            name: name,
            description: description,
            websiteUrl: websiteUrl
        }
        db.allBlogs.push(createNewBlog)
        return createNewBlog;
    },
    //поиск и возврат блога по ID.
    findBlogById(id: string) {
        return  db.allBlogs.find(el => el.id === id)
    },
    //обновление блога по айди.
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
    //поиск блога по ID для удаления.
    searchBlogByIdDelete(id: string) {
        const index = db.allBlogs.findIndex(b => b.id === id)
        if (index > -1) {
            db.allBlogs.splice(index, 1)
            return true;
        }
        return false;
    }
}
