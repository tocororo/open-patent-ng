
import { Component, Input, OnInit } from '@angular/core';
import { UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthBackend, MessageHandler, StatusCode } from 'toco-lib'

import { ContactService } from './contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.scss']
})
export class ContactComponent implements OnInit {

  @Input()
  public siteKey: string = "6LdlTwYaAAAAAGOM4bF2FoCsf7t5wnYgx4_t18xq";

  @Input()
  public rows: number = 8;

  @Input()
  public width: string = '100%';

  public formGroup: UntypedFormGroup;

  constructor(private contactService: ContactService, private _formBuilder: UntypedFormBuilder, private _snackBar: MatSnackBar) { }

  ngOnInit() {
    this.contactService.backend = AuthBackend.sceiba;
    this.formGroup = this._formBuilder.group({
      email: new UntypedFormControl(null, Validators.email),
      topic: new UntypedFormControl(null),
      body: new UntypedFormControl(null, Validators.required)
    });
  }

  public resolved(captchaResponse: string) {
    console.log(`Resolved captcha with response: ${captchaResponse}`);
  }

  public send()
  {
    //grecaptcha.reset();

    if (this.formGroup.valid)
    {
      this.contactService.send(this.formGroup.value).subscribe({
        next: response => {
          console.log(response);
          if (response) {
            const m = new MessageHandler(this._snackBar);
            m.showMessage(StatusCode.OK, "Mensaje enviado correctamente");
          }
        },
        error: e => console.log(e),
      });
    }
  }
}
