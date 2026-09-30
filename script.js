// Dicionário de conversão para a substituição final de símbolos
const mapaSimbolos = {
  'a': '@', 'A': '@',
  'e': '3', 'E': '3',
  'i': '!', 'I': '!',
  'o': '0', 'O': '0',
  's': '$', 'S': '$',
  't': '7', 'T': '7',
  'b': '8', 'B': '8'
};

function codificar() {
  const input = document.getElementById('passwordInput').value;
  const stepsDiv = document.getElementById('steps');
  
  if (!input) {
    stepsDiv.innerHTML = '<p style="color: #f87171; text-align: center;">Por favor, insira uma senha.</p>';
    return;
  }

  // Etapa 1: Inversão dos caracteres
  const etapa1 = input.split('').reverse().join('');

  // Etapa 2: Cifra de César (+3 posições na tabela ASCII)
  const etapa2 = etapa1.split('').map(char => {
    const code = char.charCodeAt(0);
    return String.fromCharCode(code + 3);
  }).join('');

  // Etapa 3: Mapeamento e substituição por símbolos
  const etapa3 = etapa2.split('').map(char => {
    return mapaSimbolos[char] || char;
  }).join('');

  // Renderização das etapas na tela
  stepsDiv.innerHTML = `
    <div class="step-card">
      <div class="step-title">Etapa 1: Inversão do Texto</div>
      <div class="step-desc">Inverte a ordem completa de todos os caracteres da senha.</div>
      <div class="step-result">${escapeHTML(etapa1)}</div>
    </div>

    <div class="step-card">
      <div class="step-title">Etapa 2: Cifra de César (+3)</div>
      <div class="step-desc">Avança cada caractere em +3 posições na tabela ASCII.</div>
      <div class="step-result">${escapeHTML(etapa2)}</div>
    </div>

    <div class="step-card final-step">
      <div class="step-title">Etapa 3: Substituição por Símbolos (Resultado Final)</div>
      <div class="step-desc">Substitui letras específicas por números e caracteres especiais.</div>
      <div class="step-result">${escapeHTML(etapa3)}</div>
    </div>
  `;
}

// Trata os caracteres HTML para evitar quebras visuais de tags na tela
function escapeHTML(str) {
  return str.replace(/[&<>'"]/g, 
    tag => ({
      '&': '&amp;',
      '<': '&lt;',
      '>': '&gt;',
      "'": '&#39;',
      '"': '&quot;'
    }[tag] || tag)
  );
}

// Roda a primeira codificação assim que a página é carregada
window.onload = codificar;
