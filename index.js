const appState = {
  currentView: "sec-context",
  stepsData: [
    {
      title: "Etapa 1: Contextualização (5 min)",
      desc: "O facilitador explica o cenário: 'Imaginem que vocês foram contratados recentemente pela G6 Enterprise e completaram o primeiro mês de trabalho juntos. Hoje faremos nosso ritual de feedback positivo para acelerar a integração.' Isso coloca o candidato em modo corporativo.",
    },
    {
      title: "Etapa 2: Preparação do Sorteio (3 min)",
      desc: "O facilitador coloca os nomes de todos os candidatos participantes dentro da urna ou caderno. Exige silêncio e foco para criar um ambiente seguro.",
    },
    {
      title: "Etapa 3: Realização das Rodadas (20 - 25 min)",
      desc: "Cada um retira um nome, tendo até 1 minuto e 30 segundos para falar sobre características positivas e colaborativas do colega. Regra de ouro: apenas aspectos construtivos.",
    },
    {
      title: "Etapa 4: Fechamento (5 min)",
      desc: "O facilitador encerra questionando como se sentiram ao dar e receber feedbacks, destacando que essa troca empática é a rotina de um Full Stack Ágil na G6.",
    },
  ],
  charts: {},
};

function switchView(targetId) {
  document
    .querySelectorAll(".content-section")
    .forEach((sec) => sec.classList.add("hidden"));
  document.getElementById(targetId).classList.remove("hidden");

  document.querySelectorAll(".nav-item").forEach((btn) => {
    btn.classList.remove("active", "bg-amber-50", "border-accent");
    if (btn.dataset.target === targetId) {
      btn.classList.add("active");
    }
  });

  appState.currentView = targetId;

  if (targetId === "sec-role" && !appState.charts.skills) {
    initSkillsChart();
  }
  if (targetId === "sec-eval" && !appState.charts.eval) {
    initEvalChart();
  }
}

document.querySelectorAll(".nav-item").forEach((btn) => {
  btn.addEventListener("click", (e) =>
    switchView(e.currentTarget.dataset.target),
  );
});

function toggleCardInfo(id) {
  const el = document.getElementById(id);
  el.classList.toggle("hidden");
  el.classList.add("fade-in");
}

function showStepDetail(stepIndex) {
  document.getElementById("step-title").innerText =
    appState.stepsData[stepIndex - 1].title;
  document.getElementById("step-desc").innerText =
    appState.stepsData[stepIndex - 1].desc;

  for (let i = 1; i <= 4; i++) {
    const btn = document.getElementById(`step-btn-${i}`);
    if (i === stepIndex) {
      btn.classList.remove("bg-stone-300", "text-stone-600");
      btn.classList.add("bg-accent", "text-white");
    } else {
      btn.classList.add("bg-stone-300", "text-stone-600");
      btn.classList.remove("bg-accent", "text-white");
    }
  }

  const detailContainer = document.getElementById("step-detail-container");
  detailContainer.classList.remove("fade-in");
  void detailContainer.offsetWidth;
  detailContainer.classList.add("fade-in");
}

function initSkillsChart() {
  const ctx = document.getElementById("skillsChart").getContext("2d");
  Chart.defaults.font.family = "'Inter', sans-serif";

  appState.charts.skills = new Chart(ctx, {
    type: "radar",
    data: {
      labels: [
        "Comunicação",
        ["Trabalho em", "Equipe"],
        "Empatia",
        ["Inteligência", "Emocional"],
        "Hard Skills",
        "Adaptabilidade",
      ],
      datasets: [
        {
          label: "Importância (%)",
          data: [90, 95, 85, 90, 90, 85],
          backgroundColor: "rgba(217, 119, 6, 0.2)",
          borderColor: "#d97706",
          pointBackgroundColor: "#b45309",
          borderWidth: 2,
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      scales: {
        r: {
          angleLines: { color: "rgba(0,0,0,0.1)" },
          grid: { color: "rgba(0,0,0,0.1)" },
          pointLabels: { font: { size: 12 }, color: "#57534e" },
          ticks: { display: false, min: 0, max: 100 },
        },
      },
      plugins: { legend: { display: false } },
    },
  });
}

const evalColors = [
  "rgba(217, 119, 6, 0.8)",
  "rgba(200, 200, 200, 0.4)",
  "rgba(200, 200, 200, 0.4)",
  "rgba(200, 200, 200, 0.4)",
];

function initEvalChart() {
  const ctx = document.getElementById("evalChart").getContext("2d");
  appState.charts.eval = new Chart(ctx, {
    type: "polarArea",
    data: {
      labels: ["Oratória", "Empatia", "Escuta", "I. Emocional"],
      datasets: [
        {
          data: [25, 25, 25, 25],
          backgroundColor: [...evalColors],
          borderWidth: 1,
          borderColor: "#fff",
        },
      ],
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { position: "bottom", labels: { boxWidth: 12 } },
        tooltip: {
          callbacks: {
            label: function (context) {
              return " Peso de Avaliação: " + context.raw + "%";
            },
          },
        },
      },
      scales: { r: { ticks: { display: false } } },
    },
  });
}

function highlightEvalChart(index, rowElement) {
  if (!appState.charts.eval) return;

  document
    .querySelectorAll(".eval-row")
    .forEach((row) => row.classList.remove("bg-amber-50"));
  rowElement.classList.add("bg-amber-50");

  const newColors = [
    "rgba(200, 200, 200, 0.3)",
    "rgba(200, 200, 200, 0.3)",
    "rgba(200, 200, 200, 0.3)",
    "rgba(200, 200, 200, 0.3)",
  ];
  newColors[index] = "rgba(217, 119, 6, 0.8)";

  appState.charts.eval.data.datasets[0].backgroundColor = newColors;
  appState.charts.eval.update();
}

function updateChecklist() {
  const checkboxes = document.querySelectorAll(
    '#checklist input[type="checkbox"]',
  );
  let checked = 0;
  checkboxes.forEach((cb) => {
    if (cb.checked) checked++;
  });
  const percentage = (checked / checkboxes.length) * 100;
  document.getElementById("progress-bar").style.width = percentage + "%";
}
