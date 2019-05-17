import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {LocalStorage, LocalStorageService} from 'ngx-store';
import {AppModule} from '../app.module';
import {stringify} from 'querystring';

export interface PostInterface {
    title: string;
    content: string;
    author: string;
    date;
    id: number;
    comments?: Array<CommentInterface>;
}

export interface CommentInterface {
    title: string;
    content: string;
    author: string;
    date;
    id: number | string;
}

@Injectable()
export class PostService {
    // @LocalStorage Decorator from ngx-store loads posts Array automatically in local storage
    constructor(
        public localStorageService: LocalStorageService
    ) {
    }

    @LocalStorage() public posts: PostInterface[] = [
        {
            title: 'test',
            content: 'Testcontent TestcontentTestcontent Testcontent',
            author: 'Johann Peters',
            date: 'Tue May 14 2019 16:56:24 GMT+0200 (Mitteleuropäische Sommerzeit)',
            id: 1,
            comments: [
                {
                    title: 'testcomment',
                    content: 'Comment Testcontent TestcontentTestcontent Testcontent',
                    author: 'Johann Peters',
                    date: 'Tue May 14 2019 16:56:24 GMT+0200 (Mitteleuropäische Sommerzeit)',
                    id: 1
                },
                {
                    title: 'testcomment 2',
                    content: 'Comment Testcontent TestcontentTestcontent Testcontent',
                    author: 'Johann Peters',
                    date: 'Tue May 14 2019 16:56:24 GMT+0200 (Mitteleuropäische Sommerzeit)',
                    id: 2
                },
                {
                    title: 'testcomment 2',
                    content: 'Comment Testcontent TestcontentTestcontent Testcontent',
                    author: 'Johann Peters',
                    date: 'Tue May 14 2019 16:56:24 GMT+0200 (Mitteleuropäische Sommerzeit)',
                    id: 3
                }
            ]
        },
        {
            title: 'test 2',
            content: 'Testcontent 2 TestcontentTestcontent Testcontent',
            author: 'Johann Peters 2',
            date: 'Tue May 14 2019 16:56:24 GMT+0200 (Mitteleuropäische Sommerzeit)',
            id: 2,
            comments: []
        },
        {
            title: 'test',
            content: 'Testcontent TestcontentTestcontent Testcontent',
            author: 'Johann Peters',
            date: 'Tue May 14 2019 16:56:24 GMT+0200 (Mitteleuropäische Sommerzeit)',
            id: 3,
            comments: []
        },
        {
            title: 'test 2',
            content: 'Testcontent 2 TestcontentTestcontent Testcontent',
            author: 'Johann Peters 2',
            date: 'Tue May 14 2019 16:56:24 GMT+0200 (Mitteleuropäische Sommerzeit)',
            id: 4,
            comments: []
        },
    ];
    private currentPost;
    public comments;


    // return Post with given ID
    getPost(id: number | string): PostInterface {
        return this.posts.find((post) => {
            return post.id === id;
        });
    }

    // returns ALL posts from posts
    loadPost() {
        return of<PostInterface[]>(this.posts);
    }

    overWritePost(title, author, content, date, id) {
        // finds index of post with given id and overwrites it with given params
        this.currentPost = this.posts.findIndex(x => x.id === id);
        this.posts.splice(this.currentPost, 1, {title, content, author, date, id});
    }

    // pushes post with given parameters
    createPost(title, author, content, date, id, comments) {
        this.posts.push({title, author, content, date, id, comments});
    }

    // finds postindex through given id-param and deletes whole post
    deletePost(id) {
        this.currentPost = this.posts.findIndex(x => x.id === id);
        this.posts.splice(this.currentPost, 1);
    }

    writeComment(title, author, content, date, postId, id) {
        this.currentPost = this.posts.findIndex(x => x.id === postId);
        this.posts[this.currentPost].comments.push({title, content, author, date, id});
        this.localStorageService.set('posts', this.posts);
    }

    deleteComment(currentPost, id) {
        this.posts[currentPost].comments.splice(id, 1);
        this.localStorageService.set('posts', this.posts);
    }
}
