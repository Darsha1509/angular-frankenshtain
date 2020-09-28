import { Component, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css'],
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      useExisting: forwardRef(() => RatingComponent),
      multi: true,
    },
  ],
})
export class RatingComponent implements OnInit, ControlValueAccessor {
  ratingData: boolean[];
  onChange = (value: number) => {};
  onTouched = () => {};

  constructor() {}

  ngOnInit(): void {
    const initialData: boolean[] = [];

    for (let i = 0; i < 5; i++) {
      initialData.push(false);
    }

    this.ratingData = initialData;
  }

  onRatingChange(i: number) {
    this.ratingData = this.ratingData.map((item, index) => {
      return index <= i ? true : false;
    });

    this.onChange(i + 1);
  }

  writeValue() {}

  registerOnChange(callback: (change: any) => void): void {
    this.onChange = callback;
  }

  registerOnTouched(callback: () => void): void {
    this.onTouched = callback;
  }
}
