import { Component, OnInit } from '@angular/core';
import {
  trigger,
  state,
  style,
  animate,
  transition
} from '@angular/animations';

@Component({
  selector: 'app-add',
  templateUrl: './add.component.html',
  styleUrls: ['./add.component.css'],
  animations: [
    trigger('openClose', [
      state(
        'closed',
        style({
          backgroundColor: '#3f51b5'
        })
      ),
      state(
        'open',
        style({
          transform: `rotate(-45deg)`,
          backgroundColor: 'tomato'
        })
      ),
      transition('open => closed', [animate('0.2s')]),
      transition('closed => open', [animate('0.2s')])
    ])
  ]
})
export class AddComponent implements OnInit {
  isOpen = false;

  constructor() {}

  ngOnInit() {}

  toggle() {
    this.isOpen = !this.isOpen;
  }
}
