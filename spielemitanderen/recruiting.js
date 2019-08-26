var script = document.createElement("script");
script.src = "https://lolstatic-a.akamaihd.net/apollo/assets/custom/app_all.5.3.0.js";
document.head.appendChild(script);

var script2 = document.createElement("script");
script2.innerHTML = "forward();function forward(){var hrefURL = \"https://boards.euw.leagueoflegends.com/de/c/spiele-mit-anderen/c1XylYOm-spiele-mit-anderen\"; var forwardOn = [\"https://boards.euw.leagueoflegends.com/de/c/spiele-mit-anderen\",\"https://boards.euw.leagueoflegends.com/de/c/spiele-mit-anderen/\",\"https://boards.euw.leagueoflegends.com/en/c/spiele-mit-anderen\",\"https://boards.euw.leagueoflegends.com/en/c/spiele-mit-anderen/\"];if(forwardOn.indexOf(window.location.href) !== -1) {window.location.href = hrefURL;}}"
document.head.appendChild(script2);

//document.getElementById('discussions').innerHTML = '';
//document.getElementById('discussions').innerHTML = '<div class="discussions box main glow empty"><span class="glow">&nbsp;</span><h2><em>Test</em></h2></div>';