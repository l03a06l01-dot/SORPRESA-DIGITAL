const screens = [
  {
    title: "✨ Haz clic aquí si quieres descubrir algo especial ✨",
    text: "",
    backgroundClass: "bg-stars", 
    titleColorClass: "pink-vibes-text", // Rosa
    messageColorClass: "light-message-text" // Blanco
  },
  {
    title: "Hoy comienza una nueva etapa... 🌞",
    text: "Esta será una de tus primeras exposiciones de tesis, y quiero que sepas que confío plenamente en ti. Todo tu esfuerzo, tus desvelos y tus ganas se reflejarán en cada palabra. 🌷",
    backgroundClass: "bg-stars", 
    titleColorClass: "pink-vibes-text", // Rosa
    messageColorClass: "light-message-text" // Blanco
  },
  {
    title: "Tu pasión, tu esfuerzo y tu corazón te trajeron aquí 💖",
    text: "Más allá de una exposición, esto es el reflejo de todo lo que has aprendido y de la persona increíble en la que te estás convirtiendo. ¡Vas a brillar con luz propia! ✨",
    backgroundClass: "bg-space", // Fondo Planetas (oscuro)
    titleColorClass: "", // Amarillo (por defecto)
    messageColorClass: "" // Blanco (por defecto)
  },
  {
    title: "Confía en ti, porque tú puedes con todo 🌟",
    text: "Morat canta sobre soñar y persistir, y hoy tú eres esa melodía viva que inspira. 🌈 Cree en ti, como yo creo en ti.",
    backgroundClass: "bg-stars", // Fondo Estrellas (oscuro)
    titleColorClass: "", // Amarillo (por defecto)
    messageColorClass: "" // Blanco (por defecto)
  },
  {
    title: "💐 Felicitaciones, futura arquitecta 💐",
    text: "Este es solo el inicio de algo grande. Estoy muy orgulloso de ti, de tu constancia y de tu corazón. ❤️ Tú puedes con todo lo que sueñas.\n\nCon cariño, de alguien que admira tu luz y tu esfuerzo ✨",
    backgroundClass: "bg-stars", 
    titleColorClass: "pink-vibes-text", // Rosa
    messageColorClass: "light-message-text" // Blanco
  }
];

const title = document.getElementById("title");
const message = document.getElementById("message");
const button = document.getElementById("nextButton");
const content = document.getElementById("content");
const mainBackground = document.getElementById("main-background-image"); 

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
  }, 70); 
}

function showScreen(index) {
  const screen = screens[index];
  
  // 1. Cambiar la clase del fondo para cambiar la imagen
  mainBackground.className = screen.backgroundClass; 
  
  // 2. Aplicar las clases de color al título y al mensaje
  title.className = screen.titleColorClass ? `${screen.titleColorClass}` : '';
  message.className = screen.messageColorClass ? `${screen.messageColorClass}` : '';
  
  // 3. Transición del contenido
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
  currentScreen++;
  if (currentScreen < screens.length) {
    showScreen(currentScreen);
  } else {
    // Pantalla final
    mainBackground.className = "bg-stars"; 
    content.classList.add("fade-out");
    setTimeout(() => {
      title.textContent = "¡No te pongas nerviosa, demuestra todo lo que has aprendido! Sé tú misma. ✨";
      title.className = "pink-vibes-text"; 
      message.textContent = "";
      message.className = ""; 
      button.style.display = "none";
      
      // Crear botón "Volver al Menú" mejorado
      let backButton = document.getElementById('final-back-button');
      if (!backButton) {
          backButton = document.createElement('a');
          backButton.href = "menu.html";
          backButton.textContent = "Volver al Menú Principal 🚀";
          backButton.id = "final-back-button";
          backButton.classList.add("back-to-menu-button"); 
          content.appendChild(backButton);
      }

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