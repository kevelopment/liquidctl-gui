import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ChangeColorModeComponent } from './change-color-mode.component';

describe('ChangeColorModeComponent', () => {
  let component: ChangeColorModeComponent;
  let fixture: ComponentFixture<ChangeColorModeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ChangeColorModeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ChangeColorModeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
