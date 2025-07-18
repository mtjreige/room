import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { NgbModal, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { RoomService, Room } from '../room-service';
import { BookingService, Booking } from '../booking-service';
import { ExpandableBookingItem } from '../expandable-booking-item/expandable-booking-item';

interface RoomWithExpanded extends Room {
  expanded?: boolean;
}

@Component({
  selector: 'app-summary',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule, NgbModalModule, ExpandableBookingItem],
  templateUrl: './summary.html',
  styleUrls: ['./summary.css']
})
export class SummaryComponent implements OnInit {
  displayedColumns = [ 'name', 'capacity', 'count', 'status','expand'];
  rooms: RoomWithExpanded[] = [];
  bookingsByRoom: { [roomId: number]: Booking[] } = {};

  constructor(
    private roomService: RoomService,
    private bookingService: BookingService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit(): void {
    this.loadRoomsAndBookings();
  }

  loadRoomsAndBookings(): void {
    this.rooms = this.roomService.getRooms().map(room => ({ ...room, expanded: false }));
    for (let room of this.rooms) {
      this.bookingsByRoom[room.id] = this.bookingService.getBookingsByRoom(room.id);
    }
  }

  hasBookings(roomId: number): boolean {
    return (this.bookingsByRoom[roomId]?.length || 0) > 0;
  }

  hasNoBookings(): boolean {
    return this.rooms.every(room => !this.hasBookings(room.id));
  }

  toggleExpand(room: RoomWithExpanded): void {
    room.expanded = !room.expanded;
  }

  cancelBooking(bookingId: number, modalContent: any): void {
    this.modalService.open(modalContent).result.then(result => {
      if (result === 'confirm') {
        this.bookingService.deleteBooking(bookingId);
        this.loadRoomsAndBookings(); 
      }
    }).catch(() => {});
  }

  editBooking(booking: Booking): void {
    this.router.navigate(['/book', booking.roomId, 'edit', booking.id]);
  }
}