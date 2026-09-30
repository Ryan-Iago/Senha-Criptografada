// Dicionários para substituição por símbolos (Codificação e Decodificação)
const mapaSimbolos = {
  'a': '@', 'A': '@',
  'e': '3', 'E': '3',
  'i': '!', 'I': '!',
  'o': '0', 'O': '0',
  's': '$', 'S': '$',
  't': '7', 'T': '7',
  'b': '8', 'B': '8'
};

// Inverte o dicionário para decodificar os símbolos
const mapaSimbolosInverso = {};
for (let key in mapaSimbolos) {
  mapaSimbolosInverso[mapaSimbolos[key]] = key.toLowerCase();
}

// Troca de Abas
function switchTab(tabName) {
  document.querySelectorAll('.tab-content').forEach(el => el.classList.remove('active'));
  document.querySelectorAll('.tab-btn').forEach(el => el.classList.remove('active'));

  if (tabName === 'encoder') {
    document.getElementById('tab-encoder').classList.add('active');
    event.target.classList.add('active');
  } else {
    document.getElementById('tab-about').classList.add('active');
    event.target.classList.add('active');
  }
}

function codificar() {
  const input = document.getElementById('passwordInput').value;
  const stepsDiv = document.getElementById('steps');
  
  if (!input) {
    stepsDiv.innerHTML = '<p style="color: #f87171; text-align: center;">Por favor, insira uma senha.</p>';
    return;
  }

  // --- CODIFICAÇÃO ---

  // Etapa 1: Inversão do texto
  const etapa1 = input.split('').reverse().join('');

  // Etapa 2: Cifra de César (+3)
  const etapa2 = etapa1.split('').map(char => {
    return String.fromCharCode(char.charCodeAt(0) + 3);
  }).join('');

  // Etapa 3: Mapeamento de Símbolos
  const etapa3 = etapa2.split('').map(char => {
    return mapaSimbolos[char] || char;
  }).join('');

  // --- DECODIFICAÇÃO (Etapa 4 - Verificação) ---

  // Passos inversos: 
  // 1. Reverter Símbolos
  const reversoSimbolos = etapa3.split('').map(char => mapaSimbolosInverso[char] || char).join('');
  
  // 2. Reverter Cifra de César (-3)
  const reversoCesar = reversoSimbolos.split('').map(char => String.fromCharCode(char.charCodeAt(0) - 3)).join('');
  
  // 3. Reverter Inversão de texto
  const etapa4 = reversoCesar.split('').reverse().join('');

  // Renderização
  stepsDiv.innerHTML = `
    <div class="step-card">
      <div class="step-title">Etapa 1: Inversão do Texto</div>
      <div class="step-desc">Inverte a ordem completa dos caracteres da senha.</div>
      <div class="step-result">${escapeHTML(etapa1)}</div>
    </div>

    <div class="step-card">
      <div class="step-title">Etapa 2: Cifra de César (+3)</div>
      <div class="step-desc">Avança cada caractere em +3 posições na tabela de códigos.</div>
      <div class="step-result">${escapeHTML(etapa2)}</div>
    </div>

    <div class="step-card final-step">
      <div class="step-title">Etapa 3: Substituição por Símbolos</div>
      <div class="step-desc">Substitui caracteres por símbolos visuais.</div>
      <div class="step-result">${escapeHTML(etapa3)}</div>
    </div>

    <div class="step-card verify-step">
      <div class="step-title">Etapa 4: Decodificação (Verificação)</div>
      <div class="step-desc">Aplica o processo inverso para confirmar se o texto retorna ao estado original.</div>
      <div class="step-result">${escapeHTML(etapa4)}</div>
    </div>
  `;
}

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

window.onload = codificar;
