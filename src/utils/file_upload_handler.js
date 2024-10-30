import multer from 'multer'

const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'uploads'); // Calls cb with null (indicating no error) and the 'uploads' folder
    },
    filename: (req, file, cb) => {
        cb(null, `${Date.now()}-${file.originalname}`); // Calls cb with null and a unique filename
    }
});

export const upload = multer({ 
    storage
})


