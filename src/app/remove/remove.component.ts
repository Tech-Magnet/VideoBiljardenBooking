import { Component, Query } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from "firebase/analytics";
import { getDatabase, ref, get, orderByChild, query, equalTo, } from 'firebase/database';

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
    const database = getDatabase();
    logEvent(analytics, "Booking Removed");

    let day = this.formData.Day;
    let phone = this.formData.Phone;
    let table = this.formData.Table + this.formData.Week;

    /*this.searchBookingsByPhone(databaseRef, phone, day, table)
    .then((results: any) => {
      // Handle the list of keys and data that match the phone number
      results.forEach((result: any) => {
        const key = result.key;
        const data = result.data;
        console.log('Key:', key);
        console.log('Data:', data);
      });
    })
    .catch((error: any) => {
      // Handle any errors that occur during the search
      console.error('Error:', error);
    });
  }*/
    //test(databaseRef, phone, day, table, key);
    this.searchBookingsByPhone(database, phone, day, table)
    .then((results: any) => {
      console.log(results.key);
    })
  }






  async searchBookingsByPhone (database: any, phone: string, day: string, table: string): Promise<{ key: string, data: any }[]> {
    try {
      // Create a reference to the "booking" location in the database
      const bookingRef: any = ref(database, 'booking');
  
      // Define a query to filter data by 'phone'
      const queryByPhone = query(bookingRef, orderByChild('phone'), equalTo(phone));
  
      // Get the data matching the query
      const snapshot = await get(queryByPhone);
  
      const keysAndData: { key: string, data: any }[] = [];
  
      if (snapshot.exists()) {
        snapshot.forEach((childSnapshot: any) => {
          const key = childSnapshot.key; // Get the key of the child node
          const data = childSnapshot.val(); // Get the data of the child node
          if (data.day == day && data.table == table && key != undefined){
            //console.log("Data Exist, adding to remove list");
            console.log("key " + key);
            keysAndData.push({ key, data });
          }else{
            //console.log("Data Not found");
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



function test(database: any,/* phoneToDelete: any, dayToDelete: any, tableToDelete: any, */key: any){
  // Create a reference to the "booking" node
  console.log("Starting Deletion with key: " + key);
  const db_ref: any = ref(database, 'booking');

  db_ref.child(key).remove();
}
