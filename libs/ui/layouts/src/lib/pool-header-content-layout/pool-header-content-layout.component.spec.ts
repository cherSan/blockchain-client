import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolHeaderContentLayoutComponent } from './pool-header-content-layout.component';

describe('PoolHeaderContentLayoutComponent', () => {
  let component: PoolHeaderContentLayoutComponent;
  let fixture: ComponentFixture<PoolHeaderContentLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolHeaderContentLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolHeaderContentLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
