import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  public words: any[] = [];
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
  }

  checkSpelling(spelling: String, index: number): void {
    console.log(spelling == this.words[index]);
  }

}
