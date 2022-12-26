import { ComponentFixture, TestBed } from '@angular/core/testing';

import { DifficultyGraphComponent } from './difficulty-graph.component';

describe('DifficultyGraphComponent', () => {
  let component: DifficultyGraphComponent;
  let fixture: ComponentFixture<DifficultyGraphComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ DifficultyGraphComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(DifficultyGraphComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
