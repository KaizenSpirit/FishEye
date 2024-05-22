const articles = document.querySelectorAll(".article");

articles.forEach(function(article) {
    // Ajoute un écouteur d'événement pour le focus
    article.addEventListener("focus", function() {
        this.classList.add("focus");
    });

    // Ajoute un écouteur d'événement pour la perte de focus
    article.addEventListener("blur", function() {
        this.classList.remove("focus");
    });

});

