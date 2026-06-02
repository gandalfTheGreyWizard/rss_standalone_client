import { output, Component, inject } from '@angular/core';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIcon, MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { FormGroup, FormControl, ReactiveFormsModule, FormBuilder } from '@angular/forms';
import { MatButton } from '@angular/material/button';
import { MatTooltip } from '@angular/material/tooltip';
import { MatDialogRef, MatDialogClose, MatDialogContent, MatDialogActions, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { RssFeeds } from '../../rss-feeds/rss-feeds';

@Component({
  selector: 'app-modal-container',
  imports: [
    MatFormFieldModule,
    MatIconModule,
    MatInputModule,
    MatButton,
    MatTooltip,
    ReactiveFormsModule,
    MatDialogContent,
    MatDialogActions
  ],
  templateUrl: './modal-container.html',
  styleUrl: './modal-container.scss'
})
export class ModalContainer {
  formData = inject(MAT_DIALOG_DATA);
  dialogRef = inject(MatDialogRef<RssFeeds>);
  feedAdditionForm = new FormGroup({
    feedName: new FormControl(''),
    feedUrl: new FormControl(''),
  });

  printUrl() {
    this.dialogRef.close(this.feedAdditionForm.value);
  }
}
