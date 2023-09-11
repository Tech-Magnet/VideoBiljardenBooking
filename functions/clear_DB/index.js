const admin = require("firebase-admin");
//const schedule = require("node-schedule");

// Initialize Firebase Admin SDK with credentials
const serviceAccount = require("./videobiljardenorebrosite-firebase-adminsdk-dhw68-75d79ec6b6.json");
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://videobiljardenorebrosite-default-rtdb.europe-west1.firebasedatabase.app"
});

// Define a scheduled job to run every Sunday at midnight
//const scheduledJob = schedule.scheduleJob("0 0 * * 0", () => {
  // Perform data cleanup and transition here
  // Query, delete, and update data in your Firebase Realtime Database
  // Example:
  const database = admin.database();

        // Call deleteOld for 'booking' and 'admin'
deleteOld('booking')
  .then(() => {
    // Once deleteOld is done, call updateNew for 'booking'
    return updateNew('booking');
  })
  .then(() => {
    // After updateNew for 'booking', call deleteOld for 'admin'
    return deleteOld('admin');
  })
  .then(() => {
    // Finally, call updateNew for 'admin'
    return updateNew('admin');
  })
  .then(() => {
    // All operations are complete, you can now perform any final tasks
    admin.app().delete();
  })
  .catch((error) => {
    console.error('Error:', error);
  });

async function deleteOld(node) {
  const NodeRef = database.ref(node);
  const valuesToDelete = ["Bord_1", "Bord_2", "Bord_3"];

  const promises = valuesToDelete.map(valueToDelete => {
    const query = NodeRef.orderByChild("table").equalTo(valueToDelete);

    return query.once("value")
      .then(snapshot => {
        const deletionPromises = [];
        snapshot.forEach(childSnapshot => {
          const keyToDelete = childSnapshot.key;
          deletionPromises.push(NodeRef.child(keyToDelete).remove());
        });
        return Promise.all(deletionPromises);
      });
  });

  await Promise.all(promises);
  return Promise.resolve();
}



async function updateNew(node) {
    var NodeRef = database.ref(node);
    var valuesToSearch = ["Bord_1_c", "Bord_2_c", "Bord_3_c"];

    // Create an array to store promises for queries
    var promises = [];

    // Loop through the values and create a query for each one
    valuesToSearch.forEach(function (value) {
        var query = NodeRef.orderByChild("table").equalTo(value);
        promises.push(
            query.once("value")
                .then(function (snapshot) {
                    return snapshot.val();
                })
                .catch(function (error) {
                    console.error("Error querying data:", error);
                })
        );
    });

    // Wait for all queries to complete
    Promise.all(promises)
        .then(function (results) {
            const TableArr_m = [];

            results.forEach(function (snapshotData) {
                for (const key in snapshotData) {
                    if (snapshotData.hasOwnProperty(key)) {
                        var currentTable = snapshotData[key].table;
                        var updatedTable = currentTable.replace("_c", "");
                        TableArr_m.push({ key: key, updatedTable: updatedTable });
                    }
                }
            });

            // Now, TableArr_m contains objects with keys and updatedTable values

            // Update the nodes in the database
            TableArr_m.forEach(function (entry) {
                NodeRef.child(entry.key).update({ "table": entry.updatedTable })
                    .then(function () {
                        console.log("Node updated:", node);
                        console.log("Node Updated in " + node);
                    })
                    .catch(function (error) {
                        console.error("Error updating node:", error);
                    });
            });

        })
        .catch(function (error) {
            console.error("Error querying data:", error);
        });
        return Promise.resolve();
        }