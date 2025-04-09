import express from 'express';
import bodyParser from 'body-parser';
import path from 'path';
import { fileURLToPath } from 'url';
import { connectToDatabase } from './db.js'; // Use the MongoDB driver connection
import index from './routes/index.js';
import image from './routes/image.js';

// Resolve __dirname for ES modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Ensure the database connection is established
(async () => {
    try {
        await connectToDatabase();
        console.log('Database connected successfully');
    } catch (err) {
        console.error('Failed to connect to the database:', err);
        process.exit(1); // Exit the application if the database connection fails
    }
})();

// Initializing the app
const app = express();

// View Engine
app.set('view engine', 'ejs');

// Set up the public folder
app.use(express.static(path.join(__dirname, 'public')));

// Body parser middleware
app.use(express.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Routes
app.use('/', index);
app.use('/image', image);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is listening at http://localhost:${PORT}`);
});