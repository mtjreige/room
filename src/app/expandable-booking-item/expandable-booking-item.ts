import { Component, Input, Output, EventEmitter } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatTableModule } from '@angular/material/table';
import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { Booking } from '../booking-service';

@Component({
  selector: 'app-expandable-booking-item',
  standalone: true,
  imports: [CommonModule, MatTableModule, MatIconModule, MatButtonModule],
  templateUrl: './expandable-booking-item.html',
})
export class ExpandableBookingItem {
  @Input() bookings: Booking[] = [];

  @Output() onEdit = new EventEmitter<Booking>();
  @Output() onCancel = new EventEmitter<number>();

   displayedColumns = ['time', 'requester', 'purpose', 'actions'];

  handleEdit(booking: Booking) {
    this.onEdit.emit(booking);
  }

  handleCancel(id: number) {
    this.onCancel.emit(id);
  }
}
