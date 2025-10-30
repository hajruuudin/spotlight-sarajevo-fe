import { NgClass } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GoogleIcon } from "../../resources/icons/google-icon/google-icon";

/**
 * ButtonRegular is a reusable button component.
 * It supports optional icons, custom content, and additional CSS classes.
 * Emits a `pressed` event when clicked.
 *
 * @example
 * <app-button-regular
 *   [buttonContent]="'Login with Google'"
 *   [buttonIcon]="'GOOGLE'"
 *   [classAddons]="'bg-blue-500 text-white'"
 *   (pressed)="handleLogin()">
 * </app-button-regular>
 */
@Component({
  selector: 'app-button-regular',
  imports: [NgClass, GoogleIcon],
  templateUrl: './button-regular.html',
  styleUrl: './button-regular.css'
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
