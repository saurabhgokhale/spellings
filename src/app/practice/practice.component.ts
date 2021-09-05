import { Component, OnInit, ViewChild } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import {Router, NavigationEnd,ActivatedRoute} from '@angular/router';

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
  private correctSet : any[] = [];
  private wrongSet: any[] = [];
  public spelling = '';


  constructor(private http: HttpClient,
              private router: Router, 
              private activatedRoute: ActivatedRoute) { }

  ngOnInit() {
    this.http.get('https://spellings-dcs.s3.ap-south-1.amazonaws.com/spelling.txt',{ responseType: 'text' as 'json'})
    .subscribe(
      data => {
        console.log(data);
        this.response = data;
        this.words = this.response.split(',');
        // Retrieve the object from storage

        if(localStorage.getItem('spellv1') == null) {
          let correctSet: any[] = [];
          let wrongSet: any[] = [];
          this.retrievedObject = { 'correct': correctSet, 'wrong': wrongSet, 'wordCount': 0, 'correctCount': 0, 'wrongCount': 0, 'index': 0};
          // Put the object into storage
          //this.setWithExpiry('spellv1', this.retrievedObject, 5000);
          localStorage.setItem('spellv1', JSON.stringify(this.retrievedObject));
        }
        this.retrievedObject = JSON.parse(localStorage.getItem('spellv1')|| '');
        console.log('retrievedObject: ', this.retrievedObject);
        this.totalWords = this.words.length;
        this.correctCount = this.retrievedObject['correct'].length;
        this.wrongCount = this.retrievedObject['wrong'].length;
        this.correctSet = this.retrievedObject['correct'];
        this.wrongSet = this.retrievedObject['wrong'];
        this.word = this.getNextWord(this.words, this.retrievedObject['wrong']);
        this.charWidth = this.word.length * (1 + 0.5);
        this.spelling = '';
    })
  }

  setWithExpiry(key: string, value: any, ttl: number) {
    const now = new Date()
  
    // `item` is an object which contains the original value
    // as well as the time when it's supposed to expire
    const item = {
      value: value,
      expiry: now.getTime() + ttl,
    }
    localStorage.setItem(key, JSON.stringify(item))
  }

  getWithExpiry(key: string) {
    const itemStr = localStorage.getItem(key)
    // if the item doesn't exist, return null
    if (!itemStr) {
      return null;
    }
    const item = JSON.parse(itemStr)
    const now = new Date()
    // compare the expiry time of the item with the current time
    if (now.getTime() > item.expiry) {
      // If the item is expired, delete the item from storage
      // and return null
      localStorage.removeItem(key)
      return null;
    }
    return item.value
  }

  onKey(spelling: string) {
    if(spelling.length > 0) this.valueEntered = false;
    else this.valueEntered = true;
  }

  checkSpelling(spelling: string) {
    console.log(spelling == this.word);
    let correctArr = this.retrievedObject['correct'];
    let wrongArr = this.retrievedObject['wrong'];
    if(spelling === this.word) {
      this.fontColor = "green";
      let i = wrongArr.indexOf(this.word);
      if( i >= 0) {
        wrongArr.splice(i, 1, this.word);
      }
      correctArr.push(this.word);
    }
    else {
      this.fontColor = "red";
      let i = correctArr.indexOf(this.word);
      if( i >= 0) {
        correctArr.splice(i, 1, this.word);
      }
      wrongArr.push(this.word);
    }
    this.retrievedObject['wrong'] = wrongArr;
    this.retrievedObject['correct'] = correctArr;
    this.correctCount = correctArr.length;
    this.wrongCount = wrongArr.length;

    localStorage.setItem('spellv1', JSON.stringify(this.retrievedObject));
  }

  nextWord(): any {
    //this.retrievedObject['index'] = this.index;
    localStorage.setItem('spellv1', JSON.stringify(this.retrievedObject));
    this.spelling = '';
    this.fontColor = "dodgerblue";
    this.word = this.getNextWord(this.words, this.retrievedObject['wrong']);
    this.charWidth = this.word.length * (1 + 0.5);
  }

  getNextWord(words: any[], wrongWords: Set<String> ) {
    this.retrievedObject = JSON.parse(localStorage.getItem('spellv1')|| '');
    let correctArr = this.retrievedObject['correct'];
    let wrongArr = this.retrievedObject['wrong'];
    let newWord = '';
    while(true) {
      let index = Math.floor(Math.random() * words.length);
      newWord = words[index];
      let i = correctArr.indexOf(newWord);
      let j = wrongArr.indexOf(newWord);
      if(i < 0 && j < 0) {
        break;
      }
    }
    return newWord;
  }
}
