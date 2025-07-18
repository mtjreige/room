import { Injectable } from '@angular/core';
import { BookingService } from './booking-service';

export interface Room {
  id: number;
  name: string;
  capacity: number;
  features: string[];
  availableSlots: string[];
  bookedSlots?: string[];
  allSlots?: string[];
}

@Injectable({
  providedIn: 'root',
})
export class RoomService {
  private rooms: Room[] = [
    {
      id: 1,
      name: 'Cedar Room',
      capacity: 10,
      features: ['Projector', 'Whiteboard'],
      availableSlots: ['09:00', '10:00', '11:00', '14:00', '15:00'],
    },
    {
      id: 2,
      name: 'Phoenicia Room',
      capacity: 6,
      features: ['TV Screen'],
      availableSlots: ['10:00', '11:00', '13:00', '15:00'],
    },
    {
      id: 3,
      name: 'Byblos Room',
      capacity: 12,
      features: ['Whiteboard', 'Video Call Support'],
      availableSlots: ['09:00', '12:00', '14:00', '16:00'],
    },
  ];

  constructor(private bookingService: BookingService) {}

  getRooms(): Room[] {
    const bookings = this.bookingService.getBookings();

    return this.rooms.map(room => {
      const booked = bookings
        .filter(booking => booking.roomId === room.id)
        .map(booking => booking.time);

      return {
        ...room,
        allSlots: room.availableSlots,
        availableSlots: room.availableSlots.filter(slot => !booked.includes(slot)),
        bookedSlots: booked,
      };
    });
  }
}
