import {OnInit} from '@angular/core';

export interface PostInterface {
    title: string;
    content: string;
    author: string;
    date: string;
    id: number;
}

export class PostService implements OnInit {
    public posts: PostInterface[] = [
        {
            title: 'test',
            content: 'Testcontent TestcontentTestcontent Testcontent',
            author: 'Johann Peters',
            date: '01.04.2019 - 18:56',
            id: 1
        },
        {
            title: 'test 2',
            content: 'Testcontent TestcontentTestcontent Testcontent',
            author: 'Johann Peters',
            date: '01.04.2019 - 18:56',
            id: 2
        },
    ];

    getPosts(): any {
        return this.posts;
    }

    ngOnInit() {

    }

    getPost(id: number | string) {
        return this.posts.find((post) => {
            return post.id === id;
        });
    }

}
