const hearts = document.querySelector('.floating-hearts');
function spawnHeart(){const h=document.createElement('span');h.className='heart-particle';h.textContent=['♡','♥','✧','✿'][Math.floor(Math.random()*4)];h.style.left=Math.random()*100+'vw';h.style.fontSize=(12+Math.random()*20)+'px';h.style.animationDuration=(7+Math.random()*8)+'s';hearts.appendChild(h);setTimeout(()=>h.remove(),16000)}
for(let i=0;i<12;i++)setTimeout(spawnHeart,i*350);setInterval(spawnHeart,950);
const toast=document.getElementById('toast');let toastTimer;
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
document.getElementById('openSurprise').addEventListener('click',()=>{document.getElementById('note').scrollIntoView({behavior:'smooth'});showToast('You deserve all the love in the world ♡')});
document.getElementById('wishBtn').addEventListener('click',()=>{const m=document.getElementById('hiddenMessage');m.classList.add('show');m.scrollIntoView({behavior:'smooth',block:'center'});for(let i=0;i<35;i++)setTimeout(spawnHeart,i*70);document.getElementById('wishBtn').textContent='Wish sent to the universe ✨';});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('.photo img').forEach(img=>{img.addEventListener('error',()=>{img.style.display='none'});img.addEventListener('load',()=>{img.style.display='block'})});


// Interactive friendship-to-love mini movie
const storyScenes=[
{label:"SCENE 01 · THE BEGINNING",caption:"Two friends. A thousand little conversations. And the start of something neither of us needed to rush."},
{label:"SCENE 02 · THE LITTLE THINGS",caption:"The random talks, the silly jokes, the comfort of being ourselves — somehow, the ordinary became unforgettable."},
{label:"SCENE 03 · SOMETHING CHANGED",caption:"And somewhere between friendship and all those little moments, you started to mean a little more than words could say."},
{label:"SCENE 04 · MY FAVOURITE STORY",caption:"If I could choose a beginning again, I would still choose the friendship that brought me to you. Happy birthday, Ishita. ♡"}
];let currentScene=0;function setStoryScene(index){const frame=document.getElementById("cinemaFrame");if(!frame)return;currentScene=(index+storyScenes.length)%storyScenes.length;const scene=storyScenes[currentScene];document.getElementById("sceneLabel").textContent=scene.label;document.getElementById("sceneCaption").textContent=scene.caption;document.getElementById("sceneNumber").textContent=String(currentScene+1).padStart(2,"0");document.getElementById("filmProgress").style.width=((currentScene+1)/storyScenes.length*100)+"%";frame.classList.remove("scene-1","scene-2","scene-3","scene-change");if(currentScene>0)frame.classList.add("scene-"+currentScene);void frame.offsetWidth;frame.classList.add("scene-change");document.querySelectorAll(".chapter").forEach((btn,i)=>btn.classList.toggle("active",i===currentScene));}const nextSceneButton=document.getElementById("nextScene");if(nextSceneButton)nextSceneButton.addEventListener("click",()=>setStoryScene(currentScene+1));document.querySelectorAll(".chapter").forEach(btn=>btn.addEventListener("click",()=>setStoryScene(Number(btn.dataset.scene))));


