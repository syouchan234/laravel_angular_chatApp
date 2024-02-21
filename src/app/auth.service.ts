import { Injectable } from '@angular/core';

import { HttpClient } from '@angular/common/http';

import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private loggedIn = false;
  private token: string | null = null;

  constructor(
    private http: HttpClient,
    private router: Router) {}

  login(email: string, password: string) {
    // ログインAPIにリクエストを送信
    this.http.post<any>('http://localhost/api/login', { email, password })
      .subscribe(response => {
        // レスポンスからトークンを取得
        this.token = response.token;
        this.loggedIn = true;
        this.router.navigate(['home']);
      });
  }

  logout() {
    const headers = { Authorization: 'Bearer ' + this.token };
    // ログアウトAPIにリクエストを送信
    this.http.post('http://localhost/api/logout', { token: this.token }, { headers })
      .subscribe(
        response => {
          // サーバーからの応答を受け取ったら、トークンをクリアする
          this.clearToken();
          this.router.navigate(['/']);
          // ログアウト後のリダイレクトなどを行う
          // 例: this.router.navigate(['/login']);
        },
        error => {
          console.error('ログアウトエラー:', error);
        }
      );
  }

  isLoggedIn(): boolean {
    return this.loggedIn;
  }

  getToken(): string | null {
    return this.token;
  }

  // トークンをクリアするメソッドの追加
  clearToken() {
    this.token = null;
    this.loggedIn = false;
  }
}
