import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NavbarBComponent } from './navbar-b.component';

describe('NavbarBComponent', () => {
  let component: NavbarBComponent;
  let fixture: ComponentFixture<NavbarBComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NavbarBComponent]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(NavbarBComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
