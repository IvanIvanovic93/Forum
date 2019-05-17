import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {PostComponent} from './post/post.component';
import {NewPostComponent} from './post/new-post/new-post.component';
import {PostDetailComponent} from './post/post-detail/post-detail.component';


const pageRoutes: Routes = [
    //  searches for path segment in URI and redirects to component
    {
        path: '',
        component: PostComponent,
        pathMatch: 'full'
    },
    {path: 'create-post', component: NewPostComponent},
    {path: 'post/:id/:title', component: PostDetailComponent},
    {path: '**', component: PostComponent}
];


@NgModule({
    // Imports tells RouterModule which routes to use
    imports: [RouterModule.forRoot(pageRoutes)],
    exports: [RouterModule]
})
export class AppRoutingModule {
}
