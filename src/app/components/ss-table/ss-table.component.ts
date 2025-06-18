import { Component, Input } from '@angular/core';
import { SpotShorthand } from '../../models/spot-model';
import { EventShorthand } from '../../models/event-model';
import { DatePipe, NgFor, NgIf } from '@angular/common';

@Component({
  selector: 'app-ss-table',
  imports: [NgFor, NgIf, DatePipe],
  templateUrl: './ss-table.component.html',
  styleUrl: './ss-table.component.css',
  host: {
    class: 'w-full h-auto'
  }
})
export class SsTableComponent {
  @Input() tableType : Boolean = false;
  @Input() tableData: (SpotShorthand | EventShorthand)[] = [];

  isSpot(row: SpotShorthand | EventShorthand): row is SpotShorthand {
    return 'rating' in row;
  }

  isEvent(row: SpotShorthand | EventShorthand): row is EventShorthand {
    return 'startDateFormatted' in row;
  }
}
