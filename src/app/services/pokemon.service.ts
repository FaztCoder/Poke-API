import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { PokemonResponse, PokemonDetails, PokemonWithSprite, Pokemon } from '../Interfaces/pokemon';

@Injectable({
  providedIn: 'root'
})
export class PokemonService {
  private BaseUrl: string = 'https://pokeapi.co/api/v2/pokemon';

  constructor(private http: HttpClient) { }

  getPokemons(): Observable<PokemonWithSprite[]> {
    return this.http.get<PokemonResponse>(this.BaseUrl).pipe(
      switchMap((response: PokemonResponse) => {
        return this.getPokemonSprites(response.results);
      })
    );
  }

  getPokemonSprites(pokemons: Pokemon[]): Observable<PokemonWithSprite[]> {
    return new Observable<PokemonWithSprite[]>(observer => {
      const pokemonWithSprites: PokemonWithSprite[] = [];

      pokemons.forEach((pokemon, index) => {
        this.getPokemonDetails(pokemon.name).subscribe(
          (details: PokemonDetails) => {
            const spriteUrl = details.sprites.other.dream_world.front_default;
            pokemonWithSprites.push({ ...pokemon, sprite: spriteUrl });

            if (pokemonWithSprites.length === pokemons.length) {
              observer.next(pokemonWithSprites);
              observer.complete();
            }
          },
          (error) => observer.error(error)
        );
      });
    });
  }

  getPokemonDetails(name: string): Observable<PokemonDetails> {
    const url = `${this.BaseUrl}/${name}`;
    return this.http.get<PokemonDetails>(url);
  }
}
