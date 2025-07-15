import { Component } from '@angular/core';
import { Injectable } from '@angular/core';

export interface Booking {
  id: number;
  roomId: number;
  time: string;
  requester: string;
  purpose: string;
}

@Component({
  selector: 'app-booking-service',
  imports: [],
  templateUrl: './booking-service.html',
  styleUrl: './booking-service.css'
})

@Injectable({ providedIn: 'root'})
export class BookingService {
  private bookings: Booking[] = [
    {
      id: 101,
      roomId: 1,
      time: '10:00',
      requester: 'Layal Haddad',
      purpose: 'Client Call'
    },
    {
      id: 102,
      roomId: 2,
      time: '11:00',
      requester: 'Karim Sleiman',
      purpose: 'Weekly Standup'
    }
  ];

  getBookings(): Booking[] {
    return this.bookings;
  }

  getBooking(id: number): Booking | undefined {
    return this.bookings.find(booking => booking.id === id);
  }

  addBooking(booking: Booking): void {
    this.bookings.push({...booking, id: Date.now() });
  }

  updateBooking(updated: Booking): void {
    const index = this.bookings.findIndex(booking => booking.id === updated.id);
    if (index !== -1) this.bookings[index] = updated;
  }

  deleteBooking(id: number): void {
    this.bookings = this.bookings.filter(booking => booking.id !==id);
  }

  getBookingsByRoom(roomId: number): Booking[] {
    return this.bookings.filter(booking =>booking.roomId === roomId);
  }
}


