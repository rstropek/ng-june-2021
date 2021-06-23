import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-pirates',
  templateUrl: './pirates.component.html',
  styleUrls: ['./pirates.component.scss']
})
export class PiratesComponent {
  @Input() title = 'hello-angular';

  constructor() {
    // setInterval(
    //   () => this.title += '!',
    //   1000
    // );
  }

  onClick() {
    this.title += 'r';
  }

  get weHavePirates() {
    return this.title.endsWith('rrr');
  }

  doChangeTitle(event: Event) {
    this.title = (event.target as HTMLInputElement)?.value;
  }
}
