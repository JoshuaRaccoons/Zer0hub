const repoPath = 'JoshuaRaccoons/Zer0hub/Images';

const apiUrl = `https://api.github.com/repos/JoshuaRaccoons/Zer0hub/contents/Images`;

async function fetchImages() {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();
        const galleryElement = document.getElementById('gallery');
        const modal = document.getElementById('imageModal');
        const modalImg = document.getElementById('modalImg');
        const captionText = document.getElementById('caption');
        const span = document.getElementsByClassName("close")[0];

        data.forEach(file => {
            if(file.name.match(/\.(jpg|jpeg|png|gif)$/)) {
                const imgElement = document.createElement('img');
                imgElement.src = file.download_url;
                imgElement.alt = file.name;

                imgElement.onclick = function(){
                    modal.style.display = "block";
                    modalImg.src = this.src;
                    captionText.innerHTML = this.alt;
                }

                const card = document.createElement('div');
                card.className = 'card';
                card.appendChild(imgElement);

                const container = document.createElement('div');
                container.className = 'container';
                const text = document.createElement('p');
                text.innerText = 'Image description or title';
                container.appendChild(text);
                card.appendChild(container);

                galleryElement.appendChild(card);
            }
        });

        // Close the modal when the user clicks on <span> (x)
        span.onclick = function() {
            modal.style.display = "none";
        }

        // Optional: Close modal if clicked outside the modal content
        window.onclick = function(event) {
            if (event.target == modal) {
                modal.style.display = "none";
            }
        }
    } catch (error) {
        console.error('Error fetching images:', error);
    }
}

fetchImages(); // Call the async function
