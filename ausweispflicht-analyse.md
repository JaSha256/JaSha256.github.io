# Altersverifikation via EUDI-Wallet: Technische Risiken, gesellschaftliche Folgen und alternative Regulierungsansätze

**Eine kritische Analyse der vorgeschlagenen Ausweispflicht im Netz**
Zusammengestellt aus akademischen Quellen, Gerichtsurteilen und offiziellen EU-Dokumenten. Stand: März 2026.

---

## Vorbemerkung

Im Februar 2026 forderten hochrangige SPD-Politiker:innen in einem Impulspapier ein Social-Media-Verbot für unter 14-Jährige, eine „Jugendversion" für 14–15-Jährige und eine flächendeckende Altersverifikation via EUDI-Wallet — auch für Erwachsene. Diese Analyse untersucht drei Fragen:

1. Hält die vorgeschlagene Technik, was sie verspricht?
2. Welche Risiken entstehen durch eine verpflichtende digitale Identifikation?
3. Gibt es wirksamere Regulierungsansätze, die an den Ursachen ansetzen?

Die Analyse argumentiert nicht gegen Kinderschutz — der Schutz Minderjähriger vor algorithmischer Manipulation, suchterzeugenden Designmustern und schädlichen Inhalten ist ein legitimes und dringendes Anliegen (vgl. Art. 24 EU-Grundrechtecharta). Sie argumentiert, dass die vorgeschlagenen Mittel dieses Ziel verfehlen und dabei unverhältnismäßige Risiken schaffen. Sie plädiert für einen Regulierungsansatz, der an den Geschäftsmodellen der Plattformen ansetzt statt an der Identität der Nutzer.

---

## Teil 1: Technische Analyse der EUDI-Wallet-Architektur

### 1.1 EUDI-Wallet — pseudonym, nicht anonym

Die SPD fordert eine Altersverifikation via EUDI-Wallet und verspricht „keine Einschränkung der Anonymität". Die technische Realität widerspricht diesem Versprechen grundlegend.

**Das Problem: Signed Credentials**

Deutschland setzt auf das sogenannte *Signed-Credentials*-Modell: Dabei werden Identitätsdaten von einer staatlichen Stelle kryptographisch signiert — also digital beglaubigt — und anschließend an den jeweiligen Empfänger übergeben. Da die Signatur ihre Gültigkeit dauerhaft behält, kann jeder Empfänger die signierten Daten unverändert an Dritte weitergeben — diese bleiben überprüfbar, ohne dass der Inhaber dies bemerken oder verhindern kann. Der Bundesbeauftragte für den Datenschutz und die Informationsfreiheit (BfDI) warnt explizit vor diesem Modell.

> *"An issue with any digital credential is that it can easily be copied and thus illegally distributed."*
> — Slamanig, D. (2025). „Privacy-Preserving Authentication: Theory vs. Practice." arXiv:2501.07209.

**Nichtverkettbarkeit (Unlinkability) ist im aktuellen Design nicht gewährleistet**

Beide im Architecture Reference Framework (ARF) vorgesehenen Datenformate — SD-JWT und ISO 18013-5/mdoc — verwenden statische, vom Aussteller erzeugte digitale Signaturen über die (gehashten) Identitätsattribute des Nutzers. Diese Signatur fungiert als dauerhafter Identifikator — sie bleibt bei jeder Vorlage identisch. Zwei beliebige Diensteanbieter (sog. Relying Parties) können daher Transaktionen desselben Nutzers mit minimalem Aufwand einander zuordnen.

> *"the signature as well as (h_1,...,h_n) are always revealed and thus can be trivially linked by any RP."*
> — Slamanig, D. (2025). arXiv:2501.07209. Keynote, 19th IFIP Summer School on Privacy and Identity Management.

**Gemeinsame Stellungnahme internationaler Kryptographen**

Im Juni 2024 veröffentlichten 16 international renommierte Kryptographen ein gemeinsames Statement, das die fundamentalen Defizite des ARF dokumentiert. Zu den Unterzeichnern gehören u. a.:

- **Anna Lysyanskaya** (Brown University) — Miterfinderin der CL-Signaturen (Camenisch-Lysyanskaya, CRYPTO 2004)
- **Jan Camenisch** (Dfinity) — Miterfinder der CL-Signaturen, IBM Idemix
- **Bart Preneel** (KU Leuven) — einer der meistzitierten Kryptographen weltweit
- **Carmela Troncoso** (EPFL) — leitete das DP-3T-Protokoll für COVID-Contact-Tracing
- **Anja Lehmann** (Hasso-Plattner-Institut, Universität Potsdam)
- **Daniel Slamanig** (Universität der Bundeswehr München)

> Quelle: GitHub Issue #200, eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework. Publikationsseite: mayrhofer.eu.org/publication/eudiw-cryptographers-statement-2024/

Ihre Kernkritik: Die Technologie, um Anonymität zu gewährleisten, existiert seit über 20 Jahren (BBS+-Signaturen, CL-Signaturen, U-Prove). Die ARF-Architekten haben sich bewusst dagegen entschieden. BBS+ ermöglicht *Signatur-Randomisierung* (jede Präsentation erzeugt einen kryptographisch frischen, unlinkbaren Beweis) und *Zero-Knowledge-Selective-Disclosure*. Die aktuelle ARF-Architektur kann das nicht.

