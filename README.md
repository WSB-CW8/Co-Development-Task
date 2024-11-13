# CO TO CORE, PLUGINY I RENDERERY

## CORE

Główny moduł aplikacji w który jest zaimplementowana cała logika.

Podział zadań:

- Dla laików:
  - Implementacja pluginu napisanego przez kogoś innego
- Dla programistów:
  - Implementacja nowego pluginu
  - Implementacja nowego renderera

## PLUGINY

- Każdy plugin to osobny moduł aplikacji, nie powinny być zależne od siebie

## RENDERERY

- Umożliwiają wyświetlanie danych w różny sposób, używane są w pluginach. Mogą być używane w wielu pluginach na raz.

## JAK UŻYĆ PLUGINA?

```
const main = new Root([
NowyPluginDodanyPrzezCiebie(Opcje Do inicjalizacji)
]);
```

Dorzucamy plugin do Roota, który jest głównym modułem aplikacji. Nie musimy się martwić o to, że pluginy będą się ze sobą gryźć, ponieważ są one od siebie niezależne (Przynajmniej powinny jak nic nie zepsuliśmy).

# WSB-CW8-Group-Project

Project created during cooperative programming class.

dupududpuudpdupupdupddupdupdup

test

Przepis na bigos

Mięso pokroić w kostkę. Cebulę pokroić w kosteczkę i zeszklić na oleju w dużym garnku. Dodać mięso i dokładnie je obsmażyć.
Wlać 2 szklanki gorącego bulionu lub wody z solą i pieprzem, zagotować. Następnie dodać połamane suszone grzyby, przykryć, zmniejszyć ogień i gotować przez ok. 45 minut.
Dodać listek laurowy, ziela angielskie, kminek, majeranek, powidła śliwkowe lub posiekane śliwki, obrane i pokrojone w kosteczkę obrane jabłko i wymieszać.
Dodać odciśniętą kiszoną kapustę oraz wlać szklankę wody, wymieszać. Przykryć i gotować przez ok. 15 minut.
Kiełbasę obrać ze skóry, pokroić w kostkę i podsmażyć na patelni. Dodać do kapusty i gotować przez ok. 30 minut. Pod koniec dodać koncentrat pomidorowy.
Mąkę podsmażyć na suchej patelni, gdy zacznie brązowieć dodać łyżkę masła i mieszać aż masło się rozpuści.
Trzymając patelnię na ogniu dodać stopniowo kilka łyżek kapusty cały czas mieszając. Przełożyć zawartość patelni z powrotem do garnka, wymieszać i zagotować

# BACKEND-SETUP

TODO cała ścieżka do postawienia backendu (kopia application.properties na application-local.properties, uzupełnienie danych, uruchomienie dockera itd)

# FRONTEND-SETUP

TODO - cała ścieżka do postawienia frontu (kopia env'a, npm install itd)
