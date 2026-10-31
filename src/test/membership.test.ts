import { describe, expect, it } from "vitest";
import {
  activeMembers,
  membershipCounts,
  producerStatusCounts,
} from "@/lib/membership";
import type { Member } from "@/lib/mock/cooperative";
import type { Producer } from "@/lib/mock/data";

const member = (partial: Partial<Member> & Pick<Member, "id" | "status">): Member => ({
  scoopId: "s1",
  orgId: null,
  firstName: "A",
  lastName: "B",
  sex: "H",
  phone: "",
  email: "a@b.c",
  age: 30,
  handicap: false,
  village: "X",
  joinedAt: null,
  producerId: null,
  history: [],
  ...partial,
});

describe("membershipCounts", () => {
  it("sépare adhérents actifs, candidats et suspendus", () => {
    const counts = membershipCounts([
      member({ id: "1", status: "membre" }),
      member({ id: "2", status: "membre" }),
      member({ id: "3", status: "candidat" }),
      member({ id: "4", status: "suspendu" }),
      member({ id: "5", status: "sorti" }),
    ]);
    expect(counts).toEqual({
      active: 2,
      candidates: 1,
      suspended: 1,
      left: 1,
      roster: 5,
    });
    expect(
      activeMembers([
        member({ id: "1", status: "membre" }),
        member({ id: "3", status: "candidat" }),
      ]),
    ).toHaveLength(1);
  });
});

describe("producerStatusCounts", () => {
  it("ne confond pas le statut de fiche agricole avec l'adhésion coopérative", () => {
    const base = {
      scoopId: "s1",
      orgId: "o1",
      firstName: "A",
      lastName: "B",
      sex: "H" as const,
      phone: "",
      cni: "",
      age: 40,
      handicap: false,
      village: "V",
      quality: "validé" as const,
      crops: [],
      enumerator: "",
      collectedAt: "2026-01-01",
    };
    const producers = [
      { ...base, id: "p1", code: "A", status: "membre" as const },
      { ...base, id: "p2", code: "B", status: "recensé" as const },
      { ...base, id: "p3", code: "C", status: "recensé" as const, mergedInto: "p1" },
    ] as Producer[];
    expect(producerStatusCounts(producers)).toEqual({
      producers: 2,
      labeledMember: 1,
      labeledListed: 1,
    });
  });
});
