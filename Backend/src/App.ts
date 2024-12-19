import express from 'express';
const app = express();
import jwt from 'jsonwebtoken'
const JWT_SECRET = "harshal"

import { PrismaClient } from "@prisma/client";
const prisma = new PrismaClient();
import cors from 'cors';


app.use(cors());
app.use(express.json());

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
    console.log(user);
    
  }
  catch (e) {
    console.log(e);
    res.json({
      message: " error while signing up"
    })
  }

})

app.post('/second-brain/login',async (req, res) => {
  const username = req.body.username;
  const password = req.body.password;

  try {
    const find = await prisma.user.findUnique({
      where: {
        username: username,
        password : password
      }
    })

    if (find) {
      const token = jwt.sign({
        username: username,
        
      },JWT_SECRET);
      // giving token to the header for dashboard purpose 
      res.header("Token" , token) ;
      res.json({
        token: token
      })
      console.log(token);
      
      

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
// @ts-ignore

app.post("/second-brain/create-post", async function (req,res){
  
  const {title , description , link  } = req.body ;
  console.log(title);
  console.log(description);
  console.log(link);

  const token = req.headers.Token ;
  console.log(token);
   if(token == undefined){
      res.json({
        message : "token is undefined"
      })
   }else{
  const tokenInfo = jwt.verify(token,JWT_SECRET);
   
  console.log(tokenInfo) ;
  // @ts-ignore
  console.log(tokenInfo.username) ;
   }
  

  try{
    const user = await prisma.user.findUnique({
      where :{
        // @ts-ignore
        username : tokenInfo.username 
      }
    })
    console.log(user?.id);
    if(user){
    const content = await prisma.content.create({
      data :{
        title : title ,
        description : description,
        link : link ,
        userId : user.id
      }
    })

    res.json({
      message : " content is uplaoded"
    })
  }
   
   } 
  catch(e){
    res.json({
      message : "app.ts issue",
      error : e
    })
  }
  

  

   
})

// @ts-ignore
// function auth (req,res,next){
//   const token = req.headers.Token; 
//   const tokenInfo = jwt.verify(token,JWT_SECRET) ;
//   if(tokenInfo){
//     req.username = tokenInfo.username ;
//     next();
//   }else{
//     res.json({
//       MESSAGE : "YOU ARE LOGGED IN "
//     }) ;
//   }
// }



const port = 3001 ;
app.listen(port);

