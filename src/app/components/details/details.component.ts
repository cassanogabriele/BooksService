/*
Ce composant affiche les détails d'un livre spécifique, elle permet à l'utilisateur de mettre à jour le statut de disponibilité 
de ce livre, de le mettre à jour et de le supprimer. 
Les importations sont utilisées pour définir le composant, gérer son cycle de vie, accéder aux paramètres de l'URL et 
effectuer des opérations de routage.
*/
import { Component, OnInit } from '@angular/core';
// Utilisés pour la gestion de la navigation et l'accès aux informations de l'URL. 
import { ActivatedRoute, Router } from '@angular/router';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.css']
})
export class DetailsComponent implements OnInit {
  // Propriété qui stocke les détails du livre actuellement affiché, initialisé avec la valeur "undefined"
  currentBook: any;
  // Propriété qui stocke des messages d'état ou de confirmation qui peuvent être affichés à l'utilisateur
  message = '';

  constructor(
    // Permet au composant d'utiliser les fonctionnalités du service pour intéragir avec l'APi et d'accéder 
    // aux paramètres de l'URL et d'effectuer des opérations de routage
    private booksService: BooksService,
    private route: ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    // Réinitialisation de la propriété "message" à une chaîen vide 
    this.message = '';
    // Appel de la méthode "getBook" pour récupérer les détailss du livre à afficher en fonction de l'id 
    // passé en paramètre dans l'URL. 
    this.getBook(this.route.snapshot.paramMap.get('id'));
  }

  // La méthode prend en paramètre un "id" représentant l'identifiant du livre à afficher
  getBook(id: string | null): void {
    // Utilisation du service "BooksService" pour récupérer les détails du livre en appelant la méthode "getItem(id)"
    this.booksService.getItem(id)
      // Abonnement à l'observable retourné par "getItem", elle attend la réponse du servuer ou une éventuelle erreur 
      .subscribe(
        (book: null) => {
          // Si la requête réussit, elle stocke le résultat du lvire dans la propriété "currentBook"
          this.currentBook = book;
          console.log(book);
        },
        // Si une erreur se produit, elle affiche l'erreur dans la console
        (error: any) => {
          console.log(error);
        });
  }

  // Méthode qui pemret à l'utilisateur de metter à jour le statut de disponibilité du livre
  // Elle prend en paramètre "status" qui indique le nouveau statut de disponibilité 
  setAvailableStatus(status: any): void {
    // Création d'un objet "data" contenant le nom, la description et le nouveau statu de disponibilité du livre
    const data = {
      name: this.currentBook.name,
      description: this.currentBook.description,
      available: status
    };

    // Utilisation du service "BooksService" pour mettre à jour le livre en appelant la méthode "update(id, data)" 
    // en utilisant l'id du livre actuellement affiché
    this.booksService.update(this.currentBook.id, data)
      // Si la mise à jour réussit, elle affiche l'erreur dans la console
      .subscribe(
        response => {
          this.currentBook.available = status;
          console.log(response);
        },
        // Si une erreur se produit, elle affiche l'erreur dans la console
        error => {
          console.log(error);
        });
  }

  // Méthode qui permet à l'utilisateur de mettre à jour les détails du livre
  updateBook(): void {   
    // Utilisation du service "BooksService" pour envoyer les données actuelles du livre en appelant la méthode "update(id, this.currentBook), 
    // en utilisant l'id du livre actuellement affiché. 
    this.booksService.update(this.currentBook.id, this.currentBook)
      // Si la mise à jour réussit, elle affiche l'erreur dans la console et met à jour 
      // la propriété "message" avec un message de confirmation
      .subscribe(
        response => {
          console.log(response);
          this.message = 'The product was updated!';
        },
        // Si une erreur se produit, elle affiche l'erreur dans la console
        error => {
          console.log(error);
        });
  }

  // Méthode qui permet à l'utilisateur de supprimer le livre actuellement affiché
  deleteBook(): void {
    this.booksService.delete(this.currentBook.id)
      // Utilisation du service "BooksService" pour envoyer une requête de suppression en appelant la méthode 
      // "delete(id)", en utilisant l'id du livre actuellement affiché
      .subscribe(
        // Après la suppression réussie, elle effectue une opération de routage pour rediriger l'utilisateur vers la liste 
        // des livres en utilisant "router.navigate".
        response => {
          console.log(response);
          this.router.navigate(['/books']);
        },
        // Si une erreur se produit, elle affiche l'erreur dans la console
        error => {
          console.log(error);
        });
  }

}