// بيانات المستخدم
function loadProfile() {
  const avatar = localStorage.getItem("avatar") || "https://i.imgur.com/7k12EPD.png";
  const nickname = localStorage.getItem("nickname") || "مستخدم";

  document.getElementById("avatar").src = avatar;
  document.getElementById("nickname").textContent = nickname;
}

function editProfile() {
  const newNick = prompt("📝 أدخل اسمك:");
  const newAvatar = prompt("🖼️ أدخل رابط صورة:");

  if (newNick) localStorage.setItem("nickname", newNick);
  if (newAvatar) localStorage.setItem("avatar", newAvatar);

  loadProfile();
}

loadProfile();

// === إدارة السيرفرات والقنوات ===

let servers = JSON.parse(localStorage.getItem("servers")) || {};
let currentServer = null;
let currentChannel = null;

// إنشاء سيرفر
function createServer() {
  const name = prompt("📦 اسم السيرفر؟");
  if (!name) return;

  const id = "srv_" + Date.now();
  servers[id] = {
    name,
    channels: {
      gen: {
        name: "عام",
        messages: []
      }
    }
  };
  localStorage.setItem("servers", JSON.stringify(servers));
  renderServers();
}

// عرض السيرفرات
function renderServers() {
  const container = document.getElementById("servers");
  container.innerHTML = "";

  for (const id in servers) {
    const icon = document.createElement("div");
    icon.className = "server-icon";
    icon.textContent = servers[id].name[0].toUpperCase();
    icon.onclick = () => selectServer(id);
    container.appendChild(icon);
  }
}

// اختيار سيرفر
function selectServer(id) {
  currentServer = id;
  currentChannel = null;
  document.getElementById("serverName").textContent = servers[id].name;
  renderChannels(id);
  document.getElementById("messages").innerHTML = `<p style="text-align:center;color:#999">اختر قناة</p>`;
  disableInput(true);
}

// عرض قنوات
function renderChannels(id) {
  const container = document.getElementById("channels");
  container.innerHTML = "";

  const srv = servers[id];
  for (const ch in srv.channels) {
    const btn = document.createElement("button");
    btn.textContent = "#" + srv.channels[ch].name;
    btn.onclick = () => selectChannel(ch);
    container.appendChild(btn);
  }
}

// اختيار قناة
function selectChannel(channelId) {
  currentChannel = channelId;
  document.getElementById("channelTitle").textContent = "#" + servers[currentServer].channels[channelId].name;
  renderMessages();
  disableInput(false);
}

// إرسال رسالة
function sendMessage() {
  const input = document.getElementById("messageInput");
  const content = input.value.trim();
  if (!content || !currentServer || !currentChannel) return;

  const nickname = localStorage.getItem("nickname") || "مستخدم";

  servers[currentServer].channels[currentChannel].messages.push({
    user: nickname,
    text: content,
    time: new Date().toLocaleTimeString()
  });

  localStorage.setItem("servers", JSON.stringify(servers));
  input.value = "";
  renderMessages();
}

// عرض الرسائل
function renderMessages() {
  const msgBox = document.getElementById("messages");
  const messages = servers[currentServer].channels[currentChannel].messages;

  msgBox.innerHTML = "";
  messages.forEach(msg => {
    const el = document.createElement("div");
    el.className = "message";
    el.innerHTML = `<strong>${msg.user}</strong> <small style="color:gray">${msg.time}</small><br>${msg.text}`;
    msgBox.appendChild(el);
  });

  msgBox.scrollTop = msgBox.scrollHeight;
}

function disableInput(state) {
  document.getElementById("messageInput").disabled = state;
  document.querySelector(".input-area button").disabled = state;
}

// عند بداية الصفحة
renderServers();
