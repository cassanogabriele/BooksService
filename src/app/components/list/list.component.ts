/*
Ce composant affiche une liste de livres en utilisant le service "BookService" et permet également de rechercher des livres 
par tit et de supprimer les lvires de la liste. 
*/
import { Component, OnInit } from '@angular/core';
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.css']
})
export class ListComponent implements OnInit {
  // Propriété qui stocke la liste des livres récupérés depuis l'API, initialisée à la valeur "undefined"
  books: any;
  // Propriété qui stocke le livre actuellement sélectionné, initialisée à la valeur "undefined"
  currentBook:any;
  // Propriété qui stocke l'index du livre actuellement sélectionné dans la liste, initialisée à "-1" pour 
  // indiquer qu'aucun livre n'est actuellement sélectionné 
  currentIndex = -1;
  // Propriété utilisée pour stocker le titre de recherche entré par l'utilisateur dans le champs de recherche
  searchTitle = '';

  // Injection du service "BookService" en tant que paramètre, permettant au composant d'utiliser les fonctionnalités 
  // du service pour intéragir avec le service
  constructor(private booksService: BooksService) { }
  
  // Méthode exécutée lors de l'initialisation du composant. 
  ngOnInit(): void {
    // Appel de la méthode "getAllBooks" pour récupérer la liste complète des livres depuis l'API, en appelant la méthode "list()"
    this.getAllBooks();
  }

  // Récuperer la liste de livres
  getAllBooks(): void {
    // La méthode s'abonne à l'observable retourné par "list", elle attend la réponse du serveur ou un éventuelle erreur
    this.booksService.list()
    // Si la requête réussit, elle stocke la liste des livres dans la propriété "books"
      .subscribe(
        (books: any) => {
          this.books = books;
        },
        // Si une erreur se produit, elle affiche l'erreur dans la console
        (error: any) => {
          console.log(error);
        });
  }

  // Supprimer un livre

  // La méthode prend en paramètre un "id" représentant l'identifiant du livre à supprimer
  deleteBook(id:number){  
    // Utilisation de la fonction "delete" du service "BooksService" pour envoyer une requête de suppression à l'API en appelant 
    // la méthode "delete(id)"
    this.booksService.delete(id)
    .subscribe(
      // Après la suppression réussie, elle appelle à nouveau "getAllBooks()" pour mettre à jour la liste des livres 
      response => {
        this.getAllBooks();
      },
      // Si une erreur se produit, elle affiche l'erreur dans la console
      error => {
        console.log(error);
      });
  }

  // Recherche livre : méthode appellée lorsque l'utilisateur effectue une recherche en utilisant le champ de recherche
  searchByTitle(): void {
    // Utilisation du service "BooksService" pour effectuer une recherche de livres par titre en appelant la méthode "filterByTitle"
    this.booksService.filterByTitle(this.searchTitle)
      // Elle s'abonne à l'observable retourné par "filterByTitle", elle attend une réponse du servuer ou une éventuelle erreur 
      .subscribe(
        // Si la requête réussit, elle stocke les livres correspondants dans la propriété "books"
        books => {
          this.books = books;
        },
        // Si l'erreur se produit, elle affiche l'erreur dans la console
        error => {
          console.log(error);
        });
  }
}