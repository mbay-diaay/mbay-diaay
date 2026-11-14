/**
 * Styles communs des pages listes charte V2 (Coopératives, Producteurs, Dossiers, Organisations…).
 *
 * `styles: [V2_PAGE_STYLES, \`…styles propres à la page…\`]`
 * Classes : `.mono`, `.card`, `.sub`, `.badge`, `.zero`, `.btn` (+ `-primary`, `-ghost`), `.btn-chip`,
 * `.toolbar`, `.search`, `.seg` (filtres à compteurs), `.act` (action icône), `.tbl` (tableau),
 * `.row-link`, `.avatar`. Couleurs uniquement via les jetons `--v2-*`.
 */
export const V2_PAGE_STYLES = `
  .mono {
    font-family: var(--v2-font-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
  }
  .card {
    border-radius: 24px;
    border: 1px solid var(--v2-bord-carte);
    background: var(--v2-blanc);
  }
  .sub {
    font-size: 13px;
    font-weight: 500;
    color: var(--v2-gris-texte);
  }
  .badge {
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border-radius: 999px;
    padding: 3px 10px 3px 8px;
    font-size: 12px;
    font-weight: 800;
    white-space: nowrap;
  }
  .zero {
    color: var(--v2-gris-trait) !important;
  }
  .btn {
    display: inline-flex;
    height: 48px;
    align-items: center;
    gap: 10px;
    border-radius: 16px;
    padding: 0 18px;
    font-size: 15px;
    font-weight: 800;
    white-space: nowrap;
    cursor: pointer;
    transition:
      background-color 0.15s ease,
      border-color 0.15s ease;
  }
  .btn:disabled {
    cursor: not-allowed;
    opacity: 0.5;
  }
  .btn:focus-visible {
    outline: 2px solid var(--v2-foret);
    outline-offset: 2px;
  }
  .btn-primary {
    padding: 0 6px 0 18px;
    background: var(--v2-foret);
    color: var(--v2-blanc);
  }
  .btn-primary:hover:not(:disabled) {
    background: var(--v2-foret-clair);
  }
  .btn-ghost {
    border: 1.5px solid var(--v2-gris-trait);
    background: var(--v2-blanc);
    color: var(--v2-encre);
  }
  .btn-ghost:hover:not(:disabled) {
    border-color: var(--v2-gris-texte);
  }
  /* Pastille citron à droite d'un bouton principal. */
  .btn-chip {
    display: grid;
    height: 36px;
    width: 36px;
    place-items: center;
    border-radius: 12px;
    background: var(--v2-citron);
    color: var(--v2-foret);
  }
  .toolbar {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 8px;
    padding: 8px;
    border-radius: 20px;
  }
  .search {
    display: flex;
    flex: 1 1 260px;
    min-width: 0;
    height: 48px;
    align-items: center;
    gap: 10px;
    border-radius: 14px;
    background: var(--v2-creme);
    padding: 0 14px;
    color: var(--v2-gris-texte);
  }
  .search:focus-within {
    box-shadow: inset 0 0 0 2px var(--v2-foret);
  }
  .search input {
    min-width: 0;
    flex: 1;
    background: transparent;
    font-size: 15px;
    font-weight: 600;
    color: var(--v2-encre);
    outline: none;
  }
  .seg {
    display: flex;
    max-width: 100%;
    gap: 4px;
    overflow-x: auto;
    scrollbar-width: none;
    border-radius: 14px;
    background: var(--v2-creme);
    padding: 4px;
  }
  .seg::-webkit-scrollbar {
    display: none;
  }
  .seg button {
    display: inline-flex;
    flex-shrink: 0;
    align-items: center;
    gap: 7px;
    white-space: nowrap;
    border-radius: 10px;
    padding: 9px 14px;
    font-size: 14px;
    font-weight: 700;
    color: var(--v2-gris-texte);
    cursor: pointer;
  }
  .seg button:hover {
    color: var(--v2-encre);
  }
  .seg button.on {
    background: var(--v2-blanc);
    color: var(--v2-foret);
    box-shadow: 0 1px 3px color-mix(in oklab, var(--v2-foret) 15%, transparent);
  }
  .seg .n {
    border-radius: 999px;
    padding: 1px 7px;
    font-size: 12px;
    font-variant-numeric: tabular-nums;
    background: color-mix(in oklab, var(--v2-gris-trait) 45%, transparent);
    color: var(--v2-ardoise);
  }
  .seg .n.zero {
    background: transparent;
  }
  .seg button.on .n {
    background: var(--v2-foret);
    color: var(--v2-blanc);
  }
  .act {
    display: grid;
    height: 34px;
    width: 34px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 12px;
    border: 1px solid var(--v2-bord-carte);
    background: var(--v2-blanc);
    color: var(--v2-ardoise);
    cursor: pointer;
    transition:
      background-color 0.15s ease,
      color 0.15s ease,
      border-color 0.15s ease;
  }
  .act:hover,
  .row-link:hover .act {
    border-color: var(--v2-foret);
    background: var(--v2-foret);
    color: var(--v2-citron);
  }
  .act:focus-visible {
    outline: 2px solid var(--v2-foret);
    outline-offset: 2px;
  }
  .tbl {
    width: 100%;
    text-align: left;
    font-size: 14px;
  }
  .tbl thead tr {
    font-family: var(--v2-font-mono);
    font-size: 11px;
    font-weight: 700;
    letter-spacing: 0.08em;
    text-transform: uppercase;
    color: var(--v2-gris-texte);
  }
  .tbl th {
    padding: 12px;
    white-space: nowrap;
  }
  .tbl td {
    padding: 12px;
  }
  .tbl th:first-child,
  .tbl td:first-child {
    padding-left: 20px;
  }
  .tbl th:last-child,
  .tbl td:last-child {
    padding-right: 20px;
  }
  .tbl tbody tr {
    border-top: 1px solid var(--v2-separateur);
  }
  .row-link {
    cursor: pointer;
    transition: background-color 0.15s ease;
  }
  .row-link:hover {
    background: var(--v2-creme);
  }
  .row-link:focus-visible {
    outline: 2px solid var(--v2-foret);
    outline-offset: -2px;
  }
  .avatar {
    display: grid;
    height: 36px;
    width: 36px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 999px;
    background: var(--v2-sauge);
    color: var(--v2-foret);
    font-size: 12px;
    font-weight: 800;
  }
  /* Fiches : carte de section avec titre, fiche d'identité, champs libres. */
  .sec-card {
    border-radius: 24px;
    border: 1px solid var(--v2-bord-carte);
    background: var(--v2-blanc);
    overflow: hidden;
  }
  .sec-head {
    display: flex;
    flex-wrap: wrap;
    align-items: center;
    gap: 10px;
    padding: 16px 20px;
  }
  .sec-head h2 {
    min-width: 0;
    flex: 1;
    display: flex;
    align-items: center;
    gap: 8px;
    font-size: 17px;
    font-weight: 800;
    letter-spacing: -0.01em;
  }
  .sec-head .n {
    border-radius: 999px;
    background: var(--v2-creme);
    padding: 1px 9px;
    font-size: 12px;
    font-weight: 800;
    color: var(--v2-ardoise);
  }
  .sec-ico {
    display: grid;
    height: 34px;
    width: 34px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 10px;
    background: var(--v2-sauge);
    color: var(--v2-foret);
  }
  .facts {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
    border-top: 1px solid var(--v2-separateur);
  }
  .fact {
    display: flex;
    min-width: 0;
    align-items: flex-start;
    gap: 12px;
    border-bottom: 1px solid var(--v2-separateur);
    padding: 14px 20px;
  }
  .fact-ico {
    display: grid;
    height: 34px;
    width: 34px;
    flex-shrink: 0;
    place-items: center;
    border-radius: 10px;
    background: var(--v2-creme);
    color: var(--v2-foret);
  }
  .fact dt {
    font-size: 12px;
    font-weight: 600;
    color: var(--v2-gris-texte);
  }
  .fact dd {
    margin-top: 2px;
    overflow-wrap: anywhere;
    font-size: 15px;
    font-weight: 800;
  }
  .reveal {
    margin-left: 8px;
    display: inline-flex;
    align-items: center;
    gap: 4px;
    border-radius: 8px;
    padding: 2px 8px;
    font-size: 12px;
    font-weight: 800;
    color: var(--v2-foret);
    background: var(--v2-sauge);
    cursor: pointer;
  }
  .reveal:hover {
    background: var(--v2-foret);
    color: var(--v2-citron);
  }
  .lbl {
    font-size: 12px;
    font-weight: 700;
    letter-spacing: 0.06em;
    text-transform: uppercase;
    color: var(--v2-ardoise);
  }
  .area {
    width: 100%;
    min-height: 104px;
    border-radius: 16px;
    border: 1.5px solid var(--v2-gris-trait);
    background: var(--v2-blanc);
    padding: 12px 16px;
    font-size: 15px;
    font-weight: 600;
    color: var(--v2-encre);
  }
  .area::placeholder {
    color: var(--v2-gris-texte);
    font-weight: 500;
  }
  .area:focus-visible {
    outline: none;
    border: 2px solid var(--v2-foret);
    box-shadow: var(--v2-halo);
  }
  .check {
    display: flex;
    align-items: flex-start;
    gap: 10px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
  }
  .check input {
    margin-top: 2px;
    height: 20px;
    width: 20px;
    accent-color: var(--v2-foret);
    cursor: pointer;
  }
  .act-danger:hover {
    border-color: var(--v2-erreur-fg);
    background: var(--v2-erreur-bg);
    color: var(--v2-erreur-fg);
  }
  .btn-danger {
    background: var(--v2-erreur-fg);
    color: var(--v2-blanc);
  }
  .btn-danger:hover:not(:disabled) {
    background: color-mix(in oklab, var(--v2-erreur-fg) 85%, black);
  }
  .btn-citron {
    padding: 0 18px;
    background: var(--v2-citron);
    color: var(--v2-foret);
  }
  .btn-citron:hover:not(:disabled) {
    background: color-mix(in oklab, var(--v2-citron) 85%, white);
  }
  .notice {
    display: flex;
    align-items: center;
    gap: 10px;
    border-radius: 18px;
    padding: 12px 16px;
    font-size: 14px;
    font-weight: 700;
  }
  .rise {
    animation: v2-rise 0.45s cubic-bezier(0.32, 0.72, 0, 1) both;
  }
  @keyframes v2-rise {
    from {
      opacity: 0;
      transform: translateY(10px);
    }
  }
  @media (prefers-reduced-motion: reduce) {
    .rise {
      animation: none;
    }
  }
`;

/** Initiales d'un nom (« Awa Diop » → « AD »). */
export const initialsOf = (name: string): string =>
  name
    .split(" ")
    .filter(Boolean)
    .map((w) => w[0])
    .slice(0, 2)
    .join("")
    .toUpperCase();

/** Couleurs d'état de la charte (fond + encre). */
export const TONE = {
  succes: { bg: "var(--v2-sauge)", fg: "var(--v2-vert-pousse)" },
  info: { bg: "var(--v2-info-bg)", fg: "var(--v2-info-fg)" },
  attente: { bg: "var(--v2-attente-bg)", fg: "var(--v2-attente-fg)" },
  erreur: { bg: "var(--v2-erreur-bg)", fg: "var(--v2-erreur-fg)" },
  culture: { bg: "var(--v2-culture-bg)", fg: "var(--v2-culture-fg)" },
  neutre: { bg: "var(--v2-lin)", fg: "var(--v2-gris-texte)" },
} as const;
