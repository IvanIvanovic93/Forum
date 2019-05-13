import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {FormsModule} from "@angular/forms";

import{ PostDetailComponent} from "./post-detail/post-detail.component";
import { PostComponent } from "./post.component";

import { PostRoutingModule} from "./post-routing.module";
import {AppModule} from '../app.module';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        PostRoutingModule,
        AppModule

    ],
  declarations: [
      // PostComponent,
      PostDetailComponent
  ]
})
export class PostModule { }
