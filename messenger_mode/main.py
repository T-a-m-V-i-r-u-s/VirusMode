from flask import Flask, redirect, url_for, request
app = Flask(__name__)

from extension_bot import ExtensionBot

@app.route('/success/<name>')
def message_sent(name):
    return 'welcome %s' % name

@app.route('/message-bot', methods=['POST', 'GET'])
def send_message():
    if request.method == 'POST':
        email = request.form['email']
        password = request.form['password']
        contact_name = request.form['friend']
        message = request.form['message']
        
        ExtensionBot(email, password, contact_name, message)

    return "Message Sent :)"

if __name__ == '__main__':
    app.run(debug=True)