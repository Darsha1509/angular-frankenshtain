import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-component2-nt',
  templateUrl: './component2-nt.component.html',
  styleUrls: ['./component2-nt.component.css'],
})
export class Component2NtComponent implements OnInit {
  data = {
    name: 'Dasha',
    age: 28,
    gender: 'female',
  };

  constructor() {}

  ngOnInit(): void {}

  get _data() {
    return JSON.stringify(this.data);
  }
}
