import express, { NextFunction, Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; 
import bodyParser from 'body-parser';
const cors = require("cors");

const app = express();
const port = 4000; 
const jwt = require('jsonwebtoken');
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
const prisma = new PrismaClient;


async function createUser(firstName:string,lastName:string,email:string,password:string) {
    const res = await prisma.user.create({
        data:{
            firstName,
            lastName,
            email,
            password
        }
    })
    return res;

}
async function getUser(email:string) {

    const res = await prisma.user.findFirst({
        where:{
            email
        }
    })
    return res;
    
}
async function newTodo(title:string,description:string,userId:number) {
        const res = await prisma.todo.create({
            data:{
                title,
                description,
                userId
            }
        })
    console.log(res);
    return res;
    
}
async function getTodo(userId:number) {
    const res = await prisma.todo.findMany({
        where:{
            userId
        }
    })
    console.log(res);
    return res;
    
}
// middleware to get userId
const fetchUser = async(req:Request,res:Response,next:NextFunction)=>{
    const token =req.header('auth-token');
    if(!token){
        res.status(401).send({errors:"please authenticate"});

    }else{
        try{
            const data = jwt.verify(token,'TodoList')
            res.locals.user = data.user 
             next();
        }catch(error){
            res.status(401).send("please authenticate using valid token")
        }
    }
}
app.post("/new",fetchUser,async(req:Request,res:Response)=>{
    const todo = await newTodo(req.body.title,req.body.description,res.locals.user.id);
    // res.json(todo);
    console.log("new todo created",todo);
    
})
app.post("/gettodo",fetchUser,async(req:Request,res:Response)=>{
    const gettodo = await getTodo(res.locals.user.id);
    console.log(gettodo);
    res.json(gettodo)
})

app.get('/', ( req: Request,res: Response) => {
  res.send('Hello from TypeScript Express!');
});

app.post("/signup", async (req: Request, res: Response) => {
    
    
    console.log("signup activated");
    let check = await getUser(req.body.email);
    if(check){
        res.status(400).json({success:false,errors:"user already exists"});
    }
    const user =await createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
    const data = {
        user:{
            id:user.id
        }
    }
    const token = jwt.sign(data,"TodoList");
    res.json({success:true,token}); 


});

app.post("/login",async(req:Request,res:Response)=>{        
    console.log("login backend");
    
    const user = await getUser(req.body.email);
    if(user){
        const comparePass = req.body.password == user.password;
        if(comparePass){
            console.log('successfully login')
            const data = {
                user:{
                    id:user.id
                }
            }
            const token = jwt.sign(data,"TodoList");
            res.json({success:true,token});
        }
        else{
            res.json({success:false,errors:"wrong password"})
        }
    }else{
        res.json({success:false,errors:"wrong email"});
    }
})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});