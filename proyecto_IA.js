const token = "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"; // token de Hugging Face
const model = "mrm8488/bert-base-spanish-wwm-cased-finetuned-spa-squad2-es";

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
   // const context = document.getElementById("context").value.trim();
    const question = document.getElementById("question").value.trim();

/*     if (!question) {
        alert("Por favor, introduce el contexto y una pregunta.");
        return;
    }
 */
        // Realizar la solicitud al archivo PHP
            const response = await fetch("http://localhost:8000/conexion.php", {
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
             /*    */
            })
            //messages.innerHTML += `<p class="bot"><strong>Bot:</strong> ${data.answer}</p>`;



    // Mostrar la pregunta en la interfaz
/*     const messages = document.getElementById("messages");
    messages.innerHTML += `<p class="user"><strong>Tú:</strong> ${question}</p>`;

    // Obtener respuesta del bot
    //const answer = await askBot(context, question);
    messages.innerHTML += `<p class="bot"><strong>Bot:</strong> ${answer}</p>`; */

    // Limpiar el campo de la pregunta
    document.getElementById("question").value = "";
});