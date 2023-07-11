import {Component, Inject} from '@angular/core';
import {MAT_DIALOG_DATA} from "@angular/material/dialog";
import {Plan} from "../../shared/types";

@Component({
  selector: 'app-plan-register-dialog',
  templateUrl: './plan-register-dialog.component.html',
  styleUrls: ['./plan-register-dialog.component.scss']
})
export class PlanRegisterDialogComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: Plan) {
  }
}
