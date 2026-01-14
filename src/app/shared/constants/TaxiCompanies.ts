import { TaxiCompanyModel } from '../models/transport.model';

export const TAXI_COMPANIES: TaxiCompanyModel[] = [
    new TaxiCompanyModel(1, 'Sarajevo Taxi', '+387 33 1515', 'www.sarajevotaxi.ba'),
    new TaxiCompanyModel(2, 'Crveni Taxi', '+387 33 760 600', 'www.crveni-taxi.ba'),
    new TaxiCompanyModel(3, 'Žuti Taxi', '+387 33 663 555', 'www.zuti-taxi.ba'),
    new TaxiCompanyModel(4, 'Euro Taxi', '+387 33 555 000', 'www.eurotaxi.ba'),
    new TaxiCompanyModel(5, 'City Taxi Sarajevo', '+387 33 222 333', 'www.citytaxi.ba'),
    new TaxiCompanyModel(6, 'Uni Taxi', '+387 33 444 888')
];
