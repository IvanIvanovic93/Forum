import {Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import {PostInterface, PostService} from '../post.service';
import { Location} from '@angular/common';
import {PostComponent} from '../post.component';
import {StatusService} from '../../status.service';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  providers: [PostService, PostComponent]
})
export class PostDetailComponent implements OnInit {
  buttonVisible = false;
  private id;
  public post: PostInterface;
  @Output() CurrentEditablePost = this.post;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private postService: PostService,
      private postComponent: PostComponent,
      private statusService: StatusService
  ) { }

  ngOnInit() {
    // defines var id of post to commit
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.post = this.postService.getPost(this.id);
    });
  }

  deletePost() {
    this.postService.deletePost(this.id);
    //gives status that post is deleted
    this.statusService.deletedPost();
    this.goToHomepage();
  }

  goToHomepage() {
    this.router.navigate(['/']);
  }
 toggleEdit() {
    this.buttonVisible = !this.buttonVisible;
 }
}
