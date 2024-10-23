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

app.get('/', ( req: Request,res: Response) => {
  res.send('Hello from TypeScript Express!');
});

app.post("/signup", async (req: Request, res: Response) => {
    const user =await createUser(req.body.firstName, req.body.lastName, req.body.email, req.body.password);
    res.json(user);
});

app.listen(port, () => {
  console.log(`Server is running at http://localhost:${port}`);
});