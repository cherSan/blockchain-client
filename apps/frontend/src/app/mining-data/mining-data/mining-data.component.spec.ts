import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MiningDataComponent } from './mining-data.component';

describe('MiningDataComponent', () => {
  let component: MiningDataComponent;
  let fixture: ComponentFixture<MiningDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MiningDataComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(MiningDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
