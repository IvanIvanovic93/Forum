export class Post {
    public title: string;
    public content: string;
    public author: string;
    public date: string;
    public id: number;

    constructor(title: string, content: string, author: string, date: string, id: number) {
        this.title=title;
        this.content=content;
        this.author=author;
        this.date = date;
        this.id=id;
    };
}
