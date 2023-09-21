import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomePageComponent } from './home-page/home-page.component';
import { UnbookPageComponent } from './unbook-page/unbook-page.component';
import { AdminPageComponent } from './admin-page/admin-page.component';

const routes: Routes = [
  { path: '', component: HomePageComponent },
  { path: 'unbook', component: UnbookPageComponent },
  { path: 'admin', component: AdminPageComponent},
  { path: '**', component: HomePageComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { 
  
}
