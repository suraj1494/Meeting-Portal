import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AvailableMeetComponent } from './available-meet.component';

describe('AvailableMeetComponent', () => {
  let component: AvailableMeetComponent;
  let fixture: ComponentFixture<AvailableMeetComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AvailableMeetComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AvailableMeetComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
