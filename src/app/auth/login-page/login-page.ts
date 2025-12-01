import { CommonModule, NgIf } from "@angular/common";
import { FormUtils } from "../../shared/form-utils";
import { Router, RouterModule } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule], // NgIf para @if
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
  errorMessage = signal('');
  loginForm;
  submitted = signal(false); // <-- nueva señal

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    this.submitted.set(true); // <-- marcamos que ya se intentó enviar
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email === 'ADMIN' && password === 'admin123') {
        this.router.navigate(['/home']);
      } else {
        this.errorMessage.set('Usuario o contraseña incorrectos');
      }
    } else {
      FormUtils.markAllAsDirty(this.loginForm);
      this.errorMessage.set('Por favor, completa correctamente los campos');
    }
  }
}
