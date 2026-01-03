---
title: "Alternative Data and Proxy Signals for Guerilla Sense-Making"
date: 2025-01-03
tags:
  - applied/ai-native-development
summary: |
  Unconventional data sources from pizza deliveries to satellite shadows have moved from intelligence folklore to validated analytical tools. The alternative data industry reaches $6-16 billion with academic validation revealing stark divides: satellite imagery and geopolitical indices show strong predictive power while social media sentiment often performs worse than random guessing. Includes accessible API recommendations and OSINT methodology.
---

Unconventional data sources—from pizza deliveries near the Pentagon to satellite shadows inside oil tanks—have moved from intelligence folklore to validated analytical tools capable of detecting geopolitical and economic events before they become public knowledge. The alternative data industry has exploded to **$6-16 billion** with 40-52% annual growth, driven primarily by hedge funds seeking informational edges. However, academic validation reveals a stark divide: satellite imagery and geopolitical risk indices show strong predictive power, while social media sentiment often performs **worse than random guessing**.

## The Pentagon Pizza Index and other verified proxy signals

The famous "Pentagon Pizza Index" traces back to **Frank Meeks**, a Washington DC Domino's franchisee who noticed unusual order spikes preceding military operations. Historical documentation includes pizza surges before the 1983 Grenada invasion, 21 pizzas to the CIA the night before Iraq invaded Kuwait in 1990, and $11,600 in Capitol Hill orders during the 1998 Clinton impeachment proceedings. Modern iterations track Google Maps "Popular Times" data for pizza shops near government buildings. The method remains **semi-verified folklore**—compelling anecdotes exist, but no rigorous statistical validation has been published. Pentagon officials deny correlation, noting internal food vendors exist.

Satellite parking lot analysis, by contrast, enjoys **full academic validation**. UC Berkeley researchers Patatoukas and Katona analyzed 4.8 million satellite images across 67,000 stores from 44 major retailers (2011-2017), finding year-over-year parking lot car counts reliably predict quarterly sales with a **4-5% informational advantage** around earnings announcements. An MIT Sloan study found funds using this data predicted earnings surprises with **85% accuracy**. Orbital Insight detected Chipotle's E. coli outbreak impact through declining car counts, giving clients a two-month trading advantage before the **40% stock price drop**.

Oil tank shadow analysis represents another commercially proven signal. Floating-roof storage tanks rise and fall with oil levels, creating measurable shadow differentials. Orbital Insight monitors **20,000+ tanks globally** and discovered China held significantly more oil reserves than officially declared. Peer-reviewed methods show **<1% error** in volume calculations. During COVID-19, Ursa Space Systems used this technique to track global storage capacity in real-time.

## What academic research reveals about signal validity

The strongest validation exists for **daytime satellite imagery**. A 2023 PNAS Nexus study found Landsat imagery explains **62.3% of GDP variation** at county level—119.9% more precise than traditional nightlight data. Machine learning classification achieves 82.8% accuracy for built-up surface detection, with archives extending to 1984.

**Geopolitical risk indices** also perform well. Caldara and Iacoviello's GPR index, published in the American Economic Review, successfully correlates with actual events (Gulf War, 9/11, Cuban Missile Crisis) and predicts lower investment and employment. The ICRG (International Country Risk Guide), operating since 1980, is accepted by courts in commercial disputes for political risk valuation.

Social media sentiment analysis shows **weak-to-moderate validation** with critical limitations. While some studies show >50% accuracy for market direction prediction, a 2025 ArXiv study found aggregated Twitter sentiment prediction accuracy was just **47.63%—worse than random guessing**. The research consensus: social media is "inherently noisy when used as trading signals."

The most important academic warning concerns **spurious correlations**. Calude and Longo at ENS Paris mathematically proved that in large datasets, "most correlations are spurious"—with enough data and computing power, patterns will emerge, but most are meaningless. Signal decay is also well-documented: alpha from new alternative data sources decays in approximately **12 months** as competition accelerates price adjustment.

## The commercial alternative data landscape

The industry is dominated by several key players across satellite analytics and data aggregation:

