import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FirstaidComponent } from './firstaid.component';

describe('FirstaidComponent', () => {
  let component: FirstaidComponent;
  let fixture: ComponentFixture<FirstaidComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FirstaidComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FirstaidComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
