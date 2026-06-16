// dark mode toggle or light mode toggle
const themeToggleButton = document.getElementById('theme-toggle');
const body = document.body;

function applyTheme(theme) {
    const isDark = theme === 'dark';
    if (isDark) {
        body.classList.add('dark-mode');
        body.style.backgroundColor = '#211f1f56';
        const chatBtmP = document.getElementById('chatBtmP');
        const msgInput = document.getElementById('msgs');
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.style.backgroundColor = '#5b5252';
            sendBtn.style.color = '#fff';
        }
        if (msgInput) {
            msgInput.style.backgroundColor = '#211f1fb4';
            msgInput.style.color = '#fff';
        }
        if (chatBtmP) {
            chatBtmP.style.backgroundColor = '#211f1fb4';
        }
        body.style.backgroundImage = '';
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-mode');
        body.style.backgroundColor = '';
        const chatBtmP = document.getElementById('chatBtmP');
        const msgInput = document.getElementById('msgs');
        const sendBtn = document.getElementById('sendBtn');
        if (sendBtn) {
            sendBtn.style.backgroundColor = '';
            sendBtn.style.color = '';
        }
        if (chatBtmP && msgInput) {
            chatBtmP.style.backgroundColor = '';
            msgInput.style.backgroundColor = '';
        }
        body.style.backgroundImage = "url('https://images.rawpixel.com/image_800/cHJpdmF0ZS9sci9pbWFnZXMvd2Vic2l0ZS8yMDI0LTExL3Jhd3BpeGVsX29mZmljZV8zMF9hYnN0cmFjdF9ncmFkaWVudF93aGl0ZV9iYWNrZ3JvdW5kX3ZlY3Rvcl9wcl9kZGY3ZTJiNC0wMjU3LTRjMTUtOWFjNS0xMmQwZTA0N2E4MWYuanBn.jpg')";
        body.style.backgroundRepeat = 'no-repeat';
        body.style.backgroundPosition = 'center';
        body.style.backgroundSize = 'cover';
        body.style.backgroundAttachment = 'fixed';
        localStorage.setItem('theme', 'light');
    }

    if (themeToggleButton) {
        themeToggleButton.setAttribute('aria-pressed', String(isDark));
        themeToggleButton.textContent = isDark ? 'Light mode' : 'Dark mode';
        themeToggleButton.style.backgroundColor = isDark ? '#fff' : '#5b5252';
        const chatBtmP = document.getElementById('chatBtmP');
        const msgInput = document.getElementById('msgs');
        const sendBtn = document.getElementById('sendBtn');
        if (chatBtmP && msgInput && sendBtn) {
            chatBtmP.style.backgroundColor = isDark ? '#211f1fb4' : '';
            msgInput.style.backgroundColor = isDark ? '#211f1fb4' : '';
            sendBtn.style.backgroundColor = isDark ? '#211f1fb4' : '';
        }
        themeToggleButton.style.borderRadius = '50%';
        themeToggleButton.style.width = '35px';
        themeToggleButton.style.height = '35px';
    }
}

if (themeToggleButton) {
    themeToggleButton.addEventListener('click', () => {
        const isDark = body.classList.contains('dark-mode');
        applyTheme(isDark ? 'light' : 'dark');
    });
}

window.addEventListener('DOMContentLoaded', () => {
    const savedTheme = localStorage.getItem('theme');
    applyTheme(savedTheme === 'dark' ? 'light' : 'dark');
});

function toggleTheme() {
    const body = document.body;
    const button = document.getElementById('theme-toggle');
    const isDarkMode = body.classList.toggle('darkmode');
    button.setAttribute('aria-pressed', String(isDarkMode));
    button.value = isDarkMode ? 'Dark' : 'Light';
};


/*if user types any message in the input field and clicks the send button, show that message in the message section of msg.html */
let submitbutton;
let messageInput;
let messageContainer;
let loginPage;
let loginButton;
let arrowBottom;



function appendMessage(sender, text, align = "left") {
    if (!messageContainer) return;

    const messageDiv = document.createElement("div");
    messageDiv.classList.add(align === "right" ? "message-right" : "message-left");

    const senderLabel = document.createElement("p");
    senderLabel.classList.add("sender-name");
    senderLabel.innerText = sender;
    senderLabel.style.color = align === "right" ? "#e04b4b" : "#777";
    senderLabel.style.fontWeight = "400";
    senderLabel.style.fontSize = "0.8em";
    senderLabel.style.margin = "0 0 4px 0";

    const messageP = document.createElement("p");
    messageP.innerText = text;
    messageP.style.margin = "0";

    messageDiv.appendChild(senderLabel);
    messageDiv.appendChild(messageP);
    messageContainer.appendChild(messageDiv);
    messageContainer.scrollTop = messageContainer.scrollHeight;
    updateArrowBottomVisibility();
}

