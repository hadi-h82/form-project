import { Component, OnInit } from '@angular/core';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { DialogComponent } from './dialog/dialog.component';
import { ApiService } from './services/api.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'form-project';

  constructor(private dialog: MatDialog , private api: ApiService) {}


  ngOnInit(): void {
    this.getAllProduct();
  }

  openDialog() {
    this.dialog.open(DialogComponent, {
      width: '30%' ,
      height: '70%'
    });
  }


  getAllProduct() {
    this.api.getProduct()
      .subscribe({
        next:(res)=>{
          console.log(res);
        },
        error:()=> {
          alert("Error while fetching the Records!!!")
        }
      })

  }



}

// npx json-server --watch db.json