**Zusätzliches Hardware-Problem:** Anonymous Credentials erfordern pairing-freundliche elliptische Kurven (BN-462, BLS12-381), aber existierende Secure Elements in Smartphones unterstützen nur ECDSA auf P-256 — die falschen Kurven.

> Quelle: „Privacy evaluation of the European Digital Identity Wallet's Architecture and Reference Framework." *Computers & Security* (Elsevier), 2025. DOI: 10.1016/j.cose.2025.104707.

### 1.2 Zero-Knowledge-Proofs sind nicht verpflichtend

Zero-Knowledge-Proofs (ZKP) werden in der eIDAS-2.0-Verordnung (Verordnung (EU) 2024/1183) lediglich in den Erwägungsgründen erwähnt — *nicht* als verbindliche Anforderung in den Durchführungsrechtsakten. Die EU-Kommission hat die relevanten Datenschutzparagraphen in den technischen Durchführungsbestimmungen systematisch ignoriert.

> *„The ARF simply ignores this paragraph completely."*
> — epicenter.works (2024). Data Protection Analysis: eIDAS Architecture Reference Framework 1.4.
> PDF: epicenter.works/fileadmin/medienspiegel/user_upload/epicenter.works_-_ARF1.4.pdf

### 1.3 Fehlender Schutz vor Tracking durch Wallet-Anbieter

Das ARF enthält keinerlei Schutzmechanismen gegen Tracking durch Wallet-Anbieter. Jede Transaktion ist für den Anbieter sichtbar.

> *„Every use of the wallet could be monitored by the state."*
> — Thomas Lohninger, epicenter.works.
> Quelle: Leisegang, D. „EUDI Wallet: A wallet full of loopholes." netzpolitik.org, 26.06.2024.

### 1.4 Der Pseudonym-Provider — ein zentrales De-Anonymisierungsrisiko

Das ARF führt einen „Pseudonym Provider" ein — eine zentralisierte Instanz, die:
1. die reale Identität des Nutzers verifiziert,
2. Pseudonyme ausstellt,
3. eine Zuordnungstabelle führt,
4. auf Anfrage von Strafverfolgungsbehörden die wahre Identität offenlegt.

Diese Instanz ist in der eIDAS-Verordnung *nicht vorgesehen*. Die Verordnung sieht lokale Pseudonym-Erzeugung auf dem Endgerät vor — nicht einen zentralisierten De-Anonymisierungsdienst.

> *„The eID Wallet risks becoming a tool of surveillance and control rather than a tool that empowers users."*
> — EDRi, „The eID Wallet still doesn't deserve your full trust", 10.03.2026.

### 1.5 Artikel 45 — Verpflichtendes Vertrauen in staatliche Zertifizierungsstellen

Artikel 45 der eIDAS-2.0-Verordnung verpflichtet Browserhersteller (Mozilla, Google, Apple) dazu, von EU-Staaten ausgestellten Qualified Website Authentication Certificates (QWACs) zu vertrauen — ohne die üblichen Sicherheitsstandards (CA/Browser Forum Baseline Requirements) anwenden zu dürfen. Über 500 Cybersecurity-Forscher warnten in einem offenen Brief (November 2023):

> *„The current proposal radically expands the ability of governments to surveil both their own citizens and residents across the EU by providing them with the technical means to intercept encrypted web traffic."*
> — eidas-open-letter.org (über 500 Unterzeichner, u. a. EFF, EDRi, Internet Society, Mozilla, Linux Foundation)

Referenz: Wazan, A.S. et al. (2024). „Article 45 of the eIDAS Directive Unveils the need to implement the X.509 4-cornered trust model for the WebPKI." ARES '24. DOI: 10.1145/3664476.3670900.

### 1.6 Googles Rolle bei der deutschen Prototyp-Entwicklung

Im SPRIND-Wettbewerb „Funke" wurde Google für die deutsche Wallet-Prototyp-Entwicklung zugelassen — trotz Datenschutzbedenken in der Jury. Google entwickelte den „Android German EUDI Open Source Wallet Prototype" (GitHub: google/funke-eudi-wallet-prototype, inzwischen archiviert). Die Beteiligung eines US-Technologiekonzerns an einer europäischen Souveränitätsinfrastruktur wirft Fragen auf — insbesondere, da Googles Produktions-Stack (Android Credential Manager) proprietär bleibt.

---

## Teil 2: Gesellschaftliche und grundrechtliche Implikationen

### 2.1 Erfahrungen mit Klarnamenpflichten: Das Beispiel Südkorea

Südkoreas Klarnamenpflicht (2004–2012) stellt das bislang umfassendste natürliche Experiment zu den Auswirkungen verpflichtender Online-Identifizierung dar.

- Eine Regierungsstudie der Korea Communications Commission (KCC) fand einen Rückgang bösartiger Kommentare um lediglich **0,9 Prozentpunkte** (von 13,9 % auf 13,0 %) — bei erheblichem Grundrechtseingriff.
- Cho & Kwon (2015) zeigten, dass gesetzliche Identifikationspflichten Flaming sogar **verstärkten**: *„Whereas policy-driven regulation does not reduce, and even increases, flaming, the voluntary approach significantly decreases it."* DOI: 10.1016/j.chb.2015.04.046.
- August 2011: Hacker erbeuteten die Registrierungsdaten von **35 Millionen Menschen** — das System wurde selbst zur Sicherheitslücke.
- August 2012: Das Verfassungsgericht erklärte das System **einstimmig** für verfassungswidrig (Case No. 2010Hun-Ma47) — wegen Verletzung der Meinungsfreiheit und des Rechts auf informationelle Selbstbestimmung.

