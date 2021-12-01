import { Injectable } from '@angular/core';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {delay} from 'rxjs/operators';
import { NoteState } from '../../components/note-edit/note-edit.component';
import { Note } from '../../pages/notes/notes.page';

@Injectable({
  providedIn: 'root',
})
export class StorageService {
  //test
  private noteState: NoteState = {
    title: '',
    content: ''
  };
  notes: Note[] = [
    {
      id: '0',
      title: 'Dear diary..',
      content: 'Today i fucked up so much',
      date: new Date('01/02/2012')
    },
    {
      id: '2',
      title: 'Dear diary2..',
      content: 'Today i fucked up so muchchcasasc',
      date: new Date()
    },
    {
      id: '3',
      title: 'Dear diary2..',
      content: 'Today i fucked up so muchchcasasc',
      date: new Date('11/03/2012')
    }
  ];
  notesChanged$: BehaviorSubject<Note[]> = new BehaviorSubject<Note[]>(this.notes);

  constructor() {}

  getNotes(): Observable<Note[]> {
    return of(this.notes).pipe(delay(500));
  }

  addNote(note: NoteState) {
    this.notes.push(this.createNote(note));
  }

  createNote(noteState: NoteState): Note {
    return {
      id: this.setUUID(),
      title: noteState?.title,
      content: noteState?.content,
      date: new Date()
    };
  }

  deleteNotes() {
    this.notes = this.notes.filter(note => !note.selected);
    this.notesChanged$.next(this.notes);
  //  works, only had to refresh notes in Notes.html
  }

  getNoteState(): NoteState {
    return this.noteState;
  }

  setNoteState(noteState: NoteState): void {
    this.noteState = noteState;
  }

  clearNoteState(): void {
    this.noteState = {
      title: '',
      content: ''
    };
  }

  setUUID(): string {
    return Date.now().toString(36) + Math.random().toString(36).substr(2);
  }

  toggleNoteSelection(id: string, selected: boolean) {
    this.notes.map(note => {
      if(id === note.id) {
        note.selected = selected;
      }
      return note;
    });
    console.log(this.notes);
  }
}
