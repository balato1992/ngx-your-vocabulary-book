import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

import { MainComponent } from './components/main-page/main-page.component';

const routes: Routes = [
  { path: 'index', component: MainComponent },
  { path: '', component: MainComponent },
  //{ path: '**', component: PageNotFoundComponent }
  // TODO
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
