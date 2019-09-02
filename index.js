$( "#sendMessageForm" ).submit(function( event ) {
  event.preventDefault();

  var $form = $( this ),
    author = $form.find( "input[name='author']" ).val(),
    password = $form.find( "input[name='password']" ).val(),
    addressee = $form.find( "input[name='addressee']" ).val(),
    content = $form.find( "input[name='content']" ).val(),
    url = $form.attr( "action" );

    $("#contentField").val('');

  var posting = $.post( url, { author: author, password: password,
                      addressee: addressee, content: content} );

  posting.done(function( data ) {
    $( "#log" ).append("<div class='message'>" + author + " -> "
    + data.addressee + ": " + data.content + "</div>")
  });
});



var gettingMessages = function() {
  var addressee = $("#sendMessageForm").find("input[name='author']").val(),
  password = $("#sendMessageForm").find("input[name='password']").val();
  if(addressee != "" && password != "") {
    posting = $.post( "http://127.0.0.1:8000/dispatch/get_messages",
                        { addressee: addressee, password: password} );
    posting.done(function(data) {printingMessages(data)});
  }
}

var printingMessages = function(data) {
  if(data.length != 0) {
      data.forEach(function(item){
          $( "#log" ).append("<div class='message'>" + item.author + " -> "
          + item.addressee + ": " + item.content + "</div>");
      });
  }
}

var interval = setInterval(gettingMessages, 2000);
