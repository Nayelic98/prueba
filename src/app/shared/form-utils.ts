import { FormGroup } from '@angular/forms';

export class FormUtils {
  static markAllAsDirty(form: FormGroup) {
    Object.values(form.controls).forEach(control => {
      control.markAsDirty();
      control.updateValueAndValidity();
    });
  }
}
