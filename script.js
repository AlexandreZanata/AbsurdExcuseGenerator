document.addEventListener('DOMContentLoaded', () => {
    const excuseTextElement = document.getElementById('excuse-text');
    const generateButton = document.getElementById('generate-button');
    const copyButton = document.getElementById('copy-button'); // Novo botão
    const emojiAreaElement = document.getElementById('emoji-area');
    const currentYearElement = document.getElementById('current-year');

    const initialExcuseText = "Clique no botão abaixo para gerar sua desculpa!";

    if (currentYearElement) {
        currentYearElement.textContent = new Date().getFullYear();
    }

    const excuses = [
        { text: "Meu hamster entrou em greve de fome e precisei fazer uma intervenção.", emoji: "🐹✊" },
        { text: "Fui abduzido por alienígenas, mas eles me devolveram porque eu roncava muito.", emoji: "👽🛸😴" },
        { text: "Meu unicórnio de estimação precisou de uma cirurgia de emergência na asa.", emoji: "🦄💉" },
        { text: "Achei um mapa do tesouro no meu cereal e a aventura me chamou.", emoji: "🗺️🏴‍☠️🥣" },
        { text: "Meu despertador decidiu tirar o dia de folga e não me avisou.", emoji: "⏰😴🌴" },
        { text: "Fui convocado para uma reunião urgente com esquilos sobre o estoque de nozes do inverno.", emoji: "🐿️🌰🤝" },
        { text: "Meu carro foi confundido com uma nave espacial e rebocado pela NASA.", emoji: "🚗🚀🌌" },
        { text: "Participei de um concurso de quem pisca por último com uma estátua e perdi a noção do tempo.", emoji: "🗿👀⏳" },
        { text: "Meu peixinho dourado estava se afogando e precisei fazer respiração boca-a-boca.", emoji: "🐠😮💨" },
        { text: "O Wi-Fi do vizinho estava tão forte que fui sugado para dentro da internet.", emoji: "💻🌀🤯" },
        { text: "Minha sombra fugiu e passei a manhã tentando convencê-la a voltar.", emoji: "👤🏃‍♂️💬" },
        { text: "Um pombo roubou as chaves do meu carro e só as devolveu em troca de um saco de pipoca.", emoji: "🐦🔑🍿" },
        { text: "Acordei falando élfico fluentemente e precisei encontrar um tradutor.", emoji: "🧝🗣️📖" },
        { text: "Meu gato se candidatou à presidência e precisei ajudar na campanha.", emoji: "😼🗳️👔" },
        { text: "Descobri que sou o herdeiro de um reino muito distante e tive que resolver questões burocráticas reais.", emoji: "👑📜✈️" },
        { text: "Meu café da manhã começou a levitar e precisei chamar um especialista em fenômenos paranormais.", emoji: "☕️👻🔬" },
        { text: "Fui desafiado para um duelo de dança por um robô e não pude recusar.", emoji: "🤖🕺💃" },
        { text: "Minhas plantas iniciaram uma revolução e tive que negociar a paz.", emoji: "🌿✊☮️" },
        { text: "Um portal para outra dimensão abriu no meu armário. A visita foi rápida, prometo.", emoji: "🚪🌌🚶" },
        { text: "O carteiro e eu trocamos de corpo. Foi um dia confuso para as correspondências.", emoji: "📬🔄😵" }
    ];

    let lastExcuseIndex = -1;

    function getRandomExcuse() {
        let randomIndex;
        if (excuses.length > 1) {
            do {
                randomIndex = Math.floor(Math.random() * excuses.length);
            } while (randomIndex === lastExcuseIndex);
        } else {
            randomIndex = 0;
        }
        lastExcuseIndex = randomIndex;
        return excuses[randomIndex];
    }

    function displayExcuse() {
        const randomExcuse = getRandomExcuse();
        excuseTextElement.textContent = randomExcuse.text;
        excuseTextElement.style.animation = 'none';
        void excuseTextElement.offsetWidth;
        excuseTextElement.style.animation = 'textAppear 0.4s ease-out forwards'; // Usando a animação do tema claro

        emojiAreaElement.textContent = randomExcuse.emoji;
        emojiAreaElement.style.animation = 'none';
        void emojiAreaElement.offsetWidth;
        emojiAreaElement.style.animation = 'popIn 0.4s cubic-bezier(0.68, -0.55, 0.27, 1.55) 0.1s forwards'; // Usando a animação do tema claro

        // A linha abaixo altera a cor de fundo do card de desculpas.
        // Se você preferir a cor definida no CSS, comente ou remova esta parte.
        const pastelColors = [
            '#ffe6e6', '#e6ffe6', '#e6f7ff', '#fff5e6', '#f0e6ff',
            '#ffd6cc', '#ccffd6', '#cce0ff', '#ffebcc', '#e0ccff'
        ];
        // Verifique se o tema claro está ativo e se as cores pastel ainda são desejadas.
        // Para o tema claro, você pode querer usar a cor definida no CSS: var(--background-excuse-card)
        // ou uma lista de cores claras que combinem.
        // Por enquanto, vou manter, mas você pode ajustá-la:
        const randomColor = pastelColors[Math.floor(Math.random() * pastelColors.length)];
        document.querySelector('.excuse-card').style.backgroundColor = randomColor;
    }

    // Função para copiar o texto
    function copyExcuseToClipboard() {
        const textToCopy = excuseTextElement.textContent;

        // Não copiar o texto placeholder inicial
        if (textToCopy && textToCopy !== initialExcuseText) {
            navigator.clipboard.writeText(textToCopy)
                .then(() => {
                    // Feedback de sucesso
                    const originalButtonText = copyButton.innerHTML;
                    copyButton.innerHTML = '<span class="button-icon">✅</span> Copiado!';
                    copyButton.classList.add('copied'); // Adiciona classe para possível estilo extra
                    setTimeout(() => {
                        copyButton.innerHTML = originalButtonText;
                        copyButton.classList.remove('copied');
                    }, 2000); // Volta ao normal após 2 segundos
                })
                .catch(err => {
                    console.error("Erro ao copiar a desculpa: ", err);
                    // Feedback de erro (opcional, pode ser um alert ou mudar o texto do botão)
                    const originalButtonText = copyButton.innerHTML;
                    copyButton.innerHTML = 'Erro ao copiar!';
                     setTimeout(() => {
                        copyButton.innerHTML = originalButtonText;
                    }, 2000);
                });
        } else if (textToCopy === initialExcuseText) {
            // Feedback se tentar copiar o texto inicial
            const originalButtonText = copyButton.innerHTML;
            copyButton.textContent = 'Gere uma desculpa primeiro!';
             setTimeout(() => {
                copyButton.innerHTML = originalButtonText;
            }, 2000);
        }
    }

    if (generateButton && excuseTextElement && emojiAreaElement && copyButton) {
        generateButton.addEventListener('click', displayExcuse);
        copyButton.addEventListener('click', copyExcuseToClipboard); // Adiciona listener ao novo botão
        
        // Exibe uma desculpa inicial ao carregar a página (ou o texto placeholder)
        // Para evitar exibir uma desculpa aleatória direto, podemos apenas deixar o placeholder.
        // displayExcuse(); // Comente se não quiser uma desculpa aleatória ao carregar
        excuseTextElement.textContent = initialExcuseText; // Garante que o texto inicial seja o placeholder
        emojiAreaElement.textContent = '🤔'; // Emoji placeholder

    } else {
        console.error("Não foi possível encontrar os elementos necessários no DOM.");
        if (!copyButton) console.error("Botão de copiar não encontrado.");
    }
});