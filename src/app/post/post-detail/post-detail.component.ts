import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';
import { switchMap } from 'rxjs/operators';
import { PostService} from '../post.service';
import { Location} from '@angular/common';

@Component({
  selector: 'app-post-detail',
  templateUrl: './post-detail.component.html',
  styleUrls: ['./post-detail.component.scss'],
  providers: [PostService]
})
export class PostDetailComponent implements OnInit {

  constructor(
      private route: ActivatedRoute,
      private router: Router,
      private location: Location,
      private postService: PostService
  ) { }

  ngOnInit() {
    this.post$ = this.route.paramMap.pipe(
        switchMap((params: ParamMap) =>
            this.postService.getPost(params.get('id'))
        )
    );
  }

}
