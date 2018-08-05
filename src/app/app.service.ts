import {Injectable} from '@angular/core';
import {
  HttpClient, HttpEvent, HttpEventType, HttpProgressEvent,
  HttpRequest, HttpResponse, HttpErrorResponse
} from '@angular/common/http';
import { Config } from './config';

@Injectable()
export class AppService {
  private headers = {

  };
  private url = 'https://tts.voicetech.yandex.net/generate?';

  constructor(private http: HttpClient) {}

  public sendText(data) {
    return this.http.get(`${this.url}key=${Config.keyApi}&text=${data.text}&format=mp3&lang=${data.lang}&speaker=${data.speaker}`,
      {responseType: 'blob'})
      .pipe();
  }
}
