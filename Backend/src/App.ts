import express from 'express';
const app = express();
import jwt from 'jsonwebtoken'
const JWT_SECRET = "harshal"
import  path, { dirname }  from 'path';
import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import cors from 'cors';


app.use(cors());
app.use(express.json());

app.get('/', (req,res)=>{
  const filePath = path.join(__dirname , '..' , '..','front-end','index.html')
  // const filePath2 = __dirname + "../../front-end/index.html"
  res.sendFile(filePath)
  // res.json({
  //   message : filePath,
  //   message2: filePath2

  // })
  // res.sendFile(__dirname + "../../fornt-end/index.html")
})






// @ts-ignore
app.post('/second-brain/sign-up', async (req, res) => {

  const { firstName, lastName, email, password, username } = req.body;
  
  if (!firstName || !lastName || !email || !password || !username) {
    return res.status(400).json({ error: "All fields are required." });
  }

  try {

    const user = await prisma.user.create({
      data: {
        username : username,
        firstName: firstName,
        lastName:lastName,
        email:email,
        password:password
      }
    })
    res.json({
      message: "user has been sign up "
    })
  }
  catch (e) {
    console.log(e);
    res.json({
      message: " error while signing up"
    })
  }

})

app.post('/second-brain/login', async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const find = await prisma.user.findUnique({
      where: {
        username: username,
        password: password
      }
    })

    if (find) {
      const token = jwt.sign({
        username: username
      },JWT_SECRET);

      res.json({
        token: token
      })

    } else {
      res.json({
        message: "user not found "
      })
    }

  } catch (e) {
    res.json({
      message: " error while loging in "
    })
  }


})


app.get("/second-brain", (req,res)=>{
  const filePath = path.join(__dirname,'..','index.html')
  res.sendFile(filePath)
  console.log(filePath)
  console.log(__dirname);
  console.log(__filename);
  
})




const port = 3001 ;
app.listen(port);