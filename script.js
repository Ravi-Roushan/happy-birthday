const hearts = document.querySelector('.floating-hearts');
function spawnHeart(){const h=document.createElement('span');h.className='heart-particle';h.textContent=['♡','♥','✧','✿'][Math.floor(Math.random()*4)];h.style.left=Math.random()*100+'vw';h.style.fontSize=(12+Math.random()*20)+'px';h.style.animationDuration=(7+Math.random()*8)+'s';hearts.appendChild(h);setTimeout(()=>h.remove(),16000)}
for(let i=0;i<12;i++)setTimeout(spawnHeart,i*350);setInterval(spawnHeart,950);
const toast=document.getElementById('toast');let toastTimer;
function showToast(msg){toast.textContent=msg;toast.classList.add('show');clearTimeout(toastTimer);toastTimer=setTimeout(()=>toast.classList.remove('show'),2600)}
document.getElementById('openSurprise').addEventListener('click',()=>{document.getElementById('note').scrollIntoView({behavior:'smooth'});showToast('You deserve all the love in the world ♡')});
document.getElementById('wishBtn').addEventListener('click',()=>{const m=document.getElementById('hiddenMessage');m.classList.add('show');m.scrollIntoView({behavior:'smooth',block:'center'});for(let i=0;i<35;i++)setTimeout(spawnHeart,i*70);document.getElementById('wishBtn').textContent='Wish sent to the universe ✨';});
const observer=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add('visible');observer.unobserve(e.target)}}),{threshold:.12});document.querySelectorAll('.reveal').forEach(el=>observer.observe(el));
document.querySelectorAll('.photo img').forEach(img=>{img.addEventListener('error',()=>{img.style.display='none'});img.addEventListener('load',()=>{img.style.display='block'})});
