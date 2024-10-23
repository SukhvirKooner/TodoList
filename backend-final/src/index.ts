import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client'; 

const app = express();
const port = 4000; 
const jwt = require('jsonwebtoken');
app.use(express.json());

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
    console.log(res);
    
}

app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Express!');
});

app.post("/signup",(res:Response,req:Request)=>{

})

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});