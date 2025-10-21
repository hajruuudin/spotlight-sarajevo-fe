import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GoogleIcon } from "../../resources/icons/google-icon/google-icon";

@Component({
  selector: 'app-button-regular',
  imports: [NgClass, GoogleIcon],
  templateUrl: './button-regular.html',
  styleUrl: './button-regular.css',
  host: {
    class: "w-full"
  }
})
export class ButtonRegular {
  @Input() public buttonContent: String = ''
  @Input() public classAddons: String = ''
  @Input() public buttonIcon: String = 'DEFAULT'

  @Output() pressed: EventEmitter<void> = new EventEmitter<void>
  handleClick() {
    this.pressed.emit();
  }
}
