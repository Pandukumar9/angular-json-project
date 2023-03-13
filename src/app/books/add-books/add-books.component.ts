import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-books',
  templateUrl: './add-books.component.html',
  styleUrls: ['./add-books.component.scss']
})
export class AddBooksComponent implements OnInit {

  constructor(private http: HttpClient,private route:Router) {}
  confirmationString: string = 'New Product has been Added !!';
  isAdded: boolean = false;
  productObj: object = [];
  imageUrl: any;

  ngOnInit() {}
  validFile:boolean=true;

  fileToUpload:any;
  uploadingattachmentname:any;
  file:any;
  uploadingattachmenttypeimage = false;
  imagedata:any;
  filetype:any;
  ImageUploadModel = {
    Title: '',
    Description: '',
    ImageType: '',
    Base64String: '',
  }
  imageName = [];
  @ViewChild('uploadfile') myInputVariable!: ElementRef;
  uploadProduct(event:any) {


    if (event && event.target.files.length >= 0) {
      let invalidTypes = [];
      for (let i = 0; i < event.target.files.length; i++) {
        if (event.target.files[i].size < 5000000) {
          const file = event.target.files[i];
          let filetype = file.name.substr(file.name.lastIndexOf('.') + 1).toUpperCase();
          if ((filetype === 'JPG') || (filetype === 'PNG') || (filetype === 'JPEG') || (filetype === 'BMP')) {
            // this.imageName.push(file.name);
            const reader = new FileReader();
            reader.readAsDataURL(file);
            reader.onload = (event: any) => {
              // this.filesToUpload.push(reader.result);
              // this.imageArray.push(file);
            };
            // let newob = <FormArray>this.imageDataForm.controls['filesData'];
            // newob.push(this.craeteinterviewrounds(file.name));


          } else {
            this.myInputVariable.nativeElement.value = '';
            invalidTypes.push(file.name);
          }
        } else {
          this.myInputVariable.nativeElement.value = '';
          // this.validationerrors.openSnackBar('failure', 'File Upload limit - Not exceeding 5 MB.');
        }
      }
      if (invalidTypes.length > 0) {
        this.myInputVariable.nativeElement.value = '';
        // this.validationerrors.openSnackBar('info', 'List of invalid files found which cannot be accepted. ' + invalidTypes.join(', '));
      }
    }





    let fileList = (<HTMLInputElement>event.target).files;

  // if (fileList && fileList.length > 0) {
  //   let file: File = fileList[0];
  //   console.log(file.name);
  //   console.log(file.size);
  //   console.log(file.type);

  //   let fileItem = file;
  //   this.fileToUpload = fileItem;
  //     const reader = new FileReader();
  //     if (this.fileToUpload) {
  //       let filetype = this.fileToUpload.name.substr(this.fileToUpload.name.lastIndexOf('.') + 1).toUpperCase();
  //       this.uploadingattachmentname = this.fileToUpload.name;
  //       if ((filetype !== 'JPG') && (filetype !== 'PNG') && (filetype !== 'PSD') && (filetype !== 'JPEG') && (filetype !== 'BMP') && (filetype !== 'PDF') && (filetype !== 'TXT') && (filetype !== 'DOCX') && (filetype !== 'DOC') && (filetype !== 'XLSX') && (filetype !== 'XLS') && (filetype !== 'PPT') && (filetype !== 'PPTX')) {
  //         // this.snack.openSnackBar('info', 'Please upload a valid file');
  //         alert("Please upload a valid file")
  //         this.myInputVariable.nativeElement.value = '';
  //       } else if (this.fileToUpload.size < 1024 || this.fileToUpload.size > 5242880) {
  //         // this.snack.openSnackBar('info', 'File upload size must be between 1Kb - 5Mb.');
  //         alert("File upload size must be between 1Kb - 5Mb.")
  //         this.myInputVariable.nativeElement.value = '';
  //       } else {
  //         this.file = <File>this.fileToUpload;
  //        // const [file] = this.fileToUpload;
  //         reader.readAsDataURL(this.file);
  //         reader.onload = () => {
  //           if (filetype === 'JPG' || filetype === 'PNG' || filetype === 'PSD' || filetype === 'JPEG' || filetype === 'BMP') {
  //             this.uploadingattachmenttypeimage = true;
  //             this.imagedata = reader.result;
  //           } else {
  //             this.uploadingattachmenttypeimage = false;
  //           }
  //           // this.addfile(this.fileToUpload);
  //           // this.autoSaveData();
  //         };
  //       }
  //     }
  // }

  const file = event.target.files[0];
  if (file.type.split('/')[0] !== 'image') {
   this.validFile = false;
  }
  this.ImageUploadModel.ImageType = file.type.split('/')[1];

  const myReader: FileReader = new FileReader();
  myReader.onloadend = (e) => {
    // this.ImageUploadModel.Base64String = myReader.result.toString();
 };
   myReader.readAsDataURL(file);

  }

  sendDataWithImage(file: File, otherData: any) {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      // const base64Image = reader.result.toString();
      const jsonData = {
        // image: base64Image,
        data: otherData
      };
      const httpOptions = {
        headers: new HttpHeaders({
          'Content-Type': 'application/json'
        })
      };
      this.http.post('url', jsonData, httpOptions).subscribe((response) => {
        console.log(response);
      });
    };
  }
  imgErr = false;
  imgErrmes:any;
  onFileSelected(event: any) {
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
          this.imageUrl = reader.result;
          // this.imageadded = true;
          // this.imgErr = false;
          // this.imgErrmes = null;
        };
      }
    }

    };

    addNewProduct1(product:any) {
      this.productObj = {
        p_id: product.p_id,
        p_name: product.p_name,
        p_cost: product.p_cost,
        image : this.imageUrl
      };
      this.http.post('http://localhost:3000/books/', this.productObj).subscribe(res => {
          this.isAdded = true;
          this.route.navigate(['/listbooks'])
        });
    };
    @ViewChild('productpic') productpic!: ElementRef;

    uploadProduct2(event:any){

    }

}
