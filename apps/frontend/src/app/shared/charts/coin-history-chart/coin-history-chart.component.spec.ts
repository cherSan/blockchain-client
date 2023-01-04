import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CoinHistoryChartComponent } from './coin-history-chart.component';

describe('CoinHistoryChartComponent', () => {
  let component: CoinHistoryChartComponent;
  let fixture: ComponentFixture<CoinHistoryChartComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CoinHistoryChartComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CoinHistoryChartComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
