import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EthHistoryGraphComponent } from './eth-history-graph.component';

describe('EthHistoryGraphComponent', () => {
  let component: EthHistoryGraphComponent;
  let fixture: ComponentFixture<EthHistoryGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EthHistoryGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EthHistoryGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
