import {of} from 'rxjs';
import {Injectable} from '@angular/core';
import {PostEditComponent} from './post-edit/post-edit.component';
import {post} from 'selenium-webdriver/http';
import {Post} from './post.model';
import {LocalStorage} from 'ngx-store';

export interface PostInterface {
    title: string;
    content: string;
    author: string;
    date: string;
    id: number;
}

@Injectable()
export class PostService {
    currentPost;
    @LocalStorage() public posts: PostInterface[] = [
        {
            title: 'test',
            content: 'Testcontent TestcontentTestcontent Testcontent',
            author: 'Johann Peters',
            date: '01.04.2019 - 18:56',
            id: 1
        },
        {
            title: 'test 2',
            content: 'Testcontent 2 TestcontentTestcontent Testcontent',
            author: 'Johann Peters 2',
            date: '02.04.2019 - 18:56',
            id: 2
        },
    ];

    getPost(id: number | string): PostInterface {
        return this.posts.find((post) => {
            return post.id === id;
        });
    }

    loadPost() {
        return of<PostInterface[]>(this.posts);
    }

    overWritePost(title, author, content, date, id) {
        this.posts.splice(id - 1 , 1, {title, content, author, date, id});
    }
}