> Park, W.-I. & Greenleaf, G. (2012). „Korea Rolls Back 'Real Name' and ID Number Surveillance." *Privacy Laws & Business International Report*, 119, 20–21. SSRN: 2187232.
> Leitner, J.M. (2015). „Anonymity, Privacy, and Expressive Equality." *Journal of Korean Law*, 14(2), 167–212. DOI: 10.23110/jkl.2015.14.2.002.

### 2.2 Identifikationspflicht als Instrument politischer Verfolgung

Die folgenden Beispiele zeigen nicht, dass die EU zwangsläufig denselben Weg einschlagen wird — die EU verfügt über stärkere institutionelle Schutzmechanismen (unabhängige Justiz, Grundrechtecharta, Datenschutzbehörden). Sie zeigen jedoch, dass die *technische Infrastruktur* für Identifikation, einmal aufgebaut, unter veränderten politischen Bedingungen zweckentfremdet werden kann. Die Frage ist nicht, ob die aktuelle Regierung diese Infrastruktur missbrauchen würde, sondern ob die Architektur robust gegen künftige politische Veränderungen ist — auch angesichts demokratischer Rückschritte in EU-Staaten wie Ungarn und Polen.

**China:** Klarnamenpflicht seit 2012/2017 (Cybersecurity Law, Art. 24). King, Pan & Roberts (2013) zeigten: Nicht Kritik am Staat wird zensiert, sondern Inhalte, die *kollektives Handeln* ermöglichen — unabhängig von der Tonalität. *American Political Science Review*, 107(2), 1–18. DOI: 10.1017/S0003055413000014.

**Türkei:** Law No. 7418, Art. 217/A (2022) — 4.590 Ermittlungsverfahren gegen 4.590 Personen, 33 Verhaftungen, 66 Journalisten betroffen. Fast die Hälfte der Verfahren betraf Berichterstattung über das Erdbeben im Februar 2023. Quelle: Media and Law Studies Association (MLSA) Turkey, Oktober 2024.

**Russland:** Blogger-Registrierungspflicht seit November 2024 (Law No. 647048-8). Roskomnadzor unterhält seit Februar 2025 eine 11-köpfige OSINT-Einheit, die „Verhaltensporträts" aus offenen Quellen erstellt und Inhalte als „pro-Regierung", „anti-Regierung" oder „apolitisch" klassifiziert. Quelle: Council on Foreign Relations, „Russia's Internet Censor is Also a Surveillance Machine."

### 2.3 Abschreckungswirkungen (Chilling Effects) — empirische Evidenz

**Penney (2016):** Wikipedia-Traffic auf DHS-kategorisierte „sensible" Artikel sank nach den Snowden-Enthüllungen um **20 %** — von 3,0 Mio. auf 2,2 Mio. Aufrufe/Monat. Der Rückgang war dauerhaft. *Berkeley Technology Law Journal*, 31(1). SSRN: 2769645.

**Stoycheff (2016):** Experimentalstudie (n=255): Teilnehmer, die über Überwachung informiert wurden und eine Minderheitsmeinung vertraten, äußerten diese **signifikant seltener**. Selbst Überwachungsbefürworter passten ihr Verhalten an. *Journalism & Mass Communication Quarterly*.

**Büchi, Festic & Latzer (2022):** Wahrgenommene Datenüberwachung führt zu eingeschränkter digitaler Kommunikation — vermittelt durch Bewusstsein, wahrgenommene Aufdringlichkeit und Resignation. *Big Data & Society*. DOI: 10.1177/20539517211065368.

**Einschränkung:** Diese Studien dokumentieren Chilling Effects unter Bedingungen allgemeiner Überwachungswahrnehmung (post-Snowden), nicht spezifisch unter Altersverifikation. Der Mechanismus — Wissen um Identifizierbarkeit verändert Verhalten — ist jedoch derselbe.

### 2.4 Verhaltensbasierte Scoring-Systeme — existierende Implementierungen

**Bologna, Italien:** „Smart Citizen Wallet" — Punkte für Verhaltensweisen wie Mülltrennung und ÖPNV-Nutzung, einlösbar für Vergünstigungen. System ist freiwillig und beinhaltet keine Sanktionen. Der Garante Privacy (italienische DPA) eröffnete am 8. Juni 2022 drei formelle Untersuchungen (Docweb 9778361). Der Status ist unklar — das System unterscheidet sich strukturell vom chinesischen Social-Credit-System, zeigt aber die Tendenz zur infrastrukturellen Verhaltenssteuerung.

**Niederländisches SyRI-Urteil:** Rechtbank Den Haag, 5. Februar 2020 (ECLI:NL:RBDHA:2020:1878). SyRI verknüpfte 17 Datenkategorien (Steuer, Sozialleistungen, Immigration) und wurde ausschließlich in einkommensschwachen, migrantisch geprägten Vierteln eingesetzt. Das Gericht erklärte das System für unvereinbar mit Art. 8 EMRK.

> Van Bekkum, M. & Zuiderveen Borgesius, F. (2021). „Digital welfare fraud detection and the Dutch SyRI judgment." *European Journal of Social Security*, 23(4), 323–340. DOI: 10.1177/13882627211031257.

