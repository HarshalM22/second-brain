import express from "express";
const app = express();
import jwt, { JwtPayload } from "jsonwebtoken";
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
const JWT_SECRET =  process.env.JWT_SECRET || "ggiort";
import cors from "cors";
import { auth } from "./middleware";
import { random } from "./utils";
import { LoginSchema, SignUpSchema } from "./schema";
import bcrypt from "bcrypt";
app.use(cors());
app.use(express.json());

// @ts-ignore
app.post("/api/v1/second-brain/sign-up", async function (req, res) {
  const parseResult = SignUpSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      error: parseResult.error.format(),
    });
  }

  const { email, password, username } = parseResult.data;

  try {
    const hashedPassword = await bcrypt.hash(password, 4);

    const user = await prisma.user.create({
      data: {
        username,
        email,
        password: hashedPassword,
      },
    });

    res.status(200).json({ message: "User has been signed up." });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Error while signing up" });
  }
});

// @ts-ignore
app.post("/api/v1/second-brain/login", async function (req, res) {
  const parseResult = LoginSchema.safeParse(req.body);

  if (!parseResult.success) {
    return res.status(400).json({
      error: parseResult.error.format(),
    });
  }

  const { username, password } = parseResult.data;

  try {
    const user = await prisma.user.findUnique({
      where: { username },
    });

    if (!user) {
      return res.status(401).json({ message: "User not found" });
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid password" });
    }

    const token = jwt.sign({ userId: user.id }, JWT_SECRET);
    res.status(200).json({ token });
  } catch (e) {
    console.log(e);
    res.status(500).json({ message: "Server error" });
  }
});

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

app.get("/api/v1/second-brain/posts", auth, async function (req, res) {
  const { userId } = req.body;
  const posts = await prisma.content.findMany({
    where: {
      userId: userId,
    },
  });
  res.json({
    posts,
  });
});

app.delete("/api/v1/second-brain/delete-post", auth, async function (req, res) {
  const { userId, id } = req.body;

  try {
    const deletedContent = await prisma.content.delete({
      where: {
        id: id,
        userId: userId,
      },
    });

    if (deletedContent) {
      res.status(200).json({
        message: "deleted successfully",
      });
    } else {
      res.json({
        mesaage: "Not deleted",
      });
    }
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

app.get("/api/v1/brain/:shareLink", async function (req, res) {
  const hash = req.params.shareLink;

  const link = await prisma.link.findUnique({
    where: {
      hash,
    },
  });

  if (!link) {
    res.status(411).json({
      message: "Sorry incorrect input",
    });
    return;
  }

  const content = await prisma.content.findFirst({
    where: {
      userId: link.userId,
    },
  });

  const user = await prisma.user.findUnique({
    where: {
      id: link.userId,
    },
  });
  res.json({
    username: user?.username,
    content: content,
  });
});

const port = 3000;
app.listen(port);
