import { Component, ViewChild, inject } from '@angular/core';
import { ReaderService } from './services/reader.service';
import { PDFViewerComponent, PDFViewerPageChangeEvent } from '@progress/kendo-angular-pdfviewer';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = ' elearning-platform';
  readerService = inject(ReaderService);
  pdfAssetUrl = '';
  toolbarOptions = this.readerService.toolbar;
  acceptTerms: boolean = false;
  @ViewChild('pdfViewer') pdfViewer!: PDFViewerComponent;

  bookName!: string;

  bookPage = 1;
  pageLimit = 2;
  showMessageWall = false;
  selectBook() {
    this.pdfAssetUrl = `${this.readerService.assetURL}${this.bookName}`;
  }

  activateDownload() {
    this.readerService.allowDownload(this.acceptTerms);
  }

  saveCurrentPage($event: PDFViewerPageChangeEvent) {
    const { currentPage } = $event;
    this.readerService.savePage(currentPage);
    this.canReadMore(currentPage);
  }

  loadPage() {
    this.bookPage = this.readerService.getPage();
    this.pdfViewer.scrollToPage(this.bookPage);
  }

  private canReadMore(currentPage: number) {
    if (currentPage > this.pageLimit) {
      this.pdfViewer.scrollToPage(this.pageLimit);
      this.showMessageWall = true;
    } else {
      this.showMessageWall = false;
    }
  }
}
