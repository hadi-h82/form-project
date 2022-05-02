import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup;
  actionBtn: string = 'save';

  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];

  constructor(
    private formBuiler: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>
  ) {}

  ngOnInit(): void {
    this.productForm = this.formBuiler.group({
      productNme: ['', Validators.required],
      category: ['', Validators.required],
      freshness: ['', Validators.required],
      comment: ['', Validators.required],
      price: ['', Validators.required],
      date: ['', Validators.required],
    });
    // console.log(this.editData);
    if (this.editData) {
      this.actionBtn = 'Update';
      this.productForm.controls['productNme'].setValue(
        this.editData.productNme
      );
      this.productForm.controls['category'].setValue(this.editData.category);
      this.productForm.controls['freshness'].setValue(this.editData.freshness);
      this.productForm.controls['comment'].setValue(this.editData.comment);
      this.productForm.controls['price'].setValue(this.editData.price);
      this.productForm.controls['date'].setValue(this.editData.date);
    }
  }

  addProduct() {
    // console.log(this.productForm.value);
    if (!this.editData) {
      if (this.productForm.valid) {
        this.api.postProduct(this.productForm.value).subscribe({
          next: (res) => {
            alert('Product added successfully');
            this.productForm.reset();
            this.dialogRef.close('seve');
          },
          error: () => {
            alert('Error while adding the product');
          },
        });
      }
    } else {
      this.updateProduct();
    }
  }

  updateProduct() {
    this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
      next: (res) => {
        alert('Product Updated Successfully!!!');
        this.productForm.reset();
        this.dialogRef.close('Update');
      },
      error: () => {
        alert('not!!!');
      },
    });
  }
}
