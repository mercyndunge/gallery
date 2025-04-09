import { connectToDatabase } from '../db.js';

export async function getImages() {
    const db = await connectToDatabase();
    return db.collection('images').find({}).toArray();
}

export async function getImageById(id) {
    const db = await connectToDatabase();
    return db.collection('images').findOne({ _id: id });
}

export async function saveImage(imageData) {
    const db = await connectToDatabase();
    return db.collection('images').insertOne(imageData);
}

export async function deleteImageById(id) {
    const db = await connectToDatabase();
    return db.collection('images').deleteOne({ _id: id });
}