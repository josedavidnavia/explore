import * as styles from './styles.css'

export default class carousel extends HTMLElement {
    private images: string[];
    private currentIndex: number;

    constructor() {
        super();
        this.attachShadow({ mode: 'open' });

        this.images = [
            'image1.jpg',
            'image2.jpg',
            'image3.jpg',
            // Agrega más URLs de imágenes según sea necesario
        ];

        this.currentIndex = 0;
    }

    connectedCallback() {
        this.render();

        const prevButton = this.shadowRoot!.querySelector('#prevButton') as HTMLButtonElement;
        const nextButton = this.shadowRoot!.querySelector('#nextButton') as HTMLButtonElement;

        prevButton.addEventListener('click', () => {
            this.showPreviousImage();
        });

        nextButton.addEventListener('click', () => {
            this.showNextImage();
        });
    }

    private showPreviousImage(): void {
        this.currentIndex = (this.currentIndex - 1 + this.images.length) % this.images.length;
        this.updateImage();
    }

    private showNextImage(): void {
        this.currentIndex = (this.currentIndex + 1) % this.images.length;
        this.updateImage();
    }

    private updateImage(): void {
        const imageElement = this.shadowRoot!.querySelector('#image') as HTMLImageElement;
        imageElement.src = this.images[this.currentIndex];
    }

    private render(): void {
       
            this.shadowRoot!.innerHTML +=  `
            <link rel="stylesheet" href="./carousel/styles.css">
            <div class="imageCarousel">
                <img id="image" src="${this.images[this.currentIndex]}" alt="Carousel Image">
                <div class="navButtons">
                    <button id="prevButton">&lt;</button>
                    <button id="nextButton">&gt;</button>
                </div>
            </div>
        `;

    }
}

customElements.define('mediaimgs-container', carousel);
