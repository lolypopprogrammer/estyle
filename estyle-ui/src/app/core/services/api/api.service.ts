import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { JwtHelperService } from '@auth0/angular-jwt';
import { environment } from './../../../../environments/environment';

const { apiUrl } = environment;

const jwtHelper = new JwtHelperService();

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  constructor(private httpClient: HttpClient) {}

  private token = localStorage.getItem('estyleshaker-auth');
  private currentUser = this.httpClient
    .get(`${apiUrl}/user/me`, this.getAuthHeaders())
    .subscribe((data) => (this.currentUser = data));

  public setUser(data: any) {
    this.currentUser = data;
  }

  public patchUser(data: any) {
    return this.httpClient.patch(
      `${apiUrl}/user/me`,
      data,
      this.getAuthHeaders()
    );
  }

  public setToken(token: string) {
    localStorage.setItem('estyleshaker-auth', token);
    this.token = token;
  }

  public unSetUser() {
    this.currentUser = null;
    localStorage.setItem('estyleshaker-auth', null);
    this.token = null;
  }

  public isAuthorized() {
    let auth;
    try {
      auth = !jwtHelper.isTokenExpired(this.token);
      return auth;
    } catch (e) {
      return false;
    }
  }

  private getAuthHeaders() {
    return {
      headers: {
        Authorization: `Bearer ${this.token}`,
      },
    };
  }

  public get currenUser() {
    if (!this.currentUser)
      this.httpClient
        .get(`${apiUrl}/user/me`, this.getAuthHeaders())
        .subscribe((data) => (this.currentUser = data));
    return this.currentUser;
  }

  public login(data: any) {
    return this.httpClient.post(`${apiUrl}/auth/login`, data);
  }

  public signup(data: any) {
    return this.httpClient.post(`${apiUrl}/auth/signup`, data);
  }

  public getBrands() {
    return this.httpClient.get(
      `${apiUrl}/clothing-brands`,
      this.getAuthHeaders()
    );
  }

  public getCategories() {
    return this.httpClient.get(
      `${apiUrl}/clothing-category`,
      this.getAuthHeaders()
    );
  }

  public getClothingItems({
    limit = 6,
    skip = 0,
    categoryId = '',
    author = '',
  } = {}) {
    return this.httpClient.get(
      `${apiUrl}/clothing-item?limit=${limit}&skip=${skip}&categoryId=${categoryId}&author=${author}`,
      this.getAuthHeaders()
    );
  }

  public getMyClothingItems({
    limit = 6,
    skip = 0,
    categoryId = '',
    occasionName = '',
  } = {}) {
    return this.httpClient.get(
      `${apiUrl}/clothing-item/my?limit=${limit}&skip=${skip}&categoryId=${categoryId}&occasionName=${occasionName}`,
      this.getAuthHeaders()
    );
  }

  public getClothingItemsById(id) {
    return this.httpClient.get(
      `${apiUrl}/clothing-item/${id}`,
      this.getAuthHeaders()
    );
  }

  public createClothingItem(data: any) {
    return this.httpClient.post(
      `${apiUrl}/clothing-item`,
      data,
      this.getAuthHeaders()
    );
  }

  public createBrandItem(data: any) {
    return this.httpClient.post(
      `${apiUrl}/brand-item`,
      data,
      this.getAuthHeaders()
    );
  }

  public getBrandItem({
    limit = 1000,
    skip = 0
    }) {
    return this.httpClient.get(
      `${apiUrl}/brand-item?limit=${limit}&skip=${skip}`,
      this.getAuthHeaders()
    );
  }

  public getBrandItemById(id: string) {
      return this.httpClient.get(
      `${apiUrl}/brand-item/${id}`,
      this.getAuthHeaders()
    );
  }

  public patchClothingItem(id, data: any) {
    return this.httpClient.patch(
      `${apiUrl}/clothing-item/${id}`,
      data,
      this.getAuthHeaders()
    );
  }

  public forgotPassword(data: any) {
    return this.httpClient.post(`${apiUrl}/auth/forgot-password`, data);
  }

  public resetPassword(data: any) {
    return this.httpClient.post(`${apiUrl}/auth/reset-password`, data);
  }

  public getOutfits({
    limit = 6,
    skip = 0,
    isPublic = false,
    search = '',
    id = '',
    occasionId = '',
    collectionId = '',
  } = {}) {
    let url = `${apiUrl}/outfit/?limit=${limit}&skip=${skip}&isPublic=${isPublic}&occasionId=${occasionId}&collectionId=${collectionId}`;
    if (search) url = url + `&search=${search}`;
    if (id) url = url + `&id=${id}`;
    return this.httpClient.get(url, this.getAuthHeaders());
  }

  public getMyOutfits({
    limit = 3,
    skip = 0,
    isDraft = false,
    isPublic = undefined,
    search = '',
    isLookbook = undefined,
  } = {}) {
    let url = `${apiUrl}/outfit/my?limit=${limit}&skip=${skip}&isDraft=${isDraft}`;
    if (isPublic !== undefined) url += `&isPublic=${isPublic}`;
    if (isLookbook !== undefined) url += `&isLookbook=${isLookbook}`;
    if (search) url = url + `&search=${search}`;
    return this.httpClient.get(url, this.getAuthHeaders());
  }

  public getLikedOutfits({ limit = 3, skip = 0 } = {}) {
    return this.httpClient.get(
      `${apiUrl}/outfit/liked?limit=${limit}&skip=${skip}`,
      this.getAuthHeaders()
    );
  }

  public like(id) {
    return this.httpClient.post(
      `${apiUrl}/outfit/${id}/like`,
      {},
      this.getAuthHeaders()
    );
  }

  public likes(id) {
    return this.httpClient.get(
      `${apiUrl}/outfit/${id}/likes`,
      this.getAuthHeaders()
    );
  }

  public createOutfit(data) {
    return this.httpClient.post(
      `${apiUrl}/outfit`,
      data,
      this.getAuthHeaders()
    );
  }

  public getOutfitById(id) {
    return this.httpClient.get(`${apiUrl}/outfit/${id}`, this.getAuthHeaders());
  }

  public getMyWardrobe({
    limit = 3000,
    skip = 0,
    isFavorite,
    search,
  }: any = {}) {
    let url = `${apiUrl}/clothing-item/my?limit=${limit}&skip=${skip}`;

    if (isFavorite) {
      url += `&isFavorite=${isFavorite}`;
    }

    if (search) {
      url += `&search=${search}`;
    }

    return this.httpClient.get(url, this.getAuthHeaders());
  }

  public postComment(id, data) {
    return this.httpClient.post(
      `${apiUrl}/outfit/${id}/comment`,
      data,
      this.getAuthHeaders()
    );
  }

  public patchOutfit(id, data: any) {
    return this.httpClient.patch(
      `${apiUrl}/outfit/${id}`,
      data,
      this.getAuthHeaders()
    );
  }

  public isOwner(id) {
    return this.currenUser.id === id;
  }

  public getUserById(id) {
    return this.httpClient.get(`${apiUrl}/user/${id}`, this.getAuthHeaders());
  }
  public getMe() {
    return this.httpClient.get(`${apiUrl}/user/me`, this.getAuthHeaders());
  }
  public getUser() {
    return this.httpClient.get(`${apiUrl}/user/`, this.getAuthHeaders());
  }

  public patchUserMe(data: any) {
    return this.httpClient.patch(
      `${apiUrl}/user/me`,
      data,
      this.getAuthHeaders()
    );
  }

  public getOccasions() {
    return this.httpClient.get(
      `${apiUrl}/clothing-occasion`,
      this.getAuthHeaders()
    );
  }

  public getOccasionsById(id) {
    return this.httpClient.get(
      `${apiUrl}/clothing-occasion/${id}`,
      this.getAuthHeaders()
    );
  }

  public getVideos(page: number = 1, limit: number = 6) {
    const url = `${apiUrl}/video?page=${page}&limit=${limit}`;

    return this.httpClient.get(url, this.getAuthHeaders());
  }

  public getMyWardrobeCalendar(id, month = 1, year = 2020) {
    const url = `${apiUrl}/wardrobe-calendar?month=${month}&year=${year}&id=${id}`;

    return this.httpClient.get(url, this.getAuthHeaders());
  }

  public postWardrobeCalendarDay(data: { outfit: string; date: Date }) {
    return this.httpClient.post(
      `${apiUrl}/wardrobe-calendar`,
      data,
      this.getAuthHeaders()
    );
  }

  public deleteWardrobeCalendarDay(id) {
    return this.httpClient.delete(
      `${apiUrl}/wardrobe-calendar/${id}`,
      this.getAuthHeaders()
    );
  }

  public patchWardrobeCalendarDay(id, data: { outfit?: string; date?: Date }) {
    return this.httpClient.patch(
      `${apiUrl}/wardrobe-calendar/${id}`,
      data,
      this.getAuthHeaders()
    );
  }

  public getBodyShapes() {
    return this.httpClient.get(`${apiUrl}/body-shape`, this.getAuthHeaders());
  }

  public getBodyShapesById(id) {
    return this.httpClient.get(
      `${apiUrl}/body-shape/${id}`,
      this.getAuthHeaders()
    );
  }

  public getPersonalStyles() {
    return this.httpClient.get(
      `${apiUrl}/personal-style`,
      this.getAuthHeaders()
    );
  }

  public getPersonalStylesById(id) {
    return this.httpClient.get(`${apiUrl}/personal-style/${id}`);
  }
  public getCollection({ limit = 4, skip = 0 } = {}) {
    return this.httpClient.get(
      `${apiUrl}/brand-collection?limit=${limit}&skip=${skip}`,
      this.getAuthHeaders()
    );
  }
  public getCollectionById(id) {
    return this.httpClient.get(
      `${apiUrl}/brand-collection/${id}`,
      this.getAuthHeaders()
    );
  }
  public patchCollection(data, id) {
    return this.httpClient.patch(
      `${apiUrl}/brand-collection/${id}`,
      data,
      this.getAuthHeaders()
    );
  }
  public deleteCollection(id) {
    return this.httpClient.delete(
      `${apiUrl}/brand-collection/${id}`,
      this.getAuthHeaders()
    );
  }
  public postCollection(data: any) {
    return this.httpClient.post(
      `${apiUrl}/brand-collection`,
      data,
      this.getAuthHeaders()
    );
  }

  public getTypeAttribute(id) {
    return this.httpClient.get(
      `${apiUrl}/item-attribute/type/${id}`,
      this.getAuthHeaders()
    );
  }

  public getAttributeByType(type) {
    return this.httpClient.get(
      `${apiUrl}/item-attribute?type=${type}`,
      this.getAuthHeaders()
    );
  }

  public follow(data: any) {
    return this.httpClient.post(
      `${apiUrl}/followers`,
      data,
      this.getAuthHeaders()
    );
  }
  
  public unSubscribe(id) {
    return this.httpClient.delete(
      `${apiUrl}/followers/${id}`,
      this.getAuthHeaders()
    );
  }


  public getFollowers(id) {
    return this.httpClient.get(
      `${apiUrl}/followers/${id}`,
      this.getAuthHeaders()
    );
  }
  public getAllFollowers() {
    return this.httpClient.get(
      `${apiUrl}/followers/`,
      this.getAuthHeaders()
    );
  }
}
