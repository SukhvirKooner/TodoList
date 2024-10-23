import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; 
import bodyParser from 'body-parser';

const app = express();
const port = 4000; 
const jwt = require('jsonwebtoken');
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

app.get('/', ( req: Request,res: Response) => {
  res.send('Hello from TypeScript Express!');
});

app.post("/signup", async (req: Request, res: Response) => {
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

app.get("/login",async(req:Request,res:Response)=>{
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