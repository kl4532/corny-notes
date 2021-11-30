import {
  AfterViewInit,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnDestroy,
  OnInit,
  Output,
} from '@angular/core';
import { fromEvent, Subscription, timer } from 'rxjs';
import { switchMap, takeUntil } from 'rxjs/operators';

@Component({
  selector: 'corny-notes-note',
  templateUrl: './note.component.html',
  styleUrls: ['./note.component.scss'],
})
export class NoteComponent implements OnInit, AfterViewInit, OnDestroy{
  @Input() title = '';
  @Input() content = '';
  @Input() date: Date = new Date();
  isSelected = false;
  @Output() selectionChanged = new EventEmitter<boolean>();
  selectNote = new Subscription();


    constructor(private el: ElementRef) {}

  ngOnDestroy(): void {
      this.selectNote.unsubscribe();
  }

  ngAfterViewInit() {
    const mouseUp$ = fromEvent(this.el.nativeElement.querySelector('ion-card'), 'mouseup');
    this.selectNote = fromEvent(this.el.nativeElement.querySelector('ion-card'), 'mousedown').pipe(
      switchMap(() => timer(500)
        .pipe(takeUntil(mouseUp$))
      )
    ).subscribe(() => this.toggleSelect());
  }

  ngOnInit() {}

  toggleSelect() {
    this.isSelected = !this.isSelected;
    this.selectionChanged.emit(this.isSelected);
  }
}
