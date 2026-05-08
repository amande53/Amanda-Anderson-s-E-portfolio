/* =========================
   🌎 GLOBAL STATE
========================= */

let isModalOpen = false;
let contrastToggle = false;
let currentProjectIndex = 0;
let projectChangeTimeout;


/* =========================
   🖼️ PROJECT ELEMENTS
========================= */

const projectImg = document.getElementById("project-img");
const projectTitle = document.getElementById("project-title");
const projectStack = document.getElementById("project-stack");
const projectDescription = document.getElementById("project-description");
const projectGithub = document.getElementById("project-github");
const projectLive = document.getElementById("project-live");

const projectLeft = document.getElementById("project-left");
const projectRight = document.getElementById("project-right");
const projectDots = document.getElementById("project-dots");
const projectWrapper = document.querySelector(".project__wrapper");


/* =========================
   💫 FLOATING SHAPE DATA
========================= */

const shapeData = [];


/* =========================
   💻 PROJECT DATA
========================= */

const projects = [
  {
    title: "Car Sales Project",
    stack: "HTML, CSS, JavaScript",
    description:
      "A responsive car sales project built with clean layouts, polished styling, and interactive user-friendly design.",
    image: "./assets/blinker mockup.png",
    github: "#",
    live: "#",
  },
  {
    title: "Portfolio Website",
    stack: "HTML, CSS, JavaScript",
    description:
      "A personal portfolio website built to showcase my projects, skills, and frontend development style.",
    image: "./assets/blinker mockup.png",
    github: "#",
    live: "#",
  },
  {
    title: "Developer Cheatsheet",
    stack: "HTML, CSS, JavaScript",
    description:
      "A themed developer cheatsheet website with helpful notes, organized sections, and interactive features.",
    image: "./assets/blinker mockup.png",
    github: "#",
    live: "#",
  },
];


/* =========================
   💫 FLOATING SHAPES
========================= */

function randomizeShapes() {
  const shapesWrapper = document.querySelector(".shapes");
  const shapes = document.querySelectorAll(".shape");

  if (!shapesWrapper || !shapes.length) return;

  const wrapperWidth = shapesWrapper.offsetWidth;
  const wrapperHeight = shapesWrapper.offsetHeight;

  shapeData.length = 0;

  const safeZone = {
    left: wrapperWidth * 0.16,
    right: wrapperWidth * 0.82,
    top: wrapperHeight * 0.2,
    bottom: wrapperHeight * 0.76,
  };

  shapes.forEach((shape) => {
    let x;
    let y;
    let tries = 0;

    const size = 18 + Math.random() * 28;

    do {
      x = Math.random() * (wrapperWidth - size);
      y = Math.random() * (wrapperHeight - size);
      tries++;
    } while (
      x > safeZone.left &&
      x < safeZone.right &&
      y > safeZone.top &&
      y < safeZone.bottom &&
      tries < 100
    );

    const opacity = 0.12 + Math.random() * 0.28;

    const speedX =
      (Math.random() * 0.17 + 0.08) * (Math.random() > 0.5 ? 1 : -1);

    const speedY =
      (Math.random() * 0.17 + 0.08) * (Math.random() > 0.5 ? 1 : -1);

      shape.style.fontSize = `${size}px`;
      shape.style.opacity = opacity;
      
      shape.style.left = `${x}px`;
      shape.style.top = `${y}px`;
      
      shape.style.transform = `rotate(${Math.random() * 360}deg)`;

    shapeData.push({
      element: shape,
      x,
      y,
      size,
      speedX,
      speedY,
      rotation: Math.random() * 360,
      rotationSpeed: Math.random() > 0.5 ? 0.08 : -0.08,
    });
  });
}

