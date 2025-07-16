import { Component, OnInit } from '@angular/core';
import { RoomService, Room } from '../room-service';
import { RoomComponent } from '../room/room';
import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-rooms',
  standalone: true,
  imports: [CommonModule, RoomComponent],
  templateUrl: './rooms.html',
  styleUrls: ['./rooms.css']
})
export class Rooms implements OnInit {
  rooms: Room[] = [];
  constructor(private roomService: RoomService){}

  ngOnInit(): void{
    this.rooms = this.roomService.getRooms();
  }

}
