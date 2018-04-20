import {Component, Inject, OnInit} from '@angular/core';
import {MAT_DIALOG_DATA, MatDialogRef} from "@angular/material";
import {BnetService} from "../../../shared/services";

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {



  constructor(
    private bnetService: BnetService,
    private dialogRef: MatDialogRef<DetailsComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any
  ) { }




  ngOnInit() {
    this.bnetService.getSpecies(this.data)
      .subscribe(
        (response: any) => console.dir(response)
      )
  }




  onNoClick(): void {
    this.dialogRef.close();
  }

}
