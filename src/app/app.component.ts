import { Component } from '@angular/core';
import { MenuItem, MessageService } from 'primeng/api';
import { DataService } from './data.service';
import { Note } from './note.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService],
})
export class AppComponent {
  public title = 'Angular12PrimeNg';
  public notes: Note[] | undefined;
  public items: MenuItem[] = [];
  public selectedNote: Note | undefined;
  public newNote: Note | undefined;
  private authorId = 1;
  constructor(
    private dataService: DataService,
    private messageService: MessageService
  ) {}
  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' },
    ];
    //message popup

    this.dataService.getNotes(1).subscribe((data: Note[]) => {
      // let user = [...data];
      this.notes = data;
      // console.log(this.notes);
    });
  }
  public editNote(note: any) {
    this.selectedNote = note;
  }
  public getSelectedClass(note: Note): string {
    if (!this.selectedNote) {
      return '';
    }
    return this.selectedNote.id === note.id ? 'selected' : 'nonSelected';
  }

  public addNewNote(): void {
    console.log('new note');
    this.newNote = {
      id: 0,
      title: '',
      note: '',
      author: 'king',
      authorId: this.authorId,
    };
  }

  public cancelAddNote(): void {
    console.log('ok cancel');
    this.newNote = undefined;
    this.messageService.add({
      severity: 'info',
      summary: 'Thông báo',
      detail: 'Đã hủy',
    });
  }

  public saveAddNote(): void {
    console.log('save new note', this.newNote);
    if (!this.newNote) return;
    this.dataService.postNotes(this.newNote).subscribe((data) => {
      console.log('result:', data);
      this.notes?.push(data);
      this.newNote = undefined;
      this.messageService.add({
        severity: 'success',
        summary: 'Thông báo',
        detail: 'Đã thêm thành công',
      });
    });
  }
}
