const piano_btns = document.querySelector('.piano-btns');
const key_code_span = document.querySelector('.key-code')
const save_btn = document.getElementById('save-btn');
const song_key_node = document.querySelector('.song-key-node');

document.addEventListener('keydown',function(e){ keybord_key(e) })
save_btn.addEventListener('click',save_song_key);
song_key_node.addEventListener('click',function(e){ play_node_song(e) })

const song_arr = ["C4","D4","E4","F4","G4","A4","B4","C5"]
const key_down = {"a":"C4","s":"D4","d":"E4","f":"F4","j":"G4","k":"A4","l":"B4",";":"C5"}
let btn_keys = [];
let all_save_key = {};
let key_save = 1;
let key_code_marking = [];

for (const key of piano_btns.children) {
    btn_keys.push(key);
}

btn_keys.map(function(btn,i){
    let key_song = new Audio(`keys/${song_arr[i]}.mp3`)
    btn.addEventListener('click',function() { key_song.play(); add_code(song_arr[i]); }) 
});

function keybord_key(e) {
    if(key_down[e.key] == undefined){
        console.log(e.key+" is not include")
    }else{
        let key_song = new Audio(`keys/${key_down[e.key]}.mp3`)
        key_song.play();   
        let btn = document.getElementById(`${key_down[e.key]}`)
        btn.style.backgroundColor = 'rgb(27, 27, 27)';
        btn.style.color = 'white';
        setTimeout(function(){
            btn.style.backgroundColor = 'white';
            btn.style.color = 'black';
        },200)
        add_code(key_down[e.key])
    }
}

function add_code(key_code) {
    key_code_span.innerHTML += key_code+" ";
    key_code_marking.push(key_code)
}

function create_song(key) {
    let song = new Audio(`keys/${key}.mp3`)
    song.play();
}

function play_code(song_arr,delay = 500) {
    let x = delay;
    song_arr.map(key => {
        setTimeout(create_song,x,key);
        x += delay;
    });
}

function save_song_key() {
    if(key_code_marking != ""){
        all_save_key[key_save] = key_code_marking;
        create_songkey_node(key_code_marking,key_save);
        key_code_marking = [];
        key_code_span.innerHTML = "";
        key_save += 1;
    }
}

function create_songkey_node(node,id) {
    song_key_node.innerHTML += `
    <div class="key-node-div">
        <div class="keys-board">
            <span class="key-code">${node}</span>
        </div>
        <button class="key-button play-btn" id="${id}">Play</button>
    </div>
    `;
}

function play_node_song(e) {
    let tar = e.target;
    if(tar.id != ""){
        play_code(all_save_key[tar.id])
    }
}
