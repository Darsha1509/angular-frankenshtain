import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-fetch-data',
  templateUrl: './fetch-data.component.html',
  styleUrls: ['./fetch-data.component.css']
})
export class FetchDataComponent implements OnInit {
  inputValue: FormControl;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.inputValue = new FormControl();

    this.fetchData();
  }

  private fetchData() {
    this.http.get('https://swapi.dev/api/people')
    .subscribe(data => {
      console.log(data);
    });
  }

}
