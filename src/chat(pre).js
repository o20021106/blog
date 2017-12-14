import React from 'react';
import { connect, Provider } from 'react-redux';
import fetch from 'isomorphic-fetch';
import * as actions from './actions/index';
import ChatWindow from './chatWindow';
import io from 'socket.io-client';


class Chat extends React.Component{	
	constructor(props){
		super(props);
		this.state = {recipientId: '', messageBuffer:'asdfadsfasdf'};
		this.userList = this.userList.bind(this);
		this.changeRecipient = this.changeRecipient.bind(this);
		this.insertText = this.insertText.bind(this);
	}
	componentWillMount(){
		this.props.loadConversations();
		this.props.loadRecipients();
	}

	userList(){
		if(this.props.recipients.length == 0){
			console.log('why??');	
		}
		else{
			console.log('here');
			console.log(this.props.recipients.length)
			return this.props.recipients.map(user=>(<option key = {user._id} value = {user._id}>{user.name}</option>));
		}
	}


	changeRecipient(e){
		e.preventDefault();
		this.setState({recipientId: e.target.value});
		this.props.getConversationByRecipientId(e.target.value);
	}

	insertText(e){
		e.preventDefault();
		this.setState({messageBuffer:e.target.value});
	}

	participantsNames(participants){ 
		return participants.map(participant => (<div key= {participant._id}>{participant.name}</div>));
	}
	
	selectConversation(e,conversationId){
		e.preventDefault();
		let data = e.currentTarget.getAttribute('data-href');
		this.props.setChosenConversation(conversationId);
		this.props.setLatestRecipient();
	}

	conversationList(){
		if(!(this.props.conversations.length === 0)){
			return this.props.conversations.map(conversation =>(
				<li key = {conversation.conversation._id} >
					<a data-href = {'http://localhost:8000/messaages/'+conversation.conversation._id} onClick = {(e) =>this.selectConversation(e,conversation.conversation._id)}>
						<div>
							participants: {this.participantsNames(conversation.conversation.participants)}
						</div> 
						<div>
							{conversation.message[0].auther}
							{conversation.message[0].body}
						</div>
					</a>
				</li>))
		}
	}

 
    
	render(){

		return (
			<div>
			{JSON.parse(localStorage.getItem("user")).name}
				<form>
				 	<select name="recipient" onChange = {(e)=> this.changeRecipient(e)}>
     					{this.userList()}
				  	</select>
				</form> 
				<ul>
					{this.conversationList()}
				</ul>
				<ChatWindow/>

			</div>)
	}

 	
}

function mapStateToProps(state) {  
    return { recipients: state.recipients, conversations: state.conversations};
}
	
export default connect(mapStateToProps, actions)(Chat);
 





/*

	newConversation(e){
		e.preventDefault();
		this.props.newConversationSocket(this.state.messageBuffer, this.state.recipientId);
	}

	newMessage(e){
		e.preventDefault();
		var recipientId = this.state.recipientId;
		if (recipientId ===''){
			recipientId = this.props.recipients[0]._id;
		}
		console.log(recipientId);
		console.log(this.state.messageBuffer);
		fetch('/newMessage',
		{
			headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json',
		      'Authorization' : localStorage.getItem("token"),

		    },
		    method: "POST",
		    body: JSON.stringify({recipient:recipientId, composedMessage:this.state.messageBuffer})
		})
		.then(function(response) {
		    console.log(response);
		})
	}
*/
