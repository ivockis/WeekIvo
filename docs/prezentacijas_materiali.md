# "WeekIvo" - Prezentācijas Materiāli

Šeit apkopoti visi pirms-izstrādes materiāli vietnes "Viena darba nedēļa Datorikas nodaļas studenta dzīvē" izveidei.

## 1. Lapas Struktūrskice (Wireframe)

Vietne tiks veidota kā moderna "vienas lapas" (One-Page) tipa vietne.
*   **Galvene (Header):**
    *   Kreisajā pusē: Logo vai vārds "WeekIvo" (zaļā akcenta krāsā).
    *   Vidū/Labajā pusē: Navigācijas saites uz 5 galvenajām sadaļām.
    *   Pavisam labajā pusē: "Dark / Light Mode" pārslēgšanas poga (slēdzis vai ikona).
*   **Sākuma sadaļa (Hero Section):**
    *   Liels izcelts virsraksts.
    *   Īss ievadteksts un pogas "Sākt apskatu" vai "Uzzināt vairāk".
*   **Satura sadaļas (Saturs 1-5):**
    *   "Zig-Zag" Izkārtojums desktop rīkiem (Teksts pa kreisi, Attēls/Grafika pa labi, nākamajā sadaļā otrādi). Mobilos ekrānos viss kārtojas vertikāli (Teksts, tad attēls).
*   **Kājene (Footer):**
    *   Kopsavilkums, sociālo tīklu ikonas, autortiesību atruna.

## 2. Lapas Karte (Sitemap)

Tā kā vietne plānota kā viena gara ritināma lapa (angļu: *Single-page Layout*), lapas karte atspoguļo sadaļu secību:

1.  **Sākums:** Ievads un īss pārskats par lapu.
2.  **Klātienes darbs:** Lekciju diena (klātienē un tiešsaistē), praktiskie darbi, laboratorijas.
3.  **Attālinātais darbs:** Pašmācības un projekti e-studiju vidē.
4.  **Prakses darbs:** Uzdevumi, ikdiena ofisā.
5.  **Ārpusstudiju aktivitātes:** LU sniegtās iespējas ārpus tiešā mācību procesa (studentu padome, hakatoni). *(Pievienota kā nepieciešamā 6. sadaļa)*
6.  **Info lapa par mani:** Īsa biogrāfija, prasmes, kontaktinformācija.

## 3. Lietotāja Ceļš (User Flow)

1.  **Ienākšana:** Lietotājs atver `index.html`. Viņu sagaida gaiša, moderna "Sākums" sadaļa ar dinamisku zaļu akcentu.
2.  **Tēmas Izvēle:** Lietotājs galvenē pamana "Dark mode" pogu, noklikšķina to, un visa lapa plūdeni pāriet uz tumšo dizainu, kur fons ir tumši pelēks, bet akcenti kļūst košāk zaļi (Emerald).
3.  **Navigācija:** Lietotājs noklikšķina uz "Klātienes darbs" navigācijas joslā. Lapa plūdeni noritina (*smooth scroll*) līdz attiecīgajai sadaļai.
4.  **Satura Lasīšana:** Lietotājs skrollē uz leju un secīgi uzzina studenta gaitas pa dienām un vidēm.
5.  **Noslēgums:** Lietotājs pabeidz ar "Info lapa par mani" sadaļu un var caur kājeni vai navigāciju atgriezties atpakaļ pašā augšā (*Back to top*).

## 4. Ideju dēlis (Moodboard) un Dizaina Valoda

*Piezīme: Skatīt papildus pievienoto attēlu, ko saģenerēja sistēma.*

### Krāsu Palete (Zaļie Toņi un Hierarhija)
*   **Gaišais Režīms (Light Mode):**
    *   **Fons (60%):** `#F8FAFC` (Gandrīz balts/Gaiši zilganpelēks). Dod tīru un modernu izskatu.
    *   **Teksts (30%):** `#0F172A` (Tumši zilganpelēks). Laba lasāmība.
    *   **Akcents / Interakcijas (10%):** `#10B981` (Smaragda zaļš). Pogām, saitēm, svarīgiem virsrakstiem.
*   **Tumšais Režīms (Dark Mode):**
    *   **Fons (60%):** `#0F172A` (Tumšs šīferis/pelēks). Nedaudz dziļāks par melnu, lai nenogurdinātu acis.
    *   **Galvenes/Kartīšu fons (30%):** `#1E293B` (Tumši silts pelēks).
    *   **Teksts:** `#F8FAFC` (Gandrīz balts).
    *   **Akcents (10%):** `#34D399` (Gaiši smaragda zaļš - spilgtāks nekā Light mode, lai izceltos uz tumša fona).

### Burtu Grafika (Typography)
*   **Sākuma un Galvenie Virsraksti (H1, H2):** Burtveidols `Inter` vai `Outfit`.
    *   Izmērs: 48px - 64px (H1), 32px (H2).
    *   Svars: Bold vai Extra-Bold (700-800).
*   **Pamatteksts (Body Text):** Burtveidols `Inter` vai `Roboto`.
    *   Izmērs: 16px - 18px.
    *   Svars: Regular (400), line-height: 1.6 labai lasāmībai e-studiju materiālos un stāstījumos.
*   **Hierarhijas Pasniegums:** Lieli, drosmīgi virsraksti kontrastē ar vieglu pamattekstu. Attēli vai interaktīvi elementi kalpo kā atdalītāji starp sadaļām.

Inter is a sans serif typeface designed by former Figma designer Rasmus Andersson. It’s a free, open-source font made specifically for user interfaces and screens— even major companies like GitHub and Mozilla use it. Inter is a variable font family, allowing more flexibility and control over the style and weight you need. It also includes OpenType features, like contextual alternates and tabular numbers, that automatically adjust in different situations to improve readability.

Roboto is a Web-safe font initially designed by Google to replace the Droid font used across Android operating systems. As a neo-grotesque sans serif font, it’s known for its minimalistic design and comes in many styles, widths, and weights. Thanks to its simplicity, Roboto is easily readable across any screen, making it one of the most popular choices for Web design, whether used in headers, logos, CTA buttons, or body text


Galvena lapas patterni:
Z-PATTERN GALVENĀ LAPA, APAKŠĀ:gRID LAYOUT, Par MANI: Bento Layout

---
Materiāls sagatavots izstrādes sākšanai.


