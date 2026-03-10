const PAGE_CONFIG = {

  page1: {
    title: "COMIDA",
    subtitle: "Haz clic en cualquier lugar",
    phrases: [
      "Quizas siga valiendo vga, pero siento que estoy manejando la situación mejor que antes",
      "Y recuerda...",
      "A veces solo hay que decir Watafak y seguir",
      "Este mes voy a arreglar mi vida, o la voy a empeorar. Ya veremos..",

      
    ],
    images: [
      "https://i.pinimg.com/736x/28/b1/7d/28b17d8123155cdb1cc6e2da9882778e.jpg",
      "https://i.pinimg.com/736x/12/08/10/1208101c69245228b164e00ce5b66c4b.jpg",
      "https://i.pinimg.com/1200x/bf/e1/af/bfe1afaa23cc094639a8209244c62a0e.jpg",
      "https://i.pinimg.com/736x/b8/ce/a4/b8cea4fc01f156d8ccd14ad5ceb1804d.jpg",
      "https://i.pinimg.com/1200x/b8/35/09/b835099b49acb02241c39bb687231981.jpg",
      "https://i.pinimg.com/736x/fd/48/27/fd4827267da692ee22a256aed785674f.jpg",
      "https://i.pinimg.com/736x/90/ac/7e/90ac7e9844e52066beadbec14cf0cdf0.jpg",
      "https://i.pinimg.com/736x/fd/5f/48/fd5f485a2dd7872fa59c61852861f3b8.jpg",
      "https://i.pinimg.com/736x/81/76/e5/8176e542a07799149f63fee81da6757f.jpg",

      
    ],
  },


  page2: {
    title: "ANIMALES",
    subtitle: "Haz clic en cualquier lugar",
    phrases: [
      "Somos pedacitos de experiencias",
      "Me quieren ver trabajar pero no les voy a dar el gusto",
      "Hagan lo que se les de la gana, la vida es de ustedes y las consecuencias tambien",
      
    ],
    images: [
      "https://i.pinimg.com/1200x/cd/8f/1b/cd8f1be17729b9eb27cf44feea03f716.jpg",
      "https://i.pinimg.com/736x/5d/40/52/5d4052000aa44314896ff50992de8e01.jpg",
      "https://i.pinimg.com/736x/ce/01/ec/ce01ece1e6c5afce7ffb5275d9d2bc11.jpg",
      "https://i.pinimg.com/736x/46/4b/b2/464bb212a804a227cd86313fbf3732da.jpg",
      "https://i.pinimg.com/736x/24/b6/75/24b6757fe3eb70afee7d511a40e4533b.jpg",
      "https://i.pinimg.com/1200x/17/3b/7e/173b7e7f7665e69c627f4953722e3789.jpg",
      "https://i.pinimg.com/736x/38/72/9b/38729bf5b5b8807e1b5a3991408d1fe8.jpg",
      "https://i.pinimg.com/736x/d3/0a/db/d30adb0141707ddb97a4ca01b80769f4.jpg",
      "https://i.pinimg.com/736x/db/1d/47/db1d474e1d9a563ef9dfdf948ce7f0a7.jpg",
      
       
    ],
  },

  
  page3: {
    title: "...",
    subtitle: "Haz clic en cualquier lugar",
    phrases: [
      "Todo es culpa del mercurio ese re drogado",
      "Todo bien, ya llore",
      "Recuerda: si te critican 239,854,202,670 veces, ignoralos, asi como ignoraste los numeros",
      "No dejes que nadie arruine tu día, arruinali tu mismo",


      
    ],
    images: [
      "https://i.pinimg.com/1200x/2c/4b/8a/2c4b8ae4d48d64b90221d49feb85639a.jpg",
      "https://i.pinimg.com/736x/50/f9/c8/50f9c814513cce5e40baee1fbd9eb689.jpg",
      "https://i.pinimg.com/736x/04/5d/29/045d298b00e9b16b792aad2196b2ecd3.jpg",
      "https://i.pinimg.com/1200x/65/a0/65/65a065ad229db6ddf54d63fef4314fc8.jpg",
      "https://i.pinimg.com/736x/ac/1e/ad/ac1ead00438b4e9040405215cfe1d1ce.jpg",
      "https://i.pinimg.com/736x/78/58/7c/78587c1fd4ffbc9ccfecc392a6bacf44.jpg",
      "https://i.pinimg.com/736x/56/c7/b6/56c7b62a954ebb763ee1704a18f1fee2.jpg",
      "https://i.pinimg.com/736x/5e/d3/54/5ed354b50673fb57ab1421a1ed182b8a.jpg",
      
    ],
  },
};




