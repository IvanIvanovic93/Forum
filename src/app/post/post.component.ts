import { Component, OnInit } from '@angular/core';
import {PostService} from "./post.service";
import {Post} from "./post.model";

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [PostService]
})
export class PostComponent implements OnInit {
  post: Post[];

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.post=this.postService.getPosts();
  }

}
