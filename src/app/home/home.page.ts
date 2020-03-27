import api from "../services/api";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  posts: Observable<any>;

  constructor() {}

  ngOnInit() {
    api.get("/posts.json").then((response) => {
      this.posts = response.data.map((post) => ({
        ...post,
        thumbnail: `http://localhost:3000${post.thumbnail.url}`,
      }));
      console.log(this.posts);
    });
  }
}
