from flask import Flask, request, jsonify
import time

app = Flask(__name__)

channels = {
    'food': [
        {'name': 'Pipswithpython', 'msg': 'Hey!', 'time': 0},
        {'name': 'Pipswithpython', 'msg': 'I like pizza. <3', 'time': 1}
    ],
    'games': [
        {'name': 'Pipswithpython', 'msg': 'COD is the best game!', 'time': 0}
    ],
    'pixel-art': [
        {'name': 'Pipswithpython', 'msg': 'Let\'s go make a pixel-art game', 'time': 0}
    ]
}

def clean_input(text):
    return text.replace('<', '').replace('>', '')

@app.route('/')
def home():
    channel_links = ''.join(f'<a href="/channel/{channel}">#{channel}</a><br>' for channel in channels)
    return f'Welcome to my home. This is my first project with <i>Python & Flask</i>.<br><br>Channels:<br>{channel_links}'

@app.route('/channel/<channel_id>')
def channel(channel_id):
    try:
        with open('templates/messaging.html') as f:
            return f.read()
    except FileNotFoundError:
        return "Page not found", 404

@app.route('/api/channels')
def api_channels():
    return jsonify(list(channels.keys()))

@app.route('/api/channel/<channel_id>')
def api_channel(channel_id):
    if channel_id in channels:
        return jsonify(channels[channel_id])
    return jsonify({'error': 'Channel not found'}), 404

@app.route('/api/send_message', methods=['POST'])
def api_send_message():
    data = request.json
    channel = data.get('channel')
    name = clean_input(data.get('name'))
    msg = clean_input(data.get('msg'))

    if channel in channels:
        message_data = {'name': name, 'msg': msg, 'time': time.time()}
        channels[channel].append(message_data)
        return jsonify({'status': 'success'})
    return jsonify({'error': 'Channel not found'}), 404

if __name__ == '__main__':
    app.run(port=3000, debug=True)
