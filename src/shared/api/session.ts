import { clearTokens } from '@shared/api/tokenStorage';
import { clearUserInformation } from '@shared/api/userInformationStorage';

export function clearSession() {
  clearTokens();
  clearUserInformation();
}
