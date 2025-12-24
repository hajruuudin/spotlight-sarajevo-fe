import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'zeroReview',
  standalone: true
})
export class ZeroReview implements PipeTransform {

  transform(value: number | string | null | undefined, defaultValue: string = 'N/A'): string | number {
    const numericValue = Number(value);

    if (isNaN(numericValue) || numericValue === 0) {
      return defaultValue;
    }

    return numericValue;
  }
}
