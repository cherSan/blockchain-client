import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolHashrateGraphComponent } from './pool-hashrate-graph.component';

describe('PoolHashrateGraphComponent', () => {
  let component: PoolHashrateGraphComponent;
  let fixture: ComponentFixture<PoolHashrateGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolHashrateGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolHashrateGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
