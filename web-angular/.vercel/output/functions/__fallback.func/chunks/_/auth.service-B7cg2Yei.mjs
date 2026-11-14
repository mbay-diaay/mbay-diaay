import { ai as __defineInjectable } from '../virtual/_virtual_ANALOG_SSR_RENDERER.mjs';
import { d as demoMailbox, b as authService, p as pendingInvitationLinks } from './auth-B3-o0LRT.mjs';

var _a;
var AuthService = (_a = class {
  constructor() {
    this.mailbox = demoMailbox;
  }
  signIn(email, password) {
    return authService.signIn(email, password);
  }
  verifyOtp(challengeId, code) {
    return authService.verifyOtp(challengeId, code);
  }
  resendOtp(challengeId) {
    return authService.resendOtp(challengeId);
  }
  requestPasswordReset(email) {
    return authService.requestPasswordReset(email);
  }
  verifyResetCode(email, code) {
    return authService.verifyResetCode(email, code);
  }
  resetPassword(resetToken, newPassword) {
    return authService.resetPassword(resetToken, newPassword);
  }
  invitationInfo(token) {
    return authService.invitationInfo(token);
  }
  acceptInvitation(token, newPassword) {
    return authService.acceptInvitation(token, newPassword);
  }
  pendingInvitationLinks() {
    return pendingInvitationLinks();
  }
}, _a.\u0275fac = function AuthService_Factory(__ngFactoryType__) {
  return new (__ngFactoryType__ || _a)();
}, _a.\u0275prov = /* @__PURE__ */ __defineInjectable({
  token: _a,
  factory: _a.\u0275fac,
  providedIn: "root"
}), _a);

export { AuthService as A };
//# sourceMappingURL=auth.service-B7cg2Yei.mjs.map
