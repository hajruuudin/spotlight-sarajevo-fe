import { Inject, Injectable } from "@angular/core";
import { environment } from "../../environments/environment";
import { CommunityRequestCreateModel, CommunityRequestModel } from "../shared/models/community.request.model";
import { HttpClient } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class CommunityRequestService {
  private apiUrl = environment.API_URL + '/community-request';

  constructor(private http: HttpClient) {}

  /** Fetch all the community requests made by a specific user
   * @return An observable containing an array of CommunityRequestModel objects
   */
  getUserRequests() {
    return this.http.get<CommunityRequestModel[]>(`${this.apiUrl}/get-user-requests`, {
        withCredentials: true
    });
  }

  /**
   * Create a new community request based on the users provided data.
   * In case the request is successfully created, the backend will return the created CommunityRequestModel object.
   * In case the request fails, an error will be thrown.
   * 
   * Optionally, additional data related to the request can be provided in the requestBody field of the CommunityRequestCreateModel.
   *
   * @param request 
   * @return An observable containing the created CommunityRequestModel object
   */
  createCommunityRequest(request: CommunityRequestCreateModel) {
    return this.http.post<CommunityRequestModel>(`${this.apiUrl}/create-request`, request, {
        withCredentials: true
    });
  }
}