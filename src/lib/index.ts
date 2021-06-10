import axios, { AxiosInstance } from 'axios';
import type { Photo } from '../types';

export class UnsplashAPIClient {
  protected clientId: string;
  protected apiBaseUrl = 'https://api.unsplash.com/';
  protected apiInstance: AxiosInstance;

  constructor(clientId: string) {
    this.clientId = clientId;
    this.apiInstance = axios.create({
      baseURL: this.apiBaseUrl,
      params: { client_id: clientId },
    });
  }

  async search(query: string) {
    let photos: Array<Photo> = [];
    try {
      const result = await this.apiInstance.get('/search/photos', {
        params: { query, order_by: 'latest', client_id: this.clientId },
      });
      for await (let photo of result.data.results) {
        const newPhoto: Photo = {
          author: {
            name: photo.user.name,
            profileLink: photo.user.links.self,
            avatarSrc: photo.user.profile_image.small,
          },
          id: photo.id,
          src: photo.urls.full,
          unsplashLink: photo.links.self,
        };
        photos.push(newPhoto);
      }
      return photos;
    } catch (err) {
      console.log(err);
      return null;
    }
  }
}
