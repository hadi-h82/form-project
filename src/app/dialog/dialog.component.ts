import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  productForm! : FormGroup;

  freshnessList = ['Brand New','Second Hand','Refurbished']


  constructor(private formBuiler: FormBuilder , private  api: ApiService , private dilogRef: MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    this.productForm = this.formBuiler.group({
      productNme:['',Validators.required],
      category:['',Validators.required],
      freshness:['',Validators.required],
      comment:['',Validators.required],
      price:['',Validators.required],
      date:['',Validators.required]
    })
  }

  addProduct() {
    // console.log(this.productForm.value);
    if(this.productForm.valid) {
      this.api.postProduct(this.productForm.value)
        .subscribe({
          next:(res)=>{
            alert('Product added successfully')
            this.productForm.reset();
            this.dilogRef.close('seve');
          },
          error:()=>{
            alert('Error while adding the product')
          }

        })
    }
  }

}
