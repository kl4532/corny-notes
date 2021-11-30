import { Component, OnInit } from '@angular/core';
import {ModalController} from '@ionic/angular';
import {NoteEditComponent} from '../../components/note-edit/note-edit.component';
import { StorageService } from '../../services/services/storage.service';

export interface Note {
  id: string;
  title: string;
  content: string;
  date: Date;
  selected?: boolean;
}

@Component({
  selector: 'corny-notes-notes',
  templateUrl: './notes.page.html',
  styleUrls: ['./notes.page.scss'],
})
export class NotesPage implements OnInit {
  notes: Note[] = [];
  constructor(public storageSrv: StorageService,
              public modalController: ModalController) {}

  ngOnInit() {
    this.storageSrv.notesChanged$.subscribe((data: Note[]) => this.notes = data);
  }

  async addNew(title: string = '', content: string = '') {
    const modal = await this.modalController.create({
      component: NoteEditComponent,
      cssClass: 'my-custom-class',
      componentProps: {
        title,
        content,
      }
    });

    modal.onWillDismiss()
      .then((data) => {
        const note = this.storageSrv.getNoteState();
        if(!data.data && !(!note.content && !note.title)) {
          console.log('save', data);
          this.storageSrv.addNote(note);
        }
        this.storageSrv.clearNoteState();
      });
    return await modal.present();
  }

  toggleSelect(id: string, selected: boolean) {
    this.storageSrv.toggleNoteSelection(id, selected);
  }
}
