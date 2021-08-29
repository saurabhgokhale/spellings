import { Component, OnInit } from '@angular/core';

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

  public word: string = '';
  public charWidth = 5;
  public fontColor = "dodgerblue";
  public valueEntered = true;
  public totalWords = 5;
  public correctWords = 0;
  public wrongWords = 0;

  constructor() { }

  ngOnInit(): void {
    this.word = 'watermelon';
    this.charWidth = this.word.length * (1 + 0.5);
    let testObject = { 'one': ['one','two','three'], 'two': 2, 'three': 3 };

    // Put the object into storage
    localStorage.setItem('testObject', JSON.stringify(testObject));

    // Retrieve the object from storage
    let retrievedObject = localStorage.getItem('testObject');

    console.log('retrievedObject: ', JSON.parse(retrievedObject || '{}'));
  }

  onKey(spelling: string) {
    if(spelling.length > 0) this.valueEntered = false;
    else this.valueEntered = true;
  }

  checkSpelling(spelling: string, index: number): void {
    console.log(spelling == this.word);
    if(spelling === this.word) {
      this.fontColor = "green";
    }
    else {
      this.fontColor = "red";
    }
  }

}
