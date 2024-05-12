import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ActivatedPlanComponent } from './activated-plan.component';

describe('ActivatedPlanComponent', () => {
  let component: ActivatedPlanComponent;
  let fixture: ComponentFixture<ActivatedPlanComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ActivatedPlanComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ActivatedPlanComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
