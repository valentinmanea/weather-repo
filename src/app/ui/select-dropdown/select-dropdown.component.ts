import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'select-dropdown',
  templateUrl: './select-dropdown.component.html',
  styleUrls: ['./select-dropdown.component.css']
})
export class SelectDropdownComponent implements OnInit {
  @Input()
  items =[];
  @Output()
  selectedEmitter = new EventEmitter();
  @Input()
  disabled;
  @Input()
  selected;
  constructor() { }
 
  ngOnInit() {
  }
  select(){
    this.selectedEmitter.emit(this.selected);
    console.log('emit',this.selected)
  }
}
 