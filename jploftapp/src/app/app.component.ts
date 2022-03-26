import { ChangeDetectorRef, Component, ElementRef, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AngularEditorConfig } from '@kolkov/angular-editor';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'jploftapp';
  public myform :FormGroup;
public submitted :boolean = false;
public formData :any =[]
  constructor(private fb: FormBuilder,   private cd: ChangeDetectorRef
  ) { 
   
    this.createForm({})
  }

  ngOnInit(): void {

  }
 /*########################## File Upload ########################*/
 @ViewChild('fileInput') el: ElementRef;
 imageUrl: any = 'https://i.pinimg.com/236x/d6/27/d9/d627d9cda385317de4812a4f7bd922e9--man--iron-man.jpg';
 editFile: boolean = true;
 removeUpload: boolean = false;

  
  createForm(tdata:any) {
    let data = {
      name: [tdata.name ? tdata.name : '', [Validators.required]],
      email: [tdata.email ? tdata.email : '', [Validators.required, Validators.email, Validators.pattern('^[a-z0-9._%+-]+@[a-z0-9.-]+\\.[a-z]{2,4}$')]],
      file: [null],
      gender: [tdata.gender ? tdata.gender : '', [Validators.required]],
      bio: [tdata.bio ? tdata.bio : '', [Validators.required]],


    };
    this.myform = this.fb.group(data);
    return
  }

  get f() { return this.myform.controls; }

  submitFormdata(){
    this.submitted = true;

    this.formData.push(this.myform.value)
    console.log(this.formData)

  }
  addmore(){
    this.submitted =false
    this.createForm({})
  }

  uploadFile(event:any) {
    let reader = new FileReader(); // HTML5 FileReader API
    let file = event.target.files[0];
    if (event.target.files && event.target.files[0]) {
      reader.readAsDataURL(file);

      // When file uploads set it to file formcontrol
      reader.onload = () => {
        this.imageUrl = reader.result;
        this.myform.patchValue({
          file: reader.result
        });
        this.editFile = false;
        this.removeUpload = true;
      }
      // ChangeDetectorRef since file is loading outside the zone
      this.cd.markForCheck();        
    }
  }


  htmlContent = '';

  config: AngularEditorConfig = {
    editable: true,
    spellcheck: true,
    height: '4rem',
    minHeight: '2rem',
    width:'320px',
    placeholder: 'Enter text here...',
    translate: 'no',
   
    defaultParagraphSeparator: 'p',
    defaultFontName: 'Arial',
    toolbarHiddenButtons: [
      ['bold']
      ],
    customClasses: [
      {
     
        name: "bio",
        class: "quote",
      },
      {
        name: 'bio',
        class: 'redText'
      },
      {
        name: "bio",
        class: "titleText",
        tag: "h1",
      },
    ]
  };
}

