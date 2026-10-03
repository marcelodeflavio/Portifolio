const body = document.body;
const nav = document.getElementById("nav");
const menuBtn = document.getElementById("menuBtn");
const themeBtn = document.getElementById("themeBtn");
const langBtn = document.getElementById("langBtn");

menuBtn.addEventListener("click", () => nav.classList.toggle("open"));
document.querySelectorAll(".nav a").forEach(link => link.addEventListener("click", () => nav.classList.remove("open")));

function updateThemeIcon(){
  themeBtn.textContent = body.classList.contains("dark") ? "☀" : "◐";
}
const savedTheme = localStorage.getItem("marcelo-theme");
if(savedTheme === "dark") body.classList.add("dark");
updateThemeIcon();

themeBtn.addEventListener("click", () => {
  body.classList.toggle("dark");
  localStorage.setItem("marcelo-theme", body.classList.contains("dark") ? "dark" : "light");
  updateThemeIcon();
});

let english = false;
langBtn.addEventListener("click", () => {
  english = !english;
  langBtn.textContent = english ? "PT" : "EN";
  document.documentElement.lang = english ? "en" : "pt";
  alert(english
    ? "A versão completa em inglês está preparada para uma próxima expansão do conteúdo."
    : "Idioma alterado para português.");
});

function updateClock(){
  const now = new Date();
  document.getElementById("clock").textContent = now.toLocaleTimeString("pt-PT",{hour:"2-digit",minute:"2-digit",second:"2-digit"});
}
updateClock();
setInterval(updateClock,1000);

const year = document.getElementById("year");
year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if(entry.isIntersecting){
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
},{threshold:.12});
document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

window.addEventListener("scroll", () => {
  const h = document.documentElement;
  const progress = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
  document.querySelector(".progress").style.width = `${progress}%`;
});

// ===== MULTIMÉDIA V2.1 =====
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const lightboxClose = document.getElementById("lightboxClose");
const videoModal = document.getElementById("videoModal");
const videoFrame = document.getElementById("videoFrame");
const videoClose = document.getElementById("videoClose");

function youtubeEmbed(url){
  try{
    const u = new URL(url);
    if(u.hostname.includes("youtu.be")) return `https://www.youtube.com/embed/${u.pathname.slice(1)}?autoplay=1&rel=0`;
    const id = u.searchParams.get("v");
    if(id) return `https://www.youtube.com/embed/${id}?autoplay=1&rel=0`;
    if(u.pathname.includes("/embed/")) return url + (url.includes("?") ? "&autoplay=1" : "?autoplay=1");
    return url;
  }catch{return url}
}

document.querySelectorAll("[data-video]").forEach(el=>{
  el.addEventListener("click", e=>{
    if(e.target.closest("button") || el.classList.contains("media-card")){
      const url = el.dataset.video;
      if(!url) return;
      videoFrame.innerHTML = `<iframe src="${youtubeEmbed(url)}" title="Vídeo" allow="autoplay; encrypted-media; picture-in-picture" allowfullscreen></iframe>`;
      videoModal.classList.add("open");
      videoModal.setAttribute("aria-hidden","false");
      document.body.style.overflow="hidden";
    }
  });
});
function closeVideoModal(){videoModal.classList.remove("open");videoModal.setAttribute("aria-hidden","true");videoFrame.innerHTML="";document.body.style.overflow=""}
videoClose.addEventListener("click",closeVideoModal);
videoModal.addEventListener("click",e=>{if(e.target===videoModal)closeVideoModal()});

document.querySelectorAll(".gallery-item").forEach(item=>{
  item.addEventListener("click",()=>{
    const src=item.dataset.image || item.querySelector("img")?.src;
    lightboxImage.src=src;
    lightbox.classList.add("open");
    lightbox.setAttribute("aria-hidden","false");
    document.body.style.overflow="hidden";
  });
});
function closeLightbox(){lightbox.classList.remove("open");lightbox.setAttribute("aria-hidden","true");lightboxImage.src="";document.body.style.overflow=""}
lightboxClose.addEventListener("click",closeLightbox);
lightbox.addEventListener("click",e=>{if(e.target===lightbox)closeLightbox()});

document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeLightbox();closeVideoModal()}});




// =========================
// PESQUISA DE MÚSICAS
// =========================

const musicSearch = document.getElementById("musicSearch");
const musicCards = document.querySelectorAll(".music-card");
const musicEmpty = document.getElementById("musicEmpty");

if (musicSearch) {

  musicSearch.addEventListener("input", function () {

    const search = this.value
      .toLowerCase()
      .trim();

    let found = 0;

    musicCards.forEach(card => {

      const title =
        (card.dataset.title || "").toLowerCase();

      const tags =
        (card.dataset.tags || "").toLowerCase();

      const text =
        card.innerText.toLowerCase();

      const match =
        title.includes(search) ||
        tags.includes(search) ||
        text.includes(search);

      if (match) {

        card.style.display = "";

        found++;

      } else {

        card.style.display = "none";

      }

    });


    if (found === 0 && search !== "") {

      musicEmpty.style.display = "block";

    } else {

      musicEmpty.style.display = "none";

    }

  });

}



















