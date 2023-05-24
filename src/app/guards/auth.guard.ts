import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree } from '@angular/router';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private route: Router){}

  // route analiza en q ruta estamos
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
      let token = sessionStorage.getItem('token');

    if(token){
      return true;
    }else{
      this.route.navigate(['login'])
      return false;
    }
    // si se devuelve true -> se carga la ruta
    //return true;
  }
  
}
