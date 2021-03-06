import React, {
    Component
} from 'react'
import '../App.css';
import Chatkit from '@pusher/chatkit-client';
import Message from './Message';
import TypingIndicator from './TypingIndicator';

class Chat extends Component {

    constructor(props) {
        super(props);

        this.state = {
            messages: [],
            currentRoom: {},
            currentUser: {},
            typingUsers: [],
            chatInput: '',
        }

        this.sendMessage = this.sendMessage.bind(this);
        this._handleKeyPress = this._handleKeyPress.bind(this);
        this.sendTypingEvent = this.sendTypingEvent.bind(this);
    }

    sendMessage() {
        if (this.state.chatInput) {
            this.state.currentUser.sendMessage({
                text: this.state.chatInput,
                roomId: this.state.currentRoom.id,
            })
        }
        this.setState({
            chatInput: ''
        });
    }

    sendTypingEvent(event) {
        this.state.currentUser
            .isTypingIn({
                roomId: this.state.currentRoom.id
            })
            .catch(error => console.error('error', error))

        this.setState({
            chatInput: event.target.value
        });
    }

    _handleKeyPress(e) {
        if (e.key === 'Enter') {
            this.sendMessage();
        }
    }

    componentDidMount() {
        const chatManager = new Chatkit.ChatManager({
            instanceLocator: 'v1:us1:4b9e2a65-cee7-400a-86df-f8d0c4aa019b',
            userId: this.props.currentUsername,
            tokenProvider: new Chatkit.TokenProvider({
                url: 'https://us1.pusherplatform.io/services/chatkit_token_provider/v1/4b9e2a65-cee7-400a-86df-f8d0c4aa019b/token',
            }),
        })
        chatManager.connect()
            .then(currentUser => {
                this.setState({
                    currentUser
                })
                return currentUser.subscribeToRoom({
                    roomId: '23169161',
                    messageLimit: 100,
                    hooks: {
                        onMessage: message => {
                            let newMessages = this.state.messages;
                            newMessages.push( <
                                Message key = {
                                    this.state.messages.length
                                }
                                senderId = {
                                    message.senderId
                                }
                                text = {
                                    message.text
                                }
                                />
                            );
                            this.setState({
                                messages: newMessages
                            })
                        },
                        onUserStartedTyping: user => {
                            this.setState({
                                typingUsers: [...this.state.typingUsers, user.name],
                            })
                            console.log(this.state.typingUsers);
                        },
                        onUserStoppedTyping: user => {
                            this.setState({
                                typingUsers: this.state.typingUsers.filter(
                                    username => username !== user.name
                                ),
                            })
                        },
                    },
                })
            })
            .then(currentRoom => {
                this.setState({
                    currentRoom
                })
            })
            .catch(error => console.error('error', error))

    }

    render() {
        return ( 
            <div id = "center">
            
            <div id = "chat-output"> 
            { this.state.messages } 
            </div> 
            <input id = "chat-input"
            type = "text"
            placeholder = 'Type message...'
            name = ""
            value = { this.state.chatInput }
            onChange = { this.sendTypingEvent }
            onKeyPress = { this._handleKeyPress }/> 
            <div id = "btndiv">
            <input id = "button"
            type = "button"
            onClick = { this.sendMessage }
            value = "Send Chat"/>
            <TypingIndicator typingUsers={this.state.typingUsers} />
            </div> 
            
            </div>
        );
    }
}

export default Chat;