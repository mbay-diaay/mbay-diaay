/** Page d’erreur Nitro isolée — hex CRADESC documentés (pas de CSS app au moment du crash). */
export function renderErrorPage(): string {
  return `<!doctype html>
<html lang="fr">
  <head>
    <meta charset="utf-8" />
    <title>Cette page n'a pas pu se charger</title>
    <meta name="viewport" content="width=device-width, initial-scale=1" />
    <style>
      body {
        font: 15px/1.5 Inter, "Noto Sans", system-ui, sans-serif;
        background: #f8f6f3;
        color: #2a1f1b;
        display: grid;
        place-items: center;
        min-height: 100vh;
        margin: 0;
        padding: 1.5rem;
      }
      .card { max-width: 28rem; width: 100%; text-align: center; padding: 2rem; }
      h1 { font-size: 1.25rem; margin: 0 0 0.5rem; font-weight: 600; }
      p { color: #5c524c; margin: 0 0 1.5rem; }
      .actions { display: flex; gap: 0.5rem; justify-content: center; flex-wrap: wrap; }
      a, button {
        padding: 0.75rem 1rem;
        min-height: 48px;
        border-radius: 0.375rem;
        font: inherit;
        cursor: pointer;
        text-decoration: none;
        border: 1px solid transparent;
        display: inline-flex;
        align-items: center;
        justify-content: center;
      }
      .primary { background: #4e3228; color: #fff; }
      .primary:hover { background: #664336; }
      .secondary { background: #fff; color: #2a1f1b; border-color: #ddd6d0; }
    </style>
  </head>
  <body>
    <div class="card">
      <h1>Cette page n'a pas pu se charger</h1>
      <p>Une erreur est survenue de notre côté. Actualisez la page ou revenez à l'accueil.</p>
      <div class="actions">
        <button class="primary" onclick="location.reload()">Réessayer</button>
        <a class="secondary" href="/">Accueil</a>
      </div>
    </div>
  </body>
</html>`;
}
