import "./navegacion/sidebar";
import "./news/news"
import "./carousel/carousel"
import { navigate } from "../../store/actions";
import { Screens } from "../../types/navigation";
import { buscarNoticiasPorTermino } from './news/news';
import styles from "./styles.css";

class ExploreBar extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: "open" });
    }

    connectedCallback() {
        this.render();
        const searchInput = this.shadowRoot!.getElementById('searchInput') as HTMLInputElement;
        searchInput.addEventListener('input', (event) => {
            const searchTerm = searchInput.value;
            const noticiasFiltradas = buscarNoticiasPorTermino(searchTerm);
            this.mostrarNoticiasFiltradas(noticiasFiltradas);
            this.mostrarResultadosCompatibles(noticiasFiltradas);
        });
    }

    mostrarResultadosCompatibles(noticias: any[]) {
        const searchResults = this.shadowRoot!.querySelector('.search-results');
        searchResults!.innerHTML = noticias.map(noticia => `
            <div class="search-result">${noticia.titulo}</div>
        `).join('');
    }

    mostrarNoticiasFiltradas(noticias: any[]) {
       
    }

    render() {  if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``;
  
        const css = this.ownerDocument.createElement("style");
        css.innerHTML = styles;
        this.shadowRoot?.appendChild(css);
  
        this.shadowRoot!.innerHTML = `
            <link rel="stylesheet" href="./styles.css">
            <div class="container">
                <sidebar-component></sidebar-component>
            </div>

            <div class="content">
                <div class="static-zone">
                   
    
                    <div class="bottom-text-container">
                        <div class="bottom-text">For you</div>
                        <div class="bottom-text2">Following</div>
                    </div>
                    <div class="post-input">
                        <mediaimgs-container></mediaimgs-containerr>
                    </div>
                </div>
                <input type="text" id="searchInput" placeholder="Buscar...">
                <div class="search-results"></div>
                <div class="tweet-blocks">
                    <world-updates</world-updates>
                </div>
            </div>
        `;
    }
 }
}

customElements.define("explore-bar", ExploreBar);
export default ExploreBar;