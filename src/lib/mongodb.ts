import { MongoClient } from 'mongodb'

const uri: string  = process.env.MONGODB_URI ?? '';
const options: Object = {
  useUnifiedTopology: true,
  useNewUrlParser: true,
};

if (!process.env.MONGODB_URI) {
  throw new Error('Add MONGODB_URI to .env')
};

const client = new MongoClient(uri, options);
const clientPromise = client.connect();

export default clientPromise;
