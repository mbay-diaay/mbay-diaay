function managerOf(users, scoopId) {
  var _a;
  const managers = users.filter((u) => u.role === "gestionnaire" && u.scoopId === scoopId);
  return (_a = managers.find((u) => u.active)) != null ? _a : managers[0];
}
function accountOf(manager, now) {
  if (!manager) return "none";
  if (manager.active) return "active";
  if (!manager.invited) return "closed";
  return new Date(manager.invited.expiresAt).getTime() < now ? "expired" : "invited";
}

export { accountOf as a, managerOf as m };
//# sourceMappingURL=scoop-account-Bqdc3Ifh.mjs.map
