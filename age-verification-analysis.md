# Age Verification via EUDI Wallet: Technical Risks, Societal Consequences, and Alternative Regulatory Approaches

**A Critical Analysis of the Proposed Mandatory Online Identification**
Compiled from academic sources, court rulings, and official EU documents. As of: March 2026.

---

## Preliminary Remarks

In February 2026, senior SPD politicians published a policy paper calling for a social media ban for children under 14, a "youth version" for 14–15-year-olds, and comprehensive age verification via EUDI Wallet — including for adults. This analysis examines three questions:

1. Does the proposed technology deliver on its promises?
2. What risks arise from mandatory digital identification?
3. Are there more effective regulatory approaches that address root causes?

This analysis does not argue against child protection — protecting minors from algorithmic manipulation, addictive design patterns, and harmful content is a legitimate and urgent concern (cf. Art. 24 EU Charter of Fundamental Rights). It argues that the proposed measures fail to achieve this objective while creating disproportionate risks. It advocates for a regulatory approach that targets the business models of platforms rather than the identity of users.

---

## Part 1: Technical Analysis of the EUDI Wallet Architecture

### 1.1 EUDI Wallet — Pseudonymous, Not Anonymous

The SPD calls for age verification via EUDI Wallet and promises "no restriction of anonymity." The technical reality fundamentally contradicts this promise.

**The Problem: Signed Credentials**

Germany relies on the so-called *signed credentials* model: identity data is cryptographically signed — i.e., digitally certified — by a government authority and then transmitted to the respective recipient. Since the signature retains its validity permanently, any recipient can pass the signed data on to third parties unchanged — it remains verifiable without the holder being able to detect or prevent this. The Federal Commissioner for Data Protection and Freedom of Information (Bundesbeauftragter für den Datenschutz und die Informationsfreiheit, BfDI) explicitly warns against this model.

