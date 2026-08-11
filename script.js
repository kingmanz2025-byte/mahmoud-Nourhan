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




/* ================= Guest Wishes — Supabase Free =================
   The website can remain on GitHub Pages.
   Supabase stores the written wishes centrally so every visitor sees
   the same messages.

   IMPORTANT:
   Put ONLY your Supabase Project URL and the public anon key here.
   Never put a service_role key in this file.
*/
(() => {
  const SUPABASE_URL = window.WEDDING_SUPABASE_URL || "PASTE_SUPABASE_URL_HERE";
  const SUPABASE_ANON_KEY = window.WEDDING_SUPABASE_ANON_KEY || "PASTE_SUPABASE_ANON_KEY_HERE";

  const hasSupabaseConfig =
    SUPABASE_URL.startsWith("https://") &&
    SUPABASE_ANON_KEY &&
    !SUPABASE_ANON_KEY.includes("PASTE_");

  const client = hasSupabaseConfig && window.supabase
    ? window.supabase.createClient(SUPABASE_URL, SUPABASE_ANON_KEY)
    : null;

  const $ = (s) => document.querySelector(s);
  const tabs = document.querySelectorAll("[data-wish-tab]");
  const panels = document.querySelectorAll("[data-wish-panel]");
  const wishForm = $("#wishForm");
  const wishName = $("#wishName");
  const wishMessage = $("#wishMessage");
  const wishStatus = $("#wishStatus");
  const wishesList = $("#wishesList");
  const wishCount = $("#wishCount");

  const localKey = "mahmoud_nourhan_guest_wishes_v2";

  tabs.forEach(tab => {
    tab.addEventListener("click", () => {
      tabs.forEach(t => t.classList.remove("active"));
      panels.forEach(p => p.classList.remove("active"));
      tab.classList.add("active");
      const panel = document.querySelector(`[data-wish-panel="${tab.dataset.wishTab}"]`);
      if (panel) panel.classList.add("active");
    });
  });

  // Hide the voice tab/panel because this edition is written wishes only.
  const voiceTab = document.querySelector('[data-wish-tab="voice"]');
  const voicePanel = document.querySelector('[data-wish-panel="voice"]');
  if (voiceTab) voiceTab.style.display = "none";
  if (voicePanel) voicePanel.style.display = "none";

  function escapeHtml(value) {
    return String(value ?? "").replace(/[&<>"']/g, ch => ({
      "&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#039;"
    }[ch]));
  }

  function localLoad() {
    try { return JSON.parse(localStorage.getItem(localKey) || "[]"); }
    catch { return []; }
  }

  function localSave(items) {
    localStorage.setItem(localKey, JSON.stringify(items));
  }

  function render(items) {
    const clean = (items || []).filter(x => x && x.name && x.message);
    wishCount.textContent = clean.length;

    if (!clean.length) {
      wishesList.innerHTML =
        '<div class="empty-wishes">لسه أول تهنئة... كن أول من يشارك فرحتنا ❤️</div>';
      return;
    }

    wishesList.innerHTML = clean.map(item => {
      const date = item.created_at
        ? new Date(item.created_at).toLocaleString("ar-EG")
        : "";
      return `<article class="wish-card">
        <div class="wish-author">💌 ${escapeHtml(item.name)}</div>
        <div class="wish-message">${escapeHtml(item.message)}</div>
        <div class="wish-date">${escapeHtml(date)}</div>
      </article>`;
    }).join("");
  }

  async function loadWishes() {
    if (!client) {
      render(localLoad());
      wishStatus.textContent = "الموقع جاهز للربط بقاعدة البيانات.";
      return;
    }

    try {
      const { data, error } = await client
        .from("wishes")
        .select("id,name,message,created_at")
        .eq("approved", true)
        .order("created_at", { ascending: false })
        .limit(100);

      if (error) throw error;
      render(data || []);
    } catch (error) {
      console.error("Supabase load error:", error);
      render(localLoad());
      wishStatus.textContent = "تعذر تحميل التهاني الآن. جرّب تحديث الصفحة.";
    }
  }

  wishForm?.addEventListener("submit", async (e) => {
    e.preventDefault();

    const name = wishName.value.trim();
    const message = wishMessage.value.trim();

    if (!name || !message) {
      wishStatus.textContent = "اكتب اسمك والتهنئة الأول ❤️";
      return;
    }

    if (name.length > 60 || message.length > 500) {
      wishStatus.textContent = "الاسم أو الرسالة أطول من المسموح.";
      return;
    }

    const submit = wishForm.querySelector(".wish-submit");
    if (submit) submit.disabled = true;
    wishStatus.textContent = "جاري إرسال تهنئتك... ❤️";

    try {
      if (!client) {
        // Local fallback only until Supabase credentials are added.
        const items = localLoad();
        items.unshift({
          name,
          message,
          created_at: new Date().toISOString()
        });
        localSave(items);
        render(items);
      } else {
        const { error } = await client.from("wishes").insert([{
          name,
          message,
          approved: true
        }]);

        if (error) throw error;
        await loadWishes();
      }

      wishForm.reset();
      wishStatus.textContent = "تم إرسال تهنئتك وظهرت للجميع ❤️";
      setTimeout(() => wishStatus.textContent = "", 3500);
    } catch (error) {
      console.error("Supabase insert error:", error);
      wishStatus.textContent = "حصلت مشكلة أثناء الإرسال. حاول مرة ثانية.";
    } finally {
      if (submit) submit.disabled = false;
    }
  });

  // Refresh when the page becomes visible again.
  document.addEventListener("visibilitychange", () => {
    if (!document.hidden) loadWishes();
  });

  loadWishes();
})();
