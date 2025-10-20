// ...existing code...
let data = [
  {
    name: "BrainBot",
    company: "NeuroTech",
    website: "https://neurotech.com",
    price: "Free",
    domain: "Education",
    description: "An AI bot for brain training.",
    logo: "alt_logo.png",
    audio: "alt_audio.mp3",
    video: "alt_video.mp4"
  },
  {
    name: "HealthAI",
    company: "MediAI",
    website: "https://mediai.com",
    price: "Paid",
    domain: "Robotics",
    description: "AI assistant for healthcare monitoring.",
    logo: "alt_logo.png",
    audio: "alt_audio.mp3",
    video: "alt_video.mp4"
  },
  {
    name: "EduHelper",
    company: "LearnCorp",
    website: "https://learncorp.com",
    price: "Free",
    domain: "E-Commerce",
    description: "AI app to support learning platforms.",
    logo: "alt_logo.png",
    audio: "alt_audio.mp3",
    video: "alt_video.mp4"
  },
  {
    name: "ShopSmart",
    company: "RetailAI",
    website: "https://retailai.com",
    price: "Paid",
    domain: "E-Commerce",
    description: "Smart shopping assistant for e-commerce platforms.",
    logo: "alt_logo.png",
    audio: "alt_audio.mp3",
    video: "alt_video.mp4"
  },
  {
    name: "RoboTutor",
    company: "Edutech Robotics",
    website: "https://edutechrobotics.com",
    price: "Free",
    domain: "Robotics",
    description: "Robotics-based AI tutor for STEM subjects.",
    logo: "alt_logo.png",
    audio: "alt_audio.mp3",
    video: "alt_video.mp4"
  },
  {
    name: "MedVision",
    company: "Visionary Health",
    website: "https://visionaryhealth.com",
    price: "Paid",
    domain: "Healthcare",
    description: "AI-powered medical imaging and diagnostics.",
    logo: "alt_logo.png",
    audio: "alt_audio.mp3",
    video: "alt_video.mp4"
  },
  {
    name: "AutoPilotX",
    company: "DriveAI",
    website: "https://driveai.com",
    price: "Paid",
    domain: "Robotics",
    description: "Autonomous driving and navigation system.",
    logo: "alt_logo.png",
    audio: "alt_audio.mp3",
    video: "alt_video.mp4"
  },
  {
    name: "LearnMate",
    company: "SmartLearn",
    website: "https://smartlearn.com",
    price: "Free",
    domain: "Education",
    description: "Personalized learning companion for students.",
    logo: "alt_logo.png",
    audio: "alt_audio.mp3",
    video: "alt_video.mp4"
  },
  {
    name: "FinGuard",
    company: "FinTech Solutions",
    website: "https://fintechsolutions.com",
    price: "Paid",
    domain: "Finance",
    description: "AI-driven financial security and fraud detection.",
    logo: "alt_logo.png",
    audio: "alt_audio.mp3",
    video: "alt_video.mp4"
  },
  {
    name: "MarketSense",
    company: "MarketAI",
    website: "https://marketai.com",
    price: "Free",
    domain: "E-Commerce",
    description: "AI analytics for market trends and consumer behavior.",
    logo: "alt_logo.png",
    audio: "alt_audio.mp3",
    video: "alt_video.mp4"
  },
  {
    name: "SafeHome",
    company: "HomeSecure",
    website: "https://homesecure.com",
    price: "Paid",
    domain: "Robotics",
    description: "AI-powered home security and automation.",
    logo: "alt_logo.png",
    audio: "alt_audio.mp3",
    video: "alt_video.mp4"
  }
];

// تحميل البيانات من sessionStorage إذا وجدت
if (sessionStorage.getItem("appsData")) {
  try {
    data = JSON.parse(sessionStorage.getItem("appsData"));
  } catch (e) {}
}

