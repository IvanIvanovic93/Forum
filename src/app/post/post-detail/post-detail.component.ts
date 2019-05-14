import {AfterContentInit, Component, OnInit, Output} from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import {PostInterface, PostService} from '../post.service';
import { Location} from '@angular/common';
import {PostComponent} from '../post.component';


@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  providers: [PostService, PostComponent]
})
export class PostDetailComponent implements OnInit, AfterContentInit {
  buttonVisible = false;
  private id;
  public post: PostInterface;
  @Output() CurrentEditablePost = this.post;

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private postService: PostService,
      private postComponent: PostComponent
  ) { }

  ngAfterContentInit(): void {
  }

  ngOnInit() {
    this.route.params.subscribe(params => {
      this.id = +params.id;
      this.post = this.postService.getPost(this.id);
    });
  }

  deletePost() {
    this.postService.deletePost(this.id);
    this.postComponent.message = 'Post Deleted';
    this.goToHomepage();
  }

  goToHomepage() {
    this.router.navigate(['/']);
  }
 toggleEdit() {
    this.buttonVisible = !this.buttonVisible;
 }
}
