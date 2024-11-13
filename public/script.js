document.addEventListener('DOMContentLoaded', () => {
    const paintingList = document.getElementById('painting-list');
    const editForm = document.getElementById('edit-form');
    const saveButton = document.getElementById('save');
    const resetButton = document.getElementById('reset');

    let currentPaintingId;

    // Fetch and display all paintings
    fetchPaintings();

    async function fetchPaintings() {
        try {
            const response = await fetch('/api/paintings');
            const paintings = await response.json();
            
            paintingList.innerHTML = '';

            if (paintings.length === 0) {
                paintingList.innerHTML = '<p>No paintings found.</p>';
                return;
            }

            paintings.forEach(painting => {
                const container = document.createElement('div');
                container.classList.add('painting-item');

                const img = document.createElement('img');
                const imagePath = `/images/${painting.ImageFileName}`;
                img.src = imagePath;
                img.style.width = '100px';
                img.style.height = 'auto';
                
                img.onerror = () => img.src = '/images/dummyImage.jpg';

                const button = document.createElement('button');
                button.textContent = painting.Title;
                button.addEventListener('click', () => loadPainting(painting));

                container.appendChild(img);
                container.appendChild(button);
                paintingList.appendChild(container);
            });
        } catch (error) {
            console.error('Error fetching paintings:', error);
        }
    }

    function loadPainting(painting) {
        currentPaintingId = painting._id;
        document.getElementById('title').value = painting.Title;
        document.getElementById('artist').value = painting.LastName;
        document.getElementById('year').value = painting.YearOfWork;
        document.getElementById('description').value = painting.Description;
        document.getElementById('image').value = painting.ImageFileName;
    }

    saveButton.addEventListener('click', async (e) => {
        e.preventDefault();

        if (!currentPaintingId) {
            alert("No painting selected!");
            return;
        }

        const updatedPainting = {
            Title: document.getElementById('title').value,
            LastName: document.getElementById('artist').value,
            YearOfWork: parseInt(document.getElementById('year').value, 10),
            Description: document.getElementById('description').value,
            ImageFileName: document.getElementById('image').value
        };
        

        try {
            const response = await fetch(`/api/paintings/${currentPaintingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(updatedPainting)
            });

            const result = await response.json();
            if (response.ok) {
                alert(result.message);
                fetchPaintings();
            }
        } catch (error) {
            console.error('Error updating painting:', error);
        }
    });

    resetButton.addEventListener('click', () => editForm.reset());
});
