import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolInformationComponent } from './pool-information.component';

describe('PoolInformationComponent', () => {
  let component: PoolInformationComponent;
  let fixture: ComponentFixture<PoolInformationComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolInformationComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolInformationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