function displayAppsTable() {
  let tbody = document.getElementById("appsTableBody");
  if (!tbody) return;
  tbody.innerHTML = "";
  data.forEach((app, i) => {
    let tr = document.createElement("tr");
    tr.innerHTML = `
      <td>${app.name}</td>
      <td>${app.company}</td>
      <td>${app.domain}</td>
      <td>${app.price}</td>
  <td><button class="details-btn" data-index="${i}">Show Details</button></td>
    `;
    tbody.appendChild(tr);
    // تفاصيل التطبيق (صف مخفي)
    let detailsTr = document.createElement("tr");
    detailsTr.className = "details-row";
    detailsTr.style.display = "none";
    detailsTr.id = `detailsRow${i}`;
    detailsTr.innerHTML = `<td colspan="5" class="details-content" id="detailsContent${i}"></td>`;
    tbody.appendChild(detailsTr);
  });
}

function showDetails(index) {
  let detailsTr = document.getElementById(`detailsRow${index}`);
  let detailsTd = document.getElementById(`detailsContent${index}`);
  if (!detailsTr || !detailsTd) return;
  if (detailsTr.style.display === "none") {
    let app = data[index];
    detailsTd.innerHTML = `
      <strong>Description:</strong> ${app.description}<br>
      <strong>Website:</strong> <a href="${app.website}" target="_blank">${app.website}</a><br>
      <img src="${app.logo}" class="app-logo"><br>
      <div class="app-media">
        <audio controls src="${app.audio}"></audio>
        <video controls width="220"><source src="${app.video}" type="video/mp4"></video>
      </div>
    `;
    detailsTr.style.display = "table-row";
  } else {
    detailsTr.style.display = "none";
  }
}

function saveSelectedApps() {
  let selected = [];
  document.querySelectorAll(".app-select:checked").forEach((cb) => {
    let idx = cb.getAttribute("data-index");
    if (data[idx]) selected.push(data[idx]);
  });
  localStorage.setItem("selectedApps", JSON.stringify(selected));
}

function restoreSelectedApps() {
  let selected = JSON.parse(localStorage.getItem("selectedApps") || "[]");
  data.forEach((app, i) => {
    let cb = document.querySelector(`.app-select[data-index="${i}"]`);
    if (cb && selected.find((a) => a.name === app.name)) {
      cb.checked = true;
    }
  });
}

document.addEventListener("DOMContentLoaded", () => {
  displayAppsTable();
  restoreSelectedApps();
  document.querySelectorAll(".details-btn").forEach((btn) => {
    btn.addEventListener("click", function () {
      let idx = this.getAttribute("data-index");
      showDetails(idx);
    });
  });
  document.querySelectorAll(".app-select").forEach((cb) => {
    cb.addEventListener("change", saveSelectedApps);
  });
});

document.addEventListener("DOMContentLoaded", () => {
  // displayApps() غير معرفة، إذا كنت في صفحة إضافة تطبيق لا داعي لاستدعاء أي شيء هنا
  let form = document.getElementById("newAppForm");
  if (form) {
    form.addEventListener("submit", (e) => {
      e.preventDefault();
      let name = document.getElementById("appName").value;
      let company = document.getElementById("company").value;
      let website = document.getElementById("website").value;
      let price = document.getElementById("price").value;
      let domain = document.getElementById("domain").value;
      let description = document.getElementById("description").value;
      let logoFile = document.getElementById("logo").files[0];
      let audioFile = document.getElementById("audio").files[0];
      let videoFile = document.getElementById("video").files[0];

      let logo = logoFile ? URL.createObjectURL(logoFile) : "alt_logo.png";
      let audio = audioFile ? URL.createObjectURL(audioFile) : "alt_audio.mp3";
      let video = videoFile ? URL.createObjectURL(videoFile) : "alt_video.mp4";

      data.push({
        name,
        company,
        website,
        price,
        domain,
        description,
        logo,
        audio,
        video,
      });
      // حفظ البيانات في sessionStorage
      sessionStorage.setItem("appsData", JSON.stringify(data));
      // الانتقال إلى صفحة التطبيقات بعد الإضافة
      window.location.href = "apps.html";
    });
  }
});
