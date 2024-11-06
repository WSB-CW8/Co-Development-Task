# Etap budowania
FROM gradle:8.10.2-jdk17 AS builder
WORKDIR /app
COPY . .
RUN gradle clean build -x test

# Etap uruchamiania
FROM openjdk:17-jdk-slim
WORKDIR /app

# Tworzenie użytkownika i grupy dla aplikacji
RUN addgroup --system spring && adduser --system --ingroup spring spring

# Kopiowanie pliku JAR z etapu budowania
COPY --from=builder /app/build/libs/*.jar app.jar

# Zmiana użytkownika na 'spring'
USER spring:spring

# Zmienne środowiskowe
ENV APP_PORT=8080
EXPOSE $APP_PORT

# Uruchamianie aplikacji
ENTRYPOINT ["java", "-jar", "app.jar"]