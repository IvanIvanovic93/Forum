import {Component, OnInit} from '@angular/core';
import {PostInterface, PostService} from './post.service';
import {Observable} from 'rxjs';
import {Input} from '@angular/core/src/metadata/directives';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.scss'],
  providers: [PostService]
})
export class PostComponent implements OnInit {
  post: Observable<PostInterface[]>;
  public message;
  constructor(private postService: PostService) {
  }

  ngOnInit() {
    this.post = this.postService.loadPost();
    if (this.postService.posts.length < 1) {
      this.message = 'Post deleted, No Posts left';
    }
  }
}
