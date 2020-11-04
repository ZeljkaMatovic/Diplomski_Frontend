import { Component, OnInit, Input } from '@angular/core';
import { Branch } from 'src/app/entities/rentacar/rentacar'
import { FormGroup, FormControl } from '@angular/forms';
import { RentacarService } from 'src/app/services/rentacar/rentacar.service';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})
export class BranchesComponent implements OnInit {
  branches: Array<Branch>;
  modifiableBranch: Branch;
  userType: string;
  searchForm: FormGroup;
  id: number;
  constructor(private rentSer: RentacarService, private route: ActivatedRoute) {
    route.params.subscribe(params => {this.id = params['id']; });
   }

  ngOnInit(): void {
    
    this.userType = JSON.parse(localStorage.getItem("userType"));
    this.rentSer.getBranches(this.id).subscribe(
      (res) => {
        console.log(res);
        this.branches = res as Array<Branch>;
        this.modifiableBranch = this.branches[0];
      }
    )
    this.initForm();
  }

  initForm()
  {
    this.searchForm = new FormGroup({
      'bname': new FormControl(""),
      'bcity': new FormControl("")
    });
  }

  changeValue(br: Branch)
  {
    this.modifiableBranch = br;
  }

  search()
  {
    this.rentSer.searchBranches(this.id, this.searchForm.controls["baname"].value, this.searchForm.controls["bcity"].value).subscribe(
      (res) => {
        this.branches = res as Array<Branch>;
      },
      err => {

      }
    )
  }

  deleteBranch(branch: Branch)
  {
    var ind = 0;
    this.rentSer.deleteBranch(branch).subscribe(
      (res)=> {
        this.rentSer.getBranches(branch.rentacarID).subscribe(
          (res : any) => 
          {
            this.branches = res as Array<Branch>;
          },
          err => {

          }
        )
        alert("Success!");
      },
      err => {
        console.log(err);
      }
    );
  }

  modifyBranch(branch: Branch)
  {
    this.rentSer.editBranchInfo(branch).subscribe(
      (res : any) => {
        console.log(res);
        var index = 0;
        this.branches.forEach((b, i) => {
          if(b.id == res.branch.id)
          {
            index = i;
            return;
          }
        });
        this.branches[index] = res.branch;
      },
      (err) => {

      }
    )
  }

}
