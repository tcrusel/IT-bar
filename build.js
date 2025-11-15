import fs from "fs";
import path from "path";

const registersPath = path.join("src", "registers.json");
const outDir = "public-site";
const outFile = path.join(outDir, "index.html");

// Lecture du JSON de participants
let registers = [];
try {
  registers = JSON.parse(fs.readFileSync(registersPath, "utf-8"));
  console.log(`✅ Loaded ${registers.length} registers`);
} catch (error) {
  console.error("❌ Error reading registers.json:", error);
  process.exit(1);
}

// Génération des cartes HTML à partir du JSON
const cardsHTML = registers
  .map(
    (person) => `
      <div class="bg-slate-900/50 rounded-xl p-6 flex flex-col gap-4 border border-slate-800 hover:border-primary transition-colors">
        <div class="flex items-center gap-4">
          <img alt="${person.name}'s avatar" class="w-16 h-16 rounded-full object-cover" src="${person.picture}" />
          <div>
            <h3 class="text-xl font-bold text-white">${person.name}</h3>
          </div>
        </div>
        <p class="text-slate-400">${person.bio}</p>
        <div class="mt-auto pt-4 border-t border-slate-800 flex items-center justify-between">
          <span class="text-sm text-slate-500">Contact:</span>
          <div class="flex items-center gap-3">
            <a class="text-slate-400 hover:text-primary" href="mailto:${person.contacts.mail}">
              <span class="material-symbols-outlined">email</span>
            </a>
          </div>
        </div>
      </div>`
  )
  .join("\n");

// HTML principal
const htmlContent = `
<!DOCTYPE html>
<html class="dark" lang="en">
  <head>
    <meta charset="utf-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>IT bar</title>
    <link href="https://fonts.googleapis.com" rel="preconnect" />
    <link crossorigin="" href="https://fonts.gstatic.com" rel="preconnect" />
    <link href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@400;500;700&display=swap" rel="stylesheet" />
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
            fontFamily: { display: ["Space Grotesk", "sans-serif"] },
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
    <link href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined" rel="stylesheet" />
  </head>

  <body class="bg-background-dark font-display text-slate-200">
    <div class="relative min-h-screen w-full flex flex-col">
      <header class="sticky top-0 z-50 w-full bg-background-dark/80 backdrop-blur-sm border-b border-slate-800">
        <div class="container flex items-center justify-between px-6 py-3">
          <div class="flex items-center gap-3">
            <div class="w-8 h-8 text-primary">
              <svg fill="none" viewBox="0 0 48 48" xmlns="http://www.w3.org/2000/svg">
                <path d="M24 45.8C19.7 45.8 15.5 44.5 11.9 42.1C8.3 39.7 5.5 36.3 3.9 32.3C2.2 28.4 1.8 24 2.6 19.7C3.5 15.5 5.5 11.6 8.6 8.6C11.6 5.5 15.5 3.5 19.7 2.6C23.9 1.8 28.4 2.2 32.3 3.9C36.3 5.5 39.7 8.3 42.1 11.9C44.5 15.5 45.8 19.7 45.8 24H24V45.8Z" fill="currentColor"></path>
              </svg>
            </div>
            <h2 class="text-xl font-bold text-white">IT bar</h2>
          </div>
          <nav class="hidden md:flex gap-6">
            <a class="text-sm font-medium hover:text-primary" href="#concept">Concept</a>
            <a class="text-sm font-medium hover:text-primary" href="#how-to-join">How to Join</a>
            <a class="text-sm font-medium hover:text-primary" href="#gatherings">Gatherings</a>
          </nav>
        </div>
      </header>

      <main class="flex-1">
        <section id="gatherings" class="py-16 sm:py-24 bg-background-dark">
          <div class="container mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-10">
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
        <div class="container mx-auto px-4 sm:px-6 lg:px-8 py-12 text-center">
          <p class="text-sm text-slate-500">© 2024 IT bar. All rights reserved.</p>
        </div>
      </footer>
    </div>
  </body>
</html>
`;

// Création du dossier et écriture
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outFile, htmlContent);

console.log(`✅ index.html generated successfully at ${outFile}`);
