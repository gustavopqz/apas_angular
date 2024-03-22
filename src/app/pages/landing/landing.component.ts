import { Component } from '@angular/core';
import { LandingService } from './landing.service';
import { Posts } from './posts';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-landing',
  standalone: true,
  imports: [],
  providers: [],
  templateUrl: './landing.component.html',
  styleUrl: './landing.component.scss'
})
export class LandingComponent {

  // private posts ?: Posts;
  private posts$ = new Observable<Posts>();

  constructor(private landingService: LandingService){
    this.getPostsInstagram(); 
  }

  getPostsInstagram(){
    // this.landingService.getPosts()
    // .subscribe(posts => {
    //   this.posts = posts
    //   console.log(this.posts.data)
    // })


    this.posts$ = this.landingService.getPosts();
  }

}
