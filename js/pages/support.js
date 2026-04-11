"use strict";

const SUPPORT_RESOURCES = [
  {
    icon : "fa-solid fa-book-open",
    title: "Browse the Catalogue",
    text : "Explore thousands of available titles across all genres and disciplines.",
    link : "./books.html",
    label: "Go to Catalogue",
  },
  {
    icon : "fa-solid fa-circle-user",
    title: "Manage Your Account",
    text : "Update your profile, change your password, or review your borrowing history.",
    link : "./login.html",
    label: "My Account",
  },
  {
    icon : "fa-solid fa-envelope",
    title: "Contact Our Team",
    text : "Couldn't find what you need? Our librarians are happy to help you directly.",
    link : "./contact.html",
    label: "Send a Message",
  },
];

(function injectStyles() {
  const style = document.createElement("style");
  style.textContent = `
    #faq-search-wrapper {
      width        : 100%;
      max-width    : 800px;
      margin       : 0 auto 28px;
      position     : relative;
    }
    #faq-search {
      width            : 100%;
      height           : 50px;
      padding          : 0 48px 0 18px;
      background       : rgba(255,255,255,0.12);
      backdrop-filter  : blur(10px);
      -webkit-backdrop-filter: blur(10px);
      border           : 1.5px solid rgba(255,255,255,0.22);
      border-radius    : 10px;
      color            : #ffffff;
      font-family      : 'Lato', sans-serif;
      font-size        : 0.95rem;
      font-weight      : 300;
      outline          : none;
      transition       : border-color 0.22s ease, box-shadow 0.22s ease, background 0.22s ease;
    }
    #faq-search::placeholder { color: rgba(255,255,255,0.45); }
    #faq-search:focus {
      border-color: #800020;
      background  : rgba(255,255,255,0.16);
      box-shadow  : 0 0 0 3px rgba(128,0,32,0.20);
    }
    #faq-search-wrapper::before {
      content    : '\f002';
      font-family: 'Font Awesome 6 Free';
      font-weight: 900;
      position   : absolute;
      right      : 16px;
      top        : 50%;
      transform  : translateY(-50%);
      color      : rgba(255,255,255,0.45);
      font-size  : 0.88rem;
      pointer-events: none;
    }
    #faq-search-clear {
      display    : none;
      position   : absolute;
      right      : 14px;
      top        : 50%;
      transform  : translateY(-50%);
      background : none;
      border     : none;
      cursor     : pointer;
      color      : rgba(255,255,255,0.55);
      font-size  : 1rem;
      padding    : 4px;
      line-height: 1;
      transition : color 0.18s ease;
    }
    #faq-search-clear:hover { color: #800020; }
    #faq-search-clear.visible { display: block; }

    #faq-no-results {
      display    : none;
      text-align : center;
      padding    : 28px 20px;
      font-family: 'Lato', sans-serif;
      font-size  : 0.92rem;
      font-weight: 300;
      color      : rgba(255,255,255,0.65);
      letter-spacing: 0.04em;
    }
    #faq-no-results.visible { display: block; }
    #faq-no-results span {
      color      : #800020;
      font-weight: 700;
    }

    .faq-feedback {
      display    : flex;
      align-items: center;
      gap        : 10px;
      padding    : 10px 24px 18px;
      flex-wrap  : wrap;
    }
    .faq-feedback-label {
      font-family   : 'Lato', sans-serif;
      font-size     : 0.76rem;
      font-weight   : 400;
      color         : rgba(255,255,255,0.50);
      letter-spacing: 0.04em;
      white-space   : nowrap;
    }
    .faq-feedback-btn {
      display      : inline-flex;
      align-items  : center;
      gap          : 6px;
      padding      : 5px 14px;
      background   : rgba(255,255,255,0.08);
      border       : 1px solid rgba(255,255,255,0.18);
      border-radius: 20px;
      color        : rgba(255,255,255,0.70);
      font-family  : 'Lato', sans-serif;
      font-size    : 0.76rem;
      font-weight  : 600;
      cursor       : pointer;
      letter-spacing: 0.04em;
      transition   : background 0.20s ease, color 0.20s ease,
                     border-color 0.20s ease, transform 0.12s ease;
    }
    .faq-feedback-btn:hover {
      background  : rgba(128,0,32,0.18);
      border-color: rgba(128,0,32,0.50);
      color       : #ffffff;
    }
    .faq-feedback-btn:active { transform: scale(0.96); }
    .faq-feedback-btn.voted {
      pointer-events: none;
      opacity       : 0.55;
    }
    .faq-feedback-thanks {
      font-family   : 'Lato', sans-serif;
      font-size     : 0.76rem;
      font-weight   : 600;
      color         : #2e7d32;
      letter-spacing: 0.04em;
      opacity       : 0;
      transition    : opacity 0.35s ease;
    }
    .faq-feedback-thanks.visible { opacity: 1; }

    #dynamic-resources {
      width    : 100%;
      max-width: 800px;
      margin   : 40px auto 0;
    }
    #dynamic-resources-title {
      font-family   : 'Lato', sans-serif;
      font-size     : 0.72rem;
      font-weight   : 700;
      color         : #800020;
      letter-spacing: 0.22em;
      text-transform: uppercase;
      margin-bottom : 16px;
      padding-left  : 2px;
    }
    .resource-grid {
      display              : grid;
      grid-template-columns: repeat(3, 1fr);
      gap                  : 14px;
    }
    .resource-card {
      background     : rgba(255,255,255,0.08);
      backdrop-filter: blur(10px) saturate(1.4);
      -webkit-backdrop-filter: blur(10px) saturate(1.4);
      border         : 1px solid rgba(255,255,255,0.16);
      border-radius  : 12px;
      padding        : 22px 18px;
      text-align     : center;
      text-decoration: none;
      display        : flex;
      flex-direction : column;
      align-items    : center;
      gap            : 10px;
      transition     : background 0.22s ease, transform 0.15s ease,
                       border-color 0.22s ease, box-shadow 0.22s ease;
      animation      : cardReveal 0.40s ease both;
    }
    .resource-card:hover {
      background  : rgba(128,0,32,0.14);
      border-color: rgba(128,0,32,0.45);
      box-shadow  : 0 6px 24px rgba(0,0,0,0.30);
      transform   : translateY(-3px);
    }
    .resource-card i {
      font-size: 1.5rem;
      color    : #800020;
    }
    .resource-card-title {
      font-family   : 'Cinzel', serif;
      font-size     : 0.78rem;
      font-weight   : 600;
      color         : #ffffff;
      letter-spacing: 0.08em;
      text-transform: uppercase;
      line-height   : 1.3;
    }
    .resource-card-text {
      font-family: 'Lato', sans-serif;
      font-size  : 0.78rem;
      font-weight: 300;
      color      : rgba(255,255,255,0.65);
      line-height: 1.55;
    }
    .resource-card-link {
      font-family   : 'Lato', sans-serif;
      font-size     : 0.72rem;
      font-weight   : 700;
      color         : #800020;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      margin-top    : 4px;
    }

    .resource-card:nth-child(1) { animation-delay: 0.10s; }
    .resource-card:nth-child(2) { animation-delay: 0.18s; }
    .resource-card:nth-child(3) { animation-delay: 0.26s; }

    @keyframes cardReveal {
      from { opacity: 0; transform: translateY(12px); }
      to   { opacity: 1; transform: translateY(0); }
    }

    @media (max-width: 600px) {
      .resource-grid { grid-template-columns: 1fr; }
    }
  `;
  document.head.appendChild(style);
})();

