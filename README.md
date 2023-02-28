# MusicPlayer

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 15.1.1.

## Setup
Under src/assets:

### Album listing
__albums.json__
```
{
    "albums": [
        {
            "title": "<title to display>",
            "location": "<*location>"
        },
        ...
        ]
}
```
_*location_ should be the folder inside the assets folder where the album is stored
 ### Album content
 Each album folder should contain a __content.json__ describing the album
 ```
 {
    "title": "<title to display>",
    "songs":[
      <each mp3 file listed>
      ...
      ]
 }
 ```
