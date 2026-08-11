/*==================================================
  Luxury Wedding Invitation V3
  Mahmoud ❤️ Nourhan
==================================================*/
// Always start at the top when the invitation is opened or reloaded.
if ("scrollRestoration" in history) history.scrollRestoration = "manual";
function forceStartAtTop(){ window.scrollTo(0,0); document.documentElement.scrollTop=0; document.body.scrollTop=0; }
window.addEventListener("DOMContentLoaded", forceStartAtTop);
window.addEventListener("load", forceStartAtTop);
window.addEventListener("pageshow", forceStartAtTop);
if (window.location.hash) { history.replaceState(null, "", window.location.pathname + window.location.search); forceStartAtTop(); }
const intro=document.getElementById("intro");
const card=document.getElementById("glassCard");
const openBtn=document.getElementById("openInvitation");

const music=document.getElementById("music");
const musicBtn=document.getElementById("musicToggle");

const heroBg=document.querySelector(".hero-bg");

const topBtn=document.getElementById("topBtn");

document.documentElement.style.overflow="hidden";
document.body.style.overflow="hidden";

/*==========================
Fade In Music
==========================*/

function fadeInMusic(){

music.volume=0;

music.play().catch(()=>{});

let volume=0;

const fade=setInterval(()=>{

volume+=0.05;

if(volume>=1){

volume=1;

clearInterval(fade);

}

music.volume=volume;

},120);

}

/*==========================
Intro Animation
==========================*/

openBtn.addEventListener("click",()=>{

card.classList.add("flip");

setTimeout(()=>{

intro.classList.add("hide");

document.documentElement.style.overflow="";
document.body.style.overflow="";

fadeInMusic();

},900);

});

/*==========================
Music Button
==========================*/

musicBtn.addEventListener("click",()=>{

if(music.paused){

fadeInMusic();

musicBtn.innerHTML="🎵";

}else{

music.pause();

musicBtn.innerHTML="🔇";

}

});

/*==========================
Countdown
==========================*/

const weddingDate=new Date("2026-08-28T20:00:00").getTime();

function updateCountdown(){

const now=new Date().getTime();

const distance=weddingDate-now;

if(distance<0){

document.getElementById("countdown").innerHTML="<h2>🎉 بدأ الحفل</h2>";

return;

}

const days=Math.floor(distance/(1000*60*60*24));

const hours=Math.floor((distance%(1000*60*60*24))/(1000*60*60));

const minutes=Math.floor((distance%(1000*60*60))/(1000*60));

const seconds=Math.floor((distance%(1000*60))/1000);

animateNumber("days",days);

animateNumber("hours",hours);

animateNumber("minutes",minutes);

animateNumber("seconds",seconds);

}

setInterval(updateCountdown,1000);

updateCountdown();

function animateNumber(id,value){

const el=document.getElementById(id);

if(el.innerText!=value){

el.animate([

{

transform:"translateY(-12px)",

opacity:.2

},

{

transform:"translateY(0)",

opacity:1

}

],{

duration:350

});

el.innerText=value;

}

}

/*==========================
Scroll To Top
==========================*/

window.addEventListener("scroll",()=>{

if(scrollY>500){

topBtn.classList.add("show");

}else{

topBtn.classList.remove("show");

}

});

topBtn.onclick=()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};
/*====================================
PARALLAX
====================================*/

let lastScroll=0;

window.addEventListener("scroll",()=>{

lastScroll=window.pageYOffset;

requestAnimationFrame(()=>{

heroBg.style.transform=

`translateY(${lastScroll*0.35}px) scale(1.15)`;

});

});

/*====================================
Reveal Animation
====================================*/

const observer=new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.classList.add("show");

}

});

},{

threshold:.15

});

document.querySelectorAll(

".glass-section,.luxury-card,.section-title,.section-subtitle"

).forEach(el=>{

el.classList.add("fade-up");

observer.observe(el);

});

/*====================================
Cursor Glow
====================================*/

const glow=document.createElement("div");

glow.className="cursor-glow";

document.body.appendChild(glow);

window.addEventListener("mousemove",(e)=>{

glow.style.left=e.clientX+"px";

glow.style.top=e.clientY+"px";

});

function createHeart(){

const heart=document.createElement("div");

heart.className="floating-heart";

heart.innerHTML="❤️"; // أو ❤️ أو 🤍 أو 💛

heart.style.left=Math.random()*100+"vw";

heart.style.fontSize=(12+Math.random()*22)+"px";

heart.style.animationDuration=(6+Math.random()*6)+"s";

document.body.appendChild(heart);

setTimeout(()=>{

heart.remove();

},12000);

}

