import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VehicledashboardComponent } from './vehicledashboard.component';

describe('VehicledashboardComponent', () => {
  let component: VehicledashboardComponent;
  let fixture: ComponentFixture<VehicledashboardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VehicledashboardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VehicledashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
