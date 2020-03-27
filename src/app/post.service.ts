import { Injectable } from "@angular/core";

@Injectable({
  providedIn: "root",
})
export class PostService {
  private post: any;

  constructor() {}

  setPost(post: any) {
    this.post = post;
  }

  getPost() {
    return this.post;
  }
}
