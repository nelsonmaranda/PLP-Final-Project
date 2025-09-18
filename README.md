# Smart Matatu Reliability & Safety Map

Nairobi-focused, crowdsourced reliability, fare, and safety insights for matatu routes — built on the MERN stack and designed for low-friction reporting and actionable commuting decisions.

## SDG Alignment
- SDG 11: Sustainable Cities and Communities
- Targets: 11.2 (safe, affordable, accessible transport), 11.7 (safe public spaces)
- Contribution: real-time, community-driven transport information that improves safety and predictability for commuters and supports evidence-led planning for stakeholders (SACCOs, county transport, NTSA).

## Problem Statement
Commuters in Nairobi face unpredictable fares, delays/queues, and safety incidents on matatu routes. Information is fragmented across WhatsApp/Telegram groups and is rarely time-aware or verifiable. This results in lost time/income, exposure to risk, and limited accountability for operators.

## Project Scope (MVP)
- Crowdsourced reports per trip: fare paid, queue/wait time, crowding, incident type/location (anonymized).
- Route map with reliability and safety scores by time-of-day and recent reports (last 24–48h).
- Trusted SACCO badge and basic moderation tools to reduce abuse and spam.
- Notifications for saved routes (e.g., “best time to leave” within the next hour).

### Out of Scope (v1)
- Payments, deep ML models, or nationwide coverage.
- Complex route planning; focus is route-level status, not door-to-door navigation.

## Users and Personas
1. Grace (office commuter): needs best time to leave, expected fare range, safe route.
2. Kelvin (student): price-sensitive, reports incidents, follows trusted SACCOs.
3. SACCO Moderator: curates reports, flags abuse, wants reputation boost for compliance.

## Value Proposition
- Commuters: reduce uncertainty (time and cost), improve situational awareness and safety.
- Operators/SACCOs: reputation benefits for reliability and safety; feedback loop for issues.
- County/NTSA: aggregate insights for targeted enforcement and planning.

## Nairobi Pilot Focus
- Corridors: Thika Road, Waiyaki Way, Jogoo Road (expand after pilot).
- Seeding: recruit commuter “champions” to submit early reports; weekly corridor challenges.

## Architecture (MERN)
- Frontend: React (or Next.js CSR), Mapbox/Leaflet for maps, PWA-ready.
- Backend: Node.js/Express, background job worker (Bull/Redis) for score aggregation.
- Database: MongoDB with GeoJSON for stops/segments and time-bucketed aggregates.
- Notifications: SMS/WhatsApp (Africa’s Talking/Twilio) for route alerts.
- Hosting: Vercel/Netlify (frontend), Render/railway.app/Fly.io (backend), MongoDB Atlas.

### Core Collections (high level)
- `users`: auth profile, role (commuter, moderator, admin).
- `routes`: geometry, stops, sacco list, status flags.
- `reports`: user report (fare, wait, crowding, incident), geotag, time bucket, device trust.
- `scores`: derived reliability/safety scores by route and time-of-day.

## Data Sources
- User reports (primary).
- OpenStreetMap for route geometry and stops (seed data).
- OpenWeather (rain flag), optional Twitter/X incident keywords (rate-limited).
- NTSA SACCO registry for verification.

## Privacy, Safety, and Moderation
- Minimal PII; anonymous reporting by default; optional account for notifications.
- Device reputation and rate limiting to reduce spam.
- Moderator tools for triage; safety content guidelines; panic/quick exit in UI.
- Clear privacy policy; sensitive content suppressed from public feeds.

## Success Metrics (Pilot)
- ≥ 500 reports in first month; ≥ 100 DAU on two corridors.
- Fare prediction error ≤ ±10% vs. self-reported fares.
- Moderator resolution time < 24h for flagged items.

## 8‑Week Development Plan (from attached guide)

### Week 1 – GitHub Setup & Project Initiation
- Set up GitHub repo and local workspace.
- Define scope, SDG alignment, problem statement, market/user analysis, personas.
- Draft roadmap and success metrics; decide pilot corridors and stakeholders.

### Week 2 – Problem Discovery & Early Prototyping
- User interviews (5–10 commuters, 1–2 SACCO reps) and refine requirements.
- Low‑fidelity wireframes (report flow, map view, moderator console).
- Set up backend skeleton (Express, MongoDB Atlas), auth stub, data models.

### Week 3 – Concept Note & Front‑End Development
- Finalize concept note (problem, AI/solution, monetization hypothesis).
- Build responsive React UI: report submission, route list, basic map.
- Implement client-side validation and optimistic reporting.

### Week 4 – Core Logic & Lightweight Scoring
- Implement ingestion API, rate limiting, device reputation.
- Aggregation worker to compute time-bucketed reliability/safety scores.
- Basic anomaly flags (e.g., surge fares, long waits) and map overlays.

### Week 5 – Backend Development & Database Setup
- Full CRUD for routes/stops; moderator endpoints and admin dashboard.
- Notifications pipeline (saved routes → SMS/WhatsApp alerts opt-in).
- Analytics endpoints (reports volume, score trends, moderation backlog).

### Week 6 – Refine Models & MVP Preparation
- Tune scoring (per corridor, weather-aware), accessibility and i18n copy (EN/Swahili).
- Harden security, input validation, abuse mitigation; add PWA offline cache basics.
- Prepare demo data; run private pilot with champions.

### Week 7 – Deploy MVP & Initial User Testing
- Deploy frontend (Vercel/Netlify) and backend (Render/railway.app); configure CI.
- Test with ≥ 5 users on two corridors; collect feedback using session analytics.
- Iterate quick wins (copy, empty states, onboarding, performance).

### Week 8 – Testing & Refinement
- Usability fixes, accessibility pass, refine notifications and moderation workflows.
- Finalize metrics report and case study; prepare demo video and README polish.

## Risks & Mitigations
- Low data volume: seed with commuter champions; run corridor challenges and badges.
- Abuse/spam: throttle, device trust, moderator queues, content rules.
- Privacy concerns: anonymize by default, minimal PII, clear consent for notifications.
- Map accuracy: start with curated corridors; allow quick geometry fixes by admins.

## Monetization (post‑MVP options)
- Freemium commuter app; premium alerts; SACCO/enterprise dashboards; sponsorships.

## Getting Started (Dev)
1. Clone: `git clone https://github.com/nelsonmaranda/PLP-Final-Project.git`
2. Install workspaces once created: `npm install` (root) then per app.
3. Create `.env` files (`backend`/`frontend`) with MongoDB, JWT, and API keys.
4. Run backend and frontend dev servers (to be added in Week 2–3).

---
This README consolidates Week 1 planning and the 8‑week execution plan. Detailed design docs live in `docs/` and will be synced here as features evolve.
