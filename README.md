Przed rozpocząciem pracy wpisać w konsolę:
npm start

W folderze ./dist znajduje sie index.html - strona na której będzie wyświetlana nasza gra. Zalecam korzystanie z rozszerzenia Live Server (dostępne na pewno w VSC).

Kilka z poniższych zasad stanowią cześć zasad SOLID. Polecam poszukać w internecie ich szerszych wytłumaczeń  i przykładów jeśli ktoś nie jest pewien jak je wykorzystać.

Kilka zasad projektu:
1. Całość jest zorientowana obiektowo - wszystkie funkcje/wartości muszą być metodami/właściwościami obiektów.
2. Korzystamy z klas.
3. Zasada jednej odpowiedzialności - każda klasa i funkcja powinna mieć tylko jeden cel. Funkcje, które służą do wykonywania skomplikowanych zadań powinny wywoływać mniejsze funkcje, które będą wykonywały jedno proste zadanie.
4. Zasada otwarte/zamknięte (otwarte na rozszerzanie, zamknięte na modifikacje) - pisząc staramy się sprawić, żeby kod był napisany tak, aby dodawanie nowych funkcji do programu wiązało się z rozszerzeniem isteniejącego kodu (tworzenie klas, które pochodny, dodawanie nowych metod i właściwości do klas) zamiast modyfikacji (zmienianie już istniejących metod).
5. Zasada podstawiania Liskov - obiekt klas pochodnych powinny móc być zastosowane wszędzie tam, gdzie stosowane są obiekty klasy pierwotnej.
6. Oddalone od siebie w drzewie programu klasy (a właściwie instancje tych klas) porozumiewają się przez callbacki. Callbacki dostarcza do nich klasa zawierająca. Każda klasa, jeśli korzysta z callbacków powinna przygotować metody ustawiania callbacków. Przykładowo, załóżmy, że mamy klasę Menu, które po przyciśnięciu przycisku Start powinna rozpocząć grę. Klasa ta definiuje właściwość Menu._onStart, do której można przypisać referencje callbacka poprzez metodę Menu.setOnStart.
7. Wszelkie metody i właściwości prywatne w klasach nazywamy według konwejcji _ + nazwa metody/właściwości.
8. Właściwości służące do wywoływania nazywamy według konwencji on + CzynnośćKtóraWywołujeCallback. Np. onClick albo onMenuItemFocused.
9. Osoby pracujące równolegle nad elementami programu, które bezpośrednio od siebie zależą powinny komunikować się na temat różnych spraw typu nazwy metody, nazwy pól obiektu inicjalizującego itp.
10. Dodatkowe zasady wkrótce lub nigdy.

W razie jakichkolwiek wątpliwości na temat tych zasad, proszę pisać do mnie. Oczywiście zasady są po to, żeby je zmieniać, więc wszelkie sugestie na temat ich zmiany proszę kierować na forum. 