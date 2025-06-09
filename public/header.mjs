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
        <div class="menu-controls">
            <label class="dark-mode-toggle">
                <input type="checkbox" id="dark-mode-switch" autocomplete="off" />
                Dark mode
            </label>
            <button class="menu-button">Menu</button>
        </div>
        </header>
    `;
}

function createHeader() {
    const newHeader = toHtmlElement(buildHeaderHTML());
    const header = newHeader.querySelector("header");
    const nav = newHeader.querySelector("nav");
    const button = newHeader.querySelector(".menu-button");
    const darkModeToggle = newHeader.querySelector("#dark-mode-switch");

    button.addEventListener("click", (e) => {
        nav.classList.toggle("hidden");
    });

    document.body.addEventListener("click", (e) => {
        if (!header.contains(e.target)) {
          nav.classList.add("hidden");
        }
    });

    darkModeToggle.addEventListener("change", () => {
        const isDarkMode = darkModeToggle.checked;
        document.body.classList.toggle("dark-mode", isDarkMode);
        localStorage.setItem("dark-mode", isDarkMode.toString());
    });

    const savedMode = localStorage.getItem("dark-mode");
    if (savedMode === "true") {
        document.body.classList.add("dark-mode");
        darkModeToggle.checked = true;
    }

    const container = document.getElementById("header-container");
    container.replaceChildren(newHeader);
}

createHeader();