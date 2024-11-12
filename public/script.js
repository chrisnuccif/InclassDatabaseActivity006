document.addEventListener('DOMContentLoaded', () => {
    const paintingList = document.getElementById('painting-list');
    const editForm = document.getElementById('edit-form');

    // Fetch all paintings and populate the list
    fetch('/api/paintings')
        .then(response => response.json())
        .then(data => {
            data.forEach(painting => {
                const button = document.createElement('button');
                button.textContent = painting.title;
                button.addEventListener('click', () => loadPainting(painting));
                paintingList.appendChild(button);
            });
        });

    editForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        const id = editForm.dataset.id;
        const updatedPainting = {
            title: document.getElementById('title').value,
            artist: document.getElementById('artist').value,
            year: parseInt(document.getElementById('year').value),
            description: document.getElementById('description').value,
            image: document.getElementById('image').value
        };

        await fetch(`/api/paintings/${id}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(updatedPainting)
        });

        alert('Painting updated!');
    });

    function loadPainting(painting) {
        editForm.dataset.id = painting._id;
        document.getElementById('title').value = painting.title;
        document.getElementById('artist').value = painting.artist;
        document.getElementById('year').value = painting.year;
        document.getElementById('description').value = painting.description;
        document.getElementById('image').value = painting.image;
    }
});