**Österreichischer AMS-Algorithmus:** Kategorisierte Arbeitssuchende in drei Gruppen — Frauen mit Kindern wurden negativ gewichtet, Männer mit Kindern nicht. Der VwGH (21.12.2023, Ro 2021/04/0010-11) entschied unter Verweis auf den CJEU-SCHUFA-Fall (C-634/21), dass algorithmisches Scoring unter bestimmten Bedingungen automatisierte Entscheidungsfindung i. S. v. Art. 22 DSGVO darstellen kann — nämlich dann, wenn der berechnete Wert die Zuteilung maßgeblich bestimmt und sich rechtlich auswirkt. Das Gericht verwies zur weiteren Prüfung zurück.

**EU AI Act, Art. 5(1)(c):** Verbietet Social Scoring — aber mit erheblichen Lücken. Kreditbewertungen, Versicherungs-Scoring, Betrugsbekämpfung und Strafverfolgung sind ausgenommen. Alle Bedingungen müssen kumulativ erfüllt sein. Bisher **keine einzige Durchsetzungsmaßnahme** (Stand März 2026).

> Human Rights Watch, La Quadrature Du Net & EDRi, „EU: Artificial Intelligence Regulation Should Ban Social Scoring", 09.10.2023.

### 2.5 Zweckentfremdung (Function Creep) — wiederkehrende Muster

> *„Function creep is an imperceptibly transformative and therewith contestable change in a data-processing system's proper activity."*
> — Koops, B.-J. (2021). „The concept of function creep." *Law, Innovation and Technology*, 13(1), 29–56. DOI: 10.1080/17579961.2021.1898299.

Function Creep ist nicht unvermeidlich — aber strukturell begünstigt durch institutionelle Anreize (bürokratische Ausweitung, politischer Druck in Krisenzeiten, Ausnutzung versunkener Kosten). Die Beweislast sollte bei den Befürwortern neuer Identifikationsinfrastruktur liegen: Welche strukturellen Schutzmechanismen verhindern die Zweckentfremdung, die bei vergleichbaren Systemen regelmäßig eingetreten ist?

| System | Ursprünglicher Zweck | Dokumentierte Erweiterung |
|--------|---------------------|---------------------------|
| EU COVID-Zertifikat (VO (EU) 2021/953) | Grenzüberschreitender Reiseverkehr | Restaurants, Sport, Arbeitsplätze; in IT Arbeitsplatzzugang für Ungeimpfte ü50 entzogen |
| Schengen-Informationssystem | Informationsaustausch | Supranationales Identifikations- und Ermittlungswerkzeug |
| Indiens Aadhaar | Sozialleistungen | Bankkonten, SIM-Karten, Steuern; biometrische Fehlerrate 49 % in Jharkhand (Dixon, 2017, PMC5741784) |
| EU-Interoperabilitätsrahmen (VO 2019/817, 2019/818) | Grenz-/Migrationsmanagement | Polizeilicher Zugriff auf EES, VIS, ETIAS, Eurodac via „hit/no-hit"-Mechanismus |

> Blasi Casagran, C. (2021). „Fundamental Rights Implications of Interconnecting Migration and Policing Databases in the EU." *Human Rights Law Review*, 21(2), 433–457. DOI: 10.1093/hrlr/ngaa057.

### 2.6 KI-gestützte Überwachungstechnologien — aktuelle Anwendungsfälle

**Zignal Labs / ICE:** 5-Jahres-Vertrag, $5,7 Mio. (Oktober 2025). Verarbeitet >8 Mrd. Social-Media-Posts/Tag in 100+ Sprachen mittels ML, Computer Vision und OCR. Quelle: Schwenk, K. „ICE Just Bought A Social Media Surveillance Bot." The Lever, 23.10.2025.

**Palantir in Europa:**
- **Deutschland:** HessenData (seit 2017, ~2.000 Nutzer, 15.000 Abfragen/Jahr), VeRA (Bayern, seit 2024), DAR (NRW, seit 2019/20), Baden-Württemberg (EUR 25 Mio., 2025)
- **UK:** NHS Federated Data Platform (GBP 330 Mio., 7 Jahre); mindestens 34 Verträge über GBP 900+ Mio.
- **Frankreich:** DGSI-Vertrag verlängert Dezember 2025

> Ulbricht & Egbert (2024). „In Palantir we trust? Regulation of data analysis platforms in public security." *Big Data & Society*. DOI: 10.1177/20539517241255108.

**Clearview AI:** Milliarden Gesichtsbilder ohne Einwilligung gesammelt. Sanktionen: NL EUR 30,5 Mio. (2024), FR EUR 20 Mio. + EUR 5,2 Mio. (2022/23), UK GBP 7,5 Mio. (2022). Trotzdem: Größter US-Bundesvertrag ($10 Mio. mit ICE, 2025).

**BVerfG zu automatisierter Datenanalyse (16.02.2023, 1 BvR 1547/19):** Automatisierte Datenanalyse, die neue Erkenntnisse generiert, stellt einen *eigenständigen Grundrechtseingriff* dar, der über die ursprüngliche Datenerhebung hinausgeht. Wo die Gefährdung „maschinengestützt im Sinne von Predictive Policing bewertet" wird, hat dies eine *besonders verschärfende Wirkung*.

### 2.7 Grundrechtliche Einordnung

