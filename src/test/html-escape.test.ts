import { describe, expect, it } from "vitest";
import { escapeHtml } from "@/lib/html";
import { plotTooltipHtml } from "@/lib/map-labels";

describe("protection du HTML des infobulles", () => {
  it("neutralise les caractères qui ouvrent une balise ou un attribut", () => {
    expect(escapeHtml(`<img src=x onerror="alert(1)">`)).toBe(
      "&lt;img src=x onerror=&quot;alert(1)&quot;&gt;",
    );
    expect(escapeHtml(`a & b 'c'`)).toBe("a &amp; b &#39;c&#39;");
    expect(escapeHtml(undefined)).toBe("");
    expect(escapeHtml(42)).toBe("42");
  });

  it("un nom de producteur piégé ne produit aucune balise dans l'infobulle", () => {
    const html = plotTooltipHtml({
      code: "P-1",
      statusLabel: "validée",
      ownerName: `<script>fetch('/vol?'+localStorage.getItem('mbd.session'))</script> Awa`,
      crop: `<img src=x onerror=alert(1)>`,
    });
    const host = document.createElement("div");
    host.innerHTML = html;
    // Seules les balises voulues existent : <strong> et <br>. Aucun script, aucune image, aucun gestionnaire d'événement.
    expect([...host.querySelectorAll("*")].map((e) => e.tagName)).toEqual(["STRONG", "BR"]);
    expect(host.textContent).toContain("<script>");
    expect(host.innerHTML).not.toMatch(/<(script|img)/i);
  });

  it("une parcelle sans propriétaire connu reste affichable", () => {
    expect(
      plotTooltipHtml({
        code: "P-2",
        statusLabel: "relevée",
        ownerName: undefined,
        crop: "Oignon",
      }),
    ).toBe("<strong>P-2</strong> · relevée<br/> · Oignon");
  });
});
