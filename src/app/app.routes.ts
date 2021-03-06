import { NgModule }             from '@angular/core';
import { RouterModule, Routes } from '@angular/router';


import { HomeComponent }   from './home/home.component';

import { NewEntryComponent }   from './new-entry/new-entry.component';

import { SelectEntryComponent } from './select-entry/select-entry.component';


const routes: Routes = [

  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, pathMatch: 'full' },

  { path: 'entry',  component: SelectEntryComponent },
  { path: 'entry/:form_id', component: NewEntryComponent }
];

@NgModule({
  imports: [ RouterModule.forRoot(routes) ],
  exports: [ RouterModule ]
})
export class AppRoutingModule {}
