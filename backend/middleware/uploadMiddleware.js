import multer from "multer";
import path from "path";

//cb -> callback function
const storage = multer.diskStorage({
    destination(req,fils,cb){
        cb(null,"uploads/");
    },
    filename(req,file,cb){
        const ext = path.extname(file.originalname);
        const sessionId=req.params.id || 'unknown';
        cb(null,`${sessionId}-${Date.now()}${ext}`); //photo.png ->time-photo.png(rename)
        
    },
})

const fileFilter = (req,file,cb) =>{
    if(file.mimetype.startsWith("audio/") || file.mimetype === "application/octet-stream")
    {
        cb(null,true);
    }else{
        cb(new Error('Not an audio file'),false);
    }
};

const upload = multer({
    storage:storage,
    fileFilter : fileFilter,
    limits : {fileSize:1024 * 1024 *10},
});

const uploadSingleAudio = upload.single('audio');
export {uploadSingleAudio};