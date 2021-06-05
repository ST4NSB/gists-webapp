import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GistDetailComponent } from './gist-detail/gist-detail.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { SearchComponent } from './search/search.component';

const routes: Routes = [
  { path: '', redirectTo: '/Search', pathMatch: 'full' },
  { path: 'Search', component: SearchComponent },
  {path: 'GistDetail', component:GistDetailComponent, pathMatch: 'full'},
  { path: '**', component: PageNotFoundComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