setInterval(createHeart,450);/*====================================
Floating Particles
====================================*/

function createParticle(){

const p=document.createElement("div");

p.className="particle";

p.style.left=Math.random()*100+"vw";

p.style.width=(4+Math.random()*5)+"px";

p.style.height=p.style.width;

p.style.animationDuration=

(8+Math.random()*6)+"s";

document.body.appendChild(p);

setTimeout(()=>{

p.remove();

},14000);

}

setInterval(createParticle,550);

/*====================================
Tilt Cards
====================================*/

document.querySelectorAll(".luxury-card").forEach(card=>{

card.addEventListener("mousemove",(e)=>{

const rect=card.getBoundingClientRect();

const x=e.clientX-rect.left;

const y=e.clientY-rect.top;

const rotateY=((x/rect.width)-0.5)*10;

const rotateX=((y/rect.height)-0.5)*-10;

card.style.transform=

`perspective(900px)
rotateX(${rotateX}deg)
rotateY(${rotateY}deg)
translateY(-10px)`;

});

card.addEventListener("mouseleave",()=>{

card.style.transform="";

});

});

/*====================================
Ripple Effect
====================================*/

document.querySelectorAll(

".luxury-btn,#openInvitation,.portfolio-btn"

).forEach(button=>{

button.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.position="absolute";

ripple.style.borderRadius="50%";

ripple.style.background="rgba(255,255,255,.5)";

ripple.style.left=(e.clientX-rect.left-size/2)+"px";

ripple.style.top=(e.clientY-rect.top-size/2)+"px";

ripple.style.transform="scale(0)";

ripple.style.pointerEvents="none";

ripple.style.transition=".6s";

this.appendChild(ripple);

requestAnimationFrame(()=>{

ripple.style.transform="scale(4)";

ripple.style.opacity="0";

});

setTimeout(()=>{

ripple.remove();

},650);

});

});

/*====================================
Performance
====================================*/

let ticking=false;

window.addEventListener("scroll",()=>{

if(!ticking){

requestAnimationFrame(()=>{

ticking=false;

});

ticking=true;

}

});

/*====================================
Disable Right Click (Optional)
====================================*/

// document.addEventListener("contextmenu",e=>e.preventDefault());

/*====================================
END
====================================*/

console.log(
"%cLuxury Wedding Invitation Loaded",
"color:#d4af37;font-size:18px;font-weight:bold;"
);


