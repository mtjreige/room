import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ExpandableBookingItem } from './expandable-booking-item';

describe('ExpandableBookingItem', () => {
  let component: ExpandableBookingItem;
  let fixture: ComponentFixture<ExpandableBookingItem>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ExpandableBookingItem]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ExpandableBookingItem);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
