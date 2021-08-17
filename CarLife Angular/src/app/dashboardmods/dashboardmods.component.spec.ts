import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardmodsComponent } from './dashboardmods.component';

describe('DashboardmodsComponent', () => {
  let component: DashboardmodsComponent;
  let fixture: ComponentFixture<DashboardmodsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardmodsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardmodsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
