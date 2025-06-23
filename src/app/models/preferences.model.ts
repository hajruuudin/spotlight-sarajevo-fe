export class PreferencesModel {
    constructor(
      public answer01: boolean,
      public answer02: boolean,
      public answer03: boolean,
      public answer04: boolean,
      public language: string,
      public category_id_1: number,
      public category_id_2: number,
      public category_id_3: number
    ) {}
  }