# Versiebeheer

Dit document beschrijft hoe versies worden beheerd in Svenska Kat.

## Semantic Versioning

We volgen [Semantic Versioning](https://semver.org/):

```
MAJOR.MINOR.PATCH
1.12.0
```

- **MAJOR**: Breaking changes (niet backward compatible)
- **MINOR**: Nieuwe features (backward compatible)
- **PATCH**: Bug fixes (backward compatible)

## Wanneer ophogen?

### PATCH verhogen (1.12.0 → 1.12.1)
- Bug fixes
- Kleine styling aanpassingen
- Performance verbeteringen
- Typo's en tekst correcties

### MINOR verhogen (1.12.0 → 1.13.0)
- Nieuwe features
- Nieuwe oefenvormen
- Uitbreiding grammatica sectie
- Nieuwe categorieën
- Significante UX verbeteringen

### MAJOR verhogen (1.x.x → 2.0.0)
- Database schema wijzigingen
- Breaking API changes
- Complete redesign
- Niet backward compatible met vorige data

## Workflow voor releases

### 1. Dagelijkse ontwikkeling
Werk op feature branches, merge naar main. Versie blijft gelijk totdat we releasen.

### 2. Bij release (wekelijks of bij significante features)

```bash
# 1. Update package.json versie
npm version minor  # of patch/major

# 2. Update CHANGELOG.md met nieuwe versie
# Voeg sectie toe bovenaan met datum en changes

# 3. Commit en push
git add .
git commit -m "chore: release v1.13.0"
git push
```

### 3. Automatische versie propagatie
- `package.json` is de "source of truth"
- Vite injecteert versie via `__APP_VERSION__`
- App toont versie in Settings

## Update notificaties voor gebruikers

De app toont automatisch een notificatie wanneer:
1. De Service Worker een nieuwe versie detecteert
2. De gebruiker de app opnieuw opent na een update

### Wat de gebruiker ziet
- "Nieuwe versie beschikbaar!" banner
- "Update Nu" knop om te verversen
- Versienummer in Settings pagina

### Release Notes
Bij significante updates kan een "Wat is nieuw?" modal worden getoond:
- Wordt getriggerd door `lastSeenVersion !== APP_VERSION`
- Toont highlights uit CHANGELOG
- Gebruiker kan later terugkijken in Settings

## Huidige versie

Zie `package.json` voor de huidige versie:

```bash
cat package.json | grep '"version"'
```

Of in de app: Settings → Versie

## Checklist voor releases

- [ ] Alle tests slagen (`npm run test`)
- [ ] Build slaagt (`npm run build`)
- [ ] CHANGELOG.md bijgewerkt met nieuwe versie
- [ ] package.json versie opgehoogd
- [ ] Commit message: `chore: release vX.Y.Z`
- [ ] Tag aangemaakt (optioneel): `git tag v1.13.0`
