const featuredProjects = [
  {
    name: "CleanArchitectureDDDSolution",
    track: "Architecture",
    year: "2024",
    description:
      "C# repository focused on clean architecture structure, domain separation, and backend organization.",
    tags: ["C#", "Clean Architecture", "DDD"],
    url: "https://github.com/dwaxgio/CleanArchitectureDDDSolution",
    featured: true
  },
  {
    name: "crud_mvc_csharp_dotnet_react_ts",
    track: "Full Stack",
    year: "2025",
    description:
      ".NET backend with a React and TypeScript frontend, covering full-stack integration and CRUD workflow implementation.",
    tags: [".NET", "React", "TypeScript"],
    url: "https://github.com/dwaxgio/crud_mvc_csharp_dotnet_react_ts",
    featured: true
  },
  {
    name: "react_typescript-email-audit-app",
    track: "Product UI",
    year: "2024",
    description:
      "React and TypeScript interface focused on structured review workflows and form-driven UI behavior.",
    tags: ["React", "TypeScript", "Workflow UI"],
    url: "https://github.com/dwaxgio/react_typescript-email-audit-app"
  },
  {
    name: "catalog_shopping_cart_react_next_tailwindcss_ts",
    track: "Frontend",
    year: "2024",
    description:
      "Next.js, TypeScript, and Tailwind CSS project oriented to catalog and shopping cart flows.",
    tags: ["Next.js", "TypeScript", "Tailwind"],
    url: "https://github.com/dwaxgio/catalog_shopping_cart_react_next_tailwindcss_ts"
  },
  {
    name: "ai-development-fundamentals",
    track: "AI Workflows",
    year: "2025",
    description:
      "Repository centered on AI-assisted development fundamentals and engineering workflow exploration.",
    tags: ["AI", "JavaScript", "Developer Experience"],
    url: "https://github.com/dwaxgio/ai-development-fundamentals"
  },
  {
    name: "javascript_babylonjs",
    track: "Game / 3D",
    year: "2021",
    description:
      "Babylon.js repository focused on 3D scene work and browser-based graphics related to game development.",
    tags: ["Babylon.js", "JavaScript", "3D"],
    url: "https://github.com/dwaxgio/javascript_babylonjs"
  }
];

function renderProjects() {
  const projectGrid = document.querySelector("#project-grid");

  if (!projectGrid) {
    return;
  }

  projectGrid.innerHTML = featuredProjects
    .map((project) => {
      const className = project.featured ? "project-card featured" : "project-card";
      const tags = project.tags.map((tag) => `<span class="tag">${tag}</span>`).join("");

      return `
        <article class="${className} reveal">
          <div class="project-topline">
            <span class="project-track">${project.track}</span>
            <span class="project-year">${project.year}</span>
          </div>
          <div>
            <h3>${project.name}</h3>
            <p>${project.description}</p>
          </div>
          <div class="tag-list">${tags}</div>
          <a class="project-link" href="${project.url}" target="_blank" rel="noreferrer">View repository</a>
        </article>
      `;
    })
    .join("");
}

function setupRevealAnimations() {
  const revealElements = Array.from(document.querySelectorAll(".reveal"));

  if (!("IntersectionObserver" in window)) {
    revealElements.forEach((element) => element.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.16 }
  );

  revealElements.forEach((element) => observer.observe(element));
}

async function hydrateGitHubStats() {
  const reposElement = document.querySelector('[data-stat="repos"]');

  if (!reposElement) {
    return;
  }

  try {
    const response = await fetch("https://api.github.com/users/dwaxgio", {
      headers: { Accept: "application/vnd.github+json" }
    });

    if (!response.ok) {
      return;
    }

    const profile = await response.json();

    if (typeof profile.public_repos === "number") {
      reposElement.textContent = String(profile.public_repos);
    }
  } catch (error) {
    console.warn("GitHub profile stats could not be refreshed.", error);
  }
}

function updateFooterYear() {
  const yearElement = document.querySelector("#footer-year");

  if (yearElement) {
    yearElement.textContent = String(new Date().getFullYear());
  }
}

renderProjects();
setupRevealAnimations();
hydrateGitHubStats();
updateFooterYear();
