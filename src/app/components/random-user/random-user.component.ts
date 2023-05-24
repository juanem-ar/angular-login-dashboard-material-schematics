import { Component, Input, OnInit } from '@angular/core';
import { RandomUserService } from 'src/app/services/random-user.service';
import { Results } from 'src/app/models/randomUser'; 
import { IRandomContact } from 'src/app/models/randomUser';

@Component({
  selector: 'app-random-user',
  templateUrl: './random-user.component.html',
  styleUrls: ['./random-user.component.scss']
})
export class RandomUserComponent implements OnInit{

  @Input() randomContact: IRandomContact | undefined;

  constructor(){}

  ngOnInit(): void {
  }


}
