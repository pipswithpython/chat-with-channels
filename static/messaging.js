let lastMessages = '';

document.addEventListener('DOMContentLoaded', async () => {
    try {
        const channels = await fetchJSON('/api/channels');
        updateChannelList(channels);
        refreshMessages();
    } catch (error) {
        console.error('Error initializing chat:', error);
    }

    const messageInput = document.getElementById('message-input');
    messageInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            event.preventDefault();
            sendMessage();
        }
    });
});

function updateChannelList(channels) {
    const currentChannel = getCurrentChannel();
    const channelsElem = document.getElementById('channels');

    channelsElem.innerHTML = '';

    channels.forEach(channel => {
        const newChannel = document.createElement('a');
        newChannel.textContent = `#${channel}`;
        newChannel.href = `/channel/${channel}`;
        newChannel.classList.add('channel-name');

        if (channel === currentChannel) {
            newChannel.style.textDecoration = 'underline';
        }

        channelsElem.appendChild(newChannel);
    });
}

function updateMessageHTML(messageData) {
    const messagesElem = document.getElementById('messages');

    if (JSON.stringify(messageData) !== lastMessages) {
        messagesElem.innerHTML = '';

        messageData.forEach(({ name, msg }) => {
            const newMessage = document.createElement('div');
            newMessage.innerHTML = `<strong class="message-name">${name}</strong> ${msg}`;
            newMessage.classList.add('message');
            messagesElem.appendChild(newMessage);
        });

        lastMessages = JSON.stringify(messageData);
        messagesElem.lastElementChild?.scrollIntoView({ behavior: 'smooth' });
    }
}

async function fetchJSON(url) {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`Failed to fetch data from ${url}: ${response.statusText}`);
        }
        return await response.json();
    } catch (error) {
        console.error('Fetch JSON error:', error);
        throw error;
    }
}

function postJSON(url, json) {
    const request = new XMLHttpRequest();
    request.open('POST', url, true);
    request.setRequestHeader('Content-Type', 'application/json;');

    request.send(JSON.stringify(json));
}

async function refreshMessages() {
    const currentChannel = getCurrentChannel();
    try {
        const messageData = await fetchJSON(`/api/channel/${currentChannel}`);
        updateMessageHTML(messageData);
    } catch (error) {
        console.error('Error refreshing messages:', error);
    }
}

function sendMessage() {
    const messageInput = document.getElementById('message-input');
    const message = messageInput.value.trim();

    if (!message) return;

    const currentChannel = getCurrentChannel();

    const messageData = {
        channel: currentChannel,
        name: 'Pipswithpython',
        msg: message
    };

    postJSON('/api/send_message', messageData);
    messageInput.value = '';

    refreshMessages();
}

function getCurrentChannel() {
    const pathParts = window.location.pathname.split('/');
    return pathParts[pathParts.length - 1];
}
