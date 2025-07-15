import { Routes } from '@angular/router';
import { BookingComponent } from './booking/booking';

export const routes: Routes = [
  {
    path: 'book/:roomId/slot/:slot',
    component: BookingComponent
  },
  {
    path: 'book/:roomId/edit/:bookingId',
    component: BookingComponent
  }
];
