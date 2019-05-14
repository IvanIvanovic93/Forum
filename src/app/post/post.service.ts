import {of} from 'rxjs';
import {Injectable} from '@angular/core';
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
    @LocalStorage() public posts: PostInterface[] = [
        {
            title: 'test',
            content: 'Testcontent TestcontentTestcontent Testcontent',
            author: 'Johann Peters',
            date: 'Tue May 14 2019 16:56:24 GMT+0200 (Mitteleuropäische Sommerzeit)',
            id: 1
        },
        {
            title: 'test 2',
            content: 'Testcontent 2 TestcontentTestcontent Testcontent',
            author: 'Johann Peters 2',
            date: 'Tue May 14 2019 16:56:24 GMT+0200 (Mitteleuropäische Sommerzeit)',
            id: 2
        },
        {
            title: 'test',
            content: 'Testcontent TestcontentTestcontent Testcontent',
            author: 'Johann Peters',
            date: 'Tue May 14 2019 16:56:24 GMT+0200 (Mitteleuropäische Sommerzeit)',
            id: 3
        },
        {
            title: 'test 2',
            content: 'Testcontent 2 TestcontentTestcontent Testcontent',
            author: 'Johann Peters 2',
            date: 'Tue May 14 2019 16:56:24 GMT+0200 (Mitteleuropäische Sommerzeit)',
            id: 4
        },
    ];
    private currentPost;


    getPost(id: number | string): PostInterface {
        return this.posts.find((post) => {
            return post.id === id;
        });
    }

    loadPost() {
        return of<PostInterface[]>(this.posts);
    }

    overWritePost(title, author, content, date, id) {
        this.currentPost = this.posts.findIndex(x => x.id === id);
        this.posts.splice(this.currentPost , 1, {title, content, author, date, id});
    }
    createPost(title, author, content, date, id) {
        this.posts.push({title, author, content, date, id});
    }

    deletePost(id) {
        this.currentPost = this.posts.findIndex(x => x.id === id);
        this.posts.splice(this.currentPost, 1);
    }
}
