function sendFeedback(){

    var feedback_data = document.getElementById('feedback-fld').value;
    console.log(feedback_data);

  const request = new XMLHttpRequest();
  request.open("POST", "https://discord.com/api/webhooks/1153849127441018900/TvS-1R0ZaZ6BIvFpnrnBRsI_vabCBjBJBU3aVnkJcQI59PH7icNB6qpDGXVShXa1CTgR");

  request.setRequestHeader('Content-type', 'application/json');

  const params = {
    username: "Feedback Bot",
    content: feedback_data
  }

  request.send(JSON.stringify(params));
  document.getElementById("feedback-fld").value = "";
  document.getElementById('fb_panel').style.display = "none";
  document.getElementById('booking_page').style.display = "block";
}

function feedback_panel_tgl(type){
  if(type == "on"){
    document.getElementById('fb_panel').style.display = "block";
    document.getElementById('booking_page').style.display = "none";
  }else if(type == "off"){
    document.getElementById('fb_panel').style.display = "none";
    document.getElementById('booking_page').style.display = "block";
  }
}