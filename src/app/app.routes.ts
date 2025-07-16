import { Routes } from '@angular/router';
import { BookingComponent } from './booking/booking';
import { Rooms } from './rooms/rooms'
export const routes: Routes = [
  { path: '', redirectTo: 'rooms', pathMatch: 'full'},
  { path: 'rooms',
    component: Rooms,
  },
  {
    path: 'book/:roomId/slot/:slot',
    component: BookingComponent
  },
  {
    path: 'book/:roomId/edit/:bookingId',
    component: BookingComponent
  }
];
