import clientPromise from "../../../lib/mongodb";
import { NextRequest, NextResponse } from 'next/server';
import ShortUniqueId from 'short-unique-id'

export async function POST(req: NextRequest) {
  const uidGenerator = new ShortUniqueId({ length: 4 });
  const uuid = uidGenerator();
  const params = await req.json()

  try {
    const client = await clientPromise;
    const db = client.db("miniurl");
    const collection = await db.collection("urls");

    const newItem = {
      originalUrl: params.originalUrl.includes('http') ? params.originalUrl : `http://${params.originalUrl}`,
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
    const client = await clientPromise;
    const db = client.db("miniurl");
    const collection = await db.collection("urls");
    const query = { shortenedUrl };
    const item = await collection.findOne(query);
    return NextResponse.json({ ...item })
  } catch (err) {
    return NextResponse.json({ message: 'Internal server error', error: err });
  }
}