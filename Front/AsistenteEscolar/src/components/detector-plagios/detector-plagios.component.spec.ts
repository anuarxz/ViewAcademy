import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DetectorPlagiosComponent } from './detector-plagios.component';

describe('DetectorPlagiosComponent', () => {
  let component: DetectorPlagiosComponent;
  let fixture: ComponentFixture<DetectorPlagiosComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [DetectorPlagiosComponent]
    });
    fixture = TestBed.createComponent(DetectorPlagiosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
