import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-succes',
  templateUrl: './succes.component.html',
  styleUrls: ['./succes.component.css']
})
export class SuccesComponent implements OnInit {
  @Input() message: string;
  @Input() action = 'GOT IT';
  constructor() { }

  ngOnInit() {
  }
  onClick(){
    this.message =''
  }
}
