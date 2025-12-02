import { Component, input, Output, EventEmitter, linkedSignal, computed } from '@angular/core';

@Component({
  selector: 'app-pagination',
  standalone: true,
  templateUrl: './pagination.html',
})
export class PaginationComponent {
  pages = input(0); // total de páginas
  currentPage = input<number>(1); // página inicial
  activePage = linkedSignal(this.currentPage);

  @Output() activePageChange = new EventEmitter<number>();

  getPagesList = computed(() => {
    const totalPages = this.pages();
    const current = this.activePage();
    const windowSize = 20;
    let start = Math.max(1, current - Math.floor(windowSize / 2));
    let end = start + windowSize - 1;
    if (end > totalPages) {
      end = totalPages;
      start = Math.max(1, end - windowSize + 1);
    }

    const pages: number[] = [];
    for (let i = start; i <= end; i++) {
      pages.push(i);
    }
    return pages;
  });

  previousPage() {
    if (this.activePage() > 1) {
      this.activePage.update(n => n - 1);
      this.activePageChange.emit(this.activePage());
    }
  }

  nextPage() {
    if (this.activePage() < this.pages()) {
      this.activePage.update(n => n + 1);
      this.activePageChange.emit(this.activePage());
    }
  }

  setPage(page: number) {
    this.activePage.set(page);
    this.activePageChange.emit(page);
  }
}
