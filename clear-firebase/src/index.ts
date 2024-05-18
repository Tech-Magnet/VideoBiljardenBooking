//Firebase Functions
const { onRequest } = require("firebase-functions/v2/https");
const { onSchedule } = require("firebase-functions/v2/scheduler");
const { logger } = require("firebase-functions");

//Firebase App
const { initializeApp } = require("firebase-admin/app");
const { getFirestore } = require("firebase-admin/firestore");
const { getDatabase } = require("firebase-admin/database");

initializeApp();
const firestore = getFirestore();
const database = getDatabase();

/*exports.clear_firebase = onRequest(async (request: any, response: any) => {

  

});*/

exports.clear_firebase = onSchedule("0 0 * * 0", async (event: any) => {
  
  //Save id to Delete in RTDB
  let scedule_nodes_to_delete: any = [];

  //Delete Old Documents
  await firestore.collection("bookings").where("week", "==", "Denna Vecka")
  .get()
  .then((querySnapshot: any) => {
    querySnapshot.forEach((doc: any) => {
      logger.log(doc.data().nodeRef);
      scedule_nodes_to_delete.push(doc.data().nodeRef);
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

  //Delete All old nodes
  scedule_nodes_to_delete.forEach((node: string) => {
    database.ref("schedule/" + node).remove()
  });

  //Delete All Old Timecards
  database.ref("schedule/time/").once('value', (snapshot: any) => {
    const data = snapshot.val();

    for (const key in data){
      if(data[key].week == "Denna Vecka"){
        database.ref("schedule/time/" + key).remove().then(() => {
          logger.log("Successfully Removed Key ", key);
        }).catch((error: string) => {
          logger.error("An error ucured while deleting key ", key, " :: ", error);
        });
      }
    }
  });


  //Update Next Week Docs to This Week

  await firestore.collection("bookings").where("week", "==", "Nästa Vecka")
  .get()
  .then((querySnapshot: any) => {
    querySnapshot.forEach((doc: any) => {
      logger.log(doc.id, " => ", doc.data());
      firestore.collection("bookings").doc(doc.id).update({
        week: "Denna Vecka"
      });
    });
  })
  .catch((error: string) => {
    logger.error("Error getting documents: ", error);
  });


  //Update Next week nodes to be this week

  database.ref("schedule/").once('value', (snapshot: any) => {
    const data = snapshot.val();

    for (const key in data){
      if(data[key].week == "Nästa Vecka"){
        database.ref("schedule/" + key).update({
            week: "Denna Vecka"
        }).then(() => {
          logger.log("Successfully Updated Key ", key);
        }).catch((error: string) => {
          logger.error("An error ucured while updating key ", key, " :: ", error);
        });
      }
    }
  });


  //Update Timecards
  database.ref("schedule/time/").once('value', (snapshot: any) => {
    const data = snapshot.val();

    for (const key in data){
      if(data[key].week == "Nästa Vecka"){
        database.ref("schedule/time/" + key).update({
            week: "Denna Vecka"
        }).then(() => {
          logger.log("Successfully Updated Key ", key);
        }).catch((error: string) => {
          logger.error("An error ucured while updating key ", key, " :: ", error);
        });
      }
    }
  });

  //response.status(200).send("DONE");
  
  return null;

});
