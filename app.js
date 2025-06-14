const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");
const sendBtn = document.querySelector(".input-area button");
const serverList = document.getElementById("serverList");

let servers = JSON.parse(localStorage.getItem("servers")) || [];
let currentServer = null;

// تحديث عرض السيرفرات
function updateServerList() {
  serverList.innerHTML = "";
  servers.forEach((server, index) => {
    const btn = document.createElement("button");
    btn.textContent = server.name;
    btn.onclick = () => selectServer(index);
    serverList.appendChild(btn);
  });
}

// اختيار سيرفر
function selectServer(index) {
  currentServer = servers[index];
  messages.innerHTML = "";

  currentServer.messages.forEach((msg) => {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<strong>أنت:</strong> ${msg}`;
    messages.appendChild(div);
  });

  input.disabled = false;
  sendBtn.disabled = false;
  input.focus();
}

// إرسال رسالة
function sendMessage() {
  const text = input.value.trim();
  if (!text || !currentServer) return;

  currentServer.messages.push(text);
  localStorage.setItem("servers", JSON.stringify(servers));

  const div = document.createElement("div");
  div.className = "message";
  div.innerHTML = `<strong>أنت:</strong> ${text}`;
  messages.appendChild(div);

  input.value = "";
  messages.scrollTop = messages.scrollHeight;
}

// إنشاء سيرفر جديد
function createServer() {
  const name = prompt("🧠 أدخل اسم السيرفر:");
  if (!name) return;

  const isVerified = confirm("✅ هل تريد توثيق هذا السيرفر في Discovery؟");

  const newServer = {
    name: name,
    messages: [],
    verified: isVerified,
  };

  servers.push(newServer);
  localStorage.setItem("servers", JSON.stringify(servers));
  updateServerList();
}

// أزرار الاتصال
function startCall() {
  alert("📞 ميزة المكالمات الصوتية ستُضاف لاحقًا (WebRTC)");
}

function startVideo() {
  alert("🎥 ميزة مكالمات الفيديو ستُضاف لاحقًا (WebRTC)");
}

// تحميل السيرفرات
updateServerList();
