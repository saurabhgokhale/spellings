import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-practice',
  templateUrl: './practice.component.html',
  styleUrls: ['./practice.component.css']
})
/*
Example copied from:
https://www.csscodelab.com/css-input-field-underline-under-each-character/
*/
export class PracticeComponent implements OnInit {

  public words: any[] = [];
  public word: string = '';
  public charWidth = 5;
  public fontColor = "dodgerblue";
  public valueEntered = true;
  public totalWords = 0;
  public correctCount = 0;
  public wrongCount = 0;
  private response: any;
  private retrievedObject: any;
  private index = 0;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://spellings-dcs.s3.ap-south-1.amazonaws.com/spelling.txt',{ responseType: 'text' as 'json'})
    .subscribe(
      data => {
        console.log(data);
        this.response = data;
        this.words = this.response.split(',');

        // Retrieve the object from storage
        if(localStorage.getItem('spellObject') == null) {
          this.retrievedObject = { 'correct': [], 'wrong': [], 'wordCount': 0, 'correctCount': 0, 'wrongCount': 0};
          // Put the object into storage
          localStorage.setItem('spellObject', JSON.stringify(this.retrievedObject));
        }
        this.retrievedObject = JSON.parse(localStorage.getItem('spellObject')|| '');
        console.log('retrievedObject: ', this.retrievedObject);
        this.totalWords = this.words.length;
        this.index = this.retrievedObject['wordCount'];
        console.log("index: " + this.index);
        this.word = this.words[this.index]; //'watermelon';
        this.charWidth = this.word.length * (1 + 0.5);

    })
  }

  onKey(spelling: string) {
    if(spelling.length > 0) this.valueEntered = false;
    else this.valueEntered = true;
  }

  checkSpelling(spelling: string): void {
    console.log(spelling == this.word);
    if(spelling === this.word) {
      this.fontColor = "green";
      this.retrievedObject['correct'].push(this.word);
      this.retrievedObject['correctCount'] = this.retrievedObject['correctCount'] + 1;
      this.correctCount++;
    }
    else {
      this.fontColor = "red";
      this.retrievedObject['wrong'].push(this.word);
      this.retrievedObject['wrongCount'] = this.retrievedObject['wrongCount'] + 1;
      this.wrongCount++;
    }
    this.index++;
    this.retrievedObject['wordCount'] = this.retrievedObject['wordCount'] + 1;
    localStorage.setItem('spellObject', JSON.stringify(this.retrievedObject));
  }

  nextWord(): void {
    this.word = this.words[this.index];
    this.charWidth = this.word.length * (1 + 0.5);
  }  

}