**Orbital Insight** pioneered commercial satellite analytics in 2013, backed by In-Q-Tel (CIA venture arm) and Google Ventures, raising $78.7 million. The company monitors parking lots at 80+ retailers (supplied to Bloomberg) and tracks 25,000 oil tanks via its Global Crude Index. Notably, Orbital Insight was acquired by Steve Wozniak's Privateer Space in May 2024, reportedly to avoid bankruptcy—a cautionary signal about industry economics.

**Planet Labs** (NYSE: PL) operates the world's largest commercial satellite constellation with ~200 Dove/SuperDove satellites capturing daily 3-5 meter resolution global imagery, plus 21 SkySats at 50cm resolution. Revenue reached $113 million in 2020 with 90%+ recurring annual contracts. Pricing starts at $5,000-$250,000+ annually for enterprise access.

**Maxar Technologies**, acquired by Advent International for $6.4 billion in 2023, provides the highest-resolution commercial optical imagery (30cm) and holds the **largest satellite imagery contract in history**—a $3.2 billion 10-year NRO deal. Archive data runs €3.80-18/km² depending on resolution.

**Ursa Space Systems** specializes in SAR (Synthetic Aperture Radar), which works through clouds and at night, tracking 3.6+ billion barrels of oil weekly across 10,000 tanks. **RS Metrics** focuses on retail vehicle counts at 65,000+ locations and metal storage monitoring at 400+ global facilities.

For hedge fund-oriented alternative data, **Thinknum** offers 70+ datasets across 400,000 companies (job listings, LinkedIn, product pricing) at $800/user/month. **RavenPack** structures global news into sentiment scores, with research showing stocks with negative sentiment spikes underperform by **2.5% over the next month**. Credit card transaction data commands the largest market share (17.2%), with providers like Second Measure and Earnest Analytics enabling **2-3 week early** earnings predictions.

## Accessible APIs for a guerilla sense-making application

Google Earth Engine provides the most comprehensive satellite analysis platform, offering **90+ petabytes** of analysis-ready data including Sentinel-1/2/3, Landsat archives dating to 1972, and MODIS daily coverage. Python and JavaScript APIs enable programmatic access, with REST API and browser-based Code Editor options. However, commercial pricing starts at **$500/month** (Basic) to $2,000/month (Professional), with no free tier for commercial use. Near-real-time analysis is supported but subject to rate limits; batch processing is recommended for large jobs.

The best free alternatives for individual developers include:

- **NASA Earthdata**: Completely free with excellent documentation, offering MODIS, Landsat, atmospheric and ocean data with 3-5 hour latency for many products
- **GDELT** (Global Database of Events, Language, and Tone): Free real-time news monitoring covering 100+ languages, updated every 15 minutes, with archives back to 1979—tracking 2,200+ emotions and themes
- **Global Fishing Watch**: Free for non-commercial use, providing AIS fishing activity, vessel encounters, and ML-based fishing detection with global ocean coverage
- **OpenSky Network**: Free for research/academic use, offering unfiltered ADS-B flight tracking including military aircraft, with full historical archive via SQL interface

**Sentinel Hub** offers the best low-cost satellite processing at **€25-83/month** ($28-91 USD), providing Sentinel, Landsat, and MODIS data with custom scripting capabilities. **ADS-B Exchange** provides unfiltered flight tracking (including FAA block list aircraft) for $10/month via RapidAPI.

Notably, **Twitter/X and Reddit APIs have become prohibitively expensive**—Twitter Pro costs $5,000/month for 1M tweets, while Reddit requires enterprise sales contact. GDELT news sentiment serves as a practical proxy for social signals without these costs.

## Categories of proxy signals and their reliability

**Satellite/Imagery signals** represent the highest-validation category:

- Parking lot vehicle counts: **Fully validated** academically, 85% prediction accuracy
- Oil tank shadow analysis: **<1% volume error**, commercially operational
- Night lights (VIIRS): **Moderate validation**, but fails in rural/agricultural areas
- Construction activity: Useful for monitoring military installations and infrastructure development

**Mobility/Transportation signals** offer strong operational value:

