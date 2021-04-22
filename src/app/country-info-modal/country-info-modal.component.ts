import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';

@Component({
  selector: 'app-country-info-modal',
  templateUrl: './country-info-modal.component.html',
  styleUrls: ['./country-info-modal.component.scss']
})
export class CountryInfoModalComponent implements OnInit, OnChanges {

  @Input() modalVisible: boolean = false;
  @Output() modalClosed: EventEmitter<any> = new EventEmitter();
  display = 'none';

  constructor() { }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges){
    changes.modalVisible.currentValue ? this.open() : this.close();
  }

  open(){
    this.display = 'block';
  }
  
  close(){
    this.modalClosed.emit(null);
    this.display = 'none';
  }

}
