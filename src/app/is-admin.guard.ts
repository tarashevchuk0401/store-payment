import { CanActivateFn } from '@angular/router';

export const isAdminGuard = () => {
  return (localStorage.getItem('id') === 'MMDwxsluaqMzKYwWqnRFVVcnG1B3');
};
