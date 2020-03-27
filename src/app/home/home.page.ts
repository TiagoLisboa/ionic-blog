import api from "../services/api";
import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Router } from "@angular/router";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  posts: Observable<Array<any>>;
  page: number;
  total: number;

  constructor(private router: Router) {
    this.posts = [];
    this.page = 1;
    this.total = 0;
  }

  openPost(post) {
    this.router.navigateByUrl("/post", { state: { post } });
  }

  loadPosts(event) {
    api.get("/posts.json").then((response) => {
      if (this.total > 0 && this.posts.length === this.total)
        event && (event.target.disabled = true);

      const fetchPosts = response.data.posts.map((post) => ({
        ...post,
        thumbnail: `http://localhost:3000${post.thumbnail.url}?page=${this.page}`,
        date: Intl.DateTimeFormat("pt-BR").format(new Date(post.date)),
      }));

      this.posts = [...this.posts, ...fetchPosts];
      this.page += 1;
      this.total = response.data.meta.count;
      event && event.target.complete();
    });
  }

  ngOnInit() {
    this.loadPosts();
  }
}
