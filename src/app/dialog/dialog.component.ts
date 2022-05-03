import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';
import { HttpErrorResponse } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss'],
})
export class DialogComponent implements OnInit {
  productForm!: FormGroup;
  freshnessList = ['Brand New', 'Second Hand', 'Refurbished'];

  constructor(
    private formBuiler: FormBuilder,
    private api: ApiService,
    @Inject(MAT_DIALOG_DATA) public editData: any,
    private dialogRef: MatDialogRef<DialogComponent>,
    private toastr: ToastrService
  ) {
    this.formBuilder();
  }
  formBuilder() {
    this.productForm = this.formBuiler.group({
      productNme: [null, Validators.required],
      category: [null, Validators.required],
      freshness: [null, Validators.required],
      price: [null, Validators.required],
      date: [null, Validators.required],
      comment: [null],
    });
  }
  ngOnInit(): void {
    if (this.editData) {
      this.bindData();
    }
  }

  bindData() {
    this.productForm.patchValue(this.editData);
  }

  addProduct() {
    if (this.productForm.valid) {
      this.api.postProduct(this.productForm.value).subscribe({
        next: () => {
          this.toastr.success('Product added successfully');
          this.productForm.reset();
          this.dialogRef.close('seve');
        },
      });
    }
  }

  updateProduct() {
    if (this.productForm.valid) {
      this.api.putProduct(this.productForm.value, this.editData.id).subscribe({
        next: () => {
          this.toastr.success('Product Updated Successfully');
          this.productForm.reset();
          this.dialogRef.close();
        },
      });
    }
  }
}
