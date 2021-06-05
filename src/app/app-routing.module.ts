import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GistDetailComponent } from './gist-detail/gist-detail.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/Search', pathMatch: 'full' },
  { path: 'Search', component: SearchComponent },
  {path: 'GistDetail', component:GistDetailComponent, pathMatch: 'full'},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
