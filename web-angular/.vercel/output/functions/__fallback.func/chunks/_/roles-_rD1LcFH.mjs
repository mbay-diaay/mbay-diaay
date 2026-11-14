import { a as apiFetch } from './client-D1lxPQMx.mjs';

function listRolePermissions() {
  return apiFetch("/admin/roles");
}
function updateRolePermissions(role, permissions) {
  return apiFetch(`/admin/roles/${role}`, {
    method: "PUT",
    body: { permissions }
  });
}
function resetRolePermissions(role) {
  return apiFetch(`/admin/roles/${role}/reset`, {
    method: "POST",
    body: {}
  });
}
function createCustomRole(body) {
  return apiFetch("/admin/roles", {
    method: "POST",
    body
  });
}
function updateCustomRole(role, body) {
  return apiFetch(`/admin/roles/${role}`, {
    method: "PATCH",
    body
  });
}
function deleteCustomRole(role, reassignTo) {
  return apiFetch(`/admin/roles/${role}/delete`, {
    method: "POST",
    body: reassignTo ? { reassignTo } : {}
  });
}
var scoopRoles = (scoopId) => `/scoops/${encodeURIComponent(scoopId)}/roles`;
function listScoopRoles(scoopId) {
  return apiFetch(scoopRoles(scoopId));
}
function createScoopRole(scoopId, body) {
  return apiFetch(scoopRoles(scoopId), {
    method: "POST",
    body
  });
}
function updateScoopRole(scoopId, role, body) {
  return apiFetch(`${scoopRoles(scoopId)}/${role}`, {
    method: "PATCH",
    body
  });
}
function setScoopRolePermissions(scoopId, role, permissions) {
  return apiFetch(`${scoopRoles(scoopId)}/${role}`, {
    method: "PUT",
    body: { permissions }
  });
}
function deleteScoopRole(scoopId, role, reassignTo) {
  return apiFetch(`${scoopRoles(scoopId)}/${role}/delete`, {
    method: "POST",
    body: reassignTo ? { reassignTo } : {}
  });
}

export { listRolePermissions as a, updateCustomRole as b, createScoopRole as c, deleteScoopRole as d, createCustomRole as e, deleteCustomRole as f, updateRolePermissions as g, listScoopRoles as l, resetRolePermissions as r, setScoopRolePermissions as s, updateScoopRole as u };
//# sourceMappingURL=roles-_rD1LcFH.mjs.map
