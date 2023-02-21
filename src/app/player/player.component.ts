import { Component, ElementRef, Input, OnInit, ViewChild } from '@angular/core';
import { Title } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { AlbumDefinition, AlbumListing, MusicService } from '../service/music.service';

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent implements OnInit {

  public listing$: Observable<AlbumListing>;
  public currentAlbum: AlbumDefinition;
  public autoPlay: boolean = false;
  public playerAvailable: boolean = false;
  public isShuffle: boolean = false;

  private _currentSong: number;
  public set currentSong(value:number) {
    this._currentSong = value;
    this.titleService.setTitle(`Zolikon Music - ${this.currentAlbum.songs[this.currentSong]}`)
  }

  public get currentSong() {
    return this._currentSong;
  }

  
  private songsAlreadyPlayed:number[] = [];

  constructor(private musicService: MusicService, private titleService:Title) { }

  ngOnInit() {
    this.listing$ = this.musicService.listing();
  }

  public onAlbumSelected(location: string) {
    if(this.currentAlbum == undefined || location != this.currentAlbum.location) {
      this.musicService.loadAlbum(location)
      .subscribe(album => {
        this.currentAlbum = album;
        this.currentAlbum.location = location;
        this.currentSong = 0;
        this.playerAvailable = true;
        this.autoPlay = false;
      })
    }
  }

  public songAsSource() {
    return `../../assets/${this.currentAlbum.location}/${this.currentAlbum.songs[this.currentSong]}`;
  }

  public play(){
  
  }

  public toggleShuffle():void {
    this.isShuffle = !this.isShuffle;
  }

  public selectSong(songIndex: number) {
    this.currentSong = songIndex;
    this.autoPlay = true;
  }

  public formattedSongName(rawSongName: string): string {
    return rawSongName.replace(".mp3", "")
  }

  public pause(){
    
  }

  public songEnded(){
    this.nextSong();
  }

  public previousSong() {
    if (this.currentSong > 0) {
      this.currentSong -= 1;
    } else {
      this.currentSong = this.currentAlbum.songs.length - 1;
    }
    this.autoPlay = true;
  }

  public nextSong() {
    if(this.isShuffle) {
      this.currentSong = Math.floor(Math.random()*this.currentAlbum.songs.length);
    } else {
      if (this.currentSong < this.currentAlbum.songs.length - 1) {
        this.currentSong += 1;
      } else {
        this.currentSong = 0;
      }
    }
    this.autoPlay = true;
  }

}