**CJEU, Digital Rights Ireland (C-293/12, C-594/12, 08.04.2014):** Der EuGH erklärte die Vorratsdatenspeicherungsrichtlinie für nichtig — wegen *unterschiedsloser, generalisierter* Erfassung aller Personen ohne Anlass. Eine pauschale Ausweispflicht für *alle* Social-Media-Nutzer — auch Erwachsene — weist strukturelle Parallelen auf: Sie erfasst unterschiedslos die gesamte Nutzerbasis, um eine Norm durchzusetzen, die nur für einen Teil (Minderjährige) gilt.

**BVerfGE 65, 1 — Volkszählungsurteil (15.12.1983):** Wer nicht weiß, welche Informationen über sein Verhalten gespeichert werden, passt sein Verhalten vorsorglich an. Dieser panoptische Effekt ist mit einer freiheitlichen demokratischen Ordnung unvereinbar. Eine pauschale Identifikationspflicht ohne konkreten Anlass (*Anlassbezogenheit*) wirft unter dieser Doktrin erhebliche verfassungsrechtliche Bedenken auf.

**BVerfGE 120, 274 — IT-Grundrecht (27.02.2008):** Das Grundrecht auf Vertraulichkeit und Integrität informationstechnischer Systeme schützt davor, dass der Staat IT-Systeme, auf die Bürger angewiesen sind, kompromittiert. Die EUDI-Wallet auf dem Smartphone ist ein solches System.

**UN-Sonderberichterstatter David Kaye, A/HRC/29/32 (2015):**

> *„Encryption and anonymity enable individuals to exercise their rights to freedom of opinion and expression in the digital age and, as such, deserve strong protection."* (Para. 12)
> *„Blanket prohibitions fail to be necessary and proportionate."* (Para. 60)

**ECtHR, Standard Verlagsgesellschaft v. Austria (No. 3), No. 39378/15, 07.12.2021:** Verletzung von Art. 10 EMRK, als österreichische Gerichte die Offenlegung anonymer Kommentatoren anordneten, ohne die Anonymitätsinteressen ausreichend zu gewichten. Der ECtHR betonte die Funktion von Anonymität als Mittel, um Repressalien und ungewollte Aufmerksamkeit zu vermeiden.

**Europarat, Erklärung vom 28.05.2003, Prinzip 7:** *„Member states should respect the will of users of the Internet not to disclose their identity."*

---

## Zwischenbetrachtung: Die Abwägung mit dem Kinderschutz

Bevor alternative Regulierungsansätze diskutiert werden, ist eine explizite Abwägung notwendig. Die dokumentierten Schäden für Minderjährige durch soziale Medien sind real: Metas eigene interne Forschung (Haugen-Dokumente, 2021) fand, dass 13,5 % der britischen Teen-Mädchen häufigere Suizidgedanken durch Instagram berichteten, 17 % verschlimmerte Essstörungen und 32 % eine Verschlechterung ihres Körperbilds. Über 60 % der Nutzer, die extremistischen Gruppen beitraten, taten dies aufgrund von Facebooks Empfehlungsalgorithmus.

Diese Befunde begründen ein dringendes Handlungserfordernis. Die Frage ist nicht *ob*, sondern *wie* reguliert werden soll. Zwei Bewertungskriterien:

**Erwartbare Wirksamkeit der Altersverifikation:** Südkoreas Erfahrung (0,9 Prozentpunkte weniger schädliche Inhalte bei 35 Mio. kompromittierten Datensätzen) und die australische Erfahrung (Umgehung via VPN bereits dokumentiert) sprechen gegen eine hohe Wirksamkeit. Auch eine technisch sauberere Altersverifikation (etwa mittels Zero-Knowledge-Proofs) würde die *Schäden*, die durch algorithmische Verstärkung und suchterzeugendes Design entstehen, nicht adressieren — sie würde lediglich den Zugang regulieren, nicht das System, das den Schaden verursacht.

**Kosten der Altersverifikation:** Massenhafte Identitätserfassung (Teil 1), dokumentierte Chilling Effects (2.3), Function-Creep-Risiken (2.5), und die Schaffung einer Infrastruktur, die unter veränderten politischen Bedingungen zur Überwachung genutzt werden kann (2.2, 2.6).

Das Kosten-Nutzen-Verhältnis spricht gegen flächendeckende Altersverifikation via Identitätsdokumente und für Ansätze, die an den Ursachen des Schadens ansetzen.

**Könnte man nicht beides tun — Design-Regulierung *und* Altersverifikation?** Theoretisch ja. Praktisch besteht das Risiko eines *moral licensing*-Effekts: Sobald Plattformen eine Altersschranke implementiert haben, können sie argumentieren, ihre Sorgfaltspflicht erfüllt zu haben — was den politischen Druck für tiefergehende Strukturreformen der Geschäftsmodelle abschwächt. Die Erfahrung mit Cookie-Consent-Bannern zeigt, wie formale Compliance substanzielle Regulierung verdrängen kann. Zudem würde Altersverifikation denselben Durchsetzungsproblemen unterliegen wie die DSA-Regulierung (wer prüft? wer sanktioniert?) — sie löst also das institutionelle Kapazitätsproblem nicht.

---

## Teil 3: Ursachenanalyse und alternative Regulierungsansätze

### 3.1 Die Kausalkette

Das Geschäftsmodell der Plattformen ist die Ursache der Schäden, die Altersverifikation bekämpfen soll:

**Surveillance-Advertising-Modell** (Zuboff, 2019) → **Engagement-Maximierung** → **Algorithmische Verstärkung** von Empörung und Polarisierung → **Suchterzeugendes Design** → **Schäden für alle Nutzer, besonders Minderjährige**

