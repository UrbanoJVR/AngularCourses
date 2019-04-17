import {Component, HostListener, OnInit} from '@angular/core';
import {LogService} from '../../service/log/log.service';

@Component({
  selector: 'app-infinite-scroll-example',
  templateUrl: './infinite-scroll-example.component.html',
  styleUrls: ['./infinite-scroll-example.component.css']
})
export class InfiniteScrollExampleComponent implements OnInit {

  private linesToWrite: Array<string>;
  private logService: LogService;
  private LOG_TAG = 'INFINITE_SCROLL_EXAMPLE_COMPONENT: ';

  private finishPage = 150;
  private actualPage: number;
  private showGoUpButton: boolean;
  showScrollHeight = 400;
  hideScrollHeight = 200;

  constructor() {
    this.logService = new LogService(this.LOG_TAG);
    this.actualPage = 1;
    this.showGoUpButton = false;
  }

  @HostListener('window:scroll', [])
  onWindowScroll() {
    if (( window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop) > this.showScrollHeight) {
      this.showGoUpButton = true;
    } else if ( this.showGoUpButton && (window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop)
      < this.hideScrollHeight) {
      this.showGoUpButton = false;
    }
  }

  ngOnInit() {
    this.logService = new LogService(this.LOG_TAG);
    this.linesToWrite = new Array<string>();
    this.add40lines();
  }

  add40lines() {
    const line = 'Another new line -- ';
    let lineCounter = this.linesToWrite.length;
    for (let i = 0; i < 40; i++) {
      this.linesToWrite.push(line + lineCounter);
      lineCounter++;
    }
  }

  onScroll() {
    this.logService.print('Scrolled!', LogService.DEFAULT_MSG);
    if (this.actualPage < this.finishPage) {
      this.add40lines();
      this.actualPage ++;
    } else {
      this.logService.print('No more lines. Finish page!', LogService.DEFAULT_MSG);
    }
  }

  scrollTop() {
    document.body.scrollTop = 0; // Safari
    document.documentElement.scrollTop = 0; // Other
  }
}
