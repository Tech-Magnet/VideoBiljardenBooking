import { Component } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from "firebase/analytics";
import { getDatabase, ref, get, query, orderByChild, equalTo, remove, DatabaseReference } from "firebase/database";

@Component({
  selector: 'app-remove',
  templateUrl: './remove.component.html',
  styleUrls: ['./remove.component.css']
})
export class RemoveComponent {

  formData = {
    Phone: '',
    Day: 'mon',
    Week: '',
    Table: 'Bord_1'
  };

  onFormSubmit(){
    const firebaseConfig = {
      apiKey: "AIzaSyAxv9AQ5b9Ig9HnCAzxfLcHfdojZiGMyNQ",
      authDomain: "videobiljardenorebrosite.firebaseapp.com",
      databaseURL: "https://videobiljardenorebrosite-default-rtdb.europe-west1.firebasedatabase.app",
      projectId: "videobiljardenorebrosite",
      storageBucket: "videobiljardenorebrosite.appspot.com",
      messagingSenderId: "1042889427467",
      appId: "1:1042889427467:web:bbbedfe2ce5eea96d8d50e",
      measurementId: "G-FPJBGKX7R0"
    };
    // Initialize Firebase
    const app = initializeApp(firebaseConfig);
    const analytics = getAnalytics(app);
    const database = getDatabase(app);
    //const database = getDatabase(app);
    logEvent(analytics, "Booking Removed");

    let day = this.formData.Day;
    let phone = this.formData.Phone;
    let table = this.formData.Table + this.formData.Week;


    this.searchBookingsByPhone(database, phone, day, table)
    .then((results) => {
      // Handle the list of keys and data that match the phone number
      results.forEach((result) => {
        const key = result.key;
        const data = result.data;
        console.log('Key:', key);
        console.log('Data:', data);
        
        //Deleting Data
        //const nodeRef: DatabaseReference = ref(database, "booking");
        //const childRef: DatabaseReference = ref(nodeRef, key);
//
        //remove(childRef)
        //  .then(function() {
        //    console.log("Node deleted:", key);
        //    console.log("Node Deleted from booking");
        //  })
        //  .catch(function(error: any) {
        //    console.error("Error deleting node:", error);
        //  });
      });
    })
    .catch((error) => {
      // Handle any errors that occur during the search
      console.error('Error:', error);
    });
  }


  // Define a function to search for bookings by phone and get their keys
async searchBookingsByPhone(database:any, phone: string, day: string, table: string): Promise<{ key: string, data: any }[]> {
  try {
    // Create a reference to the "booking" location in the database
    const bookingRef:DatabaseReference = ref(database, 'booking');

    // Define a query to filter data by 'phone'
    const queryByPhone = query(bookingRef, orderByChild('phone'), equalTo(phone));

    // Get the data matching the query
    const snapshot = await get(queryByPhone);

    const keysAndData: { key: string, data: any }[] = [];

    if (snapshot.exists()) {
      snapshot.forEach((childSnapshot: any) => {
        const key = childSnapshot.key; // Get the key of the child node
        const data = childSnapshot.val(); // Get the data of the child node
        if (data.day == day && data.table == table){
          console.log("Data Exist, adding to remove list");
          keysAndData.push({ key, data });
        }else{
          console.log("Data Not found");
        }
      });
    }

    return keysAndData;
  } catch (error) {
    console.error('Error searching for bookings by phone:', error);
    throw error;
  }
}
}
