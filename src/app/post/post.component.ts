import {Component, Input, OnInit} from '@angular/core';
import {PostInterface, PostService} from './post.service';
import {Post} from "./post.model";
import {FormGroup} from '@angular/forms';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [PostService]
})
export class PostComponent implements OnInit {
  post: Observable<PostInterface[]>;

  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.post = this.postService.loadPost();
  }

}
