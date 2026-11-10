const projects = [
  { id: "repsol", name: "Northline", sector: "Energy & Industrial", title: "Confluence of energies" },
  { id: "cupra", name: "Halden", sector: "Mobility & Hospitality", title: "The impulse of a new generation" },
  { id: "meta", name: "Lumen", sector: "Technology", title: "The next chapter of social connection" },
  { id: "va", name: "Atelier", sector: "Culture", title: "A museum for everyone" },
  { id: "youtube", name: "Fieldcast", sector: "Technology", title: "A name without the old picture" },
  { id: "jr-west", name: "Meridian Rail", sector: "Mobility & Hospitality", title: "The extraordinary in plain sight" },
  { id: "play", name: "Kindred", sector: "Culture & Media", title: "Rewriting the rules" },
  { id: "vienna", name: "Harbor City", sector: "Places & Real Estate", title: "The human at the heart" },
  { id: "vueling", name: "Alder Air", sector: "Mobility & Hospitality", title: "A reason to fly" },
  { id: "amazon", name: "Brightline", sector: "Technology", title: "The rise of a platform" }
];

const slides = [
  { id: "repsol", name: "Northline", sector: "Energy & Industrial", image: "images/home-hero.png" },
  { id: "meta", name: "Lumen", sector: "Technology", image: "images/home-hero.png" },
  { id: "va", name: "Atelier", sector: "Culture", image: "images/home-hero.png" },
  { id: "amazon", name: "Brightline", sector: "Technology", image: "images/home-hero.png" },
  { id: "youtube", name: "Fieldcast", sector: "Technology", image: "images/home-hero.png" }
];

const slideRoot = document.querySelector("#slides");

if (slideRoot) slides.forEach((slide, index) => {
  const item = document.createElement("div");
  item.className = "slide" + (index === 0 ? " is-active" : "");
  item.innerHTML = `<img alt="" src="${slide.image}">`;
  slideRoot.appendChild(item);
});

let current = 0;
let playing = true;

function show(index) {
  current = (index + slides.length) % slides.length;
  document.querySelectorAll(".slide").forEach((slide, i) => {
    slide.classList.toggle("is-active", i === current);
  });
  const slide = slides[current];
  const client = document.querySelector("#heroClient");
  const sector = document.querySelector("#heroSector");
  const view = document.querySelector("#viewProject");
  if (client) client.textContent = slide.name;
  if (sector) sector.textContent = slide.sector;
  if (view) view.href = `work.html?p=${slide.id}`;
}

if (slideRoot) {
  show(0);
  setInterval(() => { if (playing) show(current + 1); }, 6000);
  document.querySelector("#pause").addEventListener("click", (event) => {
    playing = !playing;
    event.currentTarget.classList.toggle("is-paused", !playing);
    event.currentTarget.setAttribute("aria-label", playing ? "Pause the carousel" : "Play the carousel");
  });
}

document.querySelectorAll(".shot").forEach((shot) => {
  const images = [...shot.querySelectorAll(".frame")];
  let n = 0;
  let hover;
  shot.addEventListener("mouseenter", () => {
    hover = setInterval(() => {
      images[n].classList.remove("on");
      n = (n + 1) % images.length;
      images[n].classList.add("on");
    }, 420);
  });
  shot.addEventListener("mouseleave", () => {
    clearInterval(hover);
    images.forEach((image, i) => image.classList.toggle("on", i === 0));
    n = 0;
  });
});

const header = document.querySelector("#header");
let lastY = window.scrollY;
const onScroll = () => {
  const hero = document.querySelector(".hero");
  const y = window.scrollY;
  header.classList.toggle("solid", !hero || y > hero.offsetHeight - 40);
  if ((hero || document.querySelector("#projects, #articles, #days")) && !header.classList.contains("open")) {
    const delta = y - lastY;
    if (y < 8) header.classList.remove("hide-nav");
    else if (delta > 4) header.classList.add("hide-nav");
    else if (delta < -2) header.classList.remove("hide-nav");
  }
  lastY = y;
};
onScroll();
document.addEventListener("scroll", onScroll, { passive: true });

document.querySelector("#menu").addEventListener("click", () => header.classList.toggle("open"));
document.querySelector("#nav").addEventListener("click", (event) => {
  if (event.target.closest("a")) header.classList.remove("open");
});

