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
  public totalWords = 5;
  public correctWords = 0;
  public wrongWords = 0;
  private response: any;

  constructor(private http: HttpClient) { }

  ngOnInit(): void {
    this.http.get('https://spellings-dcs.s3.ap-south-1.amazonaws.com/spelling.txt',{ responseType: 'text' as 'json'})
    .subscribe(
      data => {
        console.log(data);
        this.response = data;
        this.words = this.response.split(',');
    })
    this.word = 'watermelon';
    this.charWidth = this.word.length * (1 + 0.5);
    let spellObject = { 'correct': [], 'wrong': [], 'three': 3 };

    // Put the object into storage
    localStorage.setItem('spellObject', JSON.stringify(spellObject));

    // Retrieve the object from storage
    let retrievedObject = localStorage.getItem('spellObject');

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
