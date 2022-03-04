const previous_btn = document.querySelector('.previous-btn');
const play_btn = document.querySelector('.play-btn');
const pause_btn = document.querySelector('.pause-div');
const next_btn = document.querySelector('.next-btn');
const play_div = document.querySelector('.play-div');
const pause_div = document.querySelector('.pause-div');

play_btn.addEventListener('click', play_fun);
pause_btn.addEventListener('click', pause_fun);
previous_btn.addEventListener('click',previous_fun);
next_btn.addEventListener('click',next_fun);

let song_list = ['001 - Why Not Me - Enrique Iglesias.mp3','003 - Apologize - One Republic.mp3','008 - Just Give Me A Reason - Pink & Nate Ruess.mp3'];
let current_val = 0;
let current_song =  song_list[current_val];
var song_file = song_fun();


function song_fun() {
    current_song =  song_list[current_val];
    return new Audio(`mp3/${current_song}`)
}

function play_fun() {
    song_file.pause();
    switch_fun();
}

function pause_fun() {
    song_file.play();
    switch_fun();
}

function switch_fun() {
    play_div.classList.toggle('play-div-hide');
    pause_div.classList.toggle('pause-div-hide')
}

function previous_fun() {
    song_file.pause();
    if(current_val > 0 && current_val <= 2){
        current_val -= 1;
    }
    song_file = song_fun();
    song_file.play();
}

function next_fun() {
    song_file.pause();
    if(current_val >= 0 && current_val < 2){
        current_val += 1;
    }
    song_file = song_fun();
    song_file.play();
}

const file_input = document.getElementById('files');
file_input.addEventListener('change',pull_file)

function pull_file() {
    var file_input = document.getElementById('files');

    let files = file_input.files;
    let file;

    for (let i = 0; i < files.length; i++) {
        file = files[i];
    }
    let song = new Audio();
    song.play();
}
