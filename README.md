# CheckPoint 🎮

CheckPoint er et studentprosjekt utviklet i emnet **Mobilprogrammering** ved Høgskolen i Østfold.

## Om prosjektet og hva appen gjør

CheckPoint er en mobilapp for spillinteresserte. Formålet med appen er å gjøre det enkelt å holde seg oppdatert på hva som skjer i spillverdenen, samtidig som brukeren kan holde oversikt over spillene sine på ett sted.

Appen skal blant annet kunne vise spillnyheter, nylig lanserte spill og informasjon om forskjellige spill. Brukeren skal også kunne opprette en personlig bruker og lage egne spillister.

Prosjektet utvikles som en del av emnet Mobilprogrammering og skal demonstrere bruk av moderne mobilutvikling, eksterne datakilder, komponentbasert utvikling, state-håndtering, navigasjon og testing.

## Gruppen

Prosjektet utvikles av **Gruppe M-01**.

**Gruppemedlemmer:**

- Jan Fredrik Holsbrekken
- Aron Aronsen
- Daniel Pihlstrøm Karlsen
- Julie Åvold Stordal

## Funksjonalitet

Planlagt funksjonalitet i CheckPoint inkluderer blant annet:

- Opprette og administrere en personlig bruker
- Legge spill til en personlig spilliste
- Opprette offentlige eller private spillister
- Søke etter spill
- Se detaljert informasjon om spill
  - Plattform
  - Beskrivelse
  - Bilder
  - Trailer/video
  <br>
- Se nylig lanserte spill og spillrelaterte nyheter
- Filtrere og sortere spill
- Abonnere på spillartikler
- Rate og kommentere spillartikler
- Se spillister og kommentarer fra andre brukere
- Light/Dark Mode
- Håndtering av lasting og feilmeldinger

Appen skal hente informasjon fra minst én ekstern datakilde/API. <br>
Så langt:
- IGDB - https://api-docs.igdb.com/#getting-started

## Avgrensninger

For å holde prosjektet innenfor omfanget av emnet har vi også definert <br>
funksjonalitet som ikke skal være en del av løsningen.

Dette inkluderer blant annet:

- Vennelister
- Kjøp og salg av spill
- Kobling mot Steam eller andre spillplattformer
- Deling til sosiale medier
- Achievements / badges
- Mikrotransaksjoner
- Reklame
- Personlig spillstatistikk som antall timer spilt
- Brukerlagde guider
- Opplasting av egne videoer

## Teknologi

Prosjektet utvikles som en React Native-applikasjon med Expo.

Planlagt teknologi inkluderer blant annet:

- React Native
- Expo
- JavaScript / TypeScript
- Git og GitHub
- GitHub Projects
- Ekstern API/datakilde
- Testing av komponenter og hovedflyt

## Prosjektstatus

🚧 **Under utvikling**

Prosjektet utvikles gjennom høstsemesteret 2026 som en del av emnet Mobilprogrammering.

## Starte appen

1. Kopier url-en for prosjektet fra main-branchen og klon den i GitHub Desktop applikasjonen.
2. Eventuelt last ned npm i "mobilprogrammering_prosjekt" mappen for å få "node_modules" mappen.
3. Last ned "Expo Go" eller bruk en emulator.
   https://docs.expo.dev/get-started/set-up-your-environment/ 
5. Hent private og hemmelige nøkler og legg dem i en ".env" fil i for å bruke IGDB-api-et. Kontakt Daniel Karlsen for å få nøklene.
7. Kjør "npx expo start" for å starte applikasjonen.

## Tekniske detaljer

Tester kjøres med jest rammeverket. Selve testfilene ligger i "__tests__" mappen. De kjøres med "npm run test".

Alle ruter man kan navigere til i appen ligger i "app" mappen. "(tabs)" mappen inneholder sider man kan navigere til fra navigasjonsmenyen på bunnen av skjermen.

Dummy data ligger innenfor "data" mappen. Den faktiske dataen vi bruker i prosjektet er fra IGDB-API-et. Det er zod-schemaer for typene vi bruker inni "types" mappen. 

Komponenter som rendrer de faktiske navigerbare sidene ligger i "app". Underliggende komponenter som sidene i "app" bruker ligger i "components". Å ha komponenter uavhengig fra sidene skaper fleksibilitet og mulighet til å bruke dem på tvers av sider potensielt med annerledes logikk sendt via props.

For å bruke IGDB-API-et trygt så måtte vi lagre nøklene et sted som ikke eksponerer dem i klartekst. Derfor er det best at de som ønsker å bruke applikasjonen kan stoles på og spør om nøklene selv direkte slik at nøklene forhåpentligvis ikke lekkes ut. 
