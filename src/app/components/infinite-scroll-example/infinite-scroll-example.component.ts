import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-infinite-scroll-example',
  templateUrl: './infinite-scroll-example.component.html',
  styleUrls: ['./infinite-scroll-example.component.css']
})
export class InfiniteScrollExampleComponent implements OnInit {

  private linesToWrite: Array<string>;

  constructor() { }

  ngOnInit() {
    this.linesToWrite = new Array<string>();
    this.add40lines();
  }

  add40lines() {
    const line = 'Another new line -- ';
    let lineCounter = this.linesToWrite.length;
    for (let i = 0; i < 40; i ++) {
      this.addNewLine(line, lineCounter);
      lineCounter ++;
    }
  }

  addNewLine(text: string, lineNumber: number) {
    this.linesToWrite.push(text + lineNumber);
  }
}
