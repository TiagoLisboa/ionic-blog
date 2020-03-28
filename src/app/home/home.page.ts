import { Component, OnInit } from "@angular/core";
import { Router } from "@angular/router";
import { BlogapiService } from "../blogapi.service";

@Component({
  selector: "app-home",
  templateUrl: "home.page.html",
  styleUrls: ["home.page.scss"],
})
export class HomePage implements OnInit {
  posts = [];
  page: number;
  total: number;

  constructor(private router: Router, private blogapi: BlogapiService) {
    this.posts = [];
    this.page = 1;
    this.total = 0;
  }

  openPost(post) {
    this.router.navigateByUrl("/post", { state: { post } });
  }

  loadPosts(event) {
    if (this.total > 0 && this.posts.length === this.total)
      event.target.disabled = true;
    this.blogapi.getPosts().subscribe((data) => {
      const fetchPosts = data["posts"].map((post) => ({
        ...post,
        thumbnail: `http://localhost:3000${post.thumbnail.url}?page=${this.page}`,
        date: Intl.DateTimeFormat("pt-BR").format(new Date(post.date)),
      }));
      this.posts = [...this.posts, ...fetchPosts];
      this.page += 1;
      this.total = data["meta"].count;
      event.target.complete();
    });
  }

  ngOnInit() {
    this.blogapi.getPosts().subscribe((data) => {
      const fetchPosts = data["posts"].map((post) => ({
        ...post,
        thumbnail: `http://localhost:3000${post.thumbnail.url}?page=${this.page}`,
        date: Intl.DateTimeFormat("pt-BR").format(new Date(post.date)),
      }));
      this.posts = fetchPosts;
      this.page += 1;
      this.total = data["meta"].count;
    });
  }
}
