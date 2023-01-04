import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MinerDetailComponent } from './miner-detail.component';

describe('MinerDetailComponent', () => {
  let component: MinerDetailComponent;
  let fixture: ComponentFixture<MinerDetailComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MinerDetailComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MinerDetailComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
