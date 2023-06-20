import multer from 'multer';
import path from 'path';

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads');
  },
  filename: (req, file, cb) => {
    cb(null, new Date().valueOf() + path.extname(file.originalname));
  },
});
const limits = { fieldsize: 10 * 1024 * 1024 };
const filter = (req, file, callback) => {
  const fileType = file.mimetype.split('/')[1];

  if (fileType === 'jpg' || fileType === 'jpeg' || fileType === 'png') {
    callback(null, true);
  } else {
    callback({ message: 'jpg, jpeg, png 확장자만 가능합니다.' }, false);
  }
};

export const upload = multer({ storage: storage, limits: limits, fileFilter: filter });
