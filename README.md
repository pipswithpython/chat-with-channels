# Chat With Channels Application

## Description

The Chat Application is a JavaScript-based chat app that allows real-time interaction across different channels. Designed to be simple and efficient, this application provides an interface for sending and receiving messages with support for automatic updates and channel navigation.

## Features

- **Dynamic Channel Listing**: Automatically updates the list of available channels.
- **Message Sending**: Allows sending messages to the current channel with a simple press of the Enter key.
- **Real-Time Updates**: Updates and displays messages from the current channel in real-time.
- **Automatic Scrolling**: Automatically scrolls to display the most recent message.

## Usage

**Initial Loading**: When the page loads, the list of channels and messages will be updated automatically.

**Sending Messages**: Type your message in the input box and press Enter to send it to the current channel.

## Key Functions

- **DOMContentLoaded**: Initializes the chat, loads channels, and messages.
- **updateChannelList(channels)**: Updates the list of available channels.
- **updateMessageHTML(messageData)**: Updates the display of messages in the current channel.
- **fetchJSON(url)**: Performs a GET request to fetch JSON data.
- **postJSON(url, json)**: Sends JSON data via POST.
- **refreshMessages()**: Refreshes messages in the current channel.
- **sendMessage()**: Sends a message to the current channel.
- **getCurrentChannel()**: Retrieves the current channel from the URL.

## Contact

**pipswithpython@gmail.com**
