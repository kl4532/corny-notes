import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { NotesPageRoutingModule } from './notes-routing.module';

import { NotesPage } from './notes.page';
import { NoteComponent } from '../../components/note/note.component';
import { NoteEditComponent } from '../../components/note-edit/note-edit.component';

@NgModule({
  imports: [CommonModule, FormsModule, IonicModule, NotesPageRoutingModule, ReactiveFormsModule],
  declarations: [NotesPage, NoteComponent, NoteEditComponent],
})
export class NotesPageModule {}
