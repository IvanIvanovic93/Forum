import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PostInterface, PostService} from '../post.service';
import {DatePipe} from '@angular/common';
import {PostDetailComponent} from '../post-detail/post-detail.component';
import {Router} from '@angular/router';
import {StatusService} from '../../status.service';

@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.scss'],
    providers: [PostService, DatePipe, PostDetailComponent, StatusService]
})
export class NewPostComponent implements OnInit {

    constructor(
        private postService: PostService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private router: Router,
        private statusService: StatusService
    ) {
    }

    public newPostForm: FormGroup;
    protected postId;
    protected postDate;
    protected newPostFormContent: string;
    protected newPostFormAuthor: string;
    protected newPostFormTitle: string;
    private alertMessage = '';
    protected comments;

    ngOnInit() {
        this.newPostForm = this.formBuilder.group({
                title: ['', Validators.required],
                author: ['', Validators.required],
                content: ['', Validators.required],
                date: [''],
                id: ['']
            }
        );
    }

    Submit(): string {
        this.statusService.clearStatus();

        this.postId = this.postService.posts.length + 1;
        this.newPostFormTitle = this.newPostForm.get('title').value.trim();
        this.newPostFormAuthor = this.newPostForm.get('author').value.trim();
        this.newPostFormContent = this.newPostForm.get('content').value.trim();
        this.postDate = new Date();
        this.comments = [];
        // check if title, content, author isn't empty
        this.validate(
            this.newPostFormTitle,
            this.newPostFormContent,
            this.newPostFormAuthor,
        );
        if (this.alertMessage !== '') {
            return this.alertMessage;
        }

        this.postService.createPost(
            this.newPostFormTitle,
            this.newPostFormAuthor,
            this.newPostFormContent,
            this.postDate,
            this.postId,
            this.comments
        );
        this.router.navigate(['/']);
    }

    validate(title, content, author) {
        this.alertMessage = '';
        if (title === '') {
            this.alertMessage += 'Title mustn\'t be empty \n';
        }
        if (content === '') {
            this.alertMessage += 'Content mustn\'t be empty  \n';
        }
        if (author === '') {
            this.alertMessage += 'Author mustn\'t be empty  \n';
        }
        return this.alertMessage;
    }
}