const GLOW = ["glow-pink", "glow-cyan", "glow-gold"];
const COLORS = ["color-primary", "color-secondary", "color-accent"];
const MODES = ["normal", "reversed", "diagonal"];

function reverseText(t) { return t.split("").reverse().join(""); }
function rand(arr) { return arr[Math.floor(Math.random() * arr.length)]; }

function getPage() {
  const hash = window.location.hash.replace("#", "");
  return PAGE_CONFIG[hash] ? hash : null;
}

function showHome() {
  document.getElementById("home-screen").style.display = "flex";
  document.getElementById("canvas").style.display = "none";
}

function showPage(pageKey) {
  const config = PAGE_CONFIG[pageKey];
  if (!config) return showHome();

  document.getElementById("home-screen").style.display = "none";
  document.getElementById("canvas").style.display = "block";

  document.getElementById("title").textContent = config.title;
  document.getElementById("subtitle").textContent = config.subtitle;

  document.querySelectorAll(".spawned-item").forEach((el) => el.remove());
  document.getElementById("clear-btn").classList.remove("visible");
  document.getElementById("hint").style.display = "flex";

  document.querySelectorAll(".page-nav a").forEach((a) => {
    a.classList.remove("active");
    if (a.getAttribute("href") === "#" + pageKey) a.classList.add("active");
  });
}

function initCanvas() {
  const canvas = document.getElementById("canvas");
  const clearBtn = document.getElementById("clear-btn");
  const hint = document.getElementById("hint");

  canvas.addEventListener("click", (e) => {
    if (e.target.closest("a, button, nav")) return;

    const pageKey = getPage();
    if (!pageKey) return;
    const config = PAGE_CONFIG[pageKey];

    const rect = canvas.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;

    const isImage = config.images.length > 0 && Math.random() > 0.5;

    const el = document.createElement("div");
    el.className = "spawned-item";
    const rotation = isImage
      ? Math.random() * 30 - 15
      : MODES[Math.floor(Math.random() * 3)] === "diagonal"
      ? (Math.random() > 0.5 ? 35 : -35)
      : Math.random() * 10 - 5;
    const scale = isImage ? 0.6 + Math.random() * 0.6 : 0.8 + Math.random() * 0.5;

    el.style.left = x + "%";
    el.style.top = y + "%";
    el.style.setProperty("--rotation", rotation + "deg");
    el.style.setProperty("--scale", scale);

    if (isImage) {
      const url = rand(config.images);
      el.innerHTML = `<div class="image-card"><img src="${url}" alt="img" loading="lazy"></div>`;
    } else {
      const phrase = rand(config.phrases);
      const mode = rand(MODES);
      const glow = rand(GLOW);
      const color = rand(COLORS);
      const text = mode === "reversed" ? reverseText(phrase) : phrase;
      const label = mode === "reversed" ? "↻ al revés" : mode === "diagonal" ? "↗ diagonal" : "→ normal";

      if (mode === "diagonal") {
        el.style.setProperty("--rotation", (Math.random() > 0.5 ? 35 : -35) + "deg");
      }

      el.innerHTML = `
        <div class="phrase-card ${glow}">
          <p class="${color}">${text}</p>
          <span class="mode-label">${label}</span>
        </div>`;
    }

    canvas.appendChild(el);
    hint.style.display = "none";
    clearBtn.classList.add("visible");

    const items = canvas.querySelectorAll(".spawned-item");
    if (items.length > 20) items[0].remove();
  });

  clearBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    canvas.querySelectorAll(".spawned-item").forEach((el) => el.remove());
    clearBtn.classList.remove("visible");
    hint.style.display = "flex";
  });
}

function router() {
  const page = getPage();
  if (page) showPage(page);
  else showHome();
}

document.addEventListener("DOMContentLoaded", () => {
  initCanvas();
  router();
});

window.addEventListener("hashchange", router);
