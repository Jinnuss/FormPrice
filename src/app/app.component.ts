import { Component } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {

  countries = [
    {
      id: 1,
      active: false,
      name: 'Mỹ OREGON',
      name_short: 'US',
      image: '../assets/images/flag_usa.svg'
    },

    {
      id: 2,
      active: false,
      name: 'Nhật Bản',
      name_short: 'JP',
      image: '../assets/images/flag_japan.svg'
    },
    {
      id: 3,
      active: false,
      name: 'Tuyến Anh',
      name_short: 'UK',
      image: '../assets/images/flag_kingdom.svg'
    },
    {
      id: 4,
      active: false,
      name: 'Mỹ CALI',
      name_short: 'US_CA',
      image: '../assets/images/flag_usa.svg'
    },
  ];
  short_name = '';
  public valid: boolean = true;
  PriceForm: FormGroup = new FormGroup({
    price: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.min(1)]),
    we: new FormControl({ value: '', disabled: true }, [Validators.required, Validators.min(0.1)]),
    len: new FormControl({ value: '', disabled: true }),
    wid: new FormControl({ value: '', disabled: true }),
    heigh: new FormControl({ value: '', disabled: true }),
    sele: new FormControl({ value: '', disabled: true }, Validators.required),
  }
  );
  onclick(idCountry: number) {
    this.short_name = this.countries[idCountry - 1].name_short;
    for (let country of this.countries) {
      if (country.id == idCountry) {
        country.active = !country.active;
        this.valid = country.active;
      } else {
        country.active = false;
      }
    }
    // const priceControl = this.PriceForm.get('price');
    // if (this.valid) {
    //   priceControl?.enable();
    // } else {
    //   priceControl?.disable();
    // }
    Object.keys(this.PriceForm.controls).forEach(controlName => {
      const control = this.PriceForm.get(controlName);
      if (control) {
        if (this.valid) {
          control.enable();
        } else {
          control.disable();
        }
      }
    });
  }
  onInputBlur(controlName: string) {
    const control = this.PriceForm.get(controlName);
    if (controlName == 'price') {
      if (control && control.value < 0) {
        control.setValue(1);
      }
    }
    if (controlName == 'we') {
      if (control && control.value < 0) {
        control.setValue(0.1);
      }
    }
  }
  err = false
  show = false;
  price = 0;
  we = 0;
  onSubmit() {
    if (this.PriceForm.valid == false) {
      this.err = true;
    } else {
      this.err = false;
    }
    if (this.err == false) {
      this.show = true;
    } else {
      this.show = false;
    }
    this.price = this.PriceForm.value.price;
    this.we = this.PriceForm.value.we;
    console.log(this.price);
  }
  detail = false;
  onClick() {
    this.detail = !this.detail;
  }
}