> Zuboff, S. (2019). *The Age of Surveillance Capitalism*. PublicAffairs. ISBN 978-1-61039-569-4.

Altersverifikation greift am *Endpunkt* ein (wer die Plattform benutzen darf) statt an der *Ursache* (wie die Plattform gestaltet ist und welches Geschäftsmodell sie antreibt).

### 3.2 Algorithmische Verstärkung — die Evidenz

**Brady et al. (2017):** Jedes zusätzliche moralisch-emotionale Wort in einem Social-Media-Post erhöhte seine Verbreitung um **20 %**. Engagement-Algorithmen belohnen emotional aufgeladene Inhalte. *PNAS*, 114(28), 7313–7318. DOI: 10.1073/pnas.1618923114.

**Bail et al. (2018):** Republikaner, die einem liberalen Twitter-Bot folgten, wurden *substanziell konservativer*. Plattform-Architektur polarisiert aktiv. *PNAS*, 115(37), 9216–9221. DOI: 10.1073/pnas.1804840115.

**Ribeiro et al. (2020):** YouTube-Empfehlungsalgorithmen schaffen eine Radikalisierungspipeline von milderen zu extremeren Inhalten. FAT* '20. DOI: 10.1145/3351095.3372879.

**Milli et al. (2025):** Engagement-Algorithmen verstärken parteiische Inhalte (+0,24 SD), Wut (+0,47 SD) und Angst (+0,23 SD) — während Nutzer tatsächlich chronologische Feeds *bevorzugen*. *PNAS Nexus*, 4(3). DOI: pgaf062.

### 3.3 Interne Forschungsergebnisse von Meta

Frances Haugen (Facebook-Whistleblowerin, 2021) legte interne Forschungsdokumente offen, die unter anderem zeigten, dass Facebooks Responsible-AI-Team strukturell daran gehindert wurde, die algorithmische Verstärkung von Desinformation anzugehen — weil dies die Wachstumsmetriken beeinträchtigt hätte.

> Haugen, F. (2021). Testimony before Senate Commerce Subcommittee, 05.10.2021.
> Hao, K. (2021). „How Facebook Got Addicted to Spreading Misinformation." MIT Technology Review, 11.03.2021.

### 3.4 Dark Patterns und suchterzeugendes Design

**Schüll, N.D. (2012).** *Addiction by Design: Machine Gambling in Las Vegas*. Princeton UP. ISBN 978-0-691-16088-7.

Schüll dokumentiert, wie Spielautomaten auf maximale „Time on Device" optimiert werden: variable Verstärkungspläne, dissoziativer Flow-Zustand, ergonomisches Design. Social Media repliziert diese Mechanismen: Infinite Scroll, Pull-to-Refresh (variable Verstärkung), Autoplay, Notification-Systeme.

**EU-Parlament, Resolution zu Addictive Design (12.12.2023, TA-9-2023-0459):** Das Europäische Parlament forderte mit überwältigender Mehrheit regulatorische Maßnahmen gegen Infinite Scrolling, Autoplay und Dark Patterns als Ausnutzung psychologischer Vulnerabilitäten — und ein „digitales Recht, nicht gestört zu werden."

### 3.5 97 % Werbeeinnahmen — das strukturelle Anreizproblem

Meta generiert **97,3 %** seiner Einnahmen aus Werbung, Google ~**77 %**. Das Surveillance-Advertising-Modell schafft einen strukturellen Anreiz für jede nachgelagerte Schädigung: je mehr Engagement, desto mehr Daten, desto mehr Werbeeinnahmen.

> Forbrukerrådet / Norwegian Consumer Council (2021). *Time to Ban Surveillance-Based Advertising*. Unterstützt von einer Koalition aus 60+ Organisationen.

Wenn Nutzer die Wahl haben, lehnen **90–96 %** personalisiertes Tracking ab (Apple ATT-Ergebnisse). Das Modell funktioniert nur unter Bedingungen eingeschränkter Transparenz und manipulativer Einwilligungsdesigns.

### 3.6 Regulierungsansätze, die an den Ursachen ansetzen

#### Design-Regulierung statt Identitätsregulierung

Der fundamentale Unterschied: Altersverifikation reguliert *wer* eine Plattform nutzen darf. Design-Regulierung verändert *was die Plattform mit allen Nutzern macht*. Ersteres lässt das Geschäftsmodell intakt. Letzteres adressiert die Ursache.

> *„The systemic design choices at platform level are the root cause for these harms, affecting children and adults alike. [...] Age-based exclusion does not solve these root causes and merely delays people's exposure to harm."*
> — EDRi (2025). „Age Verification Gains Traction: The EU Risks Failing to Address the Root Causes of Online Harm."

#### UK Age Appropriate Design Code — nachweisbare Wirksamkeit

Der britische Children's Code (15 Standards, seit September 2021) reguliert *das Design des Dienstes*, nicht die *Identität des Nutzers*. Ergebnis: **91 signifikante Design-Änderungen** auf großen Plattformen (5Rights Foundation / Children and Screens, 2024):

- Instagram stellte alle U16-Accounts auf privat (Juli 2021)
- TikTok stoppte nächtliche Push-Benachrichtigungen für alle U18
- YouTube deaktivierte Video-Autoplay für Kinder und führte Pausen-/Schlafenszeit-Erinnerungen ein
- Google machte SafeSearch zum Standard für alle Kinder

