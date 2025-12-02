import { CommonModule, NgIf } from "@angular/common";
import { FormUtils } from "../../shared/form-utils";
import { Router, RouterModule } from "@angular/router";
import { FormBuilder, ReactiveFormsModule, Validators } from "@angular/forms";
import { ChangeDetectionStrategy, Component, signal } from "@angular/core";

export interface UserSession {
  email: string;
  token: string; // opcional, puedes usarlo si luego implementas auth real
}

@Component({
  selector: 'app-login-page',
  templateUrl: './login-page.html',
  standalone: true,
  imports: [CommonModule, RouterModule, ReactiveFormsModule], 
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LoginPage {
   errorMessage = signal('');
  submitted = signal(false); 
  loginForm;

  constructor(private fb: FormBuilder, private router: Router) {

    // Si ya está logeado → enviar directo al home
    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.router.navigate(['/home']);
    }

    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  submit() {
    this.submitted.set(true); 

    if (!this.loginForm.valid) {
      FormUtils.markAllAsDirty(this.loginForm);
      this.errorMessage.set('Por favor, completa correctamente los campos');
      return;
    }

    const { email, password } = this.loginForm.value;

    if (email === 'usuario@ups.edu.ec' && password === '123456') {
      const user: UserSession = { email, token: 'dummy-token' };
      localStorage.setItem('user', JSON.stringify(user));

      this.router.navigate(['/home']);
    } else {
      this.errorMessage.set('Usuario o contraseña incorrectos');
    }
  }
}
