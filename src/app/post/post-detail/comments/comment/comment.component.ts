import {Component, DoCheck, Input, OnInit} from '@angular/core';
import {FormBuilder, FormGroup} from '@angular/forms';
import {PostInterface, PostService} from '../../../post.service';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
    selector: 'app-comment',
    templateUrl: './comment.component.html',
    styleUrls: ['./comment.component.scss']
})
export class CommentComponent implements OnInit, DoCheck {
    @Input() comment;

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
    public editCommentForm: FormGroup;
    public editFormVisible = false;
    private id;
    private title;
    public post: PostInterface;
    public alertMessage: string;

    ngOnInit(): void {
        this.editCommentForm = this.formBuilder.group(
            {
                editTitle: this.comment.title,
                editAuthor: this.comment.author,
                editContent: this.comment.content
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

    onDeleteComment(comment) {
        this.selectedComment = this.post.comments.findIndex(x => x.id === comment.id);
        this.postService.deleteComment(this.selectedPostIndex, this.selectedComment);
    }

    onEditComment() {
        this.editFormVisible = !this.editFormVisible;
    }

    SubmitEditedComment(comment) {
        this.selectedComment = this.post.comments.findIndex(x => x.id === comment.id);
        console.log(this.editCommentForm.get('editTitle').value);

        this.validate(
            this.editCommentForm.get('editTitle').value,
            this.editCommentForm.get('editAuthor').value,
            this.editCommentForm.get('editContent').value
        );
        if (this.alertMessage !== '') {
            return this.alertMessage;
        }
        this.postService.editComment(
            this.editCommentForm.get('editTitle').value,
            this.editCommentForm.get('editContent').value,
            this.editCommentForm.get('editAuthor').value,
            new Date(),
            this.id,
            this.selectedComment);
        this.comments = this.post.comments;
    }

    validate(title, author, content) {
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