ICO Interim Impact Review (November 2025): Verbesserungen betreffen über 3 Millionen Kinder. Der Code wurde bereits in Indonesien, Vermont und Nebraska übernommen.

> *„Always says the digital world, not social media, and always says by design not don't do this and don't do that."*
> — Baroness Beeban Kidron, 5Rights Foundation.

#### DSA — bestehende Werkzeuge besser durchsetzen

Der Digital Services Act (VO (EU) 2022/2065) enthält bereits ein umfassendes Instrumentarium:

- **Art. 25:** Verbot von Dark Patterns
- **Art. 27:** Algorithmische Transparenz — Nutzer müssen Empfehlungsparameter verändern können
- **Art. 28(2):** Verbot profilbasierter Werbung für bekannte Minderjährige
- **Art. 34/35:** Systemische Risikobewertungen und Mitigationsmaßnahmen für VLOPs
- **Art. 28(3):** Plattformen sollen *nicht* dazu angereizt werden, zusätzliche personenbezogene Daten zu erheben, um festzustellen, ob ein Nutzer minderjährig ist

Das Problem ist weniger ein Regulierungsdefizit als ein Durchsetzungsdefizit. Die richtige Antwort darauf ist bessere Durchsetzung (mehr Ressourcen, stärkere Sanktionen, Klagebefugnisse für Betroffene) — nicht die Einführung eines zusätzlichen, invasiveren Instruments, das denselben Durchsetzungsproblemen unterliegen würde.

#### Digital Markets Act — Marktmacht adressieren

Der DMA (VO (EU) 2022/1925) adressiert die Monopolstruktur: Interoperabilitätspflichten für Messaging (Art. 7), Verbot der dienstübergreifenden Datenkombination ohne Einwilligung (Art. 5(2)), Datenportabilität (Art. 6(9)). Erste Strafen: EUR 500 Mio. (Apple) und EUR 200 Mio. (Meta), April 2025.

> Khan, L. (2017). „Amazon's Antitrust Paradox." *Yale Law Journal*, 126(3), 710–805.
> Crémer, J., de Montjoye, Y.-A. & Schweitzer, H. (2019). *Competition Policy for the Digital Era*. EU Commission Report.

#### Surveillance-Advertising einschränken

Norwegen verbot Metas verhaltensbasierte Werbung 2023; der EDPB weitete das Verbot EU-weit aus. Kontextbasierte Werbung (basierend auf dem Inhalt der Seite, nicht dem Profil des Nutzers) ist nachweislich **vergleichbar oder effizienter** in Cost-per-Click-Metriken.

> Forbrukerrådet (2020). *Out of Control*. forbrukerradet.no

#### Digital Fairness Act — der nächste Schritt

Erwarteter Legislativvorschlag Q3 2026. Soll adressieren: manipulatives Interface-Design, suchterzeugendes Design, irreführendes Influencer-Marketing, unfaire Personalisierungspraktiken, besonderen Schutz für Minderjährige. Das wäre Design-Regulierung — ein Ansatz, der an den Ursachen statt an den Symptomen ansetzt.

---

## Fazit

Die vorgeschlagene Ausweispflicht im Netz ist aus drei Gründen problematisch:

1. **Die vorgeschlagene Technik hält nicht, was sie verspricht.** Die EUDI-Wallet ist in ihrer aktuellen Architektur weder anonym noch in einem bedeutsamen Sinne pseudonym. Internationale Kryptographen, der BfDI, der EDPS, EDRi und der CCC dokumentieren übereinstimmend strukturelle Datenschutzdefizite. Datenschutzfreundliche Alternativen (BBS+, CL-Signaturen) existieren, wurden aber nicht implementiert.

2. **Die damit verbundenen Risiken sind dokumentiert.** Jedes vergleichbare historische Beispiel — Südkorea, COVID-Zertifikat, Aadhaar, Schengen-Informationssystem — zeigt eine Ausweitung über den ursprünglichen Zweck hinaus. Die Kombination aus verpflichtender Identifikation und KI-gestützter Inhaltsanalyse schafft eine Überwachungsinfrastruktur, deren Missbrauchspotenzial nicht von der aktuellen politischen Lage, sondern von der technischen Architektur abhängt.

3. **Wirksamere Alternativen existieren und funktionieren nachweislich.** Die Schäden, die der „Jugendschutz" adressieren will — algorithmische Radikalisierung, suchterzeugendes Design, Polarisierung — sind direkte Konsequenzen des Surveillance-Advertising-Modells. Der UK Children's Code zeigt, dass Design-Regulierung messbare Verbesserungen erzielen kann, ohne eine Identifikationsinfrastruktur zu erfordern. DSA, DMA und der geplante Digital Fairness Act bieten den richtigen regulatorischen Rahmen — sie müssen konsequent durchgesetzt werden.

> *„Eine Klarnamenpflicht ist nicht wirkungsvoll, sondern autoritär, falsch und extrem gefährlich für gleich mehrere Grundrechte."*
> — Reuter, M. „Autoritäres Instrument: Eine Klarnamenpflicht schadet der Demokratie." netzpolitik.org, 19.02.2026.

---

## Quellenverzeichnis (Auswahl — akademische Primärquellen)

