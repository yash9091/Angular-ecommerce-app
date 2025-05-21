// contact-us.component.ts
import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import emailjs, { type EmailJSResponseStatus } from '@emailjs/browser';

@Component({
  selector: 'app-contact-us',
  standalone: true,
  imports: [CommonModule, FormsModule, MatSnackBarModule],
  templateUrl: './contact-us.component.html',
})
export class ContactUsComponent {
  formData = {
    name: '',
    email: '',
    message: '',
    phone:''
  };
  snackBar = inject(MatSnackBar);

  onSubmit() {
    this.submitForm(this.formData);
    this.snackBar.open('Contact details submitted', 'Close', {
    duration: 2000,
    verticalPosition: 'top',
    panelClass: ['bg-blue-500', 'text-white']
  });
    this.formData = { name: '', email: '', message: '', phone:''}; 
  }
  submitForm(form: any) {
  emailjs.send(
    'service_8lvx3ru',
    'template_jn4egoo',
    {
      name: form.name,
      email: form.email,
      message: form.message,
      phone:form.phone
    },
    'is7TKc-ztaFrcyeHV'
  ).then(
    (response) => console.log('SUCCESS!', response.status, response.text),
    (err) => console.log('FAILED...', err)
  );
}
}
