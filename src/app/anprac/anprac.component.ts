import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-anprac',
  templateUrl: './anprac.component.html',
  styleUrls: ['./anprac.component.scss']
})
export class AnpracComponent{

  todos: any[] = [];

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.http.get('http://localhost/api/toDos').subscribe((data: any) => {
      this.todos = data;
    });
    console.log(this.todos);
  }
}
