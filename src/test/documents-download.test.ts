import { beforeAll, describe, expect, it, vi } from "vitest";
import { actions, getState } from "@/lib/store";

beforeAll(() => {
  const data = new Map<string, string>();
  vi.stubGlobal("localStorage", {
    getItem: (k: string) => data.get(k) ?? null,
    setItem: (k: string, v: string) => void data.set(k, v),
    removeItem: (k: string) => void data.delete(k),
  });
});

describe("téléchargement d'un document", () => {
  it("refuse sans connexion", () => {
    actions.logout();
    expect(actions.downloadDocument("doc4").ok).toBe(false);
  });

  it("autorise un document de sa coopérative, le trace, et refuse celui d'une autre", () => {
    actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    const before = getState().audit.length;
    expect(actions.downloadDocument("doc4").ok).toBe(true); // statuts de s1
    expect(getState().audit).toHaveLength(before + 1);
    expect(actions.downloadDocument("doc7").ok).toBe(false); // statuts de s2
  });

  it("refuse un rôle sans le droit : le profil ventes et la faîtière sur la bibliothèque", () => {
    actions.login("Test", "ventes@exemple.sn", "ventes");
    expect(actions.downloadDocument("doc4").ok).toBe(false);
    actions.login("Test", "faitiere@exemple.sn", "faitiere");
    expect(actions.downloadDocument("doc4").ok).toBe(false);
  });

  it("une pièce sensible exige le droit CNI", () => {
    actions.login("Babacar Fall", "babacar.fall@scoop-kms.example", "gestionnaire");
    const res = actions.addLibraryDocument("s1", {
      kind: "justificatif",
      name: "sensible.pdf",
      sizeKb: 10,
      mime: "application/pdf",
      sensitive: true,
    });
    if (!res.ok) throw new Error("ajout");
    expect(actions.downloadDocument(res.id).ok).toBe(true);
    actions.login("Test", "secretaire@exemple.sn", "secretaire");
    expect(actions.downloadDocument(res.id).ok).toBe(false);
  });
});
