import { Component, OnInit } from '@angular/core';
import { Http } from '@angular/http';
import { ActivatedRoute } from '@angular/router';
import { Router } from '@angular/router';
import { ToastService } from '../toast/toast.service';

export interface Itest {
  id: number;
  testName: string;
  pointsPossible: number;
  pointsReceived: number;
  percentage: number;
  grade: string;
}

@Component({
  selector: 'app-test-score',
  templateUrl: './test-score.component.html',
  styleUrls: ['./test-score.component.css']
})
export class TestScoreComponent implements OnInit {

  tests: Array<Itest> = [];
  constructor(
    private http: Http,
    private activatedRoute: ActivatedRoute,
    private router: Router,
    private toastService: ToastService
  ) { }

  async ngOnInit() {
    const tests = JSON.parse(localStorage.getItem('tests'));
    if (tests && tests.length > 0) {
      this.tests = tests;
    } else {
      this.tests = await this.loadtestsFromJson();
    }
  }
  deleteTest(index: number) {
    this.tests.splice(index, 1);
    this.saveToLocalStorage();
  }
async loadtestsFromJson() {
  const tests = await this.http.get('assets/tests.json').toPromise();
  return tests.json();
}
saveToLocalStorage() {
  localStorage.setItem('tests', JSON.stringify(this.tests));
}

addTest() {
  const contact: Itest = {
    id: null,
    testName: null,
    pointsPossible: null,
    pointsReceived: null,
    percentage: null,
    grade: null,
  };
  this.tests.unshift(this.tests);
  this.saveToLocalStorage();
}
}
