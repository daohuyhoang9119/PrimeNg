import { Component } from '@angular/core';
import { MenuItem } from 'primeng/api';
import { DataService } from './data.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  public title = 'Angular12PrimeNg';
  public notes = null;
  public items: MenuItem[] = [];
  public selectedNote: any;
  constructor(private dataService: DataService) {}
  ngOnInit() {
    this.items = [
      { label: 'Home', icon: 'pi pi-fw pi-home' },
      { label: 'Calendar', icon: 'pi pi-fw pi-calendar' },
      { label: 'Edit', icon: 'pi pi-fw pi-pencil' },
      { label: 'Documentation', icon: 'pi pi-fw pi-file' },
      { label: 'Settings', icon: 'pi pi-fw pi-cog' },
    ];

    this.dataService.getNotes(1).subscribe((data) => {
      // let user = [...data];
      this.notes = data;
      console.log(this.notes);
    });
  }
  public editNote(note: any) {
    this.selectedNote = note;
  }
}
