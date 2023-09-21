import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CalendarComponent } from './calendar/calendar.component';
import { CreateComponent } from './create/create.component';

import { FormsModule } from '@angular/forms';
import { UnbookPageComponent } from './unbook-page/unbook-page.component';
import { HomePageComponent } from './home-page/home-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';
import { RemoveComponent } from './remove/remove.component';

@NgModule({
  declarations: [
    AppComponent,
    CalendarComponent,
    CreateComponent,
    UnbookPageComponent,
    HomePageComponent,
    AdminPageComponent,
    RemoveComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }