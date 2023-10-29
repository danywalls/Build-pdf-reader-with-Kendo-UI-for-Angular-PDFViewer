import { Injectable } from '@angular/core';
import { PDFViewerTool } from '@progress/kendo-angular-pdfviewer';

@Injectable({
  providedIn: 'root',
})
export class ReaderService {
  public assetURL = 'http://localhost:4200/assets/';

  private currentPage: number = 0; // Initialize with the default page
  private storageKey: string = 'book-page';

  public toolbar: PDFViewerTool[] = ['search', 'selection', 'print', 'pager'];
  savePage(page: number) {

    localStorage.setItem(this.storageKey, page.toString());
  }

  getPage() {
    const savedPage = localStorage.getItem(this.storageKey) || this.currentPage;

    return +savedPage;
  }

  allowDownload(acceptTerms: boolean) {
    if (acceptTerms) {
      this.toolbar.push('download');
    } else {
      this.toolbar.pop();
    }
  }
}
