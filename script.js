const screens = [
  {
    title: "✨ Haz clic aquí si quieres descubrir algo especial ✨",
    text: "",
    backgroundClass: "bg-floral"
  },
  {
    title: "Hoy comienza una nueva etapa... 🌞",
    text: "Esta será una de tus primeras exposiciones de tesis, y quiero que sepas que confío plenamente en ti. Todo tu esfuerzo, tus desvelos y tus ganas se reflejarán en cada palabra. 🌷",
    backgroundClass: "bg-floral"
  },
  {
    title: "Tu pasión, tu esfuerzo y tu corazón te trajeron aquí 💖",
    text: "Más allá de una exposición, esto es el reflejo de todo lo que has aprendido y de la persona increíble en la que te estás convirtiendo. ¡Vas a brillar con luz propia! ✨",
    backgroundClass: "bg-space"
  },
  {
    title: "Confía en ti, porque tú puedes con todo 🌟",
    text: "Morat canta sobre soñar y persistir, y hoy tú eres esa melodía viva que inspira. 🌈 Cree en ti, como yo creo en ti.",
    backgroundClass: "bg-stars"
  },
  {
    title: "💐 Felicitaciones, futura arquitecta 💐",
    text: "Este es solo el inicio de algo grande. Estoy muy orgulloso de ti, de tu constancia y de tu corazón. ❤️ Tú puedes con todo lo que sueñas.\n\nCon cariño, de alguien que admira tu luz y tu esfuerzo ✨",
    backgroundClass: "bg-floral"
  }
];

const title = document.getElementById("title");
const message = document.getElementById("message");
const button = document.getElementById("nextButton");
const bgMusic = document.getElementById("bgMusic");
const content = document.getElementById("content");
const mainBackground = document.getElementById("main-background-image"); // Nueva referencia

let currentScreen = 0;
let typingInterval;

function typeText(text, element, callback) {
  element.textContent = "";
  let index = 0;
  clearInterval(typingInterval);
  typingInterval = setInterval(() => {
    element.textContent += text.charAt(index);
    index++;
    if (index === text.length) {
      clearInterval(typingInterval);
      if (callback) callback();
    }
  }, 70); // Manteniendo la velocidad lenta
}

function showScreen(index) {
  const screen = screens[index];
  
  // 1. Cambiar la clase del fondo para cambiar la imagen
  mainBackground.className = screen.backgroundClass; 
  
  // 2. Transición del contenido
  content.classList.remove("fade-in");
  content.classList.add("fade-out");

  setTimeout(() => {
    title.textContent = screen.title;
    typeText(screen.text, message);
    content.classList.remove("fade-out");
    content.classList.add("fade-in");
  }, 800);
}

button.addEventListener("click", () => {
  // Asegurarse de que la música empiece con la interacción del usuario
  if (bgMusic.paused) {
    bgMusic.play().catch(() => {});
  }
  
  currentScreen++;
  if (currentScreen < screens.length) {
    showScreen(currentScreen);
  } else {
    // Pantalla final
    mainBackground.className = "bg-floral"; // Fondo final por defecto
    content.classList.add("fade-out");
    setTimeout(() => {
      title.textContent = "💫 Este momento es tuyo. Olvídate de los nervios, concéntrate y demuestra el esfuerzo que has puesto. Lo harás genial. 💫";
      message.textContent = "";
      button.style.display = "none";
      content.classList.remove("fade-out");
      content.classList.add("fade-in");
    }, 1000);
  }
});

// Generar partículas flotantes
const particlesContainer = document.getElementById("particles");
for (let i = 0; i < 40; i++) {
  const particle = document.createElement("div");
  particle.classList.add("particle");
  particle.style.left = `${Math.random() * 100}%`;
  particle.style.animationDelay = `${Math.random() * 5}s`;
  particle.style.animationDuration = `${6 + Math.random() * 5}s`;
  particlesContainer.appendChild(particle);
}

// Mostrar la primera pantalla
showScreen(0);