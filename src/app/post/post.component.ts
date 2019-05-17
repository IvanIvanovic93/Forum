import {Component, OnInit} from '@angular/core';
import {PostInterface, PostService} from './post.service';
import {Observable} from 'rxjs';
import {StatusService} from '../status.service';

@Component({
    selector: 'app-post',
    templateUrl: './post.component.html',
    styleUrls: ['./post.component.scss'],
    providers: [PostService]
})
export class PostComponent implements OnInit {
    posts: Observable<PostInterface[]>;
    public message = '';

    constructor(private postService: PostService,
                public statusService: StatusService) {
    }

    ngOnInit() {
        // loads Post from postService
        this.posts = this.postService.loadPost();
        // if there are no post left emit message 'No Posts Left'
        if (this.postService.posts.length < 1) {
            this.statusService.noPostsLeft();
        }
        // show generated message
        this.message = this.statusService.status;
        // delete message in statusService, so it won't show if site is switched
        this.statusService.clearStatus();
    }


}
