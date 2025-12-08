import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SidenavContainer } from './sidenav-container';

describe('SidenavContainer', () => {
  let component: SidenavContainer;
  let fixture: ComponentFixture<SidenavContainer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SidenavContainer]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SidenavContainer);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
