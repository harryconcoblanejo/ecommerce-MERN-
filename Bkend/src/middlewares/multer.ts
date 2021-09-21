
import multer from "multer";
import path from "path";

;

const storage = multer.diskStorage({
  destination: path.join(__dirname,  "../images" ),

  filename: function (req, file:Express.Multer.File , cb) {
    const parts = file.mimetype.split("/");
    cb(null, `${file.fieldname}-${Date.now()}.${parts[1]}`);
  },
});

multer({
  storage: storage,
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const minetype = filetypes.test(file.mimetype);
    const extname = filetypes.test(path.extname(file.originalname));
    try {
      if (minetype && extname) return cb(null, true);
    } catch (error) {
      console.log(error);
    }
  },
});




export default multer({ storage });


