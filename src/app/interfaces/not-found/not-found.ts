import { Component } from '@angular/core';

/**
 * Not Found User Interface: This UI page is loaded only in the case that an
 * unknown URL on the application is accessed, or in case of an error that would
 * prevent a critical function of the system.
 */
@Component({
  selector: 'app-not-found',
  imports: [],
  templateUrl: './not-found.html',
  styleUrl: './not-found.css',
})
export class NotFound {}