const file = (location.pathname.split("/").pop() || "index.html").toLowerCase();
const section = file === "work.html" ? "case-studies.html" : file === "article.html" ? "journal.html" : file === "day.html" ? "careers.html" : file;
document.querySelectorAll("header #nav a").forEach((link) => {
  if (link.getAttribute("href") === section) link.classList.add("is-current");
});

const showCurrent = (nav) => {
  const current = nav.querySelector(".is-current");
  if (!current) return;
  const navBox = nav.getBoundingClientRect();
  const item = current.getBoundingClientRect();
  nav.scrollLeft += item.left - navBox.left - (navBox.width - item.width) / 2;
};

const projectNav = document.querySelector("#projects");
if (projectNav) {
  const id = new URLSearchParams(location.search).get("p") || "repsol";
  const project = projects.find((item) => item.id === id) || projects[0];
  projects.forEach((item) => {
    const link = document.createElement("a");
    link.href = `work.html?p=${item.id}`;
    link.textContent = item.name;
    if (item.id === project.id) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", "page");
    }
    projectNav.appendChild(link);
  });
  const kicker = document.querySelector("#projectKicker");
  const title = document.querySelector("#projectTitle");
  if (kicker) kicker.textContent = `${project.name} · ${project.sector}`;
  if (title) title.textContent = project.title;
  document.title = `${project.name} — A PROMISE`;
  showCurrent(projectNav);
}

const articles = [
  {
    id: "presence",
    name: "Presence",
    category: "News",
    read: "2 min read",
    date: "14 October 2026",
    title: "A distinctive presence, designed for connection.",
    body: [
      "A brand is only as strong as the way it shows up. A clear presence helps people recognise you, trust you, and find their way in.",
      "This is a placeholder for the full story. Swap the image and replace this copy when the article is ready."
    ]
  },
  {
    id: "budapest",
    name: "Studio notes",
    category: "Events",
    read: "Less than a min read",
    date: "25 September 2026",
    title: "Studio notes 2026",
    body: [
      "A short note from a 2026 gathering: the room, the conversations, and what we took back to the studio.",
      "Replace this with the event write-up."
    ]
  },
  {
    id: "zara",
    name: "Marlow",
    category: "Insights",
    read: "5 min read",
    date: "21 July 2026",
    title: "Marlow’s experience evolution",
    body: [
      "A retail experience changes when the brand promise is carried from the window, to the fitting room, to the way you leave.",
      "Replace this with the full insight."
    ]
  }
];

const articleNav = document.querySelector("#articles");
if (articleNav) {
  const id = new URLSearchParams(location.search).get("a") || "presence";
  const article = articles.find((item) => item.id === id) || articles[0];
  articles.forEach((item) => {
    const link = document.createElement("a");
    link.href = `article.html?a=${item.id}`;
    link.textContent = item.name;
    if (item.id === article.id) {
      link.classList.add("is-current");
      link.setAttribute("aria-current", "page");
    }
    articleNav.appendChild(link);
  });
  const meta = document.querySelector("#articleMeta");
  const title = document.querySelector("#articleTitle");
  const body = document.querySelector("#articleBody");
  if (meta) meta.innerHTML = `<i></i> ${article.category} <span>${article.read}</span> <span>${article.date}</span>`;
  if (title) title.textContent = article.title;
  if (body) body.replaceChildren(...article.body.map((text) => {
    const p = document.createElement("p");
    p.textContent = text;
    return p;
  }));
  document.title = `${article.title} — A PROMISE`;
  showCurrent(articleNav);
}