- Ship AIS tracking has identified ~1,900 "dark fleet" vessels using deceptive practices, with 16,000+ AIS gaps detected in the Black Sea in 2025
- Flight tracking (ADS-B) reveals oligarch movements, diplomatic activities, and military logistics, though easily countered by disabling transponders
- Mobile phone location data has proven **battlefield-verified**—Ukrainian forces tracked phones to strike the Makiivka barracks, killing dozens to hundreds of Russian soldiers

**Social/Digital signals** require careful validation:

- Search trends and job postings: Moderate reliability, 18% accuracy improvement for workforce analytics
- Social media sentiment: **Weak validation**, often performs at or below chance levels
- Website traffic: SimilarWeb (tracking 1B+ websites) became the first alternative data IPO in 2021

**Consumption/Economic signals** command the largest commercial market share:

- Credit card transactions: 17.2% of alternative data market, 10% improvement in stock prediction accuracy
- Email receipt data: High accuracy but smaller panels

## Validation studies reveal a critical divide

The research clearly distinguishes **validated proxy signals** from spurious correlations:

| Signal Type | Validation Status | Key Finding |
| --- | --- | --- |
| Daytime satellite imagery | STRONG | 62.3% GDP variance explained |
| Oil tank shadows | STRONG | <1% volume estimation error |
| Geopolitical risk indices (GPR) | STRONG | Predicts investment and employment changes |
| Night lights (VIIRS) | MODERATE | Unreliable for rural areas |
| Credit card transactions | MODERATE | 10% prediction accuracy improvement |
| Social media sentiment | WEAK | Often performs worse than random |

The critical methodological lesson from academic literature: **cross-validation is essential**, in-sample performance is misleading, signal decay must be accounted for (alpha decays in ~12 months), and multiple data sources should be combined since no single alternative data type is sufficient.

## OSINT methodology for signal combination

Bellingcat's investigations demonstrate best practices for proxy signal integration. Their MH17 investigation combined social media photos, geolocation, satellite imagery, and intercepted communications to track the Buk missile launcher responsible—findings later **verified by Dutch prosecutors in criminal court**. The methodology involves:

**Triangulation**: Cross-referencing at least 3 independent sources. When vessels turn off AIS, mobile phone signals from crew can fill gaps—revealing where ships actually docked.

**Temporal correlation**: Establishing baseline "pattern-of-life" to detect anomalies. Jeffrey Lewis detected the Russian invasion's start via a 3:15 AM "traffic jam" on Google Maps—exactly where armor had been spotted.

**Multi-modal fusion**: Combining satellite macro-patterns with ground-level social media verification and logistics data from flight/ship tracking.

The Bellingcat Online Investigation Toolkit (free at bellingcat.gitbook.io/toolkit) catalogs hundreds of OSINT tools across categories. Key free tools include Sentinel Hub EO Browser for satellite imagery, OpenSky Network for flight tracking, Global Fishing Watch for maritime monitoring, InVID for video verification, and SunCalc for chronolocation.

## Conclusion

The alternative data landscape offers genuine predictive power for geopolitical and economic events—but with crucial caveats. **Satellite imagery, AIS ship tracking, and geopolitical risk indices** have strong academic and operational validation. Social media sentiment, despite its intuitive appeal, often fails statistical validation and should be treated skeptically. The most effective approach combines multiple weak signals: hedge funds using alternative data see **3% higher annual returns** according to J.P. Morgan 2024 research.

For building a guerilla sense-making application, the recommended stack prioritizes free and accessible sources: **NASA Earthdata + GDELT + OpenSky Network + Global Fishing Watch** form a powerful zero-cost foundation. Google Earth Engine's $500+/month pricing makes Sentinel Hub ($28-91/month) a more accessible satellite analysis option. The critical insight from validation research is that **combining multiple data types** produces stronger signals than any individual source—triangulation isn't just methodologically sound, it's statistically superior. The Pentagon Pizza Index makes for a great story, but parking lot satellite counts make for better predictions.

---

## Related

- [[vibe-coding-infrastructure]] — Implementation patterns for building sense-making tools
- [[dynamic-knowledge-graphs]] — Systems for organizing multi-source intelligence
