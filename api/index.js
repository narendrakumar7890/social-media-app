import express from "express";
const app = express();
import morgan from "morgan";
import cookieParser from "cookie-parser";
import cors from "cors";

import userRoutes from "./routes/user.js";
import authRoutes from "./routes/auth.js";

// import commentsRoutes from "./routes/comments.js";
// import likesRoutes from "./routes/likes.js";
// import postsRoutes from "./routes/posts.js";
// import storiesRoutes from "./routes/stories.js";

//middlewares
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Credentials", true);
  next();
});
app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
//app.use(cookieParser);
app.use(morgan("dev"));

app.use("/api/auth", authRoutes);
app.use("/api/user", userRoutes);
// app.use("/api/comments", commentsRoutes);
// app.use("/api/likes", likesRoutes);
// app.use("/api/posts", postsRoutes);
// app.use("/api/user", userRoutes);
// app.use("/api/stories", storiesRoutes);

const PORT = 8800;
app.listen(PORT, () => {
  console.log(`API working on ${PORT}`);
});
