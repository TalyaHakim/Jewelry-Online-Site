import { ComponentFixture, TestBed } from '@angular/core/testing';

import { GemstoneComponent } from './gemstone.component';

describe('GemstoneComponent', () => {
  let component: GemstoneComponent;
  let fixture: ComponentFixture<GemstoneComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GemstoneComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(GemstoneComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
