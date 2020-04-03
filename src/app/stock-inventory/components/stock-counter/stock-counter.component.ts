import { Component, OnInit, Input, forwardRef } from "@angular/core";
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from "@angular/forms";

const COUNTER_CONTROL_ACCESSOR = {
  provide: NG_VALUE_ACCESSOR,
  useExisting: forwardRef(() => StockCounterComponent),
  multi: true
};

@Component({
  selector: "app-stock-counter",
  templateUrl: "./stock-counter.component.html",
  styleUrls: ["./stock-counter.component.scss"],
  providers: [COUNTER_CONTROL_ACCESSOR]
})
export class StockCounterComponent implements OnInit, ControlValueAccessor {
  private onTouch: Function;
  private onModelChange: Function;

  writeValue(value) {
    this.value = value || 0;
  }
  registerOnChange(fn) {
    this.onModelChange = fn;
  }
  registerOnTouched(fn) {
    this.onTouch = fn;
  }

  constructor() {}

  ngOnInit(): void {}
  @Input() step: number = 10;
  @Input() min: number = 10;
  @Input() max: number = 1000;

  value: number = 10;

  increment() {
    if (this.value < this.max) {
      this.value = this.value + this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }

  decrement() {
    if (this.value > this.min) {
      this.value = this.value - this.step;
      this.onModelChange(this.value);
    }
    this.onTouch();
  }
}
