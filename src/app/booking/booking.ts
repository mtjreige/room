import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatOptionModule } from '@angular/material/core';
import { MatSelectModule } from '@angular/material/select';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { Booking, BookingService } from '../booking-service';
import { Room, RoomService } from '../room-service';


@Component({
  selector: 'app-booking',
  standalone: true,
  templateUrl: './booking.html',
  styleUrls: ['./booking.css'],
  imports: [
    CommonModule, ReactiveFormsModule, MatFormFieldModule, MatInputModule, MatSelectModule, MatOptionModule, NgbModalModule
  ]
})
export class BookingComponent implements OnInit {
  bookingForm!: FormGroup;
  roomId!: number;
  roomName = '';
  bookingId?: number;
  isEditMode = false;
  availableSlots: string[] = [];  
  bookedSlots: string[] = [];     

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private bookingService: BookingService,
    private roomService: RoomService,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.roomId = +this.route.snapshot.paramMap.get('roomId')!;
    this.bookingId = this.route.snapshot.paramMap.get('bookingId')
      ? +this.route.snapshot.paramMap.get('bookingId')!
      : undefined;
    this.isEditMode = !!this.bookingId;

    const rooms = this.roomService.getRooms();
    const room = rooms.find(r => r.id === this.roomId);
    if (!room) return;

    this.roomName = room.name;
    this.availableSlots = room.allSlots || room.availableSlots;  
    this.bookedSlots = room.bookedSlots || [];

    if (this.isEditMode) {
      const booking = this.bookingService.getBooking(this.bookingId!);
      if (booking) {
        
        if (!this.availableSlots.includes(booking.time)) {
          this.availableSlots.push(booking.time);
        }

        this.bookingForm = this.fb.group({
          requester: [booking.requester, Validators.required],
          purpose: [booking.purpose, Validators.required],
          time: [booking.time, Validators.required]
        });
      }
    } else {
      this.bookingForm = this.fb.group({
        requester: ['', Validators.required],
        purpose: ['', Validators.required],
        time: ['', Validators.required]
      });
    }
  }

  onSubmit(modalContent: any): void {
    if (this.bookingForm.invalid) return;

    if (this.isEditMode) {
      const updatedBooking: Booking = {
        id: this.bookingId!,
        roomId: this.roomId,
        ...this.bookingForm.value
      };
      this.bookingService.updateBooking(updatedBooking);
      this.router.navigate(['/summary']);
    } else {
      this.modalService.open(modalContent).result.then(result => {
        if (result === 'confirm') {
          this.bookingService.addBooking({
            id: 0,
            roomId: this.roomId,
            ...this.bookingForm.value
          });
          this.router.navigate(['/summary']);
        }
      }).catch(() => {});
    }
  }
}
