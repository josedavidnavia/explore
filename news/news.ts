import noticias from "./data";

interface Noticia {
    titulo: string;
    posts: number;
    hashtags: string[];
}

export function filtrarNoticiasPorTermino(termino: string): Noticia[] {
    return noticias.filter((noticia: Noticia) => noticia.titulo.toLowerCase().includes(termino.toLowerCase()));
}

export function buscarNoticiasPorTermino(termino: string): Noticia[] {
    return noticias.filter((noticia: Noticia) => noticia.titulo.toLowerCase().includes(termino.toLowerCase()));
}

class news extends HTMLElement {
    constructor() {
        super();
        this.attachShadow({ mode: 'open' });
    }

    connectedCallback() {
        this.render();
    }

    render() { if (this.shadowRoot) {
        this.shadowRoot.innerHTML = ``;
  
        const css = this.ownerDocument.createElement("style");
        //css.innerHTML = styles;
        this.shadowRoot?.appendChild(css);

        this.shadowRoot!.innerHTML = `
            <link rel="stylesheet" href="./news/styles.css">
            <div class="news-container">
                <ul class="news-list">
                    ${noticias.map((noticias: Noticia) => `
                        <li>
                            ${noticias.titulo}
                            <br>
                            <span class="info">Posts: ${noticias.posts} | Hashtags: ${noticias.hashtags.join(', ')}</span>
                        </li>
                    `).join('')}
                </ul>
            </div>
        `;
    }
}
 }
customElements.define('world-updates', news);
