// Walar Encryption Mapping
const encryptMap = {
  'a': 'x',
  'b': '3',
  'c': '2',
  'd': 'o',
  'e': '#',
  'f': 'k',
  'g': 'e',
  'h': '!',
  'i': '1',
  'j': 'y',
  'k': '9',
  'l': '8',
  'm': '7',
  'n': '%',
  'o': '0',
  'p': '$',
  'q': 'l',
  'r': 's',
  's': 'r',
  't': 'n',
  'u': 'v',
  'v': 'u',
  'w': '4',
  'x': ';',
  'y': '6',
  'z': '.',
  ' ': 'c'
};

// Decrypt Map (reverse)
const decryptMap = {};
for (let key in encryptMap) {
  decryptMap[encryptMap[key]] = key;
}

// Process Text Function
function processText(mode) {
  const input = document.getElementById('input-text').value.toLowerCase();
  let output = '';
  for (let char of input) {
    if (mode === 'encrypt') {
      output += encryptMap[char] || char;
    } else {
      output += decryptMap[char] || char;
    }
  }
  document.getElementById('output-text').value = output;
}

// Copy Output Function
function copyOutput() {
  const outputText = document.getElementById('output-text');
  outputText.select();
  navigator.clipboard.writeText(outputText.value).then(() => {
    alert('Copied to clipboard!');
  }).catch(err => {
    console.error('Failed to copy: ', err);
  });
}

// Smooth Scroll Function
function scrollToSection(id) {
  const target = document.querySelector(id);
  gsap.to(window, { duration: 1, scrollTo: { y: target.offsetTop - 80, autoKill: false }, ease: "power2.inOut" });
}

// Animations
function initAnimations() {
  gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

  // Home and content
  gsap.from("#home", { y: 50, opacity: 0, duration: 1, ease: "power2.out" });
  gsap.from(".home-content h1", { duration: 1.5, y: 100, opacity: 0, ease: "elastic.out(1, 0.5)" });
  gsap.from(".home-content .slogan", { duration: 1.5, y: 100, opacity: 0, delay: 0.5, ease: "power2.out" });
  gsap.from(".button-group", { duration: 1.5, y: 100, opacity: 0, delay: 1, ease: "back.out(1.7)" });
  gsap.from(".subtext", { duration: 1.5, y: 100, opacity: 0, delay: 1.5, ease: "power2.out" });

  // Other sections
  gsap.utils.toArray("section:not(#home)").forEach((section, index) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top 80%",
        toggleActions: "play none none none",
        once: true
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: "power2.out",
      delay: index * 0.2
    });
  });

  // Particles
  particlesJS("particles-js", {
    particles: {
      number: { value: 50, density: { enable: true, value_area: 800 } },
      color: { value: ["#ffd700", "#800080", "#00b7eb"] },
      shape: { type: "triangle", polygon: { nb_sides: 3 } },
      opacity: { value: 0.6, random: true },
      size: { value: 6, random: true },
      line_linked: { enable: true, distance: 150, color: "#ffd700", opacity: 0.4, width: 1 },
      move: { enable: true, speed: 4, direction: "none", random: true, straight: false, out_mode: "out" },
      rotate: { value: 0, random: true, direction: "clockwise", animation: { enable: true, speed: 5, sync: false } }
    },
    interactivity: {
      detect_on: "canvas",
      events: { onhover: { enable: true, mode: "repulse" }, onclick: { enable: true, mode: "push" } },
      modes: { repulse: { distance: 200 }, push: { particles_nb: 4 } }
    }
  });

  ScrollTrigger.refresh();
}

// Hamburger Menu
document.querySelector(".hamburger").addEventListener("click", () => {
  const navLinks = document.querySelector(".nav-links");
  if (navLinks.classList.contains("show")) {
    gsap.to(navLinks, { 
      x: "-100%", 
      duration: 0.5, 
      ease: "power2.in", 
      onComplete: () => navLinks.classList.remove("show") 
    });
  } else {
    navLinks.classList.add("show");
    gsap.fromTo(navLinks, { x: "-100%" }, { x: "0%", duration: 0.5, ease: "power2.out" });
  }
});

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  initAnimations();
});
