import pkg from 'mongodb';
const { MongoClient } = pkg;

const uri = 'mongodb+srv://syokaumercy2:Amandla1%21@stagingcluster.4ydwwcf.mongodb.net/?retryWrites=true&w=majority&appName=StagingCluster';
const client = new MongoClient(uri, { useUnifiedTopology: true }); // Add useUnifiedTopology

let db;

export async function connectToDatabase() {
    try {
        if (!db) {
            await client.connect();
            db = client.db('darkroom'); // Replace 'darkroom' with your database name
            console.log('Connected to MongoDB');
        }
        return db;
    } catch (err) {
        console.error('Error connecting to MongoDB:', err);
        throw err;
    }
}

export async function closeDatabaseConnection() {
    try {
        await client.close();
        console.log('MongoDB connection closed');
    } catch (err) {
        console.error('Error closing MongoDB connection:', err);
    }
}