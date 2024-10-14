




// Import the Firebase Admin SDK and Express
const admin = require('firebase-admin');
const express = require('express');

// Initialize Express app
const app = express();

// Initialize Firebase Admin with your service account key
const serviceAccount = require('./mrnzd-d0f4d-firebase-adminsdk-pebej-fc7cf9f4e0.json');

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount)
});

// Firestore reference
const db = admin.firestore();

// Function to get users from the 'users' collection
async function getUsers() {
  try {
    const usersSnapshot = await db.collection('users').get();
    const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    return users;
  } catch (error) {
    console.error('Error fetching users:', error);
    throw error;
  }
}

// Set up the `/data` route to respond with the users collection
app.get('/data', async (req, res) => {
  try {
    const users = await getUsers();
    res.json(users);  // Send users data as JSON
  } catch (error) {
    res.status(500).send('Error retrieving data');
  }
});

// Start the server on port 3000
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});



































// // Import the Firebase Admin SDK
// const admin = require('firebase-admin');

// // Initialize the app with your service account key
// const serviceAccount = require('./mrnzd-d0f4d-firebase-adminsdk-pebej-fc7cf9f4e0.json');

// admin.initializeApp({
//   credential: admin.credential.cert(serviceAccount)
// });

// // Firestore reference
// const db = admin.firestore();

// // Function to get users from the 'users' collection
// async function getUsers() {
//   try {
//     const usersSnapshot = await db.collection('users').get();
//     const users = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

//     console.log('Users:', users);  // Display users
//   } catch (error) {
//     console.error('Error fetching users:', error);
//   }
// }

// // Call the function to get and display users
// getUsers();






















