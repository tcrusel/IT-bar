import fs from "fs";
import path from "path";

const registersPath = path.join("src", "registers.json");
const outDir = "public-site";
const outFile = path.join(outDir, "index.html");

const escapeHTML = (str = "") =>
  String(str)
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");

const get = (obj, pathStr, fallback = "") =>
  pathStr.split(".").reduce((acc, k) => (acc && acc[k] != null ? acc[k] : null), obj) ?? fallback;


let registers = [];
try {
  registers = JSON.parse(fs.readFileSync(registersPath, "utf-8"));
  console.log(`✅ Loaded ${registers.length} registers`);
} catch (error) {
  console.error("❌ Error reading registers.json:", error);
  process.exit(1);
}

const cardsHTML = registers
  .map((person) => {
    const name = escapeHTML(get(person, "name", "Anonymous"));
    const bio = escapeHTML(get(person, "bio", "No bio provided."));
    const picture = escapeHTML(get(person, "picture", "https://via.placeholder.com/96"));
    const mail = escapeHTML(get(person, "contacts.mail", ""));
    const twitterRaw = get(person, "contacts.twitter", "");
    const twitterText = escapeHTML(twitterRaw);
    const twitterHref = twitterToLink(twitterRaw);

    const emailLink =
      mail &&
      `<a class="text-slate-400 hover:text-primary" href="mailto:${mail}">
         <span class="material-symbols-outlined">email</span>
       </a>`;

    const webLink =
      twitterHref &&
      `<a class="text-slate-400 hover:text-primary" href="${twitterHref}" target="_blank" rel="noopener noreferrer">
         <span class="material-symbols-outlined">link</span>
       </a>`;

    const contactIcons = [emailLink, webLink].filter(Boolean).join("\n") ||
      `<span class="text-slate-500 text-sm">No contacts</span>`;

    return `
      <div class="bg-slate-900/50 rounded-xl p-6 flex flex-col gap-4 border border-slate-800 hover:border-primary transition-colors">
        <div class="flex items-center gap-4">
          <img alt="${name}'s avatar" class="w-16 h-16 rounded-full object-cover" src="${picture}" />
          <div>
            <h3 class="text-xl font-bold text-white">${person.name}</h3>
          </div>
        </div>
        <p class="text-slate-400">${bio}</p>
        <div class="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
          <span class="text-sm text-slate-500">Contact:</span>
          <div class="flex items-center gap-3">
            <a class="text-slate-400 hover:text-primary" href="mailto:${person.contacts.mail}">
              <span class="material-symbols-outlined">email</span>
            </a>
            ${contactIcons}
          </div>
        </div>
      </div>`;
  })
  .join("\n");

