import pool from "../database/db_connection.js"

export const createBlog = (request,response)=>{
    const authUser = request.user;
    const banner_image = request.file;
    const { title , category , type , description } = request.body;
    if (!title || !category || !type || !description || !banner_image){
        return response.json({
            message: "invalid input"
        })
    }else{
        const sql_getUserID = "Select id from users where username = ?";
        // console.log("Auth User:", authUser);
        pool.query(sql_getUserID,[authUser],(error,row)=>{
            if(error){
                return response.status(500).json({
                    message : "Something went wrong"
                })
            }
            const user_id = row[0].id;
            console.log(user_id);
            const sql = 'INSERT INTO blog (title,category,type,description,banner_image,user_id) values (?,?,?,?,?,?)';
            pool.query(sql,[title,category,type,description,banner_image.filename,user_id],(error, result) => {
                if (error) {
                    console.error("Error creating blog:",error);
                    return response.status(500).json({
                        message: "An error occurred while creating the blog",
                        error: error
                    });
                }
    
                return response.status(201).json({
                    message: "Blog created successfully",
                    userID : user_id,
                    data: {
                        blogId: result.insertId,
                        blogName : title,
                            
                    }
                })
            })
        })
     
    }
}
export const getBlogById = (request, response) => {
    const blogId = request.params.id;
    const authUser = request.user;
    pool.query("Select id from Users where username = ?",[authUser],(error,row)=>{
        if(error){
            return response.status(400).json({
                message : "an error occure while getting the blog"
            })
        }
        const userId = row[0].id; 
        const sql = "SELECT * FROM blog WHERE id = ? AND user_id = ?";
    
        pool.query(sql, [blogId, userId], (error, result) => {
            if (error) {
                return response.status(500).json({
                    message: "An error occurred"
                });
            }
    
            if (result.length === 0) {
                return response.status(404).json({
                    message: "Blog not found or you do not have permission to view it"
                });
            }
    
            return response.status(200).json({
                message: "Blog found",
                data: result[0]
            });
        });
    })

};

export const getAllBlog = (request,response) => {
    const authUserID = request.userID;
    // console.log(authUserID);
    
    const sql = "Select * from blog where blog.user_id = ?";
    pool.query(sql,[authUserID],(error,result)=>{
        if(error){
            return response.status(404).json({
                message : "there was an error occure while retriving the blogs"
            })
        }
        if(result){
            return response.status(200).json({
                message : result
            })
        }
    })
}

export const updateBlog = (request,response)=>{
    const authUserID = request.userID;
    const banner_image = request.file;
    const blogId = request.params.id;
    const { title,category,type,description } = request.body;

    const sql = "Update blog  SET title = ?, category = ?, type = ?, description = ?, banner_image = ? WHERE id = ? AND user_id = ?";


    pool.query(sql,[title,category,type,description,banner_image.filename,blogId,authUserID],(error,result)=>{
        if(error){
            console.log(error);
            return response.status(500).json({
                message : "an error occured"
            });
        }

        if (result.affectedRows === 0) {
            return response.status(404).json({
                message: "Blog not found or you are not authorized to access that blog"
            });
        }

        return response.status(200).json({
            message : "Blog updated successfully",
            data : {
                blogId,
                title,
                category,
                type,
                description,
                banner_image: banner_image.filename 
            }
            
        })
    })
}

export const deleteBlog = (request,response) =>{
    const authUserID = request.userID;
    const id = request.params.id
    const sql = "Delete from blog where id = ? and user_id = ?";
    pool.query(sql,[id,authUserID],(error,result)=>{
        if(error){
            console.log(error);
            return response.status(500).json({
                message : "an error occured"
            });
        }
        if(result.affectedRows == 0){
            return response.status(404).json({
                message : "Blog not found or you are not authorized to modify this blog!"
            })
        }
        return response.status(200).json({
            message : "Blog deleted successfully"
        })
    })

}