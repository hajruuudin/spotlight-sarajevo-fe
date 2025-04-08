import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';

@Component({
  selector: 'app-smallcategorylabel',
  imports: [],
  templateUrl: './smallcategorylabel.component.html',
  styleUrl: './smallcategorylabel.component.css'
})
export class SmallcategorylabelComponent {
  @Input() label: string = '';
  @Input() isSelected: boolean = false;
  @Output() isSelectedChange = new EventEmitter<boolean>();

  @HostListener('click')
  onClick() {
    this.isSelected = !this.isSelected;
    this.isSelectedChange.emit(this.isSelected);
  }

  checkboxStyle() {
    return this.isSelected ? 'bg-(--primary)' : 'bg-(--background)'
  }
  selectedStyle(){
    return this.isSelected ? 'bg-gradient-to-r from-[#051f1a] to-[#11aeb6]' : 'bg-white'
  }
  textStyle(){
    return this.isSelected ? 'text-white' : 'text-black'
  }
}
