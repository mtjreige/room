import { ComponentFixture, TestBed } from '@angular/core/testing';

import { RoomService } from './room-service';

describe('RoomService', () => {
  let component: RoomService;
  let fixture: ComponentFixture<RoomService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RoomService]
    })
    .compileComponents();

    fixture = TestBed.createComponent(RoomService);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