function sendMessage() {
    if (!messageInput || !messageContainer) return;
    const message = messageInput.value.trim();
    if (!message) return;

    appendMessage("You", message, "left");
    messageInput.value = "";
    messageInput.focus();
}

function receiveMessage(message, sender) {
    if (!messageContainer || !message) return;
    appendMessage(sender || (
        currentUser ? currentUser : "Other User"
    ), message, "right");
}

function getUserFromMessageButton(button) {
    if (!button) return null;
    return button.dataset.user || button.dataset.username || button.getAttribute("data-user") || button.getAttribute("data-username");
}

function openUserMessagePage(userName) {
    const targetUrl = userName ? `msg.html?user=${encodeURIComponent(userName)}` : "msg.html";
    window.location.href = targetUrl;
}

function initializeExploreMessageButtons() {
    const messageButtons = document.querySelectorAll(".message-button, .message-btn, .btn-message");
    if (!messageButtons.length) return;

    messageButtons.forEach((button) => {
        button.addEventListener("click", () => {
            const userName = getUserFromMessageButton(button);
            openUserMessagePage(userName);
        });
    });
}

function updateLoginButtonVisibility() {
    if (!loginButton) return;
    loginButton.style.display = loginPage ? "" : "none";
}

function updateArrowBottomVisibility() {
    if (!arrowBottom) return;
    if (!messageContainer) {
        arrowBottom.style.display = "none";
        return;
    }

    const hasOverflow = messageContainer.scrollHeight > messageContainer.clientHeight;
    arrowBottom.style.display = hasOverflow ? "" : "none";
}

function initializeChat() {
    submitbutton = document.querySelector(".send, .send-btn, .submit-button, button[type='submit'], input[type='submit']");
    messageInput = document.querySelector("#msg, input[name='msg'], textarea[name='msg'], input[placeholder*='message'], textarea, input[type='text']");
    messageContainer = document.querySelector(".message, .messages, .chat-messages, .chat-container");
    loginPage = document.querySelector(".login-page") || document.getElementById("login-page");
    loginButton = document.querySelector(".login-button") || document.getElementById("login-button");
    arrowBottom = document.querySelector(".arrow-bottom") || document.getElementById("arrow-bottom");

    if (submitbutton) {
        submitbutton.addEventListener("click", function (event) {
            if (event && typeof event.preventDefault === "function") {
                event.preventDefault();
            }
            sendMessage();
        });
    }

    if (messageInput) {
        messageInput.addEventListener("keydown", function (event) {
            if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                sendMessage();
            }
        });
    }

    initializeExploreMessageButtons();
    updateLoginButtonVisibility();
    updateArrowBottomVisibility();
}

if (document.readyState !== "loading") {
    initializeChat();
} else {
    document.addEventListener("DOMContentLoaded", initializeChat);
}

// Example of receiving a message after 5 seconds for demonstration purposes
// Send messages one at a time, each 5 seconds after the previous
const demoMessages = [
    { text: "Hello! This is a message from the other user." },
    { text: "Feel free to chat here!" },
    { text: "This is a demo message to show how messages from the other user will appear." },
    { text: "You can type your messages in the input field and click send to see them on the left side." },
    { text: "This chat interface is designed to show messages from you on the left and messages from the other user on the right." }
];

function sendDemoMessagesSequentially(messages, delayMs) {
    let idx = 0;
    function sendNext() {
        if (messages.length === 0) return;
        const m = messages[idx];
        receiveMessage(m.text, m.receiver);
        idx = (idx + 1) % messages.length;
        setTimeout(sendNext, delayMs);
    }
    setTimeout(sendNext, delayMs);
}

sendDemoMessagesSequentially(demoMessages, 5000);


//profile pic zoom logic
let currentZoomedProfilePic = null;

