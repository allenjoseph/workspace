$(document).ready(function(){
	window.io = io.connect();

	io.on('connect', function(socket){
		console.log('io connected');
	});

	io.on('log-in', function(data){
		$('#chat-users').append('<li id="'+data.userid+'">'+data.username+'</li>');
	});

	io.on('log-out', function(data){
		$('#chat-users li').each(function(index,item){
			if( $(item).attr('id') == data.userid ){
				$(item).remove();
			}
		});
	});
});