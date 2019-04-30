function getSessionReply() {
  // Get variables
  let name = document.getElementById("name").value;
  const cr = document.getElementById("cr").value;
  const env = document.getElementById("env").value;

  // Build name
  name = name + "By";
  if (cr !== "") {
    if (env !== "") {
      name = name + "CRandEnv";
    } else {
      name = name + "CR";
    }
  } else if (env !== "") {
    name = name + "Env";
  } else {
    name = name + "Itself";
  }

  // Build query string
  let url = "https://gf4ajxpfkd.execute-api.us-west-2.amazonaws.com/webAutoDM/autodm?";
  const queryString = "name=" + name + "&cr=" + cr + "&env=" + env;
  url += queryString;

  // Get request
  const Http = new XMLHttpRequest();
  Http.open("GET", url);
  Http.send();
  Http.onreadystatechange=(e)=>{
    if (Http.readyState === 4) {
      // Get response
      let response = JSON.parse(Http.responseText);
      const outputText = document.getElementById("outputText").innerHTML;

      // Convert to HTML
      response.body = response.body.replace(/\n/g, "<br>");
      response.body = response.body.replace(/\t/g, "&nbsp &nbsp &nbsp &nbsp");

      // Update output
      const newText = response.body + "<br><br>" + outputText;
      document.getElementById("outputText").innerHTML = newText;
    }
  }
}