/* ================= Guest Wishes & Voice Notes =================
   Firebase-ready:
   1) Create a Firebase project.
   2) Add a Web App.
   3) Enable Firestore Database + Storage.
   4) Paste firebaseConfig below.
   Until configured, written wishes are stored locally in the browser.
*/
(() => {
  const FIREBASE_CONFIG = window.WEDDING_FIREBASE_CONFIG || null;
  const LOCAL_KEY = "mahmoud_nourhan_guest_wishes_v1";
  const MAX_RECORDING_MS = 60000;

  const $ = (s) => document.querySelector(s);
  const tabs = document.querySelectorAll("[data-wish-tab]");
  const panels = document.querySelectorAll("[data-wish-panel]");
  const wishForm = $("#wishForm");
  const wishName = $("#wishName");
  const wishMessage = $("#wishMessage");
  const wishStatus = $("#wishStatus");
  const wishesList = $("#wishesList");
  const wishCount = $("#wishCount");

  const voiceName = $("#voiceName");
  const startBtn = $("#startRecording");
  const stopBtn = $("#stopRecording");
  const sendVoiceBtn = $("#sendVoice");
  const voicePreview = $("#voicePreview");
  const voiceStatus = $("#voiceStatus");
  const timer = $("#recordingTimer");

  let mediaRecorder = null;
  let chunks = [];
  let voiceBlob = null;
  let timerInterval = null;
  let startedAt = 0;

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.querySelector(`[data-wish-panel="${tab.dataset.wishTab}"]`);
      if (panel) panel.classList.add("active");
    });
  });

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[ch]));
  }

  function loadLocal() {
    try { return JSON.parse(localStorage.getItem(LOCAL_KEY) || "[]"); }
    catch { return []; }
  }

  function saveLocal(items) {
    localStorage.setItem(LOCAL_KEY, JSON.stringify(items));
  }

  function render(items) {
    wishCount.textContent = items.length;
    if (!items.length) {
      wishesList.innerHTML = '<div class="empty-wishes">لسه أول تهنئة... كن أول من يشارك فرحتنا ❤️</div>';
      return;
    }
    wishesList.innerHTML = items.slice().reverse().map(item => {
      const date = item.createdAt ? new Date(item.createdAt).toLocaleString("ar-EG") : "";
      if (item.type === "voice") {
        return `<article class="wish-card voice-card">
          <div class="wish-author">🎙️ ${escapeHtml(item.name)}</div>
          <audio controls preload="none" src="${escapeHtml(item.url)}"></audio>
          <div class="wish-date">${escapeHtml(date)}</div>
        </article>`;
      }
      return `<article class="wish-card">
        <div class="wish-author">💌 ${escapeHtml(item.name)}</div>
        <div class="wish-message">${escapeHtml(item.message)}</div>
        <div class="wish-date">${escapeHtml(date)}</div>
      </article>`;
    }).join("");
  }

  render(loadLocal());

  wishForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const name = wishName.value.trim();
    const message = wishMessage.value.trim();
    if (!name || !message) return;

    // Local fallback. Replace this section with Firestore write when configured.
    const items = loadLocal();
    items.push({ type:"text", name, message, createdAt: new Date().toISOString() });
    saveLocal(items);
    render(items);

    wishForm.reset();
    wishStatus.textContent = "تم تسجيل تهنئتك ❤️";
    setTimeout(() => wishStatus.textContent = "", 3000);
  });

  function setTimer(ms) {
    const total = Math.floor(ms / 1000);
    const min = String(Math.floor(total / 60)).padStart(2, "0");
    const sec = String(total % 60).padStart(2, "0");
    timer.textContent = `${min}:${sec}`;
  }

  startBtn?.addEventListener("click", async () => {
    try {
      if (!navigator.mediaDevices?.getUserMedia) {
        voiceStatus.textContent = "المتصفح لا يدعم التسجيل الصوتي.";
        return;
      }
      const stream = await navigator.mediaDevices.getUserMedia({ audio:true });
      chunks = [];
      voiceBlob = null;
      voicePreview.hidden = true;
      sendVoiceBtn.disabled = true;

      const mime = MediaRecorder.isTypeSupported("audio/webm;codecs=opus")
        ? "audio/webm;codecs=opus"
        : "audio/webm";
      mediaRecorder = new MediaRecorder(stream, { mimeType:mime });
      startedAt = Date.now();
      setTimer(0);

      mediaRecorder.ondataavailable = e => { if (e.data.size) chunks.push(e.data); };
      mediaRecorder.onstop = () => {
        stream.getTracks().forEach(t => t.stop());
        voiceBlob = new Blob(chunks, { type: mime });
        voicePreview.src = URL.createObjectURL(voiceBlob);
        voicePreview.hidden = false;
        sendVoiceBtn.disabled = false;
      };

      mediaRecorder.start();
      startBtn.disabled = true;
      stopBtn.disabled = false;
      voiceStatus.textContent = "جاري التسجيل...";

      timerInterval = setInterval(() => {
        const elapsed = Date.now() - startedAt;
        setTimer(elapsed);
        if (elapsed >= MAX_RECORDING_MS) stopBtn.click();
      }, 250);
    } catch (err) {
      voiceStatus.textContent = "لم يتم السماح باستخدام الميكروفون.";
    }
  });

  stopBtn?.addEventListener("click", () => {
    if (!mediaRecorder || mediaRecorder.state === "inactive") return;
    clearInterval(timerInterval);
    mediaRecorder.stop();
    startBtn.disabled = false;
    stopBtn.disabled = true;
    voiceStatus.textContent = "تم تجهيز التسجيل، اسمعه قبل الإرسال.";
  });

  sendVoiceBtn?.addEventListener("click", () => {
    const name = voiceName.value.trim();
    if (!name || !voiceBlob) {
      voiceStatus.textContent = "اكتب اسمك واختَر تسجيلًا أولًا.";
      return;
    }

    // Browser-only fallback: object URLs don't survive refresh.
    // Firebase Storage is required for permanent public voice notes.
    const url = URL.createObjectURL(voiceBlob);
    const items = loadLocal();
    items.push({ type:"voice", name, url, createdAt:new Date().toISOString() });
    saveLocal(items);
    render(items);

    voiceName.value = "";
    voicePreview.pause();
    voicePreview.hidden = true;
    voicePreview.removeAttribute("src");
    voiceBlob = null;
    sendVoiceBtn.disabled = true;
    setTimer(0);
    voiceStatus.textContent = "تم تسجيل تهنئتك الصوتية ❤️";
    setTimeout(() => voiceStatus.textContent = "", 3000);
  });
})();
