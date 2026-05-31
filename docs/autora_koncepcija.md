# Autora koncepcija, vizuālais un tehniskais risinājums

**Darbs:** "WeekIvo" – Viena darba nedēļa Datorikas nodaļas studenta dzīvē  
**Autors:** Ivo Aļļēns, ia23031  
**Kurss:** Tīmekļa dizaina pamati, Latvijas Universitāte, 2026  

---

## Koncepcija un mērķis

Tīmekļa vietnes "WeekIvo" galvenā ideja ir dokumentēt un vizuāli attēlot tipisku vienas darba nedēļas nogriezni Latvijas Universitātes Datorikas nodaļas studenta ikdienā. Vietne sniedz skatu uz trīs paralēlām dzīves dimensijām: klātienes studijām universitātē, attālināto mācību procesu e-studiju vidē un reālo praksi IT uzņēmumā. Mērķauditorija ir potenciālie studenti, vecāki, pasniedzēji un ikviens, ko interesē datorikas studenta ikdiena.

Koncepcija balstīta uz autentiskuma principu – nevis idealizētu, bet reālu studenta gaitu atainojumu. Vietne nav lepojoša portfele, bet gan godīgs, stāstījumā balstīts ("storytelling") pieejams veidā. Tā strukturēta kā viena gara ritināma lapa (*single-page layout*), kur lietotājs secīgi seko studenta nedēļas notikumiem no pirmdienas klātienes lekcijām līdz brīvā laika aktivitātēm.

---

## Ilustratīvā materiāla un grafisko elementu pamatojums

Vietnē izmantoti fotoattēli, kas vizuāli apliecina katra posma autentiskumu: lekciju auditorijas, mājīgs attālinātā darba vide un modernais IT prakses ofiss. Katrs attēls ir ievietots "zig-zag" izkārtojumā, kas pamīšus novietots pa kreisi vai pa labi no teksta bloka, radot vizuālu dinamiku un novēršot monotonās ritināšanas efektu.

Grafiskos elementus veido **Font Awesome** ikonkopa, kas tiek lietota navigācijā, sarakstu punktos un aktivitāšu kartītēs. Ikonas kalpo kā vizuālie atbalsta punkti (*visual anchors*), palīdzot lasītājam ātrāk orientēties saturā un papildina tekstu bez liikas dekorativitātes. Fontu `Inter` izvēle (Google Fonts) nodrošina augstu ekrāna lasāmību – šis burtveidols ir izstrādāts tieši lietotāja saskarnes vajadzībām un plaši izmantots tādās platformās kā GitHub. Galvenie virsraksti izmanto 700–800 svaru, veidojot skaidru vizuālo hierarhiju.

Akcenta krāsa smaragda zaļš (`#10B981` gaišajā režīmā, `#34D399` tumšajā) ir izvēlēta tīšā pretstatā neitrālajam pelēkbaltajam fonam, veidojot modernu un tehnoloģiski asociatīvu identitāti. Zaļā toņa simbolika rezonē ar IT nozares "augšanu" un inovācijām, vienlaikus tas ir vizuāli atpūtinošs darbam ar tekstu. Krāsu proporcija ievēro 60-30-10 likumu: fons, teksts un akcents, nodrošinot vizuālu līdzsvaru.

Interaktīvie elementi – peldošās tehnoloģiju ikonas sākuma sekcijā, kursora sviestuma efekts un ritināšanas atklāšanas animācijas (*scroll reveal*) – tiek izmantoti, lai vietne justos dzīva un dinamiska, nevis statiska brošūra.

---

## Izstrādes vides izvēle

Vietne izstrādāta izmantojot **Visual Studio Code** redaktoru ar **Git** versiju kontroli. Projekts glabājas lokālā repozitorijā, kas ļauj izsekot katrai izmaiņai. Izstrādes vide tika izvēlēta, balstoties uz plašu kopienas atbalstu, paplašinājumu ekosistēmu (Live Server, Prettier) un tiešu integrāciju ar versiju vadību – prasmes, ko students aktīvi izmanto arī praksē uzņēmumā.

---

## Izmantotās tehnoloģijas

Vietne izstrādāta tikai ar tīrām tīmekļa tehnoloģijām bez papildus ietvaru (*frameworks*):

- **HTML5** – semantiskā marķēšana ar elementiem `<header>`, `<nav>`, `<section>`, `<footer>` nodrošina gan piekļūstamību (*accessibility*), gan SEO. Katrai lapai ir unikāls `<title>` un meta apraksta `description` lauks.
- **Vanilla CSS3** – visi stili rakstīti manuāli vienā failā `styles.css`. Izmantoti CSS mainīgie (`:root` un `[data-theme="dark"]`) pilnai gaišā/tumšā režīma (*dark/light mode*) funkcionalitātei bez JavaScript CSS izmaiņām. CSS Grid un Flexbox nodrošina adaptīvu izkārtojumu visiem ekrāna izmēriem.
- **Vanilla JavaScript** – `script.js` atbild par dinamisku nedēļas grafika ģenerēšanu, mini spēles "Izķer Kļūdas" loģiku, ritināšanas progresa joslu, peldošo ikonu animācijām Hero sekcijā, kursora sviestuma efektu uz Canvas un *Intersection Observer* vadītajām scroll reveal animācijām. Izvēle par tīro JavaScript (bez jQuery vai React) pamatota ar veiktspējas ieguvumiem un pilnīgu kontroli pār kodu.

---

## Publicēšanas apsvērumi

Vietne ir statiska (*static website*) – nav nepieciešama servera puses loģika vai datubāze. Publicēšanai ir vairākas piemērotas iespējas: **GitHub Pages** (bezmaksas, tieši integrēts ar Git repozitoriju), **Netlify** vai **Vercel** (piedāvā automātisku izvietošanu no repozitorija). Praksē ērtākā risinājums ir GitHub Pages, jo students jau izmanto Git ikdienā un platforma piedāvā SSL sertifikātu un pielāgotu domēna iespēju bez papildu izmaksām. Visi resursi (attēli, stili, skripti) tiek glabāti vienā mapē, tādēļ nav atkarību no pakotņu pārvaldītājiem (*npm*) un publicēšana ir vienkārša failu augšupielāde.

---

## Papildu izstrādes aspekti

Liela uzmanība pievērsta **piekļūstamībai** (*accessibility*): visiem interaktīvajiem elementiem ir `aria-label` atribūti, krāsu kontrasts ievēro WCAG 2.1 AA standartu, un navigācija ir pilnībā lietojama ar klaviatūru. **Responsīvais dizains** tika veidots izmantojot CSS *media queries* trīs pārejas punktiem (1024px, 900px, 768px), nodrošinot labu pieredzi gan galddatoros, gan planšetdatoros, gan mobilajos tālruņos, kur navigācija pāriet uz "hamburger" izvēlni.

