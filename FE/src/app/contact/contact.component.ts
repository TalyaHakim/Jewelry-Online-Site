import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ContactService } from '../contact.service';

@Component({
  selector: 'app-contact',
  templateUrl: './contact.component.html',
  styleUrls: ['./contact.component.css']
})
export class ContactComponent implements OnInit {

  msg:string = ''

  form: FormGroup = new FormGroup({
    name: new FormControl('', Validators.required),
    email: new FormControl('', Validators.required),
    message: new FormControl('', Validators.required)
  });

  constructor(private contactService: ContactService) { }

  ngOnInit(): void {
  }

  send() {
    if (!this.form.valid) return;
    this.contactService.contactUs(this.form.value)
      .subscribe(data => data)
      this.msg = 'Thank you for texting us, we will respond to your request soon :)'
      this.form.reset()
  }
}