const supportDiv  = document.querySelector("body > div:first-of-type");
const allDetails  = Array.from(supportDiv.querySelectorAll("details"));

function buildSearchBar() {
  const firstH3 = supportDiv.querySelector("h3");

  const wrapper = document.createElement("div");
  wrapper.id = "faq-search-wrapper";

  const input = document.createElement("input");
  input.type        = "text";
  input.id          = "faq-search";
  input.placeholder = "Search questions…";
  input.setAttribute("aria-label", "Search FAQ questions");
  input.autocomplete = "off";

  const clearBtn = document.createElement("button");
  clearBtn.id          = "faq-search-clear";
  clearBtn.type        = "button";
  clearBtn.textContent = "✕";
  clearBtn.setAttribute("aria-label", "Clear search");

  const noResults = document.createElement("p");
  noResults.id = "faq-no-results";
  noResults.setAttribute("role", "status");
  noResults.setAttribute("aria-live", "polite");

  wrapper.append(input, clearBtn);

  supportDiv.insertBefore(noResults, firstH3);
  supportDiv.insertBefore(wrapper,   firstH3);

  input.addEventListener("input",  filterQuestions);
  clearBtn.addEventListener("click", function () {
    input.value = "";
    filterQuestions();
    input.focus();
  });
}

function filterQuestions() {
  const input     = document.getElementById("faq-search");
  const clearBtn  = document.getElementById("faq-search-clear");
  const noResults = document.getElementById("faq-no-results");
  const keyword   = input.value.trim().toLowerCase();

  if (keyword.length > 0) {
    clearBtn.classList.add("visible");
  } else {
    clearBtn.classList.remove("visible");
  }

  let visibleCount = 0;

  allDetails.forEach(function (details) {
    const summaryText = details.querySelector("summary").textContent
                               .toLowerCase();

    if (keyword === "" || summaryText.includes(keyword)) {
      details.style.display = "";
      visibleCount += 1;
    } else {
      details.style.display = "none";
      details.open = false;
    }
  });

  if (visibleCount === 0 && keyword.length > 0) {
    noResults.innerHTML  =
      `No questions found for "<span>${escapeHTML(keyword)}</span>". ` +
      `Try a different keyword or <a href="./contact.html" style="color:#800020;font-weight:700">contact us</a>.`;
    noResults.classList.add("visible");
  } else {
    noResults.classList.remove("visible");
  }
}

