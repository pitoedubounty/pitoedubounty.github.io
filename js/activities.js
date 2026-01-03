document.addEventListener('DOMContentLoaded', () => {
    const timelineContainer = document.querySelector('.timeline');

    // Show loading state
    timelineContainer.innerHTML = '<p style="text-align:center; color: var(--neon-green);">Faaliyetler yükleniyor...</p>';

    fetch('data/activities.json?v=' + new Date().getTime())
        .then(response => response.json())
        .then(data => {
            timelineContainer.innerHTML = ''; // Clear loading message

            data.forEach(monthData => {
                const timelineItem = document.createElement('div');
                timelineItem.className = 'timeline-item';

                let contentHtml = `
                    <div class="timeline-content">
                        <h3>${monthData.month}</h3>
                `;

                // Handle simple date-based items (e.g. January 2026)
                if (monthData.items && monthData.items.length > 0) {
                    monthData.items.forEach(item => {
                        contentHtml += `
                            <p><strong>${item.date}:</strong> ${item.description}</p>
                            <br>
                        `;
                    });
                }

                // Handle numbered list items (e.g. Nov/Dec 2025)
                if (monthData.list && monthData.list.length > 0) {
                    contentHtml += `<div class="activity-list">`;
                    monthData.list.forEach((item, index) => {
                        contentHtml += `
                            <p><strong>${index + 1}. ${item.title}:</strong> ${item.description}</p>
                        `;
                    });
                    contentHtml += `</div>`;
                }

                contentHtml += `</div>`;
                timelineItem.innerHTML = contentHtml;
                timelineContainer.appendChild(timelineItem);
            });
        })
        .catch(error => {
            console.error('Error loading activities:', error);
            timelineContainer.innerHTML = '<p style="text-align:center; color: #ff5f56;">Faaliyetler yüklenirken bir hata oluştu.</p>';
        });
});
