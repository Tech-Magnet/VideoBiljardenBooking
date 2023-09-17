const {onSchedule} = require("firebase-functions/v2/scheduler");
const logger = require("firebase-functions/logger");
const admin = require("firebase-admin");
admin.initializeApp();

exports.cleardb = onSchedule("0 0 * * 0", async (event) => {
    logger.log('This will be run every Sunday at midnight in Sweden!');


    const database = admin.database();

    (async () => {
      try {
        await deleteOld("booking");
        await deleteOld("admin");
        logger.log("Old Data Deleted");
      
        await updateNew("booking");
        await updateNew("admin");
        logger.log("New Data Updated");
      
        // All database operations are completed here
        // You can proceed with any other actions
        logger.log("All Operations done, Exiting Program");
        admin.app().delete();
      } catch (error) {
        logger.error("Error:", error);
        admin.app().delete();
      }
    })();


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
          logger.error('Error:', error);
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
                //deletionPromises.push(logger.info(keyToDelete));
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
                        logger.error("Error querying data:", error);
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
                            logger.log("Node updated:", node);
                            logger.log("Node Updated in " + node);
                        })
                        .catch(function (error) {
                            logger.error("Error updating node:", error);
                        });
                });

            })
            .catch(function (error) {
                logger.error("Error querying data:", error);
            });
    }
    return null;
});