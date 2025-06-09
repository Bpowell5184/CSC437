import { toHtmlElement } from './toHtmlElement.mjs';

const NAV_LINKS = [
    { name: "Home", href: "index.html" },
    { name: "Favorite Books", href: "readingList.html" }
  ];
  
function buildNavHTML() {
    return NAV_LINKS.map(link => `<a href="${link.href}">${link.name}</a>`).join("");
}

function buildHeaderHTML() {
    return `
        <header>
        <div class="nav-bar">
            <h1>Brandon Powell</h1>
            <nav class="mobile-nav hidden">${buildNavHTML()}</nav>
        </div>
        <button class="menu-button">Menu</button>
        </header>
    `;
}

function createHeader() {
    const newHeader = toHtmlElement(buildHeaderHTML());
    const header = newHeader.querySelector("header");
    const nav = newHeader.querySelector("nav");
    const button = newHeader.querySelector(".menu-button");

    button.addEventListener("click", (e) => {
        nav.classList.toggle("hidden");
    });

    document.body.addEventListener("click", (e) => {
        if (!header.contains(e.target)) {
          nav.classList.add("hidden");
        }
    });

    const container = document.getElementById("header-container");
    container.replaceChildren(newHeader);
}

createHeader();