import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FooterBComponent } from './footer-b.component';

describe('FooterBComponent', () => {
  let component: FooterBComponent;
  let fixture: ComponentFixture<FooterBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FooterBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(FooterBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
