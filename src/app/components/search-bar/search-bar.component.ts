import { Component, EventEmitter, Input, Output } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';
import { debounceTime, distinctUntilChanged } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  imports: [ReactiveFormsModule],
  templateUrl: './search-bar.component.html',
  styleUrl: './search-bar.component.css',
  host: {
    class: 'w-full'
  }
})
export class SearchBarComponent {
  @Input() placeholder: string = 'Search...'
  @Input() name : string | null = null;
  @Input() id : string | null = null;
  @Input() initialSearchTerm: string = '';
  @Output() searchSubmitted = new EventEmitter<string>();

  searchInput = new FormControl(this.initialSearchTerm);

  searchButtonClicked() {
    this.searchSubmitted.emit(this.searchInput.value!);
  }
}
