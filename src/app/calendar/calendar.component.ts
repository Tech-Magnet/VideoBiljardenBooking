import { Component } from '@angular/core';

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styleUrls: ['./calendar.component.css']
})
export class CalendarComponent {

  ngAfterViewInit() {
    this.changeBackgroundColor("TT_1_15_tis");
  }

  changeBackgroundColor(id: string): void {
    const element = document.getElementById(id);
    if (element) {
      element.style.backgroundColor = "#f00";
      console.log("Set cell id: " + id + " to Red");
    }else{
      console.warn("element with id: " + id + ", does not exist in the DOM :(");
    }
  }
}
