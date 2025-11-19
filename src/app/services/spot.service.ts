import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { SortOptions } from "../shared/constants/SortOptions";
import { environment } from "../../environments/environment";
import { SpotShorthandModel } from "../shared/models/spot.model";
import { PageResponseModel } from "../shared/models/shared.model";

/**
 * SpotService handles all available backend endpoints related to the spot object.
 * This includes (not limited to) basic CRUD operations
 * - Paginated spot GET method with custom search criteria
 * - POST method to create a spot, available only to admin users
 * - PUT method to update a spot, available only to admi users
 * - DELETE method to delete a spot from the database along with its information, available only to admin users
 * ... among other methods.
 * 
 * Models and entities incorporated in the method: SpotShorthandModel, SpotModel
 * 
 * All HTTP requests include credentials for cookie/session management.
 * 
 * @version 1.0.0
 * @author hajrudin.imamovic
 */
@Injectable({
    providedIn: "root"
})
export class SpotService {
    private apiUrl = environment.API_URL;

    constructor (private http: HttpClient) {}

    /**
     * Method to retrieve paginated spot shorthands from the database based on specific search, sort and filter criteria.
     * 
     * @param pageNumber The number of the page that is being retrieved (0-indexed, so the first page starts at 0)
     * @param pageSize The size of the page (dependable on the use of the method but should not exceed 25)
     * @param searchTerm The search query specified by the user in the search bar (Spots are searched against their Official Name as specified on Google Maps / any reliable online resource)
     * @param sortOption The sorting option specified by the user
     * @param categoryIds The category Ids by which the user filters the result. If left empty, all spot categories will be taken into account.
     * @returns An sorted page of Spot Shothand results 
     * 
     */
    findSpotsPaginated(pageNumber: number, pageSize: number, searchTerm: string, sortOption: string, categoryIds: number[]){
        return this.http.get<PageResponseModel<SpotShorthandModel>>(this.apiUrl + `/spot/find-spots?pageNumber=${pageNumber}&pageSize=${pageSize}&searchTerm=${searchTerm}&sortOption=${sortOption}&categoryIds=${categoryIds}`, {
            withCredentials: true
        })
    }
}