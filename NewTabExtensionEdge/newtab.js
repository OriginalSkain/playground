document.addEventListener('DOMContentLoaded', function () {
    const container = document.getElementById('icon-container');
    const addIconButton = document.getElementById('add-icon');
    const toggleModeButton = document.getElementById('toggle-mode');

    let isDesignMode = false;

    function loadIcons() {
        chrome.storage.sync.get(['icons'], function (result) {
            container.innerHTML = '';
            const icons = result.icons || [];
            icons.forEach((icon, index) => {
                const img = document.createElement('img');
                img.src = icon.url;
                img.title = icon.name;

                if (isDesignMode) {
                    const deleteButton = document.createElement('button');
                    deleteButton.textContent = 'Delete';
                    deleteButton.addEventListener('click', () => {
                        if (confirm('Are you sure you want to delete this icon?')) {
                            icons.splice(index, 1);
                            chrome.storage.sync.set({ icons }, loadIcons);
                        }
                    });
                    const iconContainer = document.createElement('div');
                    iconContainer.appendChild(img);
                    iconContainer.appendChild(deleteButton);
                    container.appendChild(iconContainer);
                } else {
                    img.addEventListener('click', () => {
                        window.location.href = icon.link;
                    });
                    container.appendChild(img);
                }
            });
        });
    }

    function addIcon() {
        const name = prompt('Enter icon name:');
        if (!name) return;
        const link = prompt('Enter icon link:');
        if (!link) return;
        const url = prompt('Enter icon image URL:');
        if (!url) return;

        chrome.storage.sync.get(['icons'], function (result) {
            const icons = result.icons || [];
            icons.push({ name, link, url });
            chrome.storage.sync.set({ icons }, loadIcons);
        });
    }

    function toggleMode() {
        isDesignMode = !isDesignMode;
        addIconButton.style.display = isDesignMode ? 'block' : 'none';
        toggleModeButton.textContent = isDesignMode ? 'Switch to Normal Mode' : 'Switch to Design Mode';
        loadIcons();
    }

    addIconButton.addEventListener('click', addIcon);
    toggleModeButton.addEventListener('click', toggleMode);

    loadIcons();
});
