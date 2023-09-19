import { Component, ElementRef, ViewChild } from '@angular/core';

import { initializeApp } from 'firebase/app';
import { getAnalytics, logEvent } from "firebase/analytics";

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

  ngAfterViewInit() {
    

  }
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
    let time = this.formData.Time;
    let length = this.formData.Length;
    let table = this.formData.Table;

    table = table + this.formData.Week;

    if (name.length <= 2 || phone.length != 10 || phone.match(/^[0-9]+$/) == null){
      console.log("Data Invalid")
      alert("Ogiltight namn eller Telefon Nummer");
      return;
    }else{
      console.log("Data Valid");
    }
  }
}