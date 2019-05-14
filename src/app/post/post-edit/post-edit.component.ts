import {Component, Input, OnInit} from '@angular/core';
import {FormGroup, FormBuilder} from '@angular/forms';
import {PostInterface, PostService} from '../post.service';
import {DatePipe} from '@angular/common';
import {PostDetailComponent} from '../post-detail/post-detail.component';

@Component({
  selector: 'app-post-edit',
  templateUrl: './post-edit.component.html',
  styleUrls: ['./post-edit.component.scss'],
  providers: [DatePipe]
})
export class PostEditComponent implements OnInit {
  @Input() CurrentEditablePost: PostInterface;
  editedPostForm: FormGroup;
  postId;
  private Title = 'Test';

  constructor(
      protected postDetail: PostDetailComponent,
      private formBuilder: FormBuilder,
      private postService: PostService,
      private datePipe: DatePipe
  ) {}

  ngOnInit() {
    this.editedPostForm = this.formBuilder.group({
      title: [''],
      date: [''],
      author: [''],
      content: [''],
      id: ['']
    });
  }

  onSubmit() {
    this.postId = this.CurrentEditablePost.id;
    if (this.editedPostForm.get('title').value !== '') {
      this.CurrentEditablePost.title = this.editedPostForm.get('title').value.trim();
    }
    if (this.editedPostForm.get('author').value !== '') {
      this.CurrentEditablePost.author = this.editedPostForm.get('author').value.trim();
    }
    if (this.editedPostForm.get('content').value !== '') {
      this.CurrentEditablePost.content = this.editedPostForm.get('content').value.trim();
    }
    this.CurrentEditablePost.date = new Date();
    console.log(this.CurrentEditablePost.date);

    this.postService.overWritePost(
        this.CurrentEditablePost.title,
        this.CurrentEditablePost.author,
        this.CurrentEditablePost.content,
        this.CurrentEditablePost.date,
        this.postId);
    this.postDetail.toggleEdit();

  }
}