### Kryptographie & EUDI-Wallet
- Slamanig, D. (2025). „Privacy-Preserving Authentication: Theory vs. Practice." arXiv:2501.07209.
- „Making BBS Anonymous Credentials eIDAS 2.0 Compliant." IACR ePrint 2025/619.
- Lysyanskaya, A. (2024). „Anonymous Credentials and the EUDI Wallet." NIST WPEC 2024.
- epicenter.works (2024). Data Protection Analysis: eIDAS ARF 1.4. [PDF]
- „Privacy evaluation of the European Digital Identity Wallet's ARF." *Computers & Security* (Elsevier), 2025. DOI: 10.1016/j.cose.2025.104707.
- Kjorven, M.E., Gjosteen, K. & Waerstad, T.L. (2026). „Safe and Inclusive or Unsafe and Discriminatory?" *Computer Law & Security Review*. DOI: 10.1016/j.clsr.2025.106235.
- Wazan, A.S. et al. (2024). ARES '24. DOI: 10.1145/3664476.3670900.

### Klarnamenpflicht — Empirie
- Cho, D. & Kim, S.D. (2012). *HICSS 2012*. DOI: 10.1109/HICSS.2012.440.
- Cho, D. & Kwon, K.H. (2015). *Computers in Human Behavior*, 51. DOI: 10.1016/j.chb.2015.04.046.
- King, G., Pan, J. & Roberts, M.E. (2013). *APSR*, 107(2). DOI: 10.1017/S0003055413000014.
- Leitner, J.M. (2015). *Journal of Korean Law*, 14(2). DOI: 10.23110/jkl.2015.14.2.002.

### Function Creep & Surveillance
- Koops, B.-J. (2021). *Law, Innovation and Technology*, 13(1). DOI: 10.1080/17579961.2021.1898299.
- Blasi Casagran, C. (2021). *Human Rights Law Review*, 21(2). DOI: 10.1093/hrlr/ngaa057.
- Penney, J.W. (2016). *Berkeley Technology Law Journal*, 31(1). SSRN: 2769645.
- Büchi, M., Festic, N. & Latzer, M. (2022). *Big Data & Society*. DOI: 10.1177/20539517211065368.
- Ulbricht & Egbert (2024). *Big Data & Society*. DOI: 10.1177/20539517241255108.
- Dixon, P. (2017). *Health and Technology*, 7(4). DOI: 10.1007/s12553-017-0202-6. PMC5741784.

### Scoring-Systeme
- Van Bekkum, M. & Zuiderveen Borgesius, F. (2021). *EJSS*, 23(4). DOI: 10.1177/13882627211031257.
- Kostka, G. (2019). *New Media & Society*, 21(7). DOI: 10.1177/1461444819826402.
- Creemers, R. (2018). „China's Social Credit System." SSRN: 3175792.

### Grundrechte & Verfassungsrecht
- BVerfGE 65, 1 (Volkszählungsurteil, 15.12.1983)
- BVerfGE 120, 274 (IT-Grundrecht, 27.02.2008)
- BVerfG 1 BvR 1547/19 (Automatisierte Datenanalyse, 16.02.2023)
- CJEU C-293/12, C-594/12 (Digital Rights Ireland, 08.04.2014)
- ECtHR No. 39378/15 (Standard Verlagsgesellschaft v. Austria, 07.12.2021)
- UN A/HRC/29/32 (Kaye, Encryption and Anonymity, 2015)
- Europarat, Erklärung zur Kommunikationsfreiheit im Internet, 28.05.2003, Prinzip 7.
- Hornung, G. (2008). *Computer und Recht*, 24(5). DOI: 10.9785/ovs-cr-2008-299.
- Stummer, S. (2024). „A Right to Anonymity in the Digital Age." *Verfassungsblog*, 02.12.2024.

### Algorithmische Verstärkung & Plattform-Geschäftsmodell
- Brady, W.J. et al. (2017). *PNAS*, 114(28). DOI: 10.1073/pnas.1618923114.
- Bail, C.A. et al. (2018). *PNAS*, 115(37). DOI: 10.1073/pnas.1804840115.
- Ribeiro, M.H. et al. (2020). FAT* '20. DOI: 10.1145/3351095.3372879.
- Milli, S. et al. (2025). *PNAS Nexus*, 4(3).
- Zuboff, S. (2019). *The Age of Surveillance Capitalism*. PublicAffairs.
- Schüll, N.D. (2012). *Addiction by Design*. Princeton UP.
- Khan, L. (2017). *Yale Law Journal*, 126(3), 710–805.
- Crémer, J., de Montjoye, Y.-A. & Schweitzer, H. (2019). *Competition Policy for the Digital Era*. EU Commission.

### Regulatorische Alternativen
- UK ICO (2021/2025). Age Appropriate Design Code + Interim Impact Review.
- 5Rights Foundation / Children and Screens (2024). AADC Impact Assessment.
- Forbrukerrådet (2021). *Time to Ban Surveillance-Based Advertising*.
- Forbrukerrådet (2020). *Out of Control*.
- EDRi (2025). „Age Verification Gains Traction."
- EFF (2025). *Age Verification Won't „Protect the Children"*.
- EU-Parlament (2023). Resolution TA-9-2023-0459 (Addictive Design).

### EU-Verordnungen
- Verordnung (EU) 2024/1183 (eIDAS 2.0)
- Verordnung (EU) 2024/1689 (AI Act)
- Verordnung (EU) 2022/2065 (DSA)
- Verordnung (EU) 2022/1925 (DMA)
- Verordnung (EU) 2021/953 (COVID-Zertifikat)
