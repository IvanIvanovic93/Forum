import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { PostComponent } from './post/post.component';
import { PostEditComponent } from './post/post-edit/post-edit.component';
import { PostDetailComponent } from './post/post-detail/post-detail.component';
import { NewPostComponent } from './post/new-post/new-post.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import { CommentsComponent } from './post/post-detail/comments/comments.component';
import {LocalStorageService} from 'ngx-store';
import { CommentComponent } from './post/post-detail/comments/comment/comment.component';


@NgModule({
    declarations: [
        AppComponent,
        PostComponent,
        PostEditComponent,
        PostDetailComponent,
        NewPostComponent,
        CommentsComponent,
        CommentComponent
    ],
    imports: [
        BrowserModule,
        AppRoutingModule,
        FormsModule,
        ReactiveFormsModule
    ],
    providers: [LocalStorageService],
    exports: [
        PostEditComponent
    ],
    bootstrap: [AppComponent]
})
export class AppModule { }