function escapeHTML(str) {
  return str
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#039;");
}

function toggleFAQs() {
  allDetails.forEach(function (details) {
    details.addEventListener("toggle", function () {
      if (!this.open) return;   

      allDetails.forEach(function (other) {
        if (other !== details && other.open) {
          other.open = false;
        }
      });
    });
  });
}

function addFeedbackButtons() {
  allDetails.forEach(function (details, index) {
    const row = document.createElement("div");
    row.classList.add("faq-feedback");
    row.setAttribute("aria-label", "Feedback for this answer");

    const label = document.createElement("span");
    label.classList.add("faq-feedback-label");
    label.textContent = "Was this helpful?";

    const yesBtn = createFeedbackBtn("👍  Yes", "yes", index);

    const noBtn = createFeedbackBtn("👎  No", "no", index);

    const thanks = document.createElement("span");
    thanks.classList.add("faq-feedback-thanks");
    thanks.setAttribute("role",     "status");
    thanks.setAttribute("aria-live","polite");
    thanks.id = `feedback-thanks-${index}`;

    row.append(label, yesBtn, noBtn, thanks);
    details.appendChild(row);
  });
}

function createFeedbackBtn(text, type, cardIndex) {
  const btn = document.createElement("button");
  btn.type = "button";
  btn.classList.add("faq-feedback-btn");
  btn.dataset.type  = type;
  btn.dataset.card  = cardIndex;
  btn.textContent   = text;

  btn.addEventListener("click", handleFeedback);
  return btn;
}

function handleFeedback(e) {
  const btn       = e.currentTarget;
  const cardIndex = btn.dataset.card;
  const voteType  = btn.dataset.type;   
  const details   = allDetails[cardIndex];

  const allBtns = details.querySelectorAll(".faq-feedback-btn");
  allBtns.forEach(function (b) {
    b.classList.add("voted");
    b.setAttribute("aria-disabled", "true");
  });

  const thanks = document.getElementById(`feedback-thanks-${cardIndex}`);
  const emoji   = voteType === "yes" ? "✅" : "🙏";
  thanks.textContent = `${emoji} Thank you for your feedback!`;
  thanks.classList.add("visible");

  const feedbackData = {
    questionText: details.querySelector("summary").textContent.trim(),
    vote        : voteType,
    cardIndex   : parseInt(cardIndex, 10),
    timestamp   : new Date().toISOString(),
  };
  console.log("📋 GILDORA — FAQ Feedback Received:");
  console.table(feedbackData);
}

function buildDynamicResources() {
  const section = document.createElement("div");
  section.id = "dynamic-resources";

  const title = document.createElement("p");
  title.id          = "dynamic-resources-title";
  title.textContent = "Quick Links";
  section.appendChild(title);

  const grid = document.createElement("div");
  grid.classList.add("resource-grid");

  SUPPORT_RESOURCES.forEach(function (resource) {
    const card = document.createElement("a");
    card.href      = resource.link;
    card.classList.add("resource-card");

    card.innerHTML = `
      <i class="${resource.icon}" aria-hidden="true"></i>
      <span class="resource-card-title">${resource.title}</span>
      <span class="resource-card-text">${resource.text}</span>
      <span class="resource-card-link">${resource.label} →</span>
    `;

    grid.appendChild(card);
  });

  section.appendChild(grid);

  supportDiv.appendChild(section);
}

function smoothScrollToContact() {
  const contactLinks = document.querySelectorAll('a[href*="contact.html"]');
  const footer       = document.querySelector("footer.site-footer");

  if (!footer) return;

  contactLinks.forEach(function (link) {
    link.addEventListener("click", function (e) {
      e.preventDefault();
      footer.scrollIntoView({ behavior: "smooth", block: "start" });

      footer.style.transition = "box-shadow 0.40s ease";
      footer.style.boxShadow  = "0 0 0 3px rgba(128,0,32,0.55)";
      setTimeout(function () {
        footer.style.boxShadow = "";
      }, 1400);
    });
  });
}


function init() {
  buildSearchBar();          
  toggleFAQs();              
  addFeedbackButtons();      
  buildDynamicResources();   
  smoothScrollToContact();   
}

document.addEventListener("DOMContentLoaded", init);