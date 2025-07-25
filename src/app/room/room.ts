import { Component, Input } from '@angular/core';
import { Router } from '@angular/router';
import { Room as RoomModel } from '../room-service';
import { CommonModule } from '@angular/common';
import { NgbTooltipModule } from '@ng-bootstrap/ng-bootstrap';
@Component({
  selector: 'app-room',
  standalone: true,
  imports: [CommonModule, NgbTooltipModule],
  templateUrl: './room.html',
  styleUrls: ['./room.css']
})
export class RoomComponent {
  @Input() room!: RoomModel;

  constructor(private router: Router) {}

  bookSlot(slot: string): void {
    if (this.room.bookedSlots?.includes(slot)) return;
    this.router.navigate([`/book`, this.room.id, 'slot', slot]);
  }
}
