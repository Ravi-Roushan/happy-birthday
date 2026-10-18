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