const profilePics = document.querySelectorAll("[id='profilePic'], .profilePic");
profilePics.forEach((profilePic) => {
    profilePic.dataset.zoomed = "false";
    profilePic.addEventListener("click", () => {

        if (currentZoomedProfilePic && currentZoomedProfilePic !== profilePic) {
            currentZoomedProfilePic.style.transform = "scale(1)";
            currentZoomedProfilePic.style.cursor = "pointer";
            currentZoomedProfilePic.style.maxWidth = "";
            currentZoomedProfilePic.style.maxHeight = "";
            currentZoomedProfilePic.style.transformOrigin = "";
            currentZoomedProfilePic.style.position = "";
            currentZoomedProfilePic.style.top = "";
            currentZoomedProfilePic.style.left = "";
            currentZoomedProfilePic.style.zIndex = "";
            currentZoomedProfilePic.dataset.zoomed = "false";
            currentZoomedProfilePic = null;
        }

        const isZoomed = profilePic.dataset.zoomed === "true";
        if (isZoomed) {
            profilePic.style.transform = "scale(1)";
            profilePic.style.cursor = "pointer";
            profilePic.style.maxWidth = "";
            profilePic.style.maxHeight = "";
            profilePic.style.transformOrigin = "";
            profilePic.style.position = "";
            profilePic.style.top = "";
            profilePic.style.left = "";
            profilePic.style.zIndex = "";
            profilePic.dataset.zoomed = "false";
            currentZoomedProfilePic = null;
        } else {
            profilePic.style.transform = "scale(3)";
            profilePic.style.cursor = "zoom-out";
            profilePic.style.transition = "transform 0.3s ease";
            profilePic.style.transformOrigin = "center center";
            profilePic.style.maxWidth = "90vw";
            profilePic.style.maxHeight = "90vh";
            profilePic.style.position = "fixed";
            profilePic.style.top = "50%";
            profilePic.style.left = "50%";
            profilePic.style.zIndex = "9999";
            profilePic.dataset.zoomed = "true";
            currentZoomedProfilePic = profilePic;
        }
    });
});



//searching logic for user search for list class 
function initializeUserSearch() {
    const userSearchInput = document.querySelector("#userSearch, .user-search, input[name='search'], input[placeholder*='Search'], input[placeholder*='search']");
    let userListItems = document.querySelectorAll(".user-item, .user-list-item, .user, .contact, li");
    if (userListItems.length === 0) {
        userListItems = document.querySelectorAll("section");
    }
    if (!userSearchInput || userListItems.length === 0) return;

    const filterUserList = () => {
        const query = userSearchInput.value.trim().toLowerCase();
        const numericQuery = query.replace(/\D/g, "");
        userListItems.forEach((item) => {
            const text = item.textContent.trim().toLowerCase();
            const numbers = item.textContent.match(/\d+/g) || [];
            const matches =
                query === "" ||
                text.includes(query) ||
                (numericQuery !== "" && numbers.some((num) => num.includes(numericQuery)));

            item.style.display = matches ? "" : "none";
        });
    };

    const getUserNameFromItem = (item) => {
        const nameElement = item.querySelector(".user-name, .username, .name, .contact-name");
        return (
            (nameElement && nameElement.textContent.trim()) ||
            item.dataset.user ||
            item.dataset.username ||
            item.getAttribute("data-user") ||
            item.getAttribute("data-username") ||
            item.textContent.trim().split("\n")[0].trim()
        );
    };

    const updateSelectedUserInSpam = (userName) => {
        if (!userName) return;
        const spamElement = document.querySelector(
            ".spam, .left .spam, .left .user-name, .left .selected-user, .left .current-user, .selected-user, .current-user"
        );
        if (spamElement) {
            spamElement.textContent = userName;
        }
    };

    userListItems.forEach((item) => {
        item.style.cursor = "pointer";
        item.addEventListener("click", () => {
            const userName = getUserNameFromItem(item);
            if (userName) {
                selectUser(userName);
                updateSelectedUserInSpam(userName);
            }
        });
    });

    userSearchInput.addEventListener("input", filterUserList);
    filterUserList();
}

if (document.readyState !== "loading") {
    initializeUserSearch();
} else {
    document.addEventListener('DOMContentLoaded', initializeUserSearch);
};



//user selection logic
let currentUser = "";

function selectUser(user) {
    currentUser = user;
    const leftEl = document.querySelector('.left');
    if (leftEl) leftEl.textContent = user;
    const messagesEl = document.getElementById('messages');
    if (messagesEl) messagesEl.innerHTML = '';
}

function sendMessage() {
    const textEl = document.getElementById('msgs');
    if (!textEl) return;
    const text = textEl.value;

    if (currentUser === "") {
        alert('Select a user first');
        return;
    }
    if (text.trim() !== "") {
        const messagesEl = document.getElementById('messages');
        if (messagesEl) {
            const p = document.createElement('p');
            const b = document.createElement('b');
            b.textContent = 'you:';
            p.appendChild(b);
            p.appendChild(document.createTextNode(' ' + text));
            messagesEl.appendChild(p);
        }
        textEl.value = '';
    }
}

//if change user then change hole data of user(number, name, ) the chatBtmP data





