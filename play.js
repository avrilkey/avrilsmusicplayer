const background = document.querySelector('#background');
const thumbnail = document.querySelector('#thumbnail');
const song = document.querySelector('#song');
const songArtist = document.querySelector('.song-artist');
const songTitle = document.querySelector('.song-title');
const progressBar = document.querySelector('#progress-bar');
let pPause = document.querySelector('#play-pause');

var songIndex = 0;
var songs = ["https://cdn.glitch.com/8d90fb7c-d365-4065-9b8c-17b1b25ec8fc%2Ftellme.mp3?v=1585705284127",
        "https://cdn.glitch.com/8d90fb7c-d365-4065-9b8c-17b1b25ec8fc%2Fpressure.mp3?v=1585684268366",
        "https://cdn.glitch.com/8d90fb7c-d365-4065-9b8c-17b1b25ec8fc%2Ftaste.mp3?v=1585871588496"
    ],
    thumbnails = ["https://cdn.glitch.com/8d90fb7c-d365-4065-9b8c-17b1b25ec8fc%2Fgroove.png?v=1585705272817",
        "https://cdn.glitch.com/8d90fb7c-d365-4065-9b8c-17b1b25ec8fc%2Fallweknow.png?v=1585684240089",
        "https://cdn.glitch.com/8d90fb7c-d365-4065-9b8c-17b1b25ec8fc%2Fbubba.png?v=1585871611463"
    ],
    songTitles = ['Groove Theory <br>Tell Me',
        'Paramore <br> Pressure',
        'Kaytranada ft. VanJess  <br> Taste'
    ]; // added breaks to song title to seperate artist name and song


// here will give the pPause element a function based on playing a boolean value, if button is clicked change to pause
var playing = true;

function playPause() {
    if (playing) {
        const song = document.querySelector('#song'),
            thumbnail = document.querySelector('#thumbnail');

        pPause.src = "https://cdn.glitch.com/8d90fb7c-d365-4065-9b8c-17b1b25ec8fc%2Fpause.png?v=1585684223852"
        thumbnail.style.transform = "scale(1.15)";

        song.play();
        playing = false;
    } else {
        pPause.src = "https://cdn.glitch.com/8d90fb7c-d365-4065-9b8c-17b1b25ec8fc%2Fplay.png?v=1585684219629"
        thumbnail.style.transform = "scale(1)"

        song.pause();
        playing = true;

    }
}
// player will automatically play next song at the end of each audio object
song.addEventListener('ended', function() {
    nextSong();
});

// where somg index will be incremented, song thumbnail, imag background, etc.
function nextSong() {
    songIndex++;
    if (songIndex > 2) {
        songIndex = 0;
    };
    document.querySelector('#song').src = songs[songIndex]; //changes song/mp3
    document.querySelector('#thumbnail').src = thumbnails[songIndex]; //changes cover art with each song
    document.querySelector('#background').src = thumbnails[songIndex]; //change background with each song
    document.querySelector('.song-title').innerHTML = songTitles[songIndex]; // helps change song titles

    playing = true;
    playPause();
}

// where song index will be decremented
function previousSong() {
    songIndex--;
    if (songIndex < 0) {
        songIndex = 2; // the amount. range of songs in the database
    };
    document.querySelector('#song').src = songs[songIndex];
    document.querySelector('#thumbnail').src = thumbnails[songIndex];
    document.querySelector('#background').src = thumbnails[songIndex];
    document.querySelector('.song-title').innerHTML = songTitles[songIndex];


    playing = true;
    playPause();
}

// update progressBar.max to songs duration object, same for progressBar.value
function updateProgressValue() {
    progressBar.max = song.duration;
    progressBar.value = song.currentTime;
    document.querySelector('.currentTime').innerHTML = (formatTime(Math.floor(song.currentTime)));
    if (document.querySelector('.durationTime').innerHTML === "0:00") {
        document.querySelector('.durationTime').innerHTML = "0:00";
    } else {
        document.querySelector('.durationTime').innerHTML = (formatTime(Math.floor(song.duration)));
    }
};

//convert song.currentTime and song.durationTime into MM:SS format 
function formatTime(seconds) {
    let min = Math.floor((seconds / 60));
    let sec = Math.floor(seconds - (min * 60));
    if (sec < 10) {
        sec = `0${sec}`;
    };
    return `${min}:${sec}`;
};

// run updateProgressValue function every half second
setInterval(updateProgressValue, 500);

// function where progressBar.value is changed to slider
function changeProgressBar() {
    song.currentTime = progressBar.value;
};