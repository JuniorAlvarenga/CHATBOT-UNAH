const token = "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"; // token de Hugging Face
const model = "mrm8488/bert-base-spanish-wwm-cased-finetuned-spa-squad2-es"; //Nombre y direccion del modelo

async function askBot(context, question) {
    const response = await fetch(`https://api-inference.huggingface.co/models/${model}`, {
        headers: { Authorization: `Bearer ${token}` },
        method: "POST",
        body: JSON.stringify({ inputs: { question, context } }),
    });
    const data = await response.json();
    return data.answer || "No tengo una respuesta para eso.";
}

document.getElementById("send").addEventListener("click", async () => {
    const question = document.getElementById("question").value.trim();
    let tema_id = document.getElementById("temasSelect").value;
    console.log(tema_id);
    if (!question) {
        alert("Por favor, introduce una pregunta.");
        return;
    }
    if (!tema_id) {
        alert("Por favor, elige un tema");
        return;
    }

    const response = await fetch("http://localhost:8000/conexion.php?tema_id="+tema_id, {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        //body: JSON.stringify({ data }),
    });
    const data = response.json(); 
    data.then((resultado) => {
        const temaHistorial = resultado.data.tema_historial;
        console.log(temaHistorial);
        const answer =  askBot(temaHistorial, question);
        answer.then((resultado2) => {
            console.log("Resultado:", resultado2); 
            const messages = document.getElementById("messages");
            messages.innerHTML += `<p class="user"><strong>Tú:</strong> ${question}</p>`;
            messages.innerHTML += `<p class="bot"><strong>Bot:</strong> ${resultado2}</p>`; 
        })
    })
    document.getElementById("question").value = "";
});

async function cargarTemas() {
  const response = await fetch('http://localhost:8000/tema.php', {
     method: "POST",
     headers: {
        "Content-Type": "application/json",
     },
  });
  const data = await response.json(); 
  const select = document.getElementById('temasSelect');
  let optionsHTML = ''; 
  data.data.forEach(item => {
    optionsHTML += `<option value="${item.tema_id}">${item.tema}</option>`; 
  });
  select.innerHTML += optionsHTML;
}

document.addEventListener('DOMContentLoaded', cargarTemas);

document.addEventListener("DOMContentLoaded", () => {
    const messages = document.getElementById("messages");

    // Crear mensaje inicial del bot
    const botMessage = document.createElement("p");
    botMessage.className = "bot"; // Aplica estilo de mensaje del bot
    botMessage.textContent = "Bot: ¡Hola! Soy el ChatBot de la UNAH. Elige un tema especifico para responder tus preguntas";

    // Añadir mensaje inicial al contenedor de mensajes
    messages.appendChild(botMessage);
});
