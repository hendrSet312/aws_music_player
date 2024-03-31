let songs = [
    {
        name : 'Three Little Birds',
        author : 'Bob Marley & The Wailers',
        audio_src : '../assets/song/Bob Marley & The Wailers - Three Little Birds.mp3',
        cover_src: '../assets/img/cover_1.jpg'
    },
    {
        name : 'Could You Be Loved',
        author : 'Bob Marley & The Wailers',
        audio_src : '../assets/song/Bob Marley & The Wailers - Could You Be Loved.mp3',
        cover_src:'../assets/img/cover_2.jpg'
    }
]

class musicPlayer{
    constructor(songs){
        this.songs = songs;
        this.metadata = {
            song_name : document.getElementById('song_name'),
            song_author : document.getElementById('song_author'),
            song_img : document.getElementById('visual_img')
        };
        
        this.controller = {
            slider : document.getElementById('audio_slider'),
            audio_source : document.getElementById('audio_source')
        };

        this.current_idx = 0;
        
        this.next_song = document.getElementById('next');
        this.prev_song = document.getElementById('previous');


        this.next_song.addEventListener('click',(e) =>{
            this.next(); 
        });
        
        this.prev_song.addEventListener('click',(e) =>{
            this.previous();
        });
    }

    setSong(){

        let {song_name,song_author,song_img} = this.metadata;
        let {slider,audio_source} = this.controller;

        let curr_song = songs[this.current_idx];

        audio_source.src = curr_song.audio_src;
        slider.load();
    
        while (song_img.firstChild){
            song_img.removeChild(song_img.firstChild);
        }
    
        let image = new Image(200,200);
        image.src = curr_song.cover_src;
    
        song_img.appendChild(image);
    
        song_name.textContent = curr_song.name;
        song_author.textContent = curr_song.author;
    
        this.controller.slider.addEventListener("ended", () => {
            slider.pause();
            this.next();
        })
    }

    next(){
        this.current_idx = (this.current_idx + 1) % this.songs.length;
        this.setSong();
    }

    previous(){
        this.current_idx = (this.current_idx - 1 + this.songs.length) % this.songs.length;
        this.setSong();
    }
}

let music_player_obj = new musicPlayer(songs);
music_player_obj.setSong();