const days = [
  {
    id: "mira",
    name: "Mira Sen",
    role: "Brand strategist",
    place: "Bangalore",
    langs: "EN, ML",
    image: "images/about-person.png",
    line: "A strategist finds the promise, then keeps every choice pointed at it.",
    bio: "Mira works from the Bangalore studio. Most days she is with a client, or back at the desk turning that conversation into a line the rest of the team can use.",
    quote: "If it looks right and says the wrong thing, it goes back.",
    qa: [
      ["What does a brand strategist look after?", "The promise. Mira names what a client has to keep, then gives design, words, and the room a direction they can share."],
      ["What does a day look like?", "A stand-up, a workshop, then time to write. The afternoon is a review with design. Nothing leaves the studio until the line and the picture agree."],
      ["What are you working on now?", "A retail name that has to feel familiar in a new category, and a short platform for a studio that is opening a second city."],
      ["How did you come to this work?", "From writing, then from sitting in too many meetings where the words and the work had drifted apart. This role is the job of pulling them back together."]
    ]
  },
  {
    id: "arun",
    name: "Arun Varghese",
    role: "Design director",
    place: "Trivandrum",
    langs: "EN, ML",
    image: "images/about-a.png",
    line: "Design is how a promise is recognised before anyone reads a word.",
    bio: "Arun leads design from the Trivandrum studio. He spends the day between sketches, critique, and the moment a client sees the work for the first time.",
    quote: "Show the choice, and why it still feels like them.",
    qa: [
      ["What does a design director look after?", "The picture of the promise. Arun decides what stays, what is decoration, and what the client will still recognise a year from now."],
      ["What does a day look like?", "Sketch review in the morning, critique before lunch, a presentation in the afternoon. He leaves a short note so tomorrow starts from a decision, not a pile."],
      ["What are you working on now?", "A travel identity that has to work on a screen, a uniform, and a small printed card. Same promise, three very different sizes."],
      ["How did you come to this work?", "From a design studio that made things look finished too early. He wanted a place where the first picture has to earn the line it sits under."]
    ]
  },
  {
    id: "leela",
    name: "Leela Nair",
    role: "Programme lead",
    place: "Bangalore",
    langs: "EN, HI",
    image: "images/about-c.png",
    line: "A programme lead keeps the promise moving, from the first meeting to the last file.",
    bio: "Leela works across both studios. Her day is the plan: who needs a decision, what is stuck, and what can wait until morning.",
    quote: "A clear owner beats a long meeting.",
    qa: [
      ["What does a programme lead look after?", "The path of the work. Leela makes sure strategy and design have time, a date, and a person who can say yes."],
      ["What does a day look like?", "The week gets a plan at 9:15. Midday is a check on what is in flight. Later, a short call between Bangalore and Trivandrum, then a note on what moved."],
      ["What are you working on now?", "Two client programmes at once. One is in research. The other is a week from a presentation, and the team needs the room kept clear."],
      ["How did you come to this work?", "From producing launches where the idea was strong and the week was not. She joined to make the week as careful as the idea."]
    ]
  }
];

const life = document.querySelector(".life");
if (life) {
  const id = new URLSearchParams(location.search).get("p") || "mira";
  const person = days.find((item) => item.id === id) || days[0];
  document.querySelector("#lifeName").textContent = person.name;
  const photo = document.querySelector("#lifePhoto");
  photo.src = person.image;
  photo.alt = "";
  document.querySelector("#lifeMeta").replaceChildren(...[
    ["Title", person.role],
    ["Location", person.place],
    ["Fluent in", person.langs]
  ].map(([label, value]) => {
    const item = document.createElement("div");
    const b = document.createElement("b");
    const span = document.createElement("span");
    b.textContent = label;
    span.textContent = value;
    item.append(b, span);
    return item;
  }));
  document.querySelector("#lifeLine").textContent = person.line;
  document.querySelector("#lifeBio").textContent = person.bio;
  document.querySelector("#lifeQa").replaceChildren(...person.qa.map(([question, answer], index) => {
    const article = document.createElement("article");
    const num = document.createElement("i");
    const copy = document.createElement("div");
    const h2 = document.createElement("h2");
    const p = document.createElement("p");
    num.textContent = String(index + 1).padStart(2, "0");
    h2.textContent = question;
    p.textContent = answer;
    copy.append(h2, p);
    article.append(num, copy);
    return article;
  }));
  document.querySelector("#lifeQuote").textContent = person.quote;
  document.title = `${person.name} — A PROMISE`;
  const dayNav = document.querySelector("#days");
  if (dayNav) {
    days.forEach((item) => {
      const link = document.createElement("a");
      link.href = `day.html?p=${item.id}`;
      link.textContent = item.name;
      if (item.id === person.id) {
        link.classList.add("is-current");
        link.setAttribute("aria-current", "page");
      }
      dayNav.appendChild(link);
    });
    showCurrent(dayNav);
  }
}

document.querySelector("#moreTeam")?.addEventListener("click", (event) => {
  document.querySelectorAll(".person.extra").forEach((person) => { person.hidden = false; });
  event.currentTarget.remove();
});

document.querySelector("#signup")?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.querySelector("button").textContent = "Subscribed";
});

document.querySelector("#message")?.addEventListener("submit", (event) => {
  event.preventDefault();
  event.currentTarget.querySelector("button").textContent = "Sent";
});

