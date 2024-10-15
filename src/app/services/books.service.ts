/*
Composant principal de l'application 
************************************
Le service utilisera la classe HttpClient pour exposer diverses méthodes HTTP pour effectuer des appels d'API REST.
*/
import { HttpClient, HttpErrorResponse, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  // Définition de l'URL de l'API utilisé
  apiUrl: string = 'http://localhost:3000/books';
  // Définition des en-têtes HTTP pour les requêtes
  headers = new HttpHeaders().set('Content-Type', 'application/json');

  // Injection du service HttpClient pour effectuer des requêtes HTTP
  constructor(private httpClient: HttpClient) { }

  // Afficher la liste des livres récupérés depuis l'API
  list(): Observable<any> {
    // Utilisation du service "httpClient" pour effectuer une requête HTTP et récupération 
    // la liste des livres
    return this.httpClient.get(this.apiUrl).pipe(
      catchError(this.handleError)
    );
  }
  
  // Récupération d'un livre spécifique en fonction de son "id"

  // La méthode prend un paramètre "id" et envoie une requête GET à l'API 
  getItem(id: any): Observable<any> {
    // Utilisation du service "httpClient" pour effectuer une requête HTTP et récupération 
    // un livre spécifique en fonction de son "id"
    return this.httpClient.get(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }

  // Création d'un nouveau libre en envoyant les données à l'API

  // La méthode prend en paramètre des données (data) et envoie une requête POST à l'API 
  create(data: any): Observable<any> {
    // Utilisation du service "httpClient" pour effectuer une requête HTTP et création
    // d'un nouveau livre avec les données fournies
    return this.httpClient.post(this.apiUrl, data).pipe(
      catchError(this.handleError)
    );
  }

  // Mis à jour dd'un livre en fonction de son "id" et envoie une requête PUT à l'API

  // La méthode prend en paramètre un "id" pour identifier le livre à mettre à jour
  update(id: any, data: any): Observable<any> {
    // Utilisation du service "httpClient" pour effectuer une requête HTTP et mettre à jour 
    // le livre en fonction de son "id"
    return this.httpClient.put(`${this.apiUrl}/${id}`, data).pipe(
      catchError(this.handleError)
    );
  }

  // Suppression d'un livre en fonction de son "id" pour identifier le livre à supprimer

  // La méthode prend en paramètre un "id" et envoie une requête DELETE à l'API
  delete(id: any): Observable<any> {
    // Utilisation du service "httpClient" pour effectuer une requête HTTP et su
    // le livre en fonction de son "id"
    return this.httpClient.delete(`${this.apiUrl}/${id}`).pipe(
      catchError(this.handleError)
    );
  }   

  // Rechercher par titre : filtrage en utilisant une requête avec un paramètre "title_like"
 
  // La méthode prend en paramètre un "title" pour filter les livres par titre et envoie une requête GET à l'API
  filterByTitle(title: any): Observable<any> {
    // Utilisation du service "httpClient" pour effectuer une requête HTTP, 
    // avec un paramètre de requête "title_like", pour effectuer la recherche par titre
    return this.httpClient.get(`${this.apiUrl}?title_like=${title}`).pipe(
      // Si une erreur se produit, elle appelle la fonction "handleError" pour gérer l'erreur
      catchError(this.handleError)
    );
  }

  // Gestion des erreurs HTTP qui peuvent se produire lors des requêtes
  handleError(error: HttpErrorResponse) {
    // Elle vérifie si l'erreur est une instance de "ErrorEvent", une erreur côté client, ou si c'est une réponse 
    if (error.error instanceof ErrorEvent) {
      // Sio l'erreur est une erreur côté serveur, elle affiche un message d'erreur dans la console 
      console.error('An error occurred:', error.error.message);
    } else {
      // Si l'erreur est une réponse d'erreur du serveur, elle affiche le code du statut 
      // HTTP et le contenu de la réponse d'erreur dans la console
      console.error(
        `Backend returned code ${error.status}, ` +
        `body was: ${error.error}`);
    }
    // Elle renvoie une erreur personnalisée sous forme d'observable à l'appelant
    return throwError(
      'Une erreur est arrivé; Veuillez réessayer plus tard.');
  };

}