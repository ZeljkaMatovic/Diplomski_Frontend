import { Component, OnInit, Input, EventEmitter, Output, SimpleChanges } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { DiscountGroup } from 'src/app/entities/discounts/discounts'

@Component({
  selector: 'app-discount-modal',
  templateUrl: './discount-modal.component.html',
  styleUrls: ['./discount-modal.component.css']
})
export class DiscountModalComponent implements OnInit {
  @Input() discountGroup: DiscountGroup;
  @Output() newGroup: EventEmitter<DiscountGroup> = new EventEmitter<DiscountGroup>();
  btnString: string;
  discountForm: FormGroup;
  constructor() { 
    
  }

  ngOnChanges(changes: SimpleChanges){
    this.initForm();
    this.updateBtnString();
  }

  ngOnInit(): void {
    
    this.updateBtnString();
    this.initForm();
  }

  updateBtnString()
  {
    if(this.discountGroup.groupName == "")
    {
      this.btnString = "Create";
    }
    else
    {
      this.btnString = "Modify";
    }
  }

  initForm()
  {
    this.discountForm = new FormGroup({
      'groupName' : new FormControl(this.discountGroup.groupName, [Validators.required, Validators.minLength(3)]),
      'points' : new FormControl(this.discountGroup.minPoints, [Validators.min(0), Validators.required]),
      'percent' : new FormControl(this.discountGroup.discountPercentage, [Validators.min(0), Validators.max(100), Validators.required])
    });
  }

  modify() {
    this.newGroup.emit(new DiscountGroup(this.discountGroup.id, this.discountGroup.serviceId, this.discountForm.controls["groupName"].value, this.discountForm.controls["points"].value, this.discountForm.controls["percent"].value))
  };

}
