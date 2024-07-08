import multer from 'multer';
import { Request } from 'express';
import path from 'path';
import fs from 'fs';


const uploadDir = path.join(__dirname, '../../uploads');
if (!fs.existsSync(uploadDir)) {
    fs.mkdirSync(uploadDir, { recursive: true });
}

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        console.log('Destination called:', 'uploads/');
        cb(null, uploadDir);
    },
    filename: function (req, file, cb) {
        const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1E9);
        const ext = path.extname(file.originalname);
        const filename = `${uniqueSuffix}${ext}`;
        console.log('Filename called:', filename);
        cb(null, filename);
    }
});

const fileFilter = (req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    console.log('File filter called:', file.originalname);
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif|mp4|mov|avi)$/)) {
        const error: any = new Error('Only image and video files are allowed!') as Error;
        cb(error, false); 
    } else {
        cb(null, true);
    }
};

const upload = multer({
    storage: storage,
    fileFilter: fileFilter,
    limits: {
        fileSize: 10 * 1024 * 1024  // 10 MB limit for files
    }
});

export default upload;
