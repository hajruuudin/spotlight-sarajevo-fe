# Spotlight Sarajevo FE

Frontend repository for a medium-scale project named SpotlightSarajevo. Developed with Angular 20.2, Tailwind v4.1. Deployed on Render's free tier (cold-start cca. 30s).

## Running locally
For running locally (currently available, will deprecate when application becomes serious), before everything, environment.ts must be setup:
- Create .env file in the root directory.
- Replace placeholders with actually API keys as necesary
- By default, the application listens on localhost:4200 and sends requests to localhost:8080 (spring boot backend).
- The database when running locally is specified in the backend repository.

```bash
cp .env.example .env      # fill in your real keys
node scripts/set-env-dev.js
ng serve
```
