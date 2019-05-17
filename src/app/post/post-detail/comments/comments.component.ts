import {Component, DoCheck, OnInit} from '@angular/core';
import {CommentInterface, PostInterface, PostService} from '../../post.service';
import {Form, FormBuilder, FormGroup} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {Observable} from 'rxjs';

@Component({
    selector: 'app-comments',
    templateUrl: './comments.component.html',
    styleUrls: ['./comments.component.scss']
})
export class CommentsComponent implements OnInit, DoCheck {

    constructor(
        private postService: PostService,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router
    ) {
    }

    public selectedComment;
    public selectedPostIndex;
    public comments;
    public commentForm: FormGroup;
    public editCommentForm: FormGroup;
    public editFormVisible = false;
    private id;
    private title;
    public post: PostInterface;
    private alertMessage = '';
    public commentId: number | string;

    ngOnInit(): void {
        this.commentForm = this.formBuilder.group(
            {
                title: '',
                author: '',
                content: ''
            }
        );
        this.editCommentForm = this.formBuilder.group(
            {
                editTitle: '',
                editAuthor: '',
                editContent: ''
            }
        );
    }

    ngDoCheck(): void {
        this.route.params.subscribe(params => {
            this.id = +params.id;
            this.title = params.title;
            this.post = this.postService.getPost(this.id);
        });
        this.comments = this.post.comments;
        this.selectedPostIndex = this.postService.posts.findIndex(z => z.id === this.id);

    }

    Submit() {
        this.commentId = this.post.comments.length + 1;
        this.validate(
            this.commentForm.get('title').value,
            this.commentForm.get('author').value,
            this.commentForm.get('content').value
        );
        if (this.alertMessage !== '') {
            return this.alertMessage;
        }
        this.postService.writeComment(
            this.commentForm.get('title').value,
            this.commentForm.get('content').value,
            this.commentForm.get('author').value,
            new Date().toDateString(),
            this.id,
            this.commentId
        );
        this.commentForm.patchValue({
            title: '',
            author: '',
            content: ''
        });
        this.comments = this.post.comments;
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

    onDeleteComment(comment) {
        this.selectedComment = this.post.comments.findIndex(x => x.id === comment.id);
        this.postService.deleteComment(this.selectedPostIndex, this.selectedComment);
    }

    onEditComment(comment) {
        this.selectedComment = this.post.comments.findIndex(x => x.id === comment.id);
        this.editFormVisible = !this.editFormVisible;
    }
}
