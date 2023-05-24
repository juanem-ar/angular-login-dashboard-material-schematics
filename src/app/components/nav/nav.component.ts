import { Component } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.scss']
})
export class NavComponent {

  token: string | null | undefined;
  sessionToken = sessionStorage.getItem('token');

  isHandset$: Observable<boolean> = this.breakpointObserver.observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(private breakpointObserver: BreakpointObserver, private route: Router) {}

  cerrarSesion(){
    sessionStorage.removeItem('token');
    this.route.navigate(['/login']);
    // Se reemplaza el objeto Data que trae el nombre del contacto elegido
    delete history.state.data;
    history.replaceState(history.state, '');
  }

}
