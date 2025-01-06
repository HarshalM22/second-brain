import express from "express";
const app = express();
import jwt, { JwtPayload } from "jsonwebtoken";
const JWT_SECRET = "harshal";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import cors from "cors";
import { auth } from "./middleware";
app.use(cors());
app.use(express.json());

// @ts-ignore
app.post("/second-brain/sign-up", async (req, res) => {
  const { firstName, lastName, email, password, username } = req.body;

  if (!firstName || !lastName || !email || !password || !username) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: username,
        firstName: firstName,
        lastName: lastName,
        email: email,
        password: password,
      },
    });

    res.json({
      message: "user has been sign up ",
    });
  } catch (e) {
    console.log(e);
    res.json({
      message: " error while signing up",
    });
  }
});

app.post("/second-brain/login", async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;
  const email = req.body.email;

  try {
    const find = await prisma.user.findUnique({
      where: {
        username: username,
        password: password,
        email: email,
      },
    });

    if (find) {
      const token = jwt.sign(
        {
          userId: find.id,
        },
        JWT_SECRET
      );
      res.json({
        token: token,
      });
    } else {
      res.json({
        message: "user not found ",
      });
    }
  } catch (e) {
    res.json({
      message: e,
    });
  }
});

app.get("/me", auth, async function (req, res) {
  const userId = req.body.userId;

  try {
    const find = await prisma.content.findMany({
      where: {
        userId: userId,
      },
    });
    console.log(find);
    if (find) {
      res.json({
        find,
        userId: userId,
      });
    }
  } catch (e) {
    res.json({
      msg: "error",
      e,
    });
  }
});

// @ts-ignore

app.post("/second-brain/create-post", auth, async function (req, res) {
  const { title, description, link, userId } = req.body;

  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (user) {
      const content = await prisma.content.create({
        data: {
          title: title,
          description: description,
          link: link,
          userId: userId,
        },
      });
    }
    res.json({
      message: " content is uplaoded",
    });
  } catch (e) {
    res.json({
      message: "app.ts issue",
      error: e,
    });
  }
});

// @ts-ignore
app.get("/userinfo", auth, async function (req, res) {
  const userId = req.body.userId;
  try {
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    res.json({
     user
    });
  } catch (e) {
    res.json({
      message: "error",
      e
    });
  }
});

app.delete("/second-brain/delete-post", auth, async function (req, res) {
  const { userId } = req.body;
  const title = req.body.title;
  try {

    const find = await prisma.content.findFirst({
      where: {
        title: title,
        userId: userId
      }
    })
    const deletePost = await prisma.content.delete({
      where:{
        id:find?.id 
      }
    })
    const findAfterDelete = await prisma.content.findMany({
      where :{
        userId:userId
      }
    })
    res.json({
      message: "post deleted",
      findAfterDelete
    });
  } catch (e) {
    res.json({
      message: "error",
      e
    });
  }

});

const port = 3000;
app.listen(port);
