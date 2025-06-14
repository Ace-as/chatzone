// ربط عناصر HTML
const messages = document.getElementById("messages");
const input = document.getElementById("messageInput");

// إرسال رسالة
function sendMessage() {
  const text = input.value.trim();
  if (text !== "") {
    const div = document.createElement("div");
    div.className = "message";
    div.innerHTML = `<strong>أنت:</strong> ${text}`;
    messages.appendChild(div);
    input.value = "";
    messages.scrollTop = messages.scrollHeight;
  }
}

// إدخال بالكيبورد
input.addEventListener("keypress", (e) => {
  if (e.key === "Enter") sendMessage();
});

// أزرار الاتصال
function startCall() {
  alert("📞 ميزة المكالمات الصوتية ستُضاف لاحقًا (WebRTC)");
}

function startVideo() {
  alert("🎥 ميزة مكالمات الفيديو ستُضاف لاحقًا (WebRTC)");
}
