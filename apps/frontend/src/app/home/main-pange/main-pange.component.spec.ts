import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainPangeComponent } from './main-pange.component';

describe('MainPangeComponent', () => {
  let component: MainPangeComponent;
  let fixture: ComponentFixture<MainPangeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainPangeComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainPangeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
