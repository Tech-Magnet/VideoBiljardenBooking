const admin = require('firebase-admin');
const serviceAccount = require('E:\\authFiles\\videobiljardenorebrosite-firebase-adminsdk-ai3e6-789074e772.json');

// Initialize Firebase Admin SDK with your credentials
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://videobiljardenorebrosite-default-rtdb.europe-west1.firebasedatabase.app/'
});

// Your database update logic here
const database = admin.database();

var bookingVar = false;
var adminVar = false;
var utyk = 0
var Del = false;
//var Del = false;

deleteOld("booking");
deleteOld("admin");

//if(Del == true){
//    updateNew("booking");
//    updateNew("admin");
//}



function deleteOld(node) {
    var NodeRef = database.ref(node);
    var valuesToDelete = ["Bord_1", "Bord_2", "Bord_3"];

    // Loop through the values to delete
    valuesToDelete.forEach(function (valueToDelete) {
        var query = NodeRef.orderByChild("table").equalTo(valueToDelete);

        query.once("value")
            .then(function (snapshot) {
                snapshot.forEach(function (childSnapshot) {
                    // Delete the entry from the database
                    var keyToDelete = childSnapshot.key;
                    NodeRef.child(keyToDelete).remove()
                        .then(function () {
                            console.log("Node deleted:", node);
                            console.log("Node Deleted from Booking");
                        })
                        .catch(function (error) {
                            console.error("Error deleting node:", error);
                        });
                });
            })
            .catch(function (error) {
                console.error("Error querying data:", error);
            });
    });

    utyk++;
    console.log(utyk);
    if (utyk == 2){
        Del = true;
    }
}






function updateNew(node) {
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

            if (node == "booking") {
                bookingVar = true;
            } else if (node == "admin") {
                adminVar = true;
            }

            // Exit
            if (bookingVar == true && adminVar == true) {
                admin.app().delete();
            }
        })
        .catch(function (error) {
            console.error("Error querying data:", error);
        });
}