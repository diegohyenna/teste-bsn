import { Component } from '@angular/core';

import { HomePage } from './pages/home/home.page';

@Component({
  selector: 'app-folder',
  templateUrl: './folder.page.html',
  styleUrls: ['./folder.page.scss'],
})
export class FolderPage {
  public folder!: string;

  component = HomePage;

  constructor() {}
}
