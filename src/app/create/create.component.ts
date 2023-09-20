import { Component, ElementRef, ViewChild } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from "firebase/analytics";
import * as database from "firebase/database";

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  @ViewChild('formCreate') formCreate: ElementRef | undefined;

  formData = {
    Name: '',
    Phone: '',
    Day: 'mon',
    Week: '',
    Time: '13',
    Length: '1',
    Table: 'Bord_1'
  };

  onFormSubmit() {
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
    logEvent(analytics, "Booking Made");

    let name = this.formData.Name;
    let phone = this.formData.Phone;
    let day = this.formData.Day;
    let time = parseFloat(this.formData.Time);
    let length = parseFloat(this.formData.Length);
    let table = this.formData.Table;
    table = table + this.formData.Week;

    if (name.length <= 2 || phone.length != 10 || phone.match(/^[0-9]+$/) == null){
      console.log("Data Invalid")
      alert("Ogiltight namn eller Telefon Nummer");
      return;
    }else{
      console.log("Data Valid");
      this.checkBooking(time, day, table)
        .then((found: boolean) => {
          if (found) {
            console.log("Data Found");
          } else {
            // Handle case where no matching booking was found
            console.log("Data Not found");
            console.log(length)
            
            for (let i = 0; i < length; i++) {
              console.info("Writing new Data to Database...");
              const db = database.getDatabase();
              database.push(database.ref(db, 'booking/'), {
                day: day,
                name: name,
                phone: phone,
                table: table,
                time: time
              });
              time = time + 0.5;
              console.log("DONE");
            }
            
          }
        })
        .catch((error: any) => {
          // Handle any errors that occurred during the checkBooking process
          console.error("An error Accured: " + error);
        });
    }
  }


  async checkBooking(time: number, day: string, table: string) {
    try {
      const dbRef = database.ref(database.getDatabase());
      const snapshot = await database.get(database.child(dbRef, 'booking/'));
  
      if (snapshot.exists()) {
        const dataArray: any = [];
  
        snapshot.forEach((childSnapshot: any) => {
          const data = childSnapshot.val();
          dataArray.push(data);
        });
  
        for (let i = 0; i < dataArray.length; i++) {
          const node = dataArray[i];
  
          // Data From RTDB
          let time_rtdb = node.time;
          let day_rtdb = node.day;
          let table_rtdb = node.table;

          //console.log("DATABASE DATA: " + time_rtdb + ", " + day_rtdb + ", " + table_rtdb);
          //console.log("FORM DATA: " + time + ", " + day + ", " + table);
  
          if (time == time_rtdb && day == day_rtdb && table == table_rtdb) {
            return true; // Found a match, return true
          }
        }
      }
  
      return false; // No matching records found
    } catch (error) {
      console.error(error);
      throw error; // Propagate the error
    }
  }
}