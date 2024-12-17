let timerInterval;
let startTime = 0;
let running = false;

// Start/Stop Timer
document.getElementById('startStopButton').addEventListener('click', () => {
    const button = document.getElementById('startStopButton');
    if (!running) {
        button.textContent = 'STOP';
        running = true;
        startTimer();
        generateWallets(); // Timer başladığında cüzdan akışı başlasın
    } else {
        button.textContent = 'START';
        running = false;
        clearInterval(timerInterval);
    }
});
// Coin Seçme Bölümü
let coinMenu = document.getElementById('coinMenu');
let openCoinSelector = document.getElementById('openCoinSelector');
let confirmCoin = document.getElementById('confirmCoin');

openCoinSelector.addEventListener('click', () => {
    coinMenu.style.display = 'flex';
});

confirmCoin.addEventListener('click', () => {
    coinMenu.style.display = 'none';
});


function startTimer() {
    const timerElement = document.getElementById('timer');
    const updateTimer = () => {
        startTime += 10;
        let time = new Date(startTime);
        timerElement.textContent = time.toISOString().substring(11, 22);
    };
    timerInterval = setInterval(updateTimer, 10);
}

// Wallet Akışı
let walletCheckedCount = 0;
let walletFoundCount = 0;

const walletsDiv = document.getElementById('wallets');
const foundWalletsDiv = document.getElementById('foundWallets');

function generateWallets() {
    const maxWallets = 100; // Gösterilecek maksimum cüzdan sayısı
    const interval = setInterval(() => {
        if (!running) return; // Timer durduğunda akış durur

        // Checked sayısını artır
        walletCheckedCount++;
        document.getElementById('checkedCount').textContent = walletCheckedCount;

        // Yeni bir wallet elemanı oluştur
        const walletLine = document.createElement('div');
        walletLine.textContent = `Balance: 0.00 || Wallet check: ${randomWords()}`;
        walletLine.style.color = '#0af';

        // Eğer maksimum eleman sayısına ulaşıldıysa, en alttaki elemanı kaldır
        if (walletsDiv.children.length >= maxWallets) {
            walletsDiv.removeChild(walletsDiv.lastElementChild);
        }

        // Yeni elemanı en üste ekle
        walletsDiv.insertBefore(walletLine, walletsDiv.firstChild);

        // Rastgele bakiyeli cüzdan bulma simülasyonu
        if (Math.random() < 0.00000000000001) {
            walletFoundCount++;
            document.getElementById('foundCount').textContent = walletFoundCount;

            const foundLine = document.createElement('div');
            foundLine.textContent = `Balance: ${Math.random().toFixed(8)} ($${(Math.random() * 100).toFixed(4)}) || Wallet found`;
            foundLine.style.color = '#0f0';
            foundWalletsDiv.appendChild(foundLine);
        }
    }, 50);

    return interval;
}

function randomWords() {
    const words = ["coin", "wallet", "block", "token", "key", "crypto", "value", "check", "node", "address"];
    const wordCount = 3; // Kaç kelime oluşturulacağını belirler
    let result = [];
    for (let i = 0; i < wordCount; i++) {
        result.push(words[Math.floor(Math.random() * words.length)]);
    }
    return result.join(" ");
}