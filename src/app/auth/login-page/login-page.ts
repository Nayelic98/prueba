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
  loginForm;
  submitted = signal(false); 

  constructor(private fb: FormBuilder, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });

    const savedUser = localStorage.getItem('user');
    if (savedUser) {
      this.router.navigate(['/home']);
    }
  }

  submit() {
    this.submitted.set(true); 
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;
      if (email === 'usuario@ups.edu.ec' && password === '123456') {
        // Guardar sesión en localStorage
        const user: UserSession = { email, token: 'dummy-token' };
        localStorage.setItem('user', JSON.stringify(user));

        // Redirigir al home
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
