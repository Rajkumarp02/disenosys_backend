const multer = require("multer")

 const storage = multer.diskStorage({
    destination: function(req,file,cb){
        cb(null,"./uploads/")
    },
    filename: function(req,file,cb)
    {
        cb(null,file.originalname)
    }
})
let upload = multer({ storage: storage }); 
let uploadHandler = upload.single('file');

exports.CourseImageUpload = async(req,res,next)=>{

    console.log(req.file)
    uploadHandler(req, res, function(err){
        if(err instanceof multer.MulterError){
            if(err.code == 'LIMIT_FILE_SIZE'){
                res.status(400).json({message : "Maximum file size is 2mb."})
            }
            next();
        }

        if(!req.file){
            res.status(400).json({message : "No file!"});
        }else{
            next()
        }
    })
}