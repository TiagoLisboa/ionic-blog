import { Component, OnInit } from "@angular/core";
import { Observable } from "rxjs";
import { Location } from "@angular/common";
import { ActivatedRoute } from "@angular/router";

@Component({
  selector: "app-post",
  templateUrl: "./post.page.html",
  styleUrls: ["./post.page.scss"],
})
export class PostPage implements OnInit {
  post: Observable<any>;

  constructor(
    private _location: Location,
    private activatedRoute: ActivatedRoute
  ) {}

  goBack() {
    this._location.back();
  }

  ngOnInit() {
    this.post = history.state.post;
  }
}
