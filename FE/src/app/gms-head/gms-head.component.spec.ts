import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GmsHeadComponent } from './gms-head.component';

describe('GmsHeadComponent', () => {
  let component: GmsHeadComponent;
  let fixture: ComponentFixture<GmsHeadComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GmsHeadComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GmsHeadComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
