import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder, Validators} from '@angular/forms';
import {PostInterface, PostService} from '../post.service';
import {DatePipe} from '@angular/common';
import {PostDetailComponent} from '../post-detail/post-detail.component';
import {Router} from '@angular/router';

@Component({
    selector: 'app-new-post',
    templateUrl: './new-post.component.html',
    styleUrls: ['./new-post.component.scss'],
    providers: [PostService, DatePipe, PostDetailComponent]
})
export class NewPostComponent implements OnInit {

    constructor(
        private postService: PostService,
        private formBuilder: FormBuilder,
        private datePipe: DatePipe,
        private router: Router
    ) {
    }

    public newPostForm: FormGroup;
    protected postId;
    protected postDate;
    protected newPostFormContent: string;
    protected newPostFormAuthor: string;
    protected newPostFormTitle: string;
    private alertMessage = '';

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
        // console.log(this.newPostForm.get('title').value)
        // console.log(this.currentNewPost);

        this.postId = this.postService.posts.length + 1;
        this.newPostFormTitle = this.newPostForm.get('title').value.trim();
        this.newPostFormAuthor = this.newPostForm.get('author').value.trim();
        this.newPostFormContent = this.newPostForm.get('content').value.trim();
        this.postDate = new Date();
        if (this.newPostFormTitle === '' || this.newPostFormContent === '' || this.newPostFormAuthor === '') {
            this.alertMessage = '';
            if (this.newPostFormTitle === '') {
                this.alertMessage += 'Title mustn\'t be empty \n';
            }
            if (this.newPostFormContent === '') {
                this.alertMessage += 'Content mustn\'t be empty  \n';
            }
            if (this.newPostFormAuthor === '') {
                this.alertMessage += 'Author mustn\'t be empty  \n';
            }
            return this.alertMessage;
        }

        this.postService.createPost(
            this.newPostFormTitle,
            this.newPostFormAuthor,
            this.newPostFormContent,
            this.postDate,
            this.postId
        );

        this.router.navigate(['/']);

    }
}
