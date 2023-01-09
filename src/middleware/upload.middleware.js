const multer = require("multer")
const response = require("../helpers/response")

module.exports = {
    file: (req, res, next) => {
        // multer setup
        const storage = multer.diskStorage({
            destination: (req, file, cb) => {
                cb(null, "public/") // destination file or location file
            },
            filename: (req, file, cb) => {
                const ext = file.mimetype.split("/")[1] // .jpeg
                if (ext !== "png" && ext !== "jpg" && ext !== "jpeg") { // file validation
                    cb(new Error("error upload, file harus png/jpg/jpeg"))
                }else{
                    cb(null, `${Date.now()}.${ext}`) // naming file with date and file type
                }
            }
        })
        const limits = {fileSize : 5 * 1024 * 1024} // 5MB
        const upload = multer({storage, limits}).single("avatar")

        // upload process
        upload(req, res, (error) => {
            if (error instanceof multer.MulterError) { //Check for multer error
                console.log(error);
                console.log(multer.MulterError);
                return response(res, 500, error.message)
            }else if (error) { // Check for error other than multer errors
                console.log(error);
                return response(res, 500, error.message)
            }
            
            if (req.file === undefined) {
                req.file = {
                    filename : "default.png"
                }
            }

            next()
        })
    }
}