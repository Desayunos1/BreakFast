import { Component, OnInit } from '@angular/core';
import { LoginService } from '../../Services/login.service';
import {ThemePalette} from '@angular/material/core';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})

export class NavigationComponent implements OnInit {
  availableColors: ChipColor[] = [
    {name: 'Parce le toca agunatar Hambre hasta que lo acepten !!! Por favor ccomuniquese con el Admin',
    color: 'warn'}
  ];
  constructor(public authService: LoginService) { }

  ngOnInit() {
  }

}
export interface ChipColor {
  name: string;
  color: ThemePalette;
}


