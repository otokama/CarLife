import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DashboardmodcardComponent } from './dashboardmodcard.component';

describe('DashboardmodcardComponent', () => {
  let component: DashboardmodcardComponent;
  let fixture: ComponentFixture<DashboardmodcardComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DashboardmodcardComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DashboardmodcardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
