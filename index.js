const prompt = require('prompt-sync')();
require('colors');

// ========================
// UTILIDADES
// ========================
function limpar() {
  console.clear();
}

function pausar() {
  prompt('\nPressione ENTER para voltar ao menu...');
}

function linha(tamanho = 58) {
  return '═'.repeat(tamanho);
}

function titulo(texto) {
  console.log(`\n╔${linha()}╗`.cyan);
  console.log(`║${texto.padStart((58 + texto.length) / 2).padEnd(58)}║`.cyan);
  console.log(`╚${linha()}╝\n`.cyan);
}

// ========================
// CONFIRMAR SAÍDA
// ========================
function confirmarSaida() {
  console.log('\nTem certeza que deseja sair?'.yellow);
  console.log('1 - Sim');
  console.log('2 - Não\n');

  const sair = prompt('> ');

  if (sair === '1') {
    menu();
    return true;
  }

  return false;
}

// ========================
// CARDS
// ========================
function tamanhoVisivel(texto) {
  return texto
    .replace(/\u001b\[[0-9;]*m/g, '')
    .replace(/[\u{1F300}-\u{1FAFF}]/gu, '  ')
    .length;
}

function ajustarTexto(texto, largura) {
  const tamanho = tamanhoVisivel(texto);
  return texto + ' '.repeat(Math.max(0, largura - tamanho));
}

function card(numero, emoji, nome, descricao, cor = 'white') {
  const largura = 52;

  const linha1 = ` ${numero}   ${emoji}  ${nome}`;
  const linha2 = `     ${descricao}`;

  console.log(`╭${'─'.repeat(largura)}╮`[cor]);
  console.log(`│${ajustarTexto(linha1, largura)}│`[cor]);
  console.log(`│${ajustarTexto(linha2, largura)}│`[cor]);
  console.log(`╰${'─'.repeat(largura)}╯`[cor]);
}

// ========================
// LOGO
// ========================
function logo() {
  limpar();

  console.log(`
   ██████╗ ██╗  ██╗███████╗     ██████╗  █████╗ ███╗   ███╗███████╗███████╗
  ██╔════╝ ██║  ██║██╔════╝    ██╔════╝ ██╔══██╗████╗ ████║██╔════╝██╔════╝
  ██║  ███╗███████║███████╗    ██║  ███╗███████║██╔████╔██║█████╗  ███████╗
  ██║   ██║██╔══██║╚════██║    ██║   ██║██╔══██║██║╚██╔╝██║██╔══╝  ╚════██║
  ╚██████╔╝██║  ██║███████║    ╚██████╔╝██║  ██║██║ ╚═╝ ██║███████╗███████║
   ╚═════╝ ╚═╝  ╚═╝╚══════╝     ╚═════╝ ╚═╝  ╚═╝╚═╝     ╚═╝╚══════╝╚══════╝
  `.cyan);

  console.log('                  MENU PRINCIPAL DE JOGOS'.brightWhite);
  console.log('              Escolha uma opção para começar\n'.gray);
}

// ========================
// MENU
// ========================
function menu() {
  logo();

  card('1', '🧠', 'Code Breaker', 'Descubra o código secreto', 'cyan');
  card('2', '⚔️ㅤ', 'Arena de Combate', 'Batalhe contra um inimigo', 'red');
  card('3', '💎', 'Caça ao Tesouro', 'Abra baús e fuja das armadilhas', 'yellow');
  card('4', '🚪', 'Mini Aventura', 'Escolha portas e sobreviva', 'green');
  console.log('\nㅤㅤㅤㅤㅤㅤㅤDigite 0 para sair do jogo.\n'.gray);

  const op = prompt('\nEscolha uma opção: '.brightWhite);

  switch (op) {
    case '1':
      codeBreaker();
      break;

    case '2':
      arena();
      break;

    case '3':
      cacaTesouro();
      break;

    case '4':
      aventura();
      break;

    case '0':
      console.log('\nTem certeza que deseja encerrar o programa?'.yellow);
      console.log('1 - Sim');
      console.log('2 - Não\n');

      const sair = prompt('> ');

      if (sair === '1') {
        limpar();
        console.log('Até a próxima! 👋'.cyan);
        process.exit();
      }

      menu();
      break;

    default:
      console.log('\nOpção inválida!'.red);
      pausar();
      menu();
  }
}

// ========================
// JOGO 1
// ========================
function codeBreaker() {
  limpar();
  titulo('🧠 CODE BREAKER');

  const letras = ['A', 'B', 'C', 'D'];

  const codigo = Array.from(
    { length: 3 },
    () => letras[Math.floor(Math.random() * letras.length)]
  );

  let tentativas = 5;

  console.log('Descubra o código secreto usando A, B, C e D.'.gray);
  console.log('IMPORTANTE: digite as letras separadas por espaço.'.yellow);
  console.log('Exemplo correto: A B C'.green);
  console.log('Exemplo errado: ABC, CBA ou ADCB'.red);
  console.log('\nDigite 0 para sair do jogo.\n'.gray);

  while (tentativas > 0) {
    console.log(`Tentativas restantes: ${tentativas}`.yellow);

    const entrada = prompt('Digite seu palpite: ')
      .toUpperCase()
      .trim();

    if (entrada === '0') {
      if (confirmarSaida()) return;
      continue;
    }

    const palpite = entrada.split(' ');

    if (
      palpite.length !== 3 ||
      palpite.some(letra => !letras.includes(letra))
    ) {
      console.log('\nDigite exatamente 3 letras separadas por espaço. Exemplo: A B C\n'.red);
      continue;
    }

    const resultado = [];

    for (let i = 0; i < 3; i++) {
      if (palpite[i] === codigo[i]) {
        resultado.push('✅');
      } else if (codigo.includes(palpite[i])) {
        resultado.push('🔄');
      } else {
        resultado.push('❌');
      }
    }

    console.log(`Resultado: ${resultado.join(' ')}\n`);

    if (resultado.every(r => r === '✅')) {
      console.log('🎉 Você venceu!'.green);
      pausar();
      return menu();
    }

    tentativas--;
  }

  console.log(`💀 Você perdeu! Código era: ${codigo.join(' ')}`.red);

  pausar();
  menu();
}

// ========================
// JOGO 2
// ========================
function arena() {
  limpar();
  titulo('⚔️ ARENA DE COMBATE');

  let vida = 10;
  let inimigo = 10;
  let especialUsado = false;

  while (vida > 0 && inimigo > 0) {
    console.log(`❤️ Você: ${vida} | 👹 Inimigo: ${inimigo}\n`.brightWhite);

    console.log('1 - Atacar'.cyan);
    console.log('2 - Defender'.cyan);
    console.log('3 - Especial'.magenta);
    console.log('0 - Sair do jogo'.gray);

    const op = prompt('\nEscolha sua ação: ');

    if (op === '0') {
      if (confirmarSaida()) return;
      continue;
    }

    let defendendo = false;

    if (op === '1') {
      const dano = Math.floor(Math.random() * 3) + 1;
      inimigo -= dano;
      console.log(`\n⚔️ Você causou ${dano} de dano!\n`.green);
    } else if (op === '2') {
      defendendo = true;
      console.log('\n🛡️ Você se defendeu!\n'.yellow);
    } else if (op === '3') {
      if (especialUsado) {
        console.log('\n❌ Especial já utilizado!\n'.red);
      } else {
        const dano = Math.floor(Math.random() * 6) + 3;
        inimigo -= dano;
        especialUsado = true;
        console.log(`\n🔥 ATAQUE CRÍTICO! ${dano} de dano!\n`.magenta);
      }
    } else {
      console.log('\n❌ Opção inválida!\n'.red);
      continue;
    }

    if (inimigo <= 0) break;

    const danoInimigo = defendendo
      ? 1
      : Math.floor(Math.random() * 3) + 1;

    vida -= danoInimigo;

    console.log(`👹 O inimigo causou ${danoInimigo} de dano!\n`.red);
  }

  console.log(
    vida > 0
      ? '\n🏆 Você venceu a batalha!'.green
      : '\n💀 Você foi derrotado!'.red
  );

  pausar();
  menu();
}

// ========================
// JOGO 3
// ========================
function cacaTesouro() {
  limpar();
  titulo('💎 CAÇA AO TESOURO');

  let moedas = 0;
  let rodadas = 1;
  const maxRodadas = 6;

  console.log('Abra baús e tente ficar rico.'.gray);
  console.log('Mas cuidado com as armadilhas!\n'.gray);

  while (rodadas <= maxRodadas) {
    console.log(`🏁 Rodada: ${rodadas}/${maxRodadas}`.cyan);
    console.log(`💰 Moedas: ${moedas}\n`.yellow);

    console.log('1 - Baú Antigo'.green);
    console.log('2 - Baú Dourado'.yellow);
    console.log('3 - Baú Sombrio'.magenta);
    console.log('0 - Sair do jogo'.gray);

    const op = prompt('\nEscolha um baú: ');

    if (op === '0') {
      if (confirmarSaida()) return;
      continue;
    }

    if (!['1', '2', '3'].includes(op)) {
      console.log('\n❌ Opção inválida!\n'.red);
      continue;
    }

    const evento = Math.random();

    if (evento < 0.25) {
      const perda = Math.min(
        moedas,
        Math.floor(Math.random() * 6) + 3
      );

      moedas -= perda;

      console.log(`\n💀 Armadilha! Você perdeu ${perda} moedas.\n`.red);
    } else if (evento < 0.55) {
      const ganho = Math.floor(Math.random() * 6) + 4;

      moedas += ganho;

      console.log(`\n💎 Você encontrou ${ganho} moedas!\n`.green);
    } else if (evento < 0.8) {
      const ganho = Math.floor(Math.random() * 10) + 8;

      moedas += ganho;

      console.log(`\n👑 Tesouro raro! +${ganho} moedas!\n`.yellow);
    } else {
      moedas *= 2;

      console.log('\n🔥 RELÍQUIA LENDÁRIA! Suas moedas dobraram!\n'.magenta);
    }

    if (moedas >= 25) {
      console.log('\n🏆 Você ficou rico e venceu!\n'.green);
      pausar();
      return menu();
    }

    rodadas++;
  }

  if (moedas < 25) {
    console.log(`\n💀 Você terminou com apenas ${moedas} moedas.\n`.red);
  }

  pausar();
  menu();
}

// ========================
// JOGO 4
// ========================
function aventura() {
  limpar();
  titulo('🚪 MINI AVENTURA');

  let vida = 3;
  let salas = 0;

  while (vida > 0) {
    console.log(`❤️ Vida: ${vida} | 🏰 Salas: ${salas}\n`.brightWhite);

    console.log('1 - Porta esquerda'.cyan);
    console.log('2 - Porta direita'.cyan);
    console.log('3 - Porta misteriosa'.magenta);
    console.log('0 - Sair do jogo'.gray);

    const op = prompt('\nEscolha uma porta: ');

    if (op === '0') {
      if (confirmarSaida()) return;
      continue;
    }

    if (!['1', '2', '3'].includes(op)) {
      console.log('\n❌ Opção inválida!\n'.red);
      continue;
    }

    const evento = Math.random();

    if (evento < 0.35) {
      vida--;
      console.log('\n😈 Armadilha! Você perdeu 1 vida.\n'.red);
    } else if (evento < 0.65) {
      salas++;
      console.log('\n✨ Caminho seguro!'.green);
    } else {
      vida++;
      salas++;
      console.log('\n💖 Você encontrou uma poção!\n'.yellow);
    }

    if (salas >= 5) {
      console.log('\n🏆 Você escapou da dungeon!\n'.green);
      pausar();
      return menu();
    }
  }

  if (vida <= 0) {
    console.log('\n💀 Você morreu na aventura!\n'.red);
  }

  pausar();
  menu();
}

// ========================
// INICIAR
// ========================
menu();