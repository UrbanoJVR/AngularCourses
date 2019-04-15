import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InfiniteScrollExampleComponent } from './infinite-scroll-example.component';

describe('InfiniteScrollExampleComponent', () => {
  let component: InfiniteScrollExampleComponent;
  let fixture: ComponentFixture<InfiniteScrollExampleComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InfiniteScrollExampleComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InfiniteScrollExampleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
