import { Component } from '@angular/core';
import { Rooms } from './rooms/rooms'; 

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [Rooms],
  templateUrl: './app.html'
})
export class App {}
