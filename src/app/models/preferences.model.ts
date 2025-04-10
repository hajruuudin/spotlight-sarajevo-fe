export class PreferencesModel{
    private answer01: boolean;
    private answer02: boolean;
    private answer03: boolean;
    private answer04: boolean;
    private language: string;
    private category_id_1: number;
    private category_id_2: number;
    private category_id_3: number;

    constructor(
        answer01: boolean,
        answer02: boolean,
        answer03: boolean,
        answer04: boolean,
        language: string,
        category_id_1: number,
        category_id_2: number,
        category_id_3: number
    ) {
        this.answer01 = answer01;
        this.answer02 = answer02;
        this.answer03 = answer03;
        this.answer04 = answer04;
        this.language = language;
        this.category_id_1 = category_id_1;
        this.category_id_2 = category_id_2;
        this.category_id_3 = category_id_3;
    }
}