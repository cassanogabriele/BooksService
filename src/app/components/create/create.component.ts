import { Component } from '@angular/core';
// Importation du service
import { BooksService } from 'src/app/services/books.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent {
  // Objet contenant des champs liées aux entrées de l'utilisateur dans le formulaire HTML 
  // associé au composant 
  book = {
    title: '',
    description: ''
  };

  // Booléen qui indique si un livre a été ajouté avec succès
  // Utilisé pour afficher un message de confirmation à l'utilisateur 
  isBookAdded = false;

  // Injection d'une instance du service en tant que paramètre, cela permet au composant 
  // d'utiliser les fonctionnalités du service pour intéragir avec l'API
  constructor(private booksService: BooksService) { }

  // Méthode exécutée lors de l'initialisation du composant. 
  
  // Généralement utilisé pour effectuer des initialisations lorsque le composant est créé
  ngOnInit(): void { }

  // Ajout d'un livre 
  addBook(): void {
    // Création d'un objet "data" à partir des champs "title" et "description"
    // de l'objet "book"
    const data = {
      title: this.book.title,
      description: this.book.description
    };

    // Si le champs "title" est vide, on avertir l'utilisateur
    if (!data.title) {
      alert('Veuillez ajouter le titre !');
      return;
    }

    // Si le champs "title" n'est pas vide, on appelle la méthode "create",
    this.booksService.create(data)
      // Elle s'abonne à l'observable retourné par "create", elle attend la réponse du serveur ou 
      // ou éventuellement une erreur
      .subscribe(
        // Si la requête réussit, elle affiche la réponse dans la console et active la variable "isBookAdded"
        // pour indiquer que le livre a été ajouté avec succès
        response => {
          console.log(response);
          this.isBookAdded = true;
        },
        // Si une erreur se produit, on affiche l'erreur dans la console
        error => {
          console.log(error);
        });
  }

  // Réinitialiser lors de l'ajout d'un nouveau livre

  // Elle est appelée lorsque l'utilisateur souhaite ajouter un nouveau livre 
  // après en avoir ajouté un précédemment
  newBook(): void {
    // Réinitialisation de la variable "isBookAdded" à "false"
    this.isBookAdded = false;
    // Réinitialisation de l'objet "book" pour vider les champs "title" et "description"
    this.book = {
      title: '',
      description: ''
    };
  }
}