const htmlContent = `
<!DOCTYPE html>
<html class="dark" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta content="width=device-width, initial-scale=1.0" name="viewport" />
    <title>IT bar</title>
    <link href="data:image/x-icon;base64," rel="icon" type="image/x-icon" />
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
    <link
      href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap"
      rel="stylesheet"
    />
    <script src="https://cdn.tailwindcss.com?plugins=forms,container-queries"></script>
    <script id="tailwind-config">
      tailwind.config = {
        darkMode: "class",
        theme: {
          extend: {
            colors: {
              primary: "#13a4ec",
              "background-light": "#f6f7f8",
              "background-dark": "#101c22",
            },
            fontFamily: {
              display: ["Space Grotesk", "sans-serif"],
            },
            borderRadius: {
              DEFAULT: "0.25rem",
              lg: "0.5rem",
              xl: "0.75rem",
              full: "9999px",
            },
          },
        },
      };
    </script>
    <link
      href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined"
      rel="stylesheet"
    />
  </head>
  <body class="bg-background-dark font-display text-slate-200">
    <div class="relative min-h-screen w-full">
      <div class="flex h-full grow flex-col">
        <header
          class="sticky top-0 z-50 w-full bg-background-dark/80 backdrop-blur-sm border-b border-slate-800"
        >
          <div
            class="container flex items-center justify-between px-4 sm:px-6 lg:px-8 py-3"
          >
            <div class="flex items-center gap-3">
              <div class="w-8 h-8 text-primary">
                <svg
                  fill="none"
                  viewBox="0 0 48 48"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M24 45.8096C19.6865 45.8096 15.4698 44.5305 11.8832 42.134C8.29667 39.7376 5.50128 36.3314 3.85056 32.3462C2.19985 28.361 1.76794 23.9758 2.60947 19.7452C3.451 15.5145 5.52816 11.6284 8.57829 8.5783C11.6284 5.52817 15.5145 3.45101 19.7452 2.60948C23.9758 1.76795 28.361 2.19986 32.3462 3.85057C36.3314 5.50129 39.7376 8.29668 42.134 11.8833C44.5305 15.4698 45.8096 19.6865 45.8096 24L24 24L24 45.8096Z"
                    fill="currentColor"
                  ></path>
                </svg>
              </div>
              <h2 class="text-xl font-bold text-white">IT bar</h2>
            </div>
            <nav class="hidden md:flex items-center ml-10 gap-6">
              <a class="text-sm font-medium hover:text-primary" href="#concept">Concept</a>
              <a class="text-sm font-medium hover:text-primary" href="#how-to-join">How to Join</a>
              <a class="text-sm font-medium hover:text-primary" href="#gatherings">Gatherings</a>
            </nav>
            <div class="flex items-center gap-4"></div>
          </div>
        </header>

        <main class="flex-1">
          <!-- Hero -->
          <section class="relative">
            <div class="absolute inset-0 bg-black/60"></div>
            <div
              class="min-h-[70vh] bg-cover bg-center bg-no-repeat flex items-center"
              style="
                background-image: url('https://lh3.googleusercontent.com/aida-public/AB6AXuCvEfSJseVaUqxOdF5CaLIuBV1jZGb9V3snrDUVsQnezgTwco8c2NAoWsDjF5puwWOeh4fYvZvJY1FeLqbXieC3QtV0j-pW20Q-FbP-nU6CLiYhe7MczaalfJBqMcbosa3N3cgPXSL0ZhqgPwWwKqVd9LSvJCkyPXlA8laYGY6pP3BEReGYm9kxtuogqbOA0BVDUdq0fA0D3axjp0snPyOU05g5bM08syGDFc-1CWIUzdohDA8pXhp6Ga4sY60MRzE9fY1HaJNJUmVt');
              "
            >
              <div class="relative container mx-auto px-4 sm:px-6 lg:px-8 text-white">
                <div class="max-w-3xl text-center mx-auto">
                  <h1 class="text-4xl md:text-6xl font-bold tracking-tight">
                    Connect with Tech Enthusiasts Over Drinks
                  </h1>
                  <p class="mt-4 text-lg md:text-xl text-slate-300">
                    Join IT bar, where IT professionals and enthusiasts gather
                    in local bars to discuss the latest in technology, share
                    ideas, and network in a relaxed, informal setting.
                  </p>
                </div>
              </div>
            </div>
          </section>

          <!-- Concept -->
          <section class="py-16 sm:py-24 bg-background-dark" id="concept">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
              <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-3xl font-bold tracking-tight text-white">Our Concept</h2>
                <p class="mt-4 text-lg text-slate-400">
                  IT bar is all about bringing the tech community together in a
                  casual environment. We organize meetups in popular bars where
                  you can enjoy drinks, engage in tech discussions, and expand
                  your professional network. It's the perfect blend of learning
                  and socializing, away from the formal constraints of office
                  life.
                </p>
              </div>
            </div>
          </section>

          <!-- How to Join -->
          <section class="py-16 sm:py-24 bg-slate-900/50" id="how-to-join">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
              <div class="max-w-3xl mx-auto text-center">
                <h2 class="text-3xl font-bold tracking-tight text-white">How to Join</h2>
                <p class="mt-4 text-lg text-slate-400">
                  Joining IT bar is simple and open to everyone. We manage our
                  community through GitHub. To join, simply add your profile to
                  our <code>registers.json</code> file. This allows for a
                  transparent and community-driven way to manage members and
                  gatherings.
                </p>
                <a
                  class="mt-8 inline-flex items-center gap-2 rounded-lg bg-primary px-8 py-3 text-lg font-bold text-white transition-colors hover:bg-primary/80"
                  href="https://github.com/tcrusel/IT-bar/blob/dev/src/registers.json"
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  <svg
                    class="h-6 w-6"
                    fill="none"
                    height="24"
                    stroke="currentColor"
                    stroke-linecap="round"
                    stroke-linejoin="round"
                    stroke-width="2"
                    viewBox="0 0 24 24"
                    width="24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"
                    ></path>
                  </svg>
                  <span>Contribute on GitHub</span>
                </a>
              </div>
            </div>
          </section>

          <!-- Gatherings -->
          <section class="py-16 sm:py-24 bg-background-dark" id="gatherings">
            <div class="container mx-auto px-4 sm:px-6 lg:px-8">
              <div class="flex flex-col items-center">
                <h2 class="text-3xl font-bold tracking-tight text-white">Proposed Gatherings</h2>
                <p class="mt-2 text-lg text-slate-400">Connect with members who have proposed a gathering.</p>
              </div>
              <div class="mt-12 grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                ${cardsHTML}
              </div>
            </div>
          </section>
        </main>

        <footer class="bg-background-dark border-t border-slate-800">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
            <div class="flex flex-col items-center gap-8">
              <div class="flex flex-wrap items-center justify-center gap-x-8 gap-y-4">
                <a class="text-sm text-slate-400 hover:text-primary" href="#">Contact</a>
                <a class="text-sm text-slate-400 hover:text-primary" href="#">Privacy Policy</a>
                <a class="text-sm text-slate-400 hover:text-primary" href="#">Terms of Service</a>
              </div>
              <p class="text-sm text-slate-500">© 2024 IT bar. All rights reserved.</p>
            </div>
          </div>
        </footer>
      </div>
    </div>
  </body>
</html>`;

fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, htmlContent);

console.log(`✅ index.html generated successfully at ${outFile}`);
