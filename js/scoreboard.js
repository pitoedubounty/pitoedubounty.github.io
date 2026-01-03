document.addEventListener('DOMContentLoaded', () => {
    const scoreboardBody = document.getElementById('scoreboard-body');
    const lastUpdateSpan = document.getElementById('last-update');

    if (!scoreboardBody) return;

    fetch('data/scoreboard.json')
        .then(response => {
            if (!response.ok) {
                throw new Error('Veri çekilemedi');
            }
            return response.json();
        })
        .then(jsonData => {
            // API response format: { success: true, data: [...] }
            const players = jsonData.data || [];
            
            // Clear loading state
            scoreboardBody.innerHTML = '';

            // Take top 10
            players.slice(0, 10).forEach((player, index) => {
                const tr = document.createElement('tr');
                
                // Add trophy icon for top 3
                let rankDisplay = player.pos;
                if (player.pos === 1) rankDisplay = '🥇 1';
                if (player.pos === 2) rankDisplay = '🥈 2';
                if (player.pos === 3) rankDisplay = '🥉 3';

                tr.innerHTML = `
                    <td style="color: var(--neon-blue); font-weight: bold;">${rankDisplay}</td>
                    <td style="color: #fff;">${escapeHtml(player.name)}</td>
                    <td style="color: var(--neon-green); font-family: var(--font-mono);">${player.score}</td>
                `;
                scoreboardBody.appendChild(tr);
            });

            if (lastUpdateSpan) {
                const now = new Date();
                lastUpdateSpan.textContent = now.toLocaleDateString('tr-TR');
            }
        })
        .catch(error => {
            console.error('Scoreboard hatası:', error);
            scoreboardBody.innerHTML = '<tr><td colspan="3" style="color: red;">Veri yüklenemedi. Bağlantıyı kontrol edin.</td></tr>';
        });

    function escapeHtml(text) {
        if (!text) return '';
        return text
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;")
            .replace(/"/g, "&quot;")
            .replace(/'/g, "&#039;");
    }
});
