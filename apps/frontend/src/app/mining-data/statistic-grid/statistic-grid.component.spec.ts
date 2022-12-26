import { ComponentFixture, TestBed } from '@angular/core/testing';

import { StatisticGridComponent } from './statistic-grid.component';

describe('StatisticGridComponent', () => {
  let component: StatisticGridComponent;
  let fixture: ComponentFixture<StatisticGridComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ StatisticGridComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(StatisticGridComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
