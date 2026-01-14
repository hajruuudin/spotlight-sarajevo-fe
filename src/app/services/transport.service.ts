import { Inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { HttpClient } from "@angular/common/http";
import { TransportMethodLineModel, TransportMethodModel, TransportMethodShorthandModel } from "../shared/models/transport.model";

@Injectable({
  providedIn: 'root',
})
export class PublicTransportService {
    private API_URL = environment.API_URL;

    constructor(
        private http: HttpClient
    ){}

    findAllTransportMethods(){
        return this.http.get<TransportMethodShorthandModel[]>(this.API_URL + `/transport/all`, {
            withCredentials: true
        });
    }

    findMethodById(id: number){
        return this.http.get<TransportMethodModel>(this.API_URL + `/transport/${id}`, {
            withCredentials: true
        });
    }

    findLinesByOperatorAndTransportType(operator: number, transportType: number){
        return this.http.get<TransportMethodLineModel[]>(this.API_URL + `/transport/lines?operatorId=${operator}&transportTypeId=${transportType}`, {
            withCredentials: true
        }); 
    }
}