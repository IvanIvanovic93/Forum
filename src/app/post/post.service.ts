import {Post} from "./post.model";
import {OnInit} from '@angular/core';


export class PostService implements OnInit {
  post: Post[]=[
      new Post('Title 1',
          'Testcontent TestcontentTestcontent Testcontent' ,
          'Johann Peters',
          '01.04.2019 - 18:56',
          '1'),
      new Post('Title Post 2',
          'Content 2 Content 2 Content 2 Content 2 ' +
          'Content 2 Content 2  Content 2 Content 2 ',
          'Nicht Johann',
          '02.04.2019 - 08:03',
          '2'),
      new Post('Title Post 3',
          'asdf fass dass foo bar dadadad fafaf asdfa asdf Lorem ' +
          'Ipsum Dolor Sit Amet etc',
          'Irgendwer',
          '11.11.2018 - 00:56',
          '3')
  ];
  getPosts(){
      return this.post.slice();
  }
ngOnInit(){

}
  getPost(id: number){
      console.log(id);
  }

}
