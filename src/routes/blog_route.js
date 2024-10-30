import { Router } from "express"
import { createBlog, deleteBlog, getAllBlog, getBlogById, updateBlog } from "../controller/blog_controller.js";
import verifyToken from "../utils/verify_token.js";
import { upload } from "../utils/file_upload_handler.js";

const blogRouter = Router();
//Only when the user have token (receive after login) can access this route
blogRouter.use(verifyToken)

blogRouter.post('/createBlog',upload.single('banner_image'), createBlog);
blogRouter.get('/getBlogById/:id',getBlogById);
blogRouter.get('/getAllBlogs',getAllBlog);
blogRouter.put('/updateBlog/:id',upload.single('banner_image'),updateBlog);
blogRouter.delete('/deleteBlog/:id',deleteBlog);

export default blogRouter;
