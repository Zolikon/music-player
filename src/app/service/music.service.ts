import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Observable, pipe } from "rxjs";

@Injectable({
    providedIn: "root"
})
export class MusicService {

    constructor(private httpClient: HttpClient) { }

    public listing(): Observable<AlbumListing> {
        return this.httpClient.get<AlbumListing>("../../assets/albums.json");
    }

    public loadAlbum(location: string): Observable<AlbumDefinition> {
        return this.httpClient.get<AlbumDefinition>(`../../assets/${location}/content.json`);
    }

}

export type AlbumListing = { albums: {title:string, location:string}[] };

export type AlbumDefinition = { title: string, location: string, songs: string[] };