// Birthday music: original romantic instrumental + a simple Happy Birthday melody.
// Audio starts only after the visitor taps a music control (browser autoplay policy).
const curtain = document.getElementById('birthdayCurtain');
const unwrapBtn = document.getElementById('unwrapBtn');
document.body.classList.add('locked');
if (unwrapBtn) unwrapBtn.addEventListener('click',()=>{
  curtain.classList.add('opening');
  document.body.classList.remove('locked');
  showToast('A little world made just for you, Ishita ♡');
  setTimeout(()=>{curtain?.remove();document.getElementById('home')?.scrollIntoView({behavior:'smooth'});},1250);
});
let audioCtx=null, musicTimer=null, musicIndex=0, musicKind=null, musicNodes=[];
const musicDock=document.getElementById('musicDock');
const musicTitle=document.getElementById('musicTitle');
const musicStatus=document.getElementById('musicStatus');
const noteIcon=document.getElementById('musicNoteIcon');
const romanticNotes=[
  [261.63,329.63,392.00,523.25],[293.66,369.99,440.00,587.33],
  [246.94,329.63,392.00,493.88],[220.00,293.66,349.23,440.00],
  [261.63,329.63,392.00,523.25],[196.00,261.63,329.63,392.00]
];
const birthdayNotes=[
  [392,392,440,392,523.25,493.88],
  [392,392,440,392,587.33,523.25],
  [392,392,783.99,659.25,523.25,493.88,440],
  [698.46,698.46,659.25,523.25,587.33,523.25]
];
function tone(freq,when,duration,kind='sine',volume=.055){
  if(!audioCtx)return;
  const osc=audioCtx.createOscillator(),gain=audioCtx.createGain();
  osc.type=kind;osc.frequency.setValueAtTime(freq,when);
  gain.gain.setValueAtTime(.0001,when);gain.gain.exponentialRampToValueAtTime(volume,when+.035);gain.gain.exponentialRampToValueAtTime(.0001,when+duration);
  osc.connect(gain);gain.connect(audioCtx.destination);osc.start(when);osc.stop(when+duration+.05);musicNodes.push(osc);
}
function playStep(){
  if(!audioCtx||!musicKind)return;
  const now=audioCtx.currentTime+.03;
  if(musicKind==='romantic'){
    const chord=romanticNotes[musicIndex%romanticNotes.length];
    chord.forEach((n,i)=>tone(n,now+i*.09,1.45,'sine',i===0?.027:.018));
    tone(chord[0]/2,now,.95,'triangle',.035);
    musicIndex++;
  }else{
    const flat=birthdayNotes.flat();
    const n=flat[musicIndex%flat.length];
    const long=[4,10,17,23].includes(musicIndex%flat.length)? .62:.34;
    tone(n,now,long,'triangle',.065);
    tone(n*2,now,.18,'sine',.012);
    musicIndex++;
  }
  if(musicIndex%8===0){
    const scenes=document.querySelectorAll('.chapter');
    if(scenes.length){const active=[...scenes].findIndex(x=>x.classList.contains('active'));setStoryScene((active+1+4)%4);}
  }
}
function stopMusic(){if(musicTimer){clearInterval(musicTimer);musicTimer=null;}musicKind=null;musicDock.classList.remove('playing');musicStatus.textContent='Paused — choose a track';document.querySelectorAll('.music-actions button').forEach(b=>b.classList.remove('active'));noteIcon.textContent='♫';}
async function startMusic(kind){
  try{
    const AC=window.AudioContext||window.webkitAudioContext;if(!AC){musicStatus.textContent='Audio not supported in this browser';return;}
    if(!audioCtx)audioCtx=new AC();if(audioCtx.state==='suspended')await audioCtx.resume();
    if(musicTimer)clearInterval(musicTimer);musicKind=kind;musicIndex=0;
    musicTitle.textContent=kind==='romantic'?'A melody for you':'Happy Birthday, Ishita!';
    musicStatus.textContent=kind==='romantic'?'Soft romantic instrumental':'Birthday melody playing';
    musicDock.classList.add('playing');document.querySelectorAll('.music-actions button').forEach(b=>b.classList.remove('active'));
    document.getElementById(kind==='romantic'?'romanticTrack':'birthdayTrack').classList.add('active');noteIcon.textContent=kind==='romantic'?'♫':'♪';
    playStep();musicTimer=setInterval(playStep,kind==='romantic'?1250:420);
  }catch(e){musicStatus.textContent='Tap again to enable audio';}
}
document.getElementById('romanticTrack')?.addEventListener('click',()=>startMusic('romantic'));
document.getElementById('birthdayTrack')?.addEventListener('click',()=>startMusic('birthday'));
document.getElementById('musicStop')?.addEventListener('click',stopMusic);
