import { Component, EventEmitter, HostListener, Input, Output } from '@angular/core';
import { HotToastService } from '@ngxpert/hot-toast';

@Component({
  selector: 'app-smallcategorylabel',
  imports: [],
  templateUrl: './smallcategorylabel.component.html',
  styleUrl: './smallcategorylabel.component.css'
})
export class SmallcategorylabelComponent {
  @Input() label: string = '';
  @Input() isSelected: boolean = false;
  @Input() isLimitReached: boolean = false;
  @Output() isSelectedChange = new EventEmitter<boolean>();

  constructor(
    private toastr: HotToastService
  ) {}

  @HostListener('click')
  onClick() {
    if(!this.isLimitReached || this.isSelected){
      this.isSelected = !this.isSelected;
      this.isSelectedChange.emit(this.isSelected);
    } else {
      this.toastr.error("You can only select three categories", {style: {border: "2px solid red", padding: "20px"}})
    }
  }

  checkboxStyle() {
    return this.isSelected ? 'bg-(--primary)' : 'bg-(--primary)'
  }
  selectedStyle(){
    return this.isSelected ? 'bg-gradient-to-r from-[#051f1a] to-[#11aeb6]' : 'bg-white'
  }
  textStyle(){
    return this.isSelected ? 'text-white' : 'text-black'
  }
}