function animateShapes() {
  const shapesWrapper = document.querySelector(".shapes");

  if (!shapesWrapper || !shapeData.length) {
    requestAnimationFrame(animateShapes);
    return;
  }

  const wrapperWidth = shapesWrapper.offsetWidth;
  const wrapperHeight = shapesWrapper.offsetHeight;

  shapeData.forEach((shape) => {
    shape.x += shape.speedX;
    shape.y += shape.speedY;
    shape.rotation += shape.rotationSpeed;

    if (shape.x <= 0 || shape.x >= wrapperWidth - shape.size) {
      shape.speedX *= -1;
      shape.x = Math.max(0, Math.min(shape.x, wrapperWidth - shape.size));
    }

    if (shape.y <= 0 || shape.y >= wrapperHeight - shape.size) {
      shape.speedY *= -1;
      shape.y = Math.max(0, Math.min(shape.y, wrapperHeight - shape.size));
    }

    shape.element.style.left = `${shape.x}px`;
    shape.element.style.top = `${shape.y}px`;
    
    shape.element.style.transform = `
      rotate(${shape.rotation}deg)
    `;
  });

  requestAnimationFrame(animateShapes);
}

/* =========================
   🌙 DARK THEME TOGGLE
========================= */

function toggleContrast() {
  contrastToggle = !contrastToggle;
  document.body.classList.toggle("dark-theme", contrastToggle);
}


/* =========================
   🪟 MODAL TOGGLE
========================= */

function toggleModal() {
  isModalOpen = !isModalOpen;
  document.body.classList.toggle("modal--open", isModalOpen);
}


/* =========================
   💌 CONTACT FORM
========================= */

function contact(event) {
  event.preventDefault();

  const loading = document.querySelector(".modal__overlay--loading");
  const success = document.querySelector(".modal__overlay--success");

  if (!loading || !success) return;

  loading.classList.add("modal__overlay--visible");

  emailjs
    .sendForm(
      "service_7kal6mh",
      "template_tklh8hh",
      event.target,
      "42RQFha9z0VFdDazK"
    )
    .then(() => {
      loading.classList.remove("modal__overlay--visible");
      success.classList.add("modal__overlay--visible");
    })
    .catch(() => {
      loading.classList.remove("modal__overlay--visible");

      alert(
        "Oops! The message portal is having a sparkle outage. Please email me directly at amanda.anderson.dev@gmail.com."
      );
    });
}


/* =========================
   🖼️ PROJECT DISPLAY
========================= */

function showProject() {
  if (
    !projectWrapper ||
    !projectImg ||
    !projectTitle ||
    !projectStack ||
    !projectDescription ||
    !projectGithub ||
    !projectLive
  ) {
    return;
  }

  const currentProject = projects[currentProjectIndex];

  clearTimeout(projectChangeTimeout);

  projectWrapper.classList.add("project--changing");

  projectChangeTimeout = setTimeout(() => {
    projectImg.src = currentProject.image;
    projectImg.alt = currentProject.title;

    projectTitle.textContent = currentProject.title;
    projectStack.textContent = currentProject.stack;
    projectDescription.textContent = currentProject.description;

    projectGithub.href = currentProject.github;
    projectLive.href = currentProject.live;

    showDots();

    projectWrapper.classList.remove("project--changing");
  }, 200);
}


/* =========================
   ⚪ PROJECT DOTS
========================= */

function showDots() {
  if (!projectDots) return;

  projectDots.innerHTML = "";

  projects.forEach((project, index) => {
    const dot = document.createElement("button");

    dot.classList.add("project__dot");
    dot.setAttribute("type", "button");
    dot.setAttribute("aria-label", `Show project ${index + 1}`);

    if (index === currentProjectIndex) {
      dot.classList.add("project__dot--active");
    }

    dot.addEventListener("click", () => {
      currentProjectIndex = index;
      showProject();
    });

    projectDots.appendChild(dot);
  });
}


/* =========================
   ➡️ PROJECT NAVIGATION
========================= */

function showNextProject() {
  currentProjectIndex++;

  if (currentProjectIndex >= projects.length) {
    currentProjectIndex = 0;
  }

  showProject();
}

function showPreviousProject() {
  currentProjectIndex--;

  if (currentProjectIndex < 0) {
    currentProjectIndex = projects.length - 1;
  }

  showProject();
}


/* =========================
   🎧 EVENT LISTENERS
========================= */

if (projectRight && projectLeft) {
  projectRight.addEventListener("click", showNextProject);
  projectLeft.addEventListener("click", showPreviousProject);
}

window.addEventListener("load", () => {
  showProject();
  randomizeShapes();
  requestAnimationFrame(animateShapes);
});

window.addEventListener("resize", randomizeShapes);