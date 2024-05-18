// Firebase Functions
const {onSchedule} = require("firebase-functions/v2/scheduler");
const {logger} = require("firebase-functions");

// Firebase App
const {initializeApp} = require("firebase-admin/app");
const {getFirestore} = require("firebase-admin/firestore");
const {getDatabase} = require("firebase-admin/database");

initializeApp();
const firestore = getFirestore();
const database = getDatabase();

exports.clear_firebase = onSchedule("0 2 * * 0", async () => {
  // Save id to Delete in RTDB
  const sceduleNodesToDelete: string[] = [];

  // Delete Old Documents
  await firestore.collection("bookings").where("week", "==", "Denna Vecka")
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        logger.log(doc.data().nodeRef);
        sceduleNodesToDelete.push(doc.data().nodeRef);
        firestore.collection("bookings").doc(doc.id).delete().then(() => {
          logger.log("Document successfully deleted!");
        }).catch((error: string) => {
          logger.error("Error removing document: ", error);
        });
      });
    })
    .catch((error: string) => {
      logger.error("Error getting documents: ", error);
    });

  // Delete All old nodes
  sceduleNodesToDelete.forEach((node: string) => {
    database.ref("schedule/" + node).remove();
  });

  // Delete All Old Timecards
  database.ref("schedule/time/").once("value", (snapshot: any) => {
    const data = snapshot.val();

    for (const key in data) {
      if (data[key].week == "Denna Vecka") {
        database.ref("schedule/time/" + key).remove().then(() => {
          logger.log("Successfully Removed Key ", key);
        }).catch((error: string) => {
          logger.error("An error ucured while deleting key: ", error);
        });
      }
    }
  });


  // Update Next Week Docs to This Week

  await firestore.collection("bookings").where("week", "==", "Nästa Vecka")
    .get()
    .then((querySnapshot: any) => {
      querySnapshot.forEach((doc: any) => {
        logger.log(doc.id, " => ", doc.data());
        firestore.collection("bookings").doc(doc.id).update({
          week: "Denna Vecka",
        });
      });
    })
    .catch((error: string) => {
      logger.error("Error getting documents: ", error);
    });


  // Update Next week nodes to be this week

  database.ref("schedule/").once("value", (snapshot: any) => {
    const data = snapshot.val();

    for (const key in data) {
      if (data[key].week == "Nästa Vecka") {
        database.ref("schedule/" + key).update({
          week: "Denna Vecka",
        }).then(() => {
          logger.log("Successfully Updated Key ", key);
        }).catch((error: string) => {
          logger.error("An error ucured while updating key: ", error);
        });
      }
    }
  });


  // Update Timecards
  database.ref("schedule/time/").once("value", (snapshot: any) => {
    const data = snapshot.val();

    for (const key in data) {
      if (data[key].week == "Nästa Vecka") {
        database.ref("schedule/time/" + key).update({
          week: "Denna Vecka",
        }).then(() => {
          logger.log("Successfully Updated Key ", key);
        }).catch((error: string) => {
          logger.error("An error ucured while updating key: ", error);
        });
      }
    }
  });  
  return null;
});
