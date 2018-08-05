import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder } from '@angular/forms';
import {AppService} from './app.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [AppService]
})
export class AppComponent implements OnInit {
  public title = 'speach-generator';
  public formData = {
    lang: 'ru-RU',
    speaker: '',
    text: ''
  };
  public Form: FormGroup;
  public isWaitResponse = false;

  constructor(private fb: FormBuilder,
              private appService: AppService) {}

  public ngOnInit() {
    this.Form = this.fb.group(this.formData);
  }

  public sendRequest() {
    this.isWaitResponse = true;
    this.appService.sendText(this.formData)
      .subscribe((response) => {
        this.createAndPlayAudio(window.URL.createObjectURL(response));

      });
  }

  private createAndPlayAudio(url) {
    let audio = document.createElement('audio');
    audio.src = url;
    audio.play();
    const self = this;
    audio.addEventListener('ended', () => {
      audio = null;
      self.isWaitResponse = false;
    });
  }
}
