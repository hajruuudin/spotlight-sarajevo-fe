import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { MediaCreate, MediaModel } from '../models/media-model';
import { lastValueFrom } from 'rxjs';


@Injectable({
    providedIn: 'root'
})
export class MediaService {
    private IMGBB_API_URL = 'https://api.imgbb.com/1/upload';
    private IMGBB_API_KEY = '512c6dd79f04550caa5f7b152601612f';

    constructor(private http: HttpClient) { }

    addMedia(mediaCreate: MediaCreate) {
        return this.http.post<MediaModel>(`/api/media`, mediaCreate, {
            withCredentials: true
        })
    }

    async uploadImage(file: File): Promise<string> {
        const base64 = await this.convertToBase64(file);
        const imageBase64 = base64.split(',')[1];

        const body = new HttpParams()
            .set('key', this.IMGBB_API_KEY)
            .set('image', imageBase64)
            .set('name', file.name)

        try {
            const response: any = await lastValueFrom(
                this.http.post(this.IMGBB_API_URL, body)
            );
            return response.data.url;
        } catch (error) {
            console.error('ImgBB upload failed:', error);
            throw new Error('Upload failed');
        }
    }

    private convertToBase64(file: File): Promise<string> {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = () => resolve(reader.result as string);
            reader.onerror = reject;
            reader.readAsDataURL(file);
        });
    }
}