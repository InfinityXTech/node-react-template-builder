import multer from 'multer';
import fs from 'fs';
import path from 'path';
import formData from './formData.ts';

const extensions = ['.png', '.gif', '.jpg', '.jpeg'];
const handleError = (err, res) => {
  console.log(err);
  res
    .status(500)
    .contentType('text/plain')
    .end('Oops! Something went wrong!');
};

const tempPath = path.join(__dirname, '../../public/temp');
const upload = multer({ dest: tempPath }).any();

const handleUpload = (req, res) => {
  upload(req, res, (error) => {
    if (error instanceof multer.MulterError) {
      // A Multer error occurred when uploading.
      console.log('multer.MulterError', error);
    } else if (error) {
      // An unknown error occurred when uploading.
      console.log('multer.MulterError', error);
    } else {
      formData.answers = req.body;
      const file = req.files[0];
      if (!file) {
        res.redirect('/api/form');
        return;
      }

      // TODO - handle multiple files
      const tempFilePath = file.path;
      const { fieldname } = file;
      const targetPath = path.join(__dirname, '../../public/uploads');
      const extn = path.extname(file.originalname).toLowerCase();
      if (extensions.indexOf(extn) > -1) {
        const targetFilePath = path.join(targetPath, `${fieldname}${extn}`);
        fs.rename(tempFilePath, targetFilePath, (err) => {
          if (err) return handleError(err, res);
          formData.answers[fieldname] = `/uploads/${fieldname}${extn}`;
          return res.redirect('/api/form');
        });
      } else {
        console.log('File type is not allowed!');
        fs.unlink(tempPath, (err) => {
          if (err) return handleError(err, res);
          return res
            .status(403)
            .contentType('text/plain')
            .end('File type is not allowed!');
        });
      }
    }
  });
};

export default handleUpload;
