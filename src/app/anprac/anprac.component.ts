import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-anprac',
  templateUrl: './anprac.component.html',
  styleUrls: ['./anprac.component.scss']
})
export class AnpracComponent implements OnInit {

  testText: string = "テストテキスト";
  putTitle: string = "";
  todos: any[] = [];
  taskChecked: boolean = true;

  constructor(
    private http: HttpClient,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadTodos();
  }

  // データの初期化を行うメソッド
  private loadTodos() {
    this.http.get('http://localhost/api/toDos').subscribe(
      (data: any) => {
        this.todos = data;
      },
      (error) => {
        console.error('Failed to load todos:', error);
        // エラーメッセージを表示するなどの処理を追加できます
      }
    );
  }

  updateBtn(updateNum: number, putTitle: string) {
    const putstatus = { title: putTitle };
    this.http.put('http://localhost/api/toDos/' + updateNum, putstatus).subscribe(
      () => {
        this.testText = "更新成功";
        this.showSnackBar('更新されました', 'success-snackbar');
        this.loadTodos(); // 更新結果を反映
      },
      (error) => {
        console.error('Failed to update todo:', error);
        this.testText = "更新失敗";
        this.showSnackBar('更新が失敗しました', 'error-snackbar');
      }
    );
  }

  private showSnackBar(message: string, panelClass: string) {
    this._snackBar.open(message, '閉じる', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
      panelClass: [panelClass],
    });
  }
}
