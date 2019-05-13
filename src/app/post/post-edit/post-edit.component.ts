import {Component, EventEmitter, Input, OnChanges, OnInit, Output} from '@angular/core';
import {FormGroup, FormControl, FormBuilder} from '@angular/forms';
import {Observable} from 'rxjs';
import {PostInterface, PostService} from '../post.service';
import {Post} from '../post.model';
import {tap} from 'rxjs/operators';
import {formatDate} from '@angular/common';
import {LocalStorage} from 'ngx-store';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss']
})
export class PostEditComponent implements OnInit {
  @Input() CurrentEditablePost: PostInterface;
  editedPostForm: FormGroup;
  editedPost: Observable<PostInterface[]>;
  postId;

  constructor(
      private formBuilder: FormBuilder,
      private postService: PostService
  ) {}

  ngOnInit() {
    this.editedPostForm = this.formBuilder.group({
      title: [''],
      date: [''],
      author: [''],
      content: [''],
      id: ['']
    });

    this.editedPost = this.postService.loadPost();
  }

  onSubmit() {
    this.postId = this.CurrentEditablePost.id;
    if (this.editedPostForm.get('title').value !== '') {
      this.CurrentEditablePost.title = this.editedPostForm.get('title').value;
    }
    if (this.editedPostForm.get('author').value !== '') {
      this.CurrentEditablePost.author = this.editedPostForm.get('author').value;
    }
    if (this.editedPostForm.get('content').value !== '') {
      this.CurrentEditablePost.content = this.editedPostForm.get('content').value;
    }
    this.CurrentEditablePost.date = new Date().toDateString();

    this.postService.overWritePost(
        this.CurrentEditablePost.title,
        this.CurrentEditablePost.author,
        this.CurrentEditablePost.content,
        this.CurrentEditablePost.date,
        this.postId);
  }
}
