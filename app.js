// إضافة قناة
function createChannel() {
  if (!currentServer) return;
  const name = prompt("📁 اسم القناة:");
  if (!name) return;

  const id = "ch_" + Date.now();
  servers[currentServer].channels[id] = {
    name,
    messages: []
  };

  localStorage.setItem("servers", JSON.stringify(servers));
  renderChannels(currentServer);
}

// عرض الأعضاء
function renderMembers() {
  const container = document.getElementById("memberList");
  container.innerHTML = "";

  const members = servers[currentServer].members || [getCurrentUser()];
  servers[currentServer].members = members;

  members.forEach(member => {
    const div = document.createElement("div");
    div.className = "member";
    div.innerHTML = `
      <strong>${member.nickname}</strong>
      <div class="role">${member.role}</div>
    `;
    container.appendChild(div);
  });

  localStorage.setItem("servers", JSON.stringify(servers));
}

function getCurrentUser() {
  return {
    nickname: localStorage.getItem("nickname") || "مستخدم",
    avatar: localStorage.getItem("avatar"),
    role: "مالك"
  };
}

// عرض القنوات (مُحدث)
function renderChannels(id) {
  const container = document.getElementById("channels");
  container.innerHTML = "";

  for (const ch in servers[id].channels) {
    const btn = document.createElement("button");
    btn.textContent = "#" + servers[id].channels[ch].name;
    btn.onclick = () => selectChannel(ch);
    container.appendChild(btn);
  }

  renderMembers();
}

// عند الانضمام لسيرفر جديد، أضف نفسك لقائمة الأعضاء:
function selectServer(id) {
  currentServer = id;
  currentChannel = null;
  document.getElementById("serverName").textContent = servers[id].name;

  // أضف العضو إذا غير موجود
  const members = servers[id].members || [];
  const nick = localStorage.getItem("nickname") || "مستخدم";
  if (!members.find(m => m.nickname === nick)) {
    members.push(getCurrentUser());
    servers[id].members = members;
    localStorage.setItem("servers", JSON.stringify(servers));
  }

  renderChannels(id);
  document.getElementById("messages").innerHTML = `<p style="text-align:center;color:#999">اختر قناة</p>`;
  disableInput(true);
}
