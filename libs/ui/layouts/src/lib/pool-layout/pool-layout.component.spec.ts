import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PoolLayoutComponent } from './pool-layout.component';

describe('PoolLayoutComponent', () => {
  let component: PoolLayoutComponent;
  let fixture: ComponentFixture<PoolLayoutComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PoolLayoutComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PoolLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
