import clientPromise from "../../../lib/mongodb";
import ShortUniqueId from 'short-unique-id'
import { NextRequest, NextResponse } from 'next/server';

async function getCollection (dbName : string, collectionName: string) {
  const client = await clientPromise;
  const db = client.db(dbName);
  const collection = db.collection(collectionName);
  return collection;
}

export async function POST(req: NextRequest) {
  const uidGenerator = new ShortUniqueId({ length: 4 });
  const uuid = uidGenerator();
  const params = await req.json()

  try {
    const collection = await getCollection("miniurl", "urls");
    const newUrl = params.originalUrl.includes('http') ? params.originalUrl : `http://${params.originalUrl}`;
    const newItem = {
      originalUrl: newUrl,
      shortenedUrl: uuid,
      date: new Date()
    }

    collection.insertOne(newItem);
    return NextResponse.json({ ...newItem })
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error', error: err  })
  }
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url)
  const shortenedUrl = searchParams.get('shortenedUrl')

  if (!shortenedUrl) {
    return NextResponse.json({ message: 'Internal server error' })
  }

  try {
    const collection = await getCollection("miniurl", "urls");
    const query = { shortenedUrl };
    const item = await collection.findOne(query);
    return NextResponse.json({ ...item })
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error', error: err });
  }
}