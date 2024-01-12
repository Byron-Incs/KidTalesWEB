import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AtetionclientComponent } from './atetionclient.component';

describe('AtetionclientComponent', () => {
  let component: AtetionclientComponent;
  let fixture: ComponentFixture<AtetionclientComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AtetionclientComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(AtetionclientComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
