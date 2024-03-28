import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Tutorial } from 'src/app/models/tutorial';
import { TutorialService } from 'src/app/services/tutorial.service';

@Component({
  selector: 'app-view-tutorial-front',
  templateUrl: './view-tutorial-front.component.html',
  styleUrls: ['./view-tutorial-front.component.css'],
})
export class ViewTutorialFrontComponent implements OnInit {
  eventList: Tutorial[] = [];
  currentPage: number = 1;
  totalEvents: number = 0;
  pageSize: number = 100;
  totalPages: number = 0;
  pages: number[] = [];

  categories!: any[];

  level: string = '';
  category: string = '';

  constructor(
    private router: Router,
    private tutorialService: TutorialService
  ) {}

  ngOnInit(): void {
    this.getEvents();
    this.tutorialService.getCategories().subscribe((data) => {
      this.categories = data;
    });
  }

  getEvents(): void {
    console.log(this.category);
    this.tutorialService
      .getEventsPaged(
        this.currentPage,
        this.pageSize,
        this.level == '' ? null : this.level,
        this.category == '' ? null : this.category
      )
      .subscribe((response) => {
        this.eventList = response.content;
        this.totalEvents = response.totalElements;
        this.totalPages = response.totalPages;
        this.pages = Array.from({ length: this.totalPages }, (_, i) => i + 1);
      });
  }

  changePage(page: number): void {
    this.currentPage = page;
    this.getEvents();
  }

  openModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.add('show');
      modal.style.display = 'block';
    }
  }

  closeModal() {
    const modal = document.getElementById('exampleModal');
    if (modal) {
      modal.classList.remove('show');
      modal.style.display = 'none';
    }
  }
}
