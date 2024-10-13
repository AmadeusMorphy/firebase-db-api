const express = require('express');
const admin = require('firebase-admin');
const app = express();
const port = process.env.PORT || 3000;

// Initialize Firebase
const serviceAccount = require('./mrnzd-d0f4d-firebase-adminsdk-pebej-8bfa23cd8c.json');

admin.initializeApp({
    credential: admin.credential.cert(serviceAccount)
});

const db = admin.firestore();

// Set up a basic route
app.get('/data', async (req, res) => {
    try {
        const snapshot = await db.collection('users').get();
        const data = snapshot.docs.map(doc => doc.data());
        res.status(200).send(data);
    } catch (error) {
        res.status(500).send('Error retrieving data: ' + error.message);
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
