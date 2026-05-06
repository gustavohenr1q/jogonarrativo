const prompt = require('prompt-sync')();
require('colors');

// ========================
// ASCII ART
// ========================
function logo() {
  console.clear();

  const atividade = `
     _   _   _       _     _           _          ____                                                                
    / \\ | |_(_)_   _(_) __| | __ _  __| | ___    / ___|  ___ _ __   __ _  ___                                         
   / _ \\| __| \\ \\ / / |/ _\` |/ _\` |/ _\` |/ _ \\   \\___ \\ / _ \\ '_ \\ / _\` |/ __|                                        
  / ___ \\ |_| |\\ V /| | (_| | (_| | (_| |  __/    ___) |  __/ | | | (_| | (__                                         
 /_/   \\_\\__|_| \\_/ |_|\\__,_|\\__,_|\\__,_|\\___|   |____/ \\___|_| |_|\\__,_|\\___|                                        
  ___           _              _                        _             __         _                        _           
 |_ _|_ __  ___| |_ _ __ _   _| |_ ___  _ __   _       | | ___  ___  /_/      __| | ___      __ _ ___ ___(_)___       
  | || '_ \\/ __| __| '__| | | | __/ _ \\| '__| (_)   _  | |/ _ \\/ __|/ _ \\    / _\` |/ _ \\    / _\` / __/ __| / __|      
  | || | | \\__ \\ |_| |  | |_| | || (_) | |     _   | |_| | (_) \\__ \\  __/   | (_| |  __/   | (_| \\__ \\__ \\ \\__ \\      
 |___|_| |_|___/\\__|_|   \\__,_|\\__\\___/|_|    (_)   \\___/ \\___/|___/\\___|    \\__,_|\\___|    \\__,_|___/___/_|___/      
    / \\  | |_   _ _ __   ___    _    / ___|_   _ ___| |_ __ ___   _____     | | | | ___ _ __  _ __(_) __ _ _   _  ___ 
   / _ \\ | | | | | '_ \\ / _ \\  (_)  | |  _| | | / __| __/ _\` \\ \\ / / _ \\    | |_| |/ _ \\ '_ \\| '__| |/ _\` | | | |/ _ \\
  / ___ \\| | |_| | | | | (_) |  _   | |_| | |_| \\__ \\ || (_| |\\ V / (_) |   |  _  |  __/ | | | |  | | (_| | |_| |  __/
 /_/   \\_\\_|\\__,_|_| |_|\\___/  (_)   \\____|\\__,_|___/\\__\\__,_| \\_/ \\___/    |_| |_|\\___|_| |_|_|  |_|\\__, |\\__,_|\\___|
                                                                                                        |_|           
------------------------------------------------
  `;

  console.log(atividade.rainbow);
}

// ========================
// MENU
// ========================
function menu() {
  logo();

  console.log('🎮 Escolha um jogo:\n'.yellow);
  console.log('1 - 🧠 Code Breaker');
  console.log('2 - ⚔️ Arena de Combate');
  console.log('3 - 🎲 Sorte & Azar');
  console.log('4 - 🚪 Mini Aventura');
  console.log('0 - Sair\n');

  let op = prompt('> ');

  if (op === '1') codeBreaker();
  else if (op === '2') arena();
  else if (op === '3') sorteAzar();
  else if (op === '4') aventura();
  else if (op === '0') process.exit();
  else menu();
}

// ========================
// JOGO 1
// ========================
function codeBreaker() {
  console.clear();
  console.log('🧠 CODE BREAKER\n'.cyan);

  const letras = ['A','B','C','D'];
  let codigo = Array.from({length:3}, () => letras[Math.floor(Math.random()*4)]);
  let tentativas = 5;

  while (tentativas > 0) {
    console.log(`Tentativas: ${tentativas}`);
    let palpite = prompt('Digite (A B C): ').toUpperCase().split(' ');

    let resultado = [];

    for (let i = 0; i < 3; i++) {
      if (palpite[i] === codigo[i]) resultado.push('✅');
      else if (codigo.includes(palpite[i])) resultado.push('🔄');
      else resultado.push('❌');
    }

    console.log(resultado.join(' '));

    if (resultado.every(r => r === '✅')) {
      console.log('🎉 Vitória!'.green);
      break;
    }

    tentativas--;
  }

  prompt('\nENTER...');
  menu();
}

// ========================
// JOGO 2
// ========================
function arena() {
  console.clear();
  console.log('⚔️ ARENA\n'.red);

  let vida = 5;
  let inimigo = 5;

  while (vida > 0 && inimigo > 0) {
    console.log(`Você: ${vida} | Inimigo: ${inimigo}`);

    console.log('1 - Atacar');
    console.log('2 - Defender');
    console.log('3 - Especial\n');

    let op = prompt('> ');

    if (op === '1') inimigo--;
    else if (op === '2') console.log('Defendeu!');
    else if (op === '3' && Math.random() < 0.5) {
      console.log('Crítico!');
      inimigo -= 2;
    }

    if (Math.random() < 0.7) vida--;
  }

  console.log(vida > 0 ? '🏆 Vitória!' : '💀 Derrota');

  prompt('\nENTER...');
  menu();
}

// ========================
// JOGO 3
// ========================
function sorteAzar() {
  console.clear();
  console.log('🎲 SORTE & AZAR\n'.yellow);

  let saldo = 10;

  while (saldo > 0) {
    console.log(`Saldo: ${saldo}`);
    console.log('1 - Jogar');
    console.log('0 - Sair\n');

    let op = prompt('> ');

    if (op === '0') break;

    let r = Math.random();

    if (r < 0.3) saldo += 5;
    else if (r < 0.6) saldo -= 3;

    console.log(`Novo saldo: ${saldo}`);
  }

  prompt('\nENTER...');
  menu();
}

// ========================
// JOGO 4
// ========================
function aventura() {
  console.clear();
  console.log('🏰 AVENTURA\n'.green);

  let vida = 3;

  while (vida > 0) {
    console.log(`Vida: ${vida}`);
    console.log('1 - Porta esquerda');
    console.log('2 - Porta direita');
    console.log('0 - Sair\n');

    let op = prompt('> ');

    if (op === '0') break;

    if (Math.random() < 0.5) {
      console.log('😈 Armadilha!');
      vida--;
    } else {
      console.log('✨ Seguro!');
    }
  }

  console.log(vida > 0 ? 'Você escapou!' : '💀 Morreu');

  prompt('\nENTER...');
  menu();
}

// ========================
menu();