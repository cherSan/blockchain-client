import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MainRatesComponent } from './main-rates.component';

describe('MainRatesComponent', () => {
  let component: MainRatesComponent;
  let fixture: ComponentFixture<MainRatesComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MainRatesComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MainRatesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
