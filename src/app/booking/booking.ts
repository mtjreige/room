import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatSelectModule } from '@angular/material/select';
import { RoomService, Room } from '../room-service';
import { BookingService, Booking } from '../booking-service';

@Component({
  selector: 'app-booking',
  standalone: true, 
  templateUrl: './booking.html',
  imports: [CommonModule, ReactiveFormsModule, MatFormFieldModule, MatSelectModule],
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  room!: Room;
  allSlots: string[] = [];
  availableSlots: string[] = [];
  isEditMode = false;
  currentBookingId?: number;

  constructor(
    private route: ActivatedRoute,
    private fb: FormBuilder,
    private roomService: RoomService,
    private bookingService: BookingService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const roomId = Number(this.route.snapshot.paramMap.get('roomId'));
    const slotFromUrl = this.route.snapshot.paramMap.get('slot');
    this.currentBookingId = Number(this.route.snapshot.paramMap.get('bookingId'));
    this.isEditMode = !isNaN(this.currentBookingId);

    const roomData = this.roomService.getRooms().find(room => room.id === roomId);
    if (!roomData) return;

    this.room = roomData;
    this.allSlots = [...(roomData.allSlots ?? roomData.availableSlots)];
    this.availableSlots = [...roomData.availableSlots];

    if (this.isEditMode) {
      const booking = this.bookingService.getBooking(this.currentBookingId!);
      if (!booking) return;


      if (!this.availableSlots.includes(booking.time)) {
        this.availableSlots.push(booking.time);
      }

      this.bookingForm = this.fb.group({
        requester: [booking.requester, Validators.required],
        purpose: [booking.purpose, Validators.required],
        time: [booking.time, Validators.required]
      });
    } else {
      this.bookingForm = this.fb.group({
        requester: ['', Validators.required],
        purpose: ['', Validators.required],
        time: [slotFromUrl ?? '', Validators.required]
      });

      if (slotFromUrl && !this.availableSlots.includes(slotFromUrl)) {
        this.availableSlots.push(slotFromUrl);
      }
    }
  }

  onSubmit(): void {
    if (this.bookingForm.invalid) return;

    const booking: Booking = {
      id: this.currentBookingId ?? Date.now(),
      roomId: this.room.id,
      ...this.bookingForm.value
    };

    if (this.isEditMode) {
      this.bookingService.updateBooking(booking);
      this.router.navigate(['/summary']);
    } else {
      const confirmed = window.confirm(`You are booking ${this.room.name} at ${booking.time} — confirm?`);
      if (confirmed) {
        this.bookingService.addBooking(booking);
        this.router.navigate(['/summary']);
      }
    }
  }
}