> *"An issue with any digital credential is that it can easily be copied and thus illegally distributed."*
> — Slamanig, D. (2025). "Privacy-Preserving Authentication: Theory vs. Practice." [arXiv:2501.07209](https://arxiv.org/abs/2501.07209).

**Unlinkability (Nichtverkettbarkeit) Is Not Guaranteed in the Current Design**

Both data formats specified in the Architecture Reference Framework (ARF) — SD-JWT and ISO 18013-5/mdoc — use static, issuer-generated digital signatures over the (hashed) identity attributes of the user. This signature functions as a persistent identifier — it remains identical with each presentation. Any two service providers (so-called Relying Parties) can therefore link transactions of the same user with minimal effort.

> *"the signature as well as (h_1,...,h_n) are always revealed and thus can be trivially linked by any RP."*
> — Slamanig, D. (2025). [arXiv:2501.07209](https://arxiv.org/abs/2501.07209). Keynote, 19th IFIP Summer School on Privacy and Identity Management.

**Joint Statement by International Cryptographers**

In June 2024, 16 internationally renowned cryptographers published a joint statement documenting the fundamental deficiencies of the ARF. Signatories include, among others:

- **Anna Lysyanskaya** (Brown University) — co-inventor of CL signatures (Camenisch-Lysyanskaya, CRYPTO 2004)
- **Jan Camenisch** (Dfinity) — co-inventor of CL signatures, IBM Idemix
- **Bart Preneel** (KU Leuven) — one of the most cited cryptographers worldwide
- **Carmela Troncoso** (EPFL) — led the DP-3T protocol for COVID contact tracing
- **Anja Lehmann** (Hasso Plattner Institute, University of Potsdam)
- **Daniel Slamanig** (Universität der Bundeswehr München)

> Source: [GitHub Issue #200](https://github.com/eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework/issues/200), eu-digital-identity-wallet/eudi-doc-architecture-and-reference-framework. Publication page: [mayrhofer.eu.org](https://mayrhofer.eu.org/publication/eudiw-cryptographers-statement-2024/)

Their core criticism: The technology to ensure anonymity has existed for over 20 years (BBS+ signatures, CL signatures, U-Prove). The ARF architects deliberately chose against it. BBS+ enables *signature randomization* (each presentation generates a cryptographically fresh, unlinkable proof) and *zero-knowledge selective disclosure*. The current ARF architecture cannot do this.

**Additional Hardware Problem:** Anonymous credentials require pairing-friendly elliptic curves (BN-462, BLS12-381), but existing secure elements in smartphones only support ECDSA on P-256 — the wrong curves.

> Source: "Privacy evaluation of the European Digital Identity Wallet's Architecture and Reference Framework." *Computers & Security* (Elsevier), 2025. [DOI: 10.1016/j.cose.2025.104707](https://doi.org/10.1016/j.cose.2025.104707).

### 1.2 Zero-Knowledge Proofs Are Not Mandatory

Zero-knowledge proofs (ZKP) are mentioned in the eIDAS 2.0 Regulation (Regulation (EU) 2024/1183) only in the recitals — *not* as a binding requirement in the implementing acts. The European Commission has systematically ignored the relevant data protection provisions in the technical implementing specifications.

> *"The ARF simply ignores this paragraph completely."*
> — [epicenter.works (2024). Data Protection Analysis: eIDAS Architecture Reference Framework 1.4.](https://epicenter.works/fileadmin/medienspiegel/user_upload/epicenter.works_-_ARF1.4.pdf)

### 1.3 Lack of Protection Against Tracking by Wallet Providers

The ARF contains no safeguards whatsoever against tracking by wallet providers. Every transaction is visible to the provider.

> *"Every use of the wallet could be monitored by the state."*
> — Thomas Lohninger, epicenter.works.
> Source: Leisegang, D. ["EUDI Wallet: A wallet full of loopholes."](https://netzpolitik.org) netzpolitik.org, 26.06.2024.

### 1.4 The Pseudonym Provider — A Central De-Anonymization Risk

The ARF introduces a "Pseudonym Provider" — a centralized entity that:
1. verifies the user's real identity,
2. issues pseudonyms,
3. maintains a mapping table,
4. discloses the true identity upon request from law enforcement authorities.

This entity is *not provided for* in the eIDAS Regulation. The Regulation envisions local pseudonym generation on the end device — not a centralized de-anonymization service.

> *"The eID Wallet risks becoming a tool of surveillance and control rather than a tool that empowers users."*
> — EDRi, "The eID Wallet still doesn't deserve your full trust", 10.03.2026.

### 1.5 Article 45 — Mandatory Trust in State Certification Authorities

Article 45 of the eIDAS 2.0 Regulation requires browser manufacturers (Mozilla, Google, Apple) to trust Qualified Website Authentication Certificates (QWACs) issued by EU member states — without being permitted to apply the usual security standards (CA/Browser Forum Baseline Requirements). Over 500 cybersecurity researchers warned in an open letter (November 2023):

> *"The current proposal radically expands the ability of governments to surveil both their own citizens and residents across the EU by providing them with the technical means to intercept encrypted web traffic."*
> — [eidas-open-letter.org](https://eidas-open-letter.org) (over 500 signatories, including EFF, EDRi, Internet Society, Mozilla, Linux Foundation)

Reference: Wazan, A.S. et al. (2024). "Article 45 of the eIDAS Directive Unveils the need to implement the X.509 4-cornered trust model for the WebPKI." ARES '24. [DOI: 10.1145/3664476.3670900](https://doi.org/10.1145/3664476.3670900).

### 1.6 Google's Role in the German Prototype Development

In the SPRIND "Funke" competition, Google was admitted to the German wallet prototype development — despite data protection concerns within the jury. Google developed the "Android German EUDI Open Source Wallet Prototype" (GitHub: google/funke-eudi-wallet-prototype, since archived). The involvement of a US technology corporation in a European sovereignty infrastructure raises questions — particularly since Google's production stack (Android Credential Manager) remains proprietary.

---

## Part 2: Societal and Fundamental Rights Implications

### 2.1 Experiences with Real-Name Policies: The Case of South Korea

South Korea's real-name policy (Klarnamenpflicht, 2004–2012) represents the most comprehensive natural experiment to date on the effects of mandatory online identification.

- A government study by the Korea Communications Commission (KCC) found a decline in malicious comments of merely **0.9 percentage points** (from 13.9% to 13.0%) — despite significant interference with fundamental rights.
- Cho & Kwon (2015) showed that statutory identification requirements actually **increased** flaming: *"Whereas policy-driven regulation does not reduce, and even increases, flaming, the voluntary approach significantly decreases it."* [DOI: 10.1016/j.chb.2015.04.046](https://doi.org/10.1016/j.chb.2015.04.046).
- August 2011: Hackers obtained the registration data of **35 million people** — the system itself became the security vulnerability.
- August 2012: The Constitutional Court declared the system **unanimously** unconstitutional (Case No. 2010Hun-Ma47) — for violating freedom of expression and the right to informational self-determination (Recht auf informationelle Selbstbestimmung).

> Park, W.-I. & Greenleaf, G. (2012). "Korea Rolls Back 'Real Name' and ID Number Surveillance." *Privacy Laws & Business International Report*, 119, 20–21. [SSRN: 2187232](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2187232).
> Leitner, J.M. (2015). "Anonymity, Privacy, and Expressive Equality." *Journal of Korean Law*, 14(2), 167–212. [DOI: 10.23110/jkl.2015.14.2.002](https://doi.org/10.23110/jkl.2015.14.2.002).

### 2.2 Mandatory Identification as an Instrument of Political Persecution

The following examples do not suggest that the EU will necessarily follow the same path — the EU has stronger institutional safeguards (independent judiciary, Charter of Fundamental Rights, data protection authorities). They do, however, demonstrate that the *technical infrastructure* for identification, once built, can be repurposed under changed political conditions. The question is not whether the current government would abuse this infrastructure, but whether the architecture is robust against future political changes — including in light of democratic backsliding in EU member states such as Hungary and Poland.

**China:** Real-name policy since 2012/2017 (Cybersecurity Law, Art. 24). King, Pan & Roberts (2013) showed: It is not criticism of the state that is censored, but content that enables *collective action* — regardless of tone. *American Political Science Review*, 107(2), 1–18. [DOI: 10.1017/S0003055413000014](https://doi.org/10.1017/S0003055413000014).

**Turkey:** Law No. 7418, Art. 217/A (2022) — 4,590 investigations against 4,590 individuals, 33 arrests, 66 journalists affected. Nearly half of the proceedings concerned reporting on the earthquake in February 2023. Source: Media and Law Studies Association (MLSA) Turkey, October 2024.

**Russia:** Blogger registration requirement since November 2024 (Law No. 647048-8). Roskomnadzor has maintained an 11-member OSINT unit since February 2025 that creates "behavioral portraits" from open sources and classifies content as "pro-government," "anti-government," or "apolitical." Source: Council on Foreign Relations, "Russia's Internet Censor is Also a Surveillance Machine."

### 2.3 Chilling Effects (Abschreckungswirkungen) — Empirical Evidence

**Penney (2016):** Wikipedia traffic to DHS-categorized "sensitive" articles dropped by **20%** after the Snowden revelations — from 3.0 million to 2.2 million views/month. The decline was persistent. *Berkeley Technology Law Journal*, 31(1). [SSRN: 2769645](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2769645).

**Stoycheff (2016):** Experimental study (n=255): Participants who were informed about surveillance and held a minority opinion expressed it **significantly less frequently**. Even surveillance supporters adjusted their behavior. *Journalism & Mass Communication Quarterly*.

**Buchi, Festic & Latzer (2022):** Perceived data surveillance leads to restricted digital communication — mediated by awareness, perceived intrusiveness, and resignation. *Big Data & Society*. [DOI: 10.1177/20539517211065368](https://doi.org/10.1177/20539517211065368).

**Caveat:** These studies document chilling effects under conditions of general surveillance perception (post-Snowden), not specifically under age verification. The mechanism — awareness of identifiability alters behavior — is, however, the same.

### 2.4 Behavioral Scoring Systems — Existing Implementations

**Bologna, Italy:** "Smart Citizen Wallet" — points for behaviors such as waste sorting and public transit use, redeemable for benefits. The system is voluntary and involves no sanctions. The Garante Privacy (Italian DPA) opened three formal investigations on 8 June 2022 (Docweb 9778361). The status is unclear — the system differs structurally from the Chinese social credit system but illustrates the trend toward infrastructural behavioral governance.

**Dutch SyRI Ruling:** Rechtbank Den Haag, 5 February 2020 (ECLI:NL:RBDHA:2020:1878). SyRI linked 17 data categories (tax, social benefits, immigration) and was deployed exclusively in low-income, immigrant-majority neighborhoods. The court declared the system incompatible with Art. 8 ECHR.

> Van Bekkum, M. & Zuiderveen Borgesius, F. (2021). "Digital welfare fraud detection and the Dutch SyRI judgment." *European Journal of Social Security*, 23(4), 323–340. [DOI: 10.1177/13882627211031257](https://doi.org/10.1177/13882627211031257).

**Austrian AMS Algorithm:** Categorized job seekers into three groups — women with children were negatively weighted, men with children were not. The VwGH (Administrative Court, 21.12.2023, Ro 2021/04/0010-11) ruled, with reference to the CJEU SCHUFA case (C-634/21), that algorithmic scoring can constitute automated decision-making within the meaning of Art. 22 GDPR under certain conditions — namely, when the calculated score substantially determines the allocation and has legal effects. The court remanded the case for further review.

**EU AI Act, Art. 5(1)(c):** Prohibits social scoring — but with significant gaps. Credit scoring, insurance scoring, fraud prevention, and law enforcement are exempted. All conditions must be cumulatively met. To date, **not a single enforcement action** (as of March 2026).

> Human Rights Watch, La Quadrature Du Net & EDRi, "EU: Artificial Intelligence Regulation Should Ban Social Scoring", 09.10.2023.

### 2.5 Function Creep (Zweckentfremdung) — Recurring Patterns

> *"Function creep is an imperceptibly transformative and therewith contestable change in a data-processing system's proper activity."*
> — Koops, B.-J. (2021). "The concept of function creep." *Law, Innovation and Technology*, 13(1), 29–56. [DOI: 10.1080/17579961.2021.1898299](https://doi.org/10.1080/17579961.2021.1898299).

Function creep is not inevitable — but it is structurally favored by institutional incentives (bureaucratic expansion, political pressure during crises, exploitation of sunk costs). The burden of proof should lie with proponents of new identification infrastructure: What structural safeguards prevent the function creep that has regularly occurred in comparable systems?

| System | Original Purpose | Documented Expansion |
|--------|-----------------|---------------------|
| EU COVID Certificate (Regulation (EU) 2021/953) | Cross-border travel | Restaurants, sports, workplaces; in Italy, workplace access withdrawn for unvaccinated persons over 50 |
| Schengen Information System | Information exchange | Supranational identification and investigation tool |
| India's Aadhaar | Social benefits | Bank accounts, SIM cards, taxes; biometric error rate 49% in Jharkhand (Dixon, 2017, [PMC 5741784](https://pmc.ncbi.nlm.nih.gov/articles/PMC5741784/)) |
| EU Interoperability Framework (Regulations 2019/817, 2019/818) | Border/migration management | Police access to EES, VIS, ETIAS, Eurodac via "hit/no-hit" mechanism |

> Blasi Casagran, C. (2021). "Fundamental Rights Implications of Interconnecting Migration and Policing Databases in the EU." *Human Rights Law Review*, 21(2), 433–457. [DOI: 10.1093/hrlr/ngaa057](https://doi.org/10.1093/hrlr/ngaa057).

### 2.6 AI-Powered Surveillance Technologies — Current Use Cases

**Zignal Labs / ICE:** 5-year contract, $5.7 million (October 2025). Processes >8 billion social media posts/day in 100+ languages using ML, computer vision, and OCR. Source: Schwenk, K. "ICE Just Bought A Social Media Surveillance Bot." The Lever, 23.10.2025.

**Palantir in Europe:**
- **Germany:** HessenData (since 2017, ~2,000 users, 15,000 queries/year), VeRA (Bavaria, since 2024), DAR (NRW, since 2019/20), Baden-Wurttemberg (EUR 25 million, 2025)
- **UK:** NHS Federated Data Platform (GBP 330 million, 7 years); at least 34 contracts totaling GBP 900+ million
- **France:** DGSI contract renewed December 2025

> Ulbricht & Egbert (2024). "In Palantir we trust? Regulation of data analysis platforms in public security." *Big Data & Society*. [DOI: 10.1177/20539517241255108](https://doi.org/10.1177/20539517241255108).

**Clearview AI:** Billions of facial images collected without consent. Sanctions: NL EUR 30.5 million (2024), FR EUR 20 million + EUR 5.2 million (2022/23), UK GBP 7.5 million (2022). Nevertheless: Largest US federal contract ($10 million with ICE, 2025).

**BVerfG on Automated Data Analysis (16.02.2023, 1 BvR 1547/19):** Automated data analysis that generates new insights constitutes an *independent interference with fundamental rights* that goes beyond the original data collection. Where the threat assessment is "conducted by machine in the sense of predictive policing," this has a *particularly aggravating effect*.

### 2.7 Fundamental Rights Classification

**CJEU, Digital Rights Ireland (C-293/12, C-594/12, 08.04.2014):** The CJEU annulled the Data Retention Directive — due to *indiscriminate, generalized* collection of all persons without cause. A blanket identification requirement for *all* social media users — including adults — exhibits structural parallels: it indiscriminately captures the entire user base in order to enforce a norm that applies only to a subset (minors).

**BVerfGE 65, 1 — Census Ruling (Volkszahlungsurteil, 15.12.1983):** Those who do not know what information about their behavior is being stored will preemptively adjust their behavior. This panoptic effect is incompatible with a free democratic order. A blanket identification requirement without specific cause (Anlassbezogenheit) raises significant constitutional concerns under this doctrine.

**BVerfGE 120, 274 — IT Fundamental Right (IT-Grundrecht, 27.02.2008):** The fundamental right to the confidentiality and integrity of information technology systems (Grundrecht auf Vertraulichkeit und Integritat informationstechnischer Systeme) protects against the state compromising IT systems on which citizens depend. The EUDI Wallet on a smartphone is such a system.

**UN Special Rapporteur David Kaye, A/HRC/29/32 (2015):**

> *"Encryption and anonymity, separately or together, create a zone of privacy to protect opinion and belief."* (Para. 12)
> *"States should not restrict encryption and anonymity, which facilitate and often enable the rights to freedom of opinion and expression. Blanket prohibitions fail to be necessary and proportionate."* (Para. 60)

**ECtHR, Standard Verlagsgesellschaft v. Austria (No. 3), No. 39378/15, 07.12.2021:** Violation of Art. 10 ECHR when Austrian courts ordered the disclosure of anonymous commenters without adequately weighing anonymity interests. The ECtHR emphasized the function of anonymity as a means of avoiding reprisals and unwanted attention.

**Council of Europe, Declaration of 28.05.2003, Principle 7:** *"Member states should respect the will of users of the Internet not to disclose their identity."*

---

## Interim Consideration: Balancing Against Child Protection

Before discussing alternative regulatory approaches, an explicit balancing exercise is necessary. The documented harms to minors from social media are real: Meta's own internal research (Haugen documents, 2021) found that 13.5% of British teen girls reported more frequent suicidal thoughts due to Instagram, 17% reported worsened eating disorders, and 32% reported a deterioration in body image. Over 60% of users who joined extremist groups did so because of Facebook's recommendation algorithm.

These findings establish an urgent need for action. The question is not *whether* to regulate, but *how*. Two evaluative criteria:

**Expected Effectiveness of Age Verification:** South Korea's experience (0.9 percentage points fewer harmful comments alongside 35 million compromised data records) and the Australian experience (circumvention via VPN already documented) argue against high effectiveness. Even a technically cleaner age verification system (e.g., using zero-knowledge proofs) would not address the *harms* caused by algorithmic amplification and addictive design — it would merely regulate access, not the system that causes the harm.

**Costs of Age Verification:** Mass identity capture (Part 1), documented chilling effects (2.3), function creep risks (2.5), and the creation of an infrastructure that can be used for surveillance under changed political conditions (2.2, 2.6).

The cost-benefit ratio argues against comprehensive age verification via identity documents and in favor of approaches that address the root causes of harm.

**Could one not do both — design regulation *and* age verification?** In theory, yes. In practice, there is a risk of a *moral licensing* effect: once platforms have implemented an age gate, they can argue that they have fulfilled their duty of care — which weakens political pressure for deeper structural reforms of business models. The experience with cookie consent banners illustrates how formal compliance can displace substantive regulation. Moreover, age verification would be subject to the same enforcement problems as DSA regulation (who audits? who sanctions?) — it therefore does not solve the institutional capacity problem.

---

## Part 3: Root Cause Analysis and Alternative Regulatory Approaches

### 3.1 The Causal Chain

The business model of platforms is the root cause of the harms that age verification is supposed to combat:

**Surveillance advertising model** (Zuboff, 2019) -> **Engagement maximization** -> **Algorithmic amplification** of outrage and polarization -> **Addictive design** -> **Harms to all users, especially minors**

> Zuboff, S. (2019). *The Age of Surveillance Capitalism*. PublicAffairs. ISBN 978-1-61039-569-4.

Age verification intervenes at the *endpoint* (who is allowed to use the platform) rather than at the *root cause* (how the platform is designed and what business model drives it).

### 3.2 Algorithmic Amplification — The Evidence

**Brady et al. (2017):** Each additional moral-emotional word in a social media post increased its diffusion by **20%**. Engagement algorithms reward emotionally charged content. *PNAS*, 114(28), 7313–7318. [DOI: 10.1073/pnas.1618923114](https://doi.org/10.1073/pnas.1618923114).

**Bail et al. (2018):** Republicans who followed a liberal Twitter bot became *substantially more conservative*. Platform architecture actively polarizes. *PNAS*, 115(37), 9216–9221. [DOI: 10.1073/pnas.1804840115](https://doi.org/10.1073/pnas.1804840115).

**Ribeiro et al. (2020):** YouTube recommendation algorithms create a radicalization pipeline from milder to more extreme content. FAT* '20. [DOI: 10.1145/3351095.3372879](https://doi.org/10.1145/3351095.3372879).

**Milli et al. (2025):** Engagement algorithms amplify partisan content (+0.24 SD), anger (+0.47 SD), and anxiety (+0.23 SD) — while users actually *prefer* chronological feeds. *PNAS Nexus*, 4(3). [DOI: 10.1093/pnasnexus/pgaf062](https://doi.org/10.1093/pnasnexus/pgaf062).

### 3.3 Internal Research Findings from Meta

Frances Haugen (Facebook whistleblower, 2021) disclosed internal research documents showing, among other things, that Facebook's Responsible AI team was structurally prevented from addressing the algorithmic amplification of disinformation — because it would have impacted growth metrics.

> Haugen, F. (2021). Testimony before Senate Commerce Subcommittee, 05.10.2021.
> Hao, K. (2021). ["How Facebook Got Addicted to Spreading Misinformation."](https://www.technologyreview.com/2021/03/11/1020600/facebook-responsible-ai-misinformation/) MIT Technology Review, 11.03.2021.

### 3.4 Dark Patterns and Addictive Design

**Schull, N.D. (2012).** *Addiction by Design: Machine Gambling in Las Vegas*. Princeton UP. ISBN 978-0-691-16088-7.

Schull documents how slot machines are optimized for maximum "time on device": variable reinforcement schedules, dissociative flow states, ergonomic design. Social media replicates these mechanisms: infinite scroll, pull-to-refresh (variable reinforcement), autoplay, notification systems.

**European Parliament, Resolution on Addictive Design (12.12.2023, TA-9-2023-0459):** The European Parliament called by an overwhelming majority for regulatory measures against infinite scrolling, autoplay, and dark patterns as exploitation of psychological vulnerabilities — and a "digital right not to be disturbed."

### 3.5 97% Advertising Revenue — The Structural Incentive Problem

Meta generates **97.3%** of its revenue from advertising, Google approximately **77%**. The surveillance advertising model creates a structural incentive for every downstream harm: the more engagement, the more data, the more advertising revenue.

> Forbrukerradet / Norwegian Consumer Council (2021). *Time to Ban Surveillance-Based Advertising*. Supported by a coalition of 60+ organizations.

When users are given a choice, **90–96%** reject personalized tracking (Apple ATT results). The model functions only under conditions of limited transparency and manipulative consent designs.

### 3.6 Regulatory Approaches That Address Root Causes

#### Design Regulation Instead of Identity Regulation

The fundamental difference: Age verification regulates *who* may use a platform. Design regulation changes *what the platform does to all users*. The former leaves the business model intact. The latter addresses the root cause.

> *"The systemic design choices at platform level are the root cause for these harms, affecting children and adults alike."* Age-based exclusion, EDRi argues, does not solve these root causes but merely delays exposure to harm.
> — EDRi (2025). "Age Verification Gains Traction: The EU Risks Failing to Address the Root Causes of Online Harm."

#### UK Age Appropriate Design Code — Demonstrable Effectiveness

The British Children's Code (15 standards, in effect since September 2021) regulates *the design of the service*, not the *identity of the user*. Result: **91 significant design changes** on major platforms (5Rights Foundation / Children and Screens, 2024):

- Instagram set all under-16 accounts to private (July 2021)
- TikTok stopped nighttime push notifications for all under-18s
- YouTube disabled video autoplay for children and introduced break/bedtime reminders
- Google made SafeSearch the default for all children

ICO Interim Impact Review (November 2025): Improvements affect over 3 million children. The Code has already been adopted in Indonesia, Vermont, and Nebraska.

> *"Always says the digital world, not social media, and always says by design not don't do this and don't do that."*
> — Baroness Beeban Kidron, 5Rights Foundation.

#### DSA — Better Enforcement of Existing Tools

The Digital Services Act (Regulation (EU) 2022/2065) already contains a comprehensive toolkit:

- **Art. 25:** Prohibition of dark patterns
- **Art. 27:** Algorithmic transparency — users must be able to modify recommendation parameters
- **Art. 28(2):** Prohibition of profile-based advertising for known minors
- **Art. 34/35:** Systemic risk assessments and mitigation measures for VLOPs
- **Art. 28(3):** Platforms should *not* be incentivized to collect additional personal data in order to determine whether a user is a minor

The problem is less a regulatory deficit than an enforcement deficit. The appropriate response is better enforcement (more resources, stronger sanctions, standing to sue for affected parties) — not the introduction of an additional, more invasive instrument that would be subject to the same enforcement problems.

#### Digital Markets Act — Addressing Market Power

The DMA (Regulation (EU) 2022/1925) addresses the monopoly structure: interoperability requirements for messaging (Art. 7), prohibition of cross-service data combination without consent (Art. 5(2)), data portability (Art. 6(9)). First fines: EUR 500 million (Apple) and EUR 200 million (Meta), April 2025.

> Khan, L. (2017). "Amazon's Antitrust Paradox." *Yale Law Journal*, 126(3), 710–805.
> Cremer, J., de Montjoye, Y.-A. & Schweitzer, H. (2019). *Competition Policy for the Digital Era*. EU Commission Report.

#### Restricting Surveillance Advertising

Norway banned Meta's behavioral advertising in 2023; the EDPB extended the ban EU-wide. Context-based advertising (based on the content of the page, not the user's profile) is demonstrably **comparable or more efficient** in cost-per-click metrics.

> Forbrukerradet (2020). [*Out of Control*.](https://www.forbrukerradet.no/undersokelse/no-undersokelsekategori/report-out-of-control/) forbrukerradet.no

#### Digital Fairness Act — The Next Step

Expected legislative proposal Q3 2026. Intended to address: manipulative interface design, addictive design, misleading influencer marketing, unfair personalization practices, special protection for minors. This would be design regulation — an approach that addresses causes rather than symptoms.

---

## Conclusion

The proposed mandatory online identification is problematic for three reasons:

1. **The proposed technology does not deliver on its promises.** The EUDI Wallet in its current architecture is neither anonymous nor pseudonymous in any meaningful sense. International cryptographers, the BfDI, the EDPS, EDRi, and the CCC consistently document structural data protection deficiencies. Privacy-preserving alternatives (BBS+, CL signatures) exist but have not been implemented.

2. **The associated risks are documented.** Every comparable historical example — South Korea, COVID certificate, Aadhaar, Schengen Information System — shows expansion beyond the original purpose. The combination of mandatory identification and AI-powered content analysis creates a surveillance infrastructure whose potential for abuse depends not on the current political climate but on the technical architecture.

3. **More effective alternatives exist and demonstrably work.** The harms that "youth protection" aims to address — algorithmic radicalization, addictive design, polarization — are direct consequences of the surveillance advertising model. The UK Children's Code demonstrates that design regulation can achieve measurable improvements without requiring an identification infrastructure. The DSA, DMA, and the planned Digital Fairness Act provide the right regulatory framework — they need to be consistently enforced.

> "A real-name policy is not effective but authoritarian, wrong, and extremely dangerous for multiple fundamental rights at once." [translated from German]
> — Reuter, M. "Authoritarian Instrument: A Real-Name Policy Harms Democracy." netzpolitik.org, 19.02.2026.

---

## References (Selection — Academic Primary Sources)

### Cryptography & EUDI Wallet
- Slamanig, D. (2025). "Privacy-Preserving Authentication: Theory vs. Practice." [arXiv:2501.07209](https://arxiv.org/abs/2501.07209).
- "Making BBS Anonymous Credentials eIDAS 2.0 Compliant." [IACR ePrint 2025/619](https://eprint.iacr.org/2025/619).
- Lysyanskaya, A. (2024). "Anonymous Credentials and the EUDI Wallet." NIST WPEC 2024.
- [epicenter.works (2024). Data Protection Analysis: eIDAS ARF 1.4.](https://epicenter.works/fileadmin/medienspiegel/user_upload/epicenter.works_-_ARF1.4.pdf) [PDF]
- "Privacy evaluation of the European Digital Identity Wallet's ARF." *Computers & Security* (Elsevier), 2025. [DOI: 10.1016/j.cose.2025.104707](https://doi.org/10.1016/j.cose.2025.104707).
- Kjorven, M.E., Gjosteen, K. & Waerstad, T.L. (2026). "Safe and Inclusive or Unsafe and Discriminatory?" *Computer Law & Security Review*. [DOI: 10.1016/j.clsr.2025.106235](https://doi.org/10.1016/j.clsr.2025.106235).
- Wazan, A.S. et al. (2024). ARES '24. [DOI: 10.1145/3664476.3670900](https://doi.org/10.1145/3664476.3670900).

### Real-Name Policies — Empirical Evidence
- Cho, D. & Kim, S.D. (2012). "Empirical Analysis of Online Anonymity and User Behaviors: The Impact of Real Name Policy." *Proceedings of the 45th Hawaii International Conference on System Sciences (HICSS)*. IEEE.
- Cho, D. & Kwon, K.H. (2015). *Computers in Human Behavior*, 51. [DOI: 10.1016/j.chb.2015.04.046](https://doi.org/10.1016/j.chb.2015.04.046).
- King, G., Pan, J. & Roberts, M.E. (2013). *APSR*, 107(2). [DOI: 10.1017/S0003055413000014](https://doi.org/10.1017/S0003055413000014).
- Leitner, J.M. (2015). *Journal of Korean Law*, 14(2). [DOI: 10.23110/jkl.2015.14.2.002](https://doi.org/10.23110/jkl.2015.14.2.002).

### Function Creep & Surveillance
- Koops, B.-J. (2021). *Law, Innovation and Technology*, 13(1). [DOI: 10.1080/17579961.2021.1898299](https://doi.org/10.1080/17579961.2021.1898299).
- Blasi Casagran, C. (2021). *Human Rights Law Review*, 21(2). [DOI: 10.1093/hrlr/ngaa057](https://doi.org/10.1093/hrlr/ngaa057).
- Penney, J.W. (2016). *Berkeley Technology Law Journal*, 31(1). [SSRN: 2769645](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=2769645).
- Buchi, M., Festic, N. & Latzer, M. (2022). *Big Data & Society*. [DOI: 10.1177/20539517211065368](https://doi.org/10.1177/20539517211065368).
- Ulbricht & Egbert (2024). *Big Data & Society*. [DOI: 10.1177/20539517241255108](https://doi.org/10.1177/20539517241255108).
- Dixon, P. (2017). *Health and Technology*, 7(4). [DOI: 10.1007/s12553-017-0202-6](https://doi.org/10.1007/s12553-017-0202-6). [PMC 5741784](https://pmc.ncbi.nlm.nih.gov/articles/PMC5741784/).

### Scoring Systems
- Van Bekkum, M. & Zuiderveen Borgesius, F. (2021). *EJSS*, 23(4). [DOI: 10.1177/13882627211031257](https://doi.org/10.1177/13882627211031257).
- Kostka, G. (2019). *New Media & Society*, 21(7). [DOI: 10.1177/1461444819826402](https://doi.org/10.1177/1461444819826402).
- Creemers, R. (2018). "China's Social Credit System." [SSRN: 3175792](https://papers.ssrn.com/sol3/papers.cfm?abstract_id=3175792).

### Fundamental Rights & Constitutional Law
- BVerfGE 65, 1 (Census Ruling / Volkszahlungsurteil, 15.12.1983)
- BVerfGE 120, 274 (IT Fundamental Right / IT-Grundrecht, 27.02.2008)
- BVerfG 1 BvR 1547/19 (Automated Data Analysis, 16.02.2023)
- CJEU C-293/12, C-594/12 (Digital Rights Ireland, 08.04.2014)
- ECtHR No. 39378/15 (Standard Verlagsgesellschaft v. Austria, 07.12.2021)
- UN A/HRC/29/32 (Kaye, Encryption and Anonymity, 2015)
- Council of Europe, Declaration on Freedom of Communication on the Internet, 28.05.2003, Principle 7.
- Hornung, G. (2008). *Computer und Recht*, 24(5). [DOI: 10.9785/ovs-cr-2008-299](https://doi.org/10.9785/ovs-cr-2008-299).
- Stummer, S. (2024). "A Right to Anonymity in the Digital Age." *Verfassungsblog*, 02.12.2024.

### Algorithmic Amplification & Platform Business Model
- Brady, W.J. et al. (2017). *PNAS*, 114(28). [DOI: 10.1073/pnas.1618923114](https://doi.org/10.1073/pnas.1618923114).
- Bail, C.A. et al. (2018). *PNAS*, 115(37). [DOI: 10.1073/pnas.1804840115](https://doi.org/10.1073/pnas.1804840115).
- Ribeiro, M.H. et al. (2020). FAT* '20. [DOI: 10.1145/3351095.3372879](https://doi.org/10.1145/3351095.3372879).
- Milli, S. et al. (2025). *PNAS Nexus*, 4(3). [DOI: 10.1093/pnasnexus/pgaf062](https://doi.org/10.1093/pnasnexus/pgaf062).
- Zuboff, S. (2019). *The Age of Surveillance Capitalism*. PublicAffairs.
- Schull, N.D. (2012). *Addiction by Design*. Princeton UP.
- Khan, L. (2017). *Yale Law Journal*, 126(3), 710–805.
- Cremer, J., de Montjoye, Y.-A. & Schweitzer, H. (2019). *Competition Policy for the Digital Era*. EU Commission.

### Regulatory Alternatives
- UK ICO (2021/2025). Age Appropriate Design Code + Interim Impact Review.
- 5Rights Foundation / Children and Screens (2024). AADC Impact Assessment.
- Forbrukerradet (2021). *Time to Ban Surveillance-Based Advertising*.
- Forbrukerradet (2020). [*Out of Control*.](https://www.forbrukerradet.no/undersokelse/no-undersokelsekategori/report-out-of-control/)
- EDRi (2025). "Age Verification Gains Traction."
- EFF (2025). *Age Verification Won't "Protect the Children"*.
- European Parliament (2023). Resolution TA-9-2023-0459 (Addictive Design).

### EU Regulations
- Regulation (EU) 2024/1183 (eIDAS 2.0)
- Regulation (EU) 2024/1689 (AI Act)
- Regulation (EU) 2022/2065 (DSA)
- Regulation (EU) 2022/1925 (DMA)
- Regulation (EU) 2021/953 (COVID Certificate)
