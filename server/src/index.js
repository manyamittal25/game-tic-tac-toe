import express from "express" ;
import cors from "cors";
import { StreamChat } from 'stream-chat';

import {v4 as uuidv4} from "uuid";
import bcrypt from "bcrypt";
const app= express();


app.use(cors({
    origin: 'http://localhost:3000', 
    credentials: true
}));
app.use(express.json());
const api_key="eragxjqszz22"; 
const api_secret= "q8y5nrxpapndwgm7jqjdkqq75fuwdh9zzm6jzvu2333e3s59xkhm5v5gz6xdg282";
const serverClient=  StreamChat.getInstance(api_key,api_secret);

app.post("/signup",async (req,res) => {
    try{
    const {firstName,lastName, username , password} =req.body;
    const userId = uuidv4();
    const hashedPassword= await bcrypt.hash(password,10);
    const token = serverClient.createToken(userId);
    res.json({token,userId,firstName,lastName,username,hashedPassword})
    } catch(error) {
        res.json(error);
    }
});

app.post("/login", async(req,res) => {
    try{
    const {username,password} = req.body
    const {users}= await serverClient.queryUsers({name: username});
    if(users.length ==0) return res.json({message : "User not found"});
    const token = serverClient.createToken(users[0].id);
    const passwordMatch = await bcrypt.compare(password,users[0].hashedPassword);
    if(passwordMatch) {
res.json({
    token ,
     firstName: users[0].firstName,
     lastName: users[0].firstName,
     username,
     userId: users[0].id,
    });
    }
} catch(error) {
    res.json(error);
}
});

app.listen(3001, () => {
    console.log("Server is running on port 3001");
});

