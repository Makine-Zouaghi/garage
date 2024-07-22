/*
selectionner la basse de données dans mongoshell avant de charger le fichier
    use garage 
    load('garage.js')
*/

// inserer des documents dans la collection contact 
db.contact.insertMany([
    {
        email: "toto@mail.fr",
        subject: "erreur de commande",
        message: "Ma voiture n'est pas arrivée",
    },
    {
        email: "tutu@mail.fr",
        subject: "erreur de commande",
        message: "Je veux une autre voiture !",
    },
]);

