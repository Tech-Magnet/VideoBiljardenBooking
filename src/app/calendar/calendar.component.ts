import { Component } from '@angular/core';
//Firebase SDKs
import { initializeApp } from "firebase/app";
import { getDatabase, ref, child, get } from "firebase/database";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  ngAfterViewInit() {
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


    //this.changeBackgroundColor("TT_1_15_tis");
    const dbRef = ref(getDatabase());
    //Full node
    const dataArray: any = [];

    get(child(dbRef, 'booking/'))
      .then((snapshot) => {
        if (snapshot.exists()) {
          // Iterate through the snapshot's children and push them into the array
          snapshot.forEach((childSnapshot) => {
            const data = childSnapshot.val();
            dataArray.push(data);
          })
        
          // Now that the data is populated, you can run your loop here
          for (let i = 0; i < dataArray.length; i++) {
            const node = dataArray[i];
            let table = node.table.slice(5);
            let time = node.time;
            let day = node.day;


            let idConstructor = "TT_" + table + "_" + time + "_" + day;

            this.changeBackgroundColor(idConstructor);
          }
        } else {
          console.log('No data available');
        }
      })
      .catch((error) => {
        console.error(error);
      })
  }

  changeBackgroundColor(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.style.backgroundColor = "#f00";
      //console.log("Set cell id: " + id + " to Red");
    }else{
      console.warn("element with id: " + id + ", does not exist in the DOM :(");
    }
  }
}
