import { MongoClient } from 'mongodb';

export async function connectToDatabase() {
  const client = await MongoClient.connect(
    'mongodb+srv://helindevani111:7XM6NT0LcVN2Z7Cw@cluster0.20f1b1t.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0'
  );

  return client;
}