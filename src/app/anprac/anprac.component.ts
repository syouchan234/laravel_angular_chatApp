import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

import { AuthService } from '../auth.service';

interface Todo {
  id: number;
  title: string;
  // 新しいプロパティを追加
  putTitle?: string; // 更新時のタイトル
}

@Component({
  selector: 'app-anprac',
  templateUrl: './anprac.component.html',
  styleUrls: ['./anprac.component.scss']
})
export class AnpracComponent implements OnInit {

  testText: string = "テストテキスト";
  todos: Todo[] = [];

  private apiUrl = 'http://localhost/api/toDos';

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar,
    private authService: AuthService,
  ) {}

  ngOnInit() {
    const token = this.authService.getToken();
    if (this.authService.isLoggedIn() && token) {
      const headers = {Authorization: `Bearer ${token}`};
      this.loadTodos(headers);
    } else {
      console.log('Not logged in or token not available');
    }
  }

  private loadTodos(headers: any) {
    this.http.get<Todo[]>(this.apiUrl, { headers }).subscribe(
      (data) => {
        this.todos = data;
      },
      (error) => this.handleRequestError(error, 'Failed to load todos:')
    );
  }

  updateBtn(updateNum: number) {
    const token = this.authService.getToken();
    const headers = {Authorization: `Bearer ${token}`};
    const putstatus = { title: this.todos[updateNum - 1].putTitle };
    this.http.put(`${this.apiUrl}/${updateNum}`, putstatus, { headers }).subscribe(
      () => {
        this.testText = '更新成功';
        this.showSnackBar('更新されました', 'success-snackbar');
        const token = this.authService.getToken();
        const headers = {
          Authorization: `Bearer ${token}`,
        };
        this.loadTodos(headers);
      },
      (error) => {
        console.error('Failed to update todo:', error);
        this.testText = '更新失敗';
        this.showSnackBar('更新が失敗しました', 'error-snackbar');
      }
    );
  }

  addTask() {
    // タスク追加処理
  }

  private showSnackBar(message: string, panelClass: string) {
    this._snackBar.open(message, '閉じる', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }

  private handleRequestError(error: any, logMessage: string) {
    console.error(`${logMessage} ${error}`);
  }
}
