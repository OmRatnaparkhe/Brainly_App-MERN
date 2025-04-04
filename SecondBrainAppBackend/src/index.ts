
import express from 'express';
import mongoose, { mongo } from 'mongoose';
import JWT from 'jsonwebtoken';
import {UserModel} from "./db"
import { ContentModel } from './db';
import { LinkModel } from './db';
import { random } from './util';
import { userMiddleware } from './middleware';
import { JWT_PASSWORD } from "./config";
import cors from "cors"
const app = express();
app.use(express.json());
app.use(cors());
app.post("/api/v1/signup",async(req,res)=>{
    const username = req.body.username;
    const password = req.body.password;

    try {await UserModel.create({
        username:username,
        password:password
    })

    res.json({
        message:"You've signed up"
    })}
    catch(e){
        res.status(411).json({
            message:"User already exits"
        })
    }
})

app.post("/api/v1/signin",async (req,res)=>{
    const username = req.body.username;
    const password = req.body.password;
    const existingUser = await UserModel.findOne({
        username,
        password
    })

    if(existingUser){
        const token = JWT.sign({
            id: existingUser._id
        },JWT_PASSWORD)

        res.json({
            token
        })
    }
    else{
        res.status(403).json({
            message:"Incorrect Credentials"
        })
    }
    
})

app.post("/api/v1/content", userMiddleware, async (req,res)=>{
    const link = req.body.link;
    const type = req.body.type;
    const text = req.body.text;
    await ContentModel.create({
        title:req.body.title,
        link,
        type,
        userId:req.userId,
        tags:[],
        text
    })
    res.json({
        message:"Content Added"
    })
})



app.get("/api/v1/content", userMiddleware, async (req, res) => {
    // @ts-ignore
    const userId = req.userId;
    const content = await ContentModel.find({
        userId: userId
    }).populate("userId", "username")
    res.json({
        content
    })
})


app.delete("/api/v1/content/:id", userMiddleware, async(req, res) => {
    const contentId = req.params.id
     await ContentModel.deleteOne({
        _id: contentId,
        userId: req.userId
    })
    res.json({ message: "Deleted successfully" });
  });
  


app.post("/api/v1/brain/share",userMiddleware,async(req,res)=>{
    const share = req.body.share;
    if(share){
        const existingLink = await LinkModel.findOne({
            userId:req.userId
        })
        if(existingLink){
            res.json({
                hash:existingLink.hash
            })
            return;
        }
        const hash = random(10)//Generating a url for sharing our content(second brain) with everyone
        await LinkModel.create({
            userId:req.userId,
            hash:hash
        })
        res.json({
            hash
        }) 
    }
    else{
        await LinkModel.deleteOne({
            userId:req.userId
        })
        res.json({
            message:"Removed link"
        })
    }
    
})

app.get("/api/v1/brain/:shareLink", async(req,res)=>{
    const hash = req.params.shareLink;
    const link = await LinkModel.findOne({
        hash
    });

    if(!link){
        res.status(411).json({
            message:"Incorrect url"
        })
        return;
    }
    //userId
    const content = await ContentModel.find({
        userId: link.userId
    })

    const user = await UserModel.findOne({
        _id: link.userId
    })

    if(!user){
        res.status(411).json({
            message:"User not found,error should not happen ideally"
        })
        return;
    }


    res.json({
        username:user.username,
        content:content
    })
})

app.listen(3000);