const {onRequest} = require("firebase-functions/v2/https");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
admin.initializeApp();


exports.dbtest = onRequest((request, response) => {
    const database = admin.database();
    const bookingRef = database.ref('booking'); // Replace with the path to your "booking" node
  
    bookingRef.once('value')
      .then((snapshot) => {
        const days = [];
        snapshot.forEach((childSnapshot) => {
          const day = childSnapshot.val().day;
          if (day) {
            days.push(day);
          }
        });
  
        response.status(200).json({ days });
        return null;
      })
      .catch((error) => {
        logger.error('Error fetching data:', error);
        response.status(500).json({ error: 'Internal Server Error' });
      });
});


