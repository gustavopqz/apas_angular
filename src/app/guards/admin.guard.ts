// src/app/guards/admin.guard.ts
import { CanActivateFn, Router } from '@angular/router';
import { inject } from '@angular/core';
import { AdministradoresService } from '../services/administradores.service';
import { map } from 'rxjs/operators';

export const adminGuard: CanActivateFn = (route, state) => {
  const adminPrivilegeService = inject(AdministradoresService);
  const router = inject(Router);

  return adminPrivilegeService.checkUserPrivilege().pipe(
    map(isAdmin => {
      if (isAdmin) {
        return true;
      } else {
        router.navigate(['/acesso-negado']); // Redireciona para uma página de acesso negado
        return false;
      }
    })
  );
};