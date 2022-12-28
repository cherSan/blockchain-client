import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolChartComponent } from './pool-chart.component';

describe('PoolChartComponent', () => {
  let component: PoolChartComponent;
  let fixture: ComponentFixture<PoolChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
