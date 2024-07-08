import express, { Application } from "express";
import bodyParser from "body-parser";
import dotenv from "dotenv";
import cors from "cors";
import session from 'express-session';
import { db, store } from "./config";
import authRoutes from "./routes/authRoutes";
import commentRoutes from "./routes/commentRoutes";
import likeRoutes from "./routes/likeRoutes";
import loginRoutes from "./routes/loginRoutes";
import registerRoutes from "./routes/registerRoute";
import userRoutes from './routes/userRoutes';
import otpRoutes from './routes/otpRoutes';
import postRoutes from "./routes/postRoutes";
import tagRoutes from './routes/tagRoutes';
import postTagRoutes from './routes/postTagRoutes';
import notificationRoutes from './routes/notificationRoutes';
import mediaRoutes from './routes/mediaRoutes';
import settingRoutes from './routes/settingRoutes';
import followRoutes from './routes/followRoutes';
import AppError from "./utils/appError";
import upload from "./middlewares/upload.middleware";



dotenv.config();

const app: Application = express();

app.use(session({
  secret: process.env.SECRET_KEY!,
  resave: false,
  saveUninitialized: false,
  store: store,
  cookie: {
    secure: process.env.NODE_ENV === 'production', 
    httpOnly: true,
    maxAge: 1000 * 60 * 60 // 1 hour
  }
}));

const corsOptions = {
  origin: ["http://localhost:3000"]
};
app.use(cors(corsOptions));

app.use(cors(corsOptions));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use("/api/v1", authRoutes);
app.use("/api/v1", registerRoutes);
app.use('/api/v1', loginRoutes);
app.use('/api/v1/otp', otpRoutes);
app.use('/api/v1', userRoutes);
app.use('/api/v1/likes', likeRoutes);
app.use('/api/v1/posts', postRoutes);
app.use('/api/v1/comments', commentRoutes);
app.use('/api/v1', tagRoutes);
app.use('/api/v1', postTagRoutes);
app.use('/api/v1', notificationRoutes);
app.use('/api/v1', mediaRoutes);
app.use('/api/v1', settingRoutes);
app.use('/api/v1', followRoutes);

app.all("*", (req, res, next) => {
  next(
    new AppError(
      `The route ${req.originalUrl} with the ${req.method} method does not exist on this server! 💨`,
      404
    )
  );
});

db.on("error", console.error.bind(console, "Mongodb Connection Error:"));


app.post('/upload', upload.single('file'), (req, res) => {
  res.json({ message: 'File uploaded successfully' });
});


const PORT: number | string = process.env.PORT || 4000;
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});

export default app;