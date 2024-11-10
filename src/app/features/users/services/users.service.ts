import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map, Observable } from 'rxjs';

export interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  address: {
    address: string;
    city: string;
    state: string;
    stateCode: string;
    postalCode: number;
    coordinates: {
      lat: number;
      lng: number;
    };
    country: string;
  };
}

@Injectable({
  providedIn: 'root',
})
export class UsersService {
  private apiUrl = 'https://dummyjson.com/users';

  constructor(private http: HttpClient) {}

  getUsers(): Observable<User[]> {
    return this.http.get<any>(this.apiUrl).pipe(
      map((response) => {
        return response.users.map((user: any) => ({
          id: user.id,
          firstName: user.firstName,
          lastName: user.lastName,
          age: user.age,
          address: {
            address: user.address.address,
            city: user.address.city,
            state: user.address.state,
            stateCode: user.address.stateCode,
            postalCode: user.address.postalCode,
            coordinates: {
              lat: user.address.coordinates.lat,
              lng: user.address.coordinates.lng,
            },
            country: user.address.country,
          },
        }));
      })
    );
  }
}
