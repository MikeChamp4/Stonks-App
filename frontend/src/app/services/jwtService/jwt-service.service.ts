import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { CookieService } from 'ngx-cookie-service';

@Injectable({
  providedIn: 'root'
})
export class JwtService {
  URL_API = "http://localhost:3000/login/verifyJWT"; // Asegúrate de cambiar esto por la URL de tu endpoint de verificación de token

  constructor(private cookieService: CookieService, private http: HttpClient) { }

  verifyToken() {
    return this.http.post(this.URL_API, { withCredentials: true });
  }
}
