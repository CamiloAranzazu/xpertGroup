import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatAutocompleteModule,
  MatButtonModule,
  MatButtonToggleModule,
  MatCheckboxModule,
  MatCommonModule,
  MatDatepickerModule,
  MatDialogModule,
  MatDividerModule,
  MatFormFieldModule,
  MatIconModule,
  MatInputModule,
  MatMenuModule,
  MatOptionModule,
  MatPaginatorModule,
  MatProgressSpinnerModule,
  MatPseudoCheckboxModule,
  MatSelectModule,
  MatSlideToggleModule,
  MatSnackBarModule,
  MatSortModule,
  MatTableModule,
  MatTooltipModule,
  MatStepperModule,
  MatBottomSheetModule,
  MatBadgeModule,
  MatExpansionModule
} from '@angular/material';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { RouterModule } from '@angular/router';
import { MatTabsModule } from '@angular/material/tabs';


const MAT_IMPORTS = [
  MatCommonModule,
  MatFormFieldModule,

  // Controls
  MatInputModule,
  MatSelectModule,
  MatCheckboxModule,
  MatExpansionModule,
  MatButtonToggleModule,
  MatSlideToggleModule,
  MatOptionModule,
  MatFormFieldModule,
  MatPseudoCheckboxModule,
  MatMenuModule,
  MatDatepickerModule,

  // Components
  MatDividerModule,
  MatTableModule,
  MatSortModule,
  MatPaginatorModule,
  MatDialogModule,
  MatButtonModule,
  MatIconModule,
  MatTooltipModule,

  // Utils
  MatAutocompleteModule,
  MatProgressSpinnerModule,
  MatSnackBarModule,
  DragDropModule,
  MatStepperModule,
  MatBottomSheetModule,
  MatTabsModule,
  MatBadgeModule,
];

@NgModule({
  declarations: [
  ],
  imports: [
    ...MAT_IMPORTS,
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule,
  ],
  exports: [
    ...MAT_IMPORTS,
  ]
})
export class SharedModule { }
