import { getSession } from "next-auth/react";
import { MongoClient } from 'mongodb';
import { hash, compare } from 'bcryptjs';


export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://helindevani111:7XM6NT0LcVN2Z7Cw@cluster0.20f1b1t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );

  return client;
}

export async function hashPassword(password) {
    const hashedPassword = await hash(password, 12);
    return hashedPassword;
  }
  
  export async function verifyPassword(password, hashedPassword) {
    const isValid = await compare(password, hashedPassword);
    return isValid;
  }

async function handler(req,res){

    if(req.method !== 'POST'){
        return;
    }

    
    try{
    const session =await getSession({req});
    console.log(session);

    if(!session){
      return res.status(401).json({message:'not Authenticated !'})
      
    }

    const userEmail =session.user.email;
    const oldPassword =req.body.oldPassword;
    const newPassword =req.body.newPassword;

    const client = await connectToDatabase();

    const usersCollection = client.db().collection('users');

    const user = await usersCollection.findOne({email : userEmail});

    if(!user){
      client.close();
      return res.status(404).json({ message: 'User Not Found' });
    }

    const currentPassword = user.password;

    const passwordsAreEqual= await verifyPassword(oldPassword, currentPassword);

    if(!passwordsAreEqual){
      client.close();
      return res.status(403).json({ message: 'Invalid Password' });
    }

    const hashedPassword = await hashPassword(newPassword);

    const result = await usersCollection.updateOne({email : userEmail},{$set : {password : hashedPassword}});

    client.close();
    res.status(200).json({message: 'Password Updated'});
  }
  catch(error){
    console.error('Error:', error);
    return res.status(500).json({ message: 'Internal Server Error' });
  }
}

export default handler;