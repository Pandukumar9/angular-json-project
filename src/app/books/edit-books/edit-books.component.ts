import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-edit-books',
  templateUrl: './edit-books.component.html',
  styleUrls: ['./edit-books.component.scss']
})
export class EditBooksComponent implements OnInit {

  id: any;
  data:any;
  products:any;
  exist = false;
  productObj: object = {};
  productData!: FormGroup;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private http: HttpClient
  ) {}
  confirmationString: string = 'Product updated successfully !!';
  isUpdated: boolean = false;
  file:any;
  ngOnInit() {

    this.route.params.subscribe(params => {
      this.id = +params['id'];
    });

    this.http.get('http://localhost:3000/books').subscribe(res => {
        this.isUpdated = true;
        this.products = res;
        for (var i = 0; i < this.products.length; i++) {
          if (parseInt(this.products[i].id) === this.id) {
            this.exist = true;
            this.data = this.products[i];
            this.initiateForm();
          } else {
            this.exist = false;
          }
        }
      });
      this.initiateForm();
  }
  isenablepreview:boolean=false;

  initiateForm(){
    debugger
    this.productData = new FormGroup({
      productid: new FormControl(this.data.p_id, [Validators.required]),
      productname: new FormControl(this.data.p_name, [Validators.required]),
      productimage: new FormControl(this.data.image, [Validators.required]),
      productnum: new FormControl(this.data.p_cost, [Validators.required]),
    });
  }
  ngAfterViewInit() {
    this.productData.controls['productimage'].valueChanges.subscribe(res => {
      if(res == 'true'){
        // this.previewImage = this.companyInternDetails.companyLogoPath;
        this.isenablepreview = true;
      }else if(res == 'false'){
        // this.previewImage = 'assets/img/company-default.jpg';
        this.isenablepreview = false;
      }
     })
  }
  imgErr = false;
  imgErrmes:any;
  onFileSelected(event: any) {
    this.file = event.target.files[0];
    this.isenablepreview = true;
    // const reader = new FileReader();
    // reader.readAsDataURL(this.file);
    // reader.onload = () => {
    //   const base64Image = reader.result.toString();
    //   this.imgurl = base64Image;
    // }
    const reader = new FileReader();
    if (event.target.files && event.target.files.length) {
    let filetype = event.target.files[0].name.substr(event.target.files[0].name.lastIndexOf('.') + 1).toUpperCase();
    if ((filetype !== 'JPG') && (filetype !== 'PNG') && (filetype !== 'JPEG') && (filetype !== 'BMP')) {
      this.imgErr = true;
      this.imgErrmes = 'Please upload .jpg, .jpeg, .png or .bmp formats only';
    } else if (event.target.files[0].size > 2000000) {
      this.imgErr = true;
      this.imgErrmes = 'Make Sure to upload a file in between 1kb to 2 MB';
    } else {
        this.file = <File>event.target.files[0];
        const [file] = event.target.files;
        reader.readAsDataURL(file);
        reader.onload = () => {
          this.imgurl = reader.result;
          // this.imageadded = true;
          // this.imgErr = false;
          // this.imgErrmes = null;
        };
      }
    }

    };
    imgurl:any;
    updateProducts() {
    if(this.isenablepreview){
      const reader = new FileReader();
      reader.readAsDataURL(this.file);
      reader.onload = () => {
        this.imgurl = reader.result;
      this.productObj = {
        p_id: this.productData.controls['productid'].value,
        p_name: this.productData.controls['productname'].value,
        p_cost: this.productData.controls['productnum'].value,
        image : this.imgurl,
      };
      this.http.put(`${'http://localhost:3000/books'}/${this.id}`, this.productObj).subscribe( res => {
        this.router.navigate(['/']);
      })
    };
    }else{
      this.productObj = {
        p_id: this.productData.controls['productid'].value,
        p_name: this.productData.controls['productname'].value,
        p_cost: this.productData.controls['productnum'].value,
        image :this.data.image
      };

      this.http.put(`${'http://localhost:3000/books'}/${this.id}`, this.productObj).subscribe( res => {
        console.log(res,'pppppp')
        this.router.navigate(['/books/listbooks']);
      })
    };
    }

}
