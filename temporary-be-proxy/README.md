# temporary-be-proxy

PEWNIE SIE SPYTACIE PO CO TO JEST?
Backendu nie ma a api warszawskie zwraca cors error. To jest proxy ktore to omija

1. Potrzebujecie bun zeby dzialalo.
   https://bun.sh/

2. Rejestrujecie się w warszawskim api i dostajecie klucz.
   Tworzycie plik .env wewnątrz `temporary-be-proxy` i wklejacie tam klucz w formie:

```
API_KEY=klucz
```

Kolejno kierujecie się instrukcją jak poniżej:

To install dependencies:

```bash
bun install
```

To run:

```bash
bun run index.ts
```

This project was created using `bun init` in bun v1.1.10. [Bun](https://bun.sh) is a fast all-in-one JavaScript runtime.
