import {
  AfterViewInit,
  Component,
  ElementRef,
  Input,
  OnDestroy,
  OnInit,
  QueryList,
  ViewChild,
  ViewChildren
} from '@angular/core';
import {ModalController} from "@ionic/angular";
import {fromEvent, merge, Subscriber, Subscription} from "rxjs";
import {debounce, debounceTime, tap} from "rxjs/operators";
import {FormControl, FormGroup} from "@angular/forms";
import { StorageService } from '../../services/services/storage.service';
export interface NoteState {
  title: string;
  content: string;
}

@Component({
  selector: 'corny-notes-note-edit',
  templateUrl: './note-edit.component.html',
  styleUrls: ['./note-edit.component.scss']
})
export class NoteEditComponent implements OnInit, OnDestroy{
  @Input() title = '';
  @Input() content = '';

  sub = new Subscription();
  noteState: NoteState | undefined;
  noteForm = new FormGroup({});
  viewReady = false;

  constructor(private modalController: ModalController,
              private storageSrv: StorageService) {}


  ngOnInit(): void {
    // workaround for https://github.com/ionic-team/ionic-framework/issues/21242
    setTimeout(()=> this.viewReady = true, 200);

    this.noteForm = new FormGroup({
      title: new FormControl(this.title),
      content: new FormControl(this.content)
    })
    console.log(this.noteForm);

    this.sub = this.noteForm.valueChanges.pipe(
      debounceTime(200),
      tap(() => {
        this.noteState = {
          title: this.noteForm.get('title')?.value,
          content: this.noteForm.get('content')?.value
        };
        this.storageSrv.setNoteState(this.noteState);
      })
    ).subscribe();
  }

  close(dontSave: boolean) {
    this.modalController.dismiss(dontSave);
  }

  ngOnDestroy(): void {
    this.sub.unsubscribe();
  }
}
