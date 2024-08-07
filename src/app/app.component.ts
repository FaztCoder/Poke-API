// app.component.ts
import { Component, OnInit } from '@angular/core';
import { PokemonService } from './services/pokemon.service';
import { PokemonWithSprite } from './Interfaces/pokemon';
import { Observable } from 'rxjs';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title: string = 'poke api';
  pokemons$: Observable<PokemonWithSprite[]> = new Observable<PokemonWithSprite[]>(); // Inicializa con un Observable vacío

  constructor(private ps: PokemonService) { }

  ngOnInit(): void {
    this.pokemons$ = this.ps.getPokemons();
  }
}
