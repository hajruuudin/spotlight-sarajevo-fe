import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CommunityReqeustCreate, CommunityReqeustModel } from '../models/community-request-model';

@Injectable({
  providedIn: 'root'
})
export class CommunityReqeustService {

  constructor(private http: HttpClient) { }

  addRequest(request: CommunityReqeustCreate){
    return this.http.post<CommunityReqeustModel>(`/api/community-request`, request, {
      withCredentials: true
    })
  }

  getAllRequests(){
    return this.http.get<CommunityReqeustModel>(`/api/community-request/admin/get-all`, {
      withCredentials: true
    })
  }

  deleteRequest(itemId: number){
    return this.http.delete(`/api/community-request/admin/${itemId}`, {
      withCredentials: true
    })
  }
}
