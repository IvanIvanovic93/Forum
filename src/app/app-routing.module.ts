import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PostComponent} from './post/post.component';
import { PostEditComponent} from './post/post-edit/post-edit.component';
import {NewPostComponent} from './post/new-post/new-post.component';
import {PostDetailComponent} from './post/post-detail/post-detail.component';


const pageRoutes: Routes = [
  { path: '',
    component: PostComponent,
    pathMatch: 'full'
  },
  { path: 'create-post', component: NewPostComponent },
  { path: 'post/:id/:title', component: PostDetailComponent },
  { path: '**', component: PostComponent}
];


@NgModule({
  imports: [RouterModule.forRoot(pageRoutes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
