import { CanDeactivateFn } from '@angular/router';
import { MemberEditComponent } from '../Members/member-edit/member-edit.component';

export const preventUnsavedChangesGuard: CanDeactivateFn<MemberEditComponent> = (component) => {
if(component.editform.dirty){
  return confirm('Are your sure you want to containo unsaved changes well be lost')
}
return true
};
