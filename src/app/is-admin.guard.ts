import { CanActivateFn } from '@angular/router';

export const isAdminGuard = () => {
  return (localStorage.getItem('id') === 'gAnABjoY3vUwdLfmwOExPG4Pf6g2');
};
