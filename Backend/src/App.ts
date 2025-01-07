import express from "express";
const app = express();
import jwt, { JwtPayload } from "jsonwebtoken";
const JWT_SECRET = "harshal";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import cors from "cors";
import { auth } from "./middleware";
import { random } from "./utils";
app.use(cors());
app.use(express.json());

// @ts-ignore
app.post("/api/v1/second-brain/sign-up", async (req, res) => {
  const { email, password, username } = req.body;

  if (!email || !password || !username) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {
    const user = await prisma.user.create({
      data: {
        username: username,
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

app.post("/api/v1/second-brain/login", async (req, res) => {
  const { password, username } = req.body;

  try {
    const find = await prisma.user.findUnique({
      where: {
        username: username,
        password: password,
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

app.get("/api/v1/second-brain/me", auth, async function (req, res) {
  const userId = req.body.userId;

  try {
    const constent = await prisma.content.findMany({
      where: {
        userId: userId,
      },
    });
    const user = await prisma.user.findUnique({
      where: {
        id: userId,
      },
    });
    if (constent) {
      res.json({
        constent: constent,
        user: user,
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

app.post("/api/v1/second-brain/create-post", auth, async function (req, res) {
  const { title, link, userId, type } = req.body;

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
          type: type,
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

app.get("/api/v1/second-brain/posts",auth,async function(req,res){
  const {userId} = req.body;
  const posts = await prisma.content.findMany({
    where:{
      userId : userId 
    }
  })
  res.json({
    posts
  })

})

// @ts-ignore
app.delete("/api/v1/second-brain/delete-post", auth, async function (req, res) {
  const { userId, title } = req.body;
  try {
    const find = await prisma.content.findFirst({
      where: {
        title: title,
        userId: userId,
      },
    });
    if (find) {
      const deletePost = await prisma.content.delete({
        where: {
          id: find?.id,
        },
      });
    } else {
      console.log("post not found");
    }
    const findAfterDelete = await prisma.content.findMany({
      where: {
        userId: userId,
      },
    });
    res.json({
      message: "post deleted",
      findAfterDelete,
    });
  } catch (e) {
    res.json({
      message: "error",
      e,
    });
  }
});

app.post("/api/v1/second-brain/share", auth, async function (req, res) {
  const share = req.body.share;
  if (share) {
    await prisma.link.create({
      data: {
        userId: req.body.userId,
        hash: random(10),
      },
    });
  } else {
    await prisma.link.deleteMany({
      where: {
        userId: req.body.userId,
      },
    });
  }
  res.json({
    message: "updated sharable link",
  });
});

app.get("/api/v1/brain/:shareLink", async function (req,res){
   const hash = req.params.shareLink

   const link = await prisma.link.findUnique({
    where:{
      hash
    }
   });
   
   if(!link){
    res.status(411).json({
      message : "Sorry incorrect input"
    })
    return 
   }

   const content = await prisma.content.findFirst({
      where :{
        userId : link.userId
      }})
 
  const user = await prisma.user.findUnique({
    where:{
      id : link.userId
    }
  })
  res.json({
    username : user?.username,
    content : content
  })

  

})


const port = 3000;
app.listen(port);
