var script = document.createElement("script");
script.src = "https://cdn.jsdelivr.net/gh/recon88/boardsstuff/main/euw_ger_custom.js";
document.head.appendChild(script);

var script2 = document.createElement("script");
script2.innerHTML = "forward();function forward(){var hrefURL = \"https://boards.euw.leagueoflegends.com/de/c/spiele-mit-anderen/c1XylYOm-spiele-mit-anderen\"; var forwardOn = [\"https://boards.euw.leagueoflegends.com/de/c/spiele-mit-anderen\",\"https://boards.euw.leagueoflegends.com/de/c/spiele-mit-anderen/\",\"https://boards.euw.leagueoflegends.com/en/c/spiele-mit-anderen\",\"https://boards.euw.leagueoflegends.com/en/c/spiele-mit-anderen/\"];if(forwardOn.indexOf(window.location.href) !== -1) {window.location.href = hrefURL;}}"
document.head.appendChild(script2);

//document.getElementById('discussions').innerHTML = '';
//document.getElementById('discussions').innerHTML = '<div class="discussions box main glow empty"><span class="glow">&nbsp;</span><h2><em>Test</em></h2></div>';

if ($("#discussion").data().discussionId === "c1XylYOm") {
	 <script src="https://cdn.jsdelivr.net/gh/recon88/boardsstuff/spielemitanderen/lazyload.min.js"></script>
   <script type="text/javascript" src="https://cdn.jsdelivr.net/gh/recon88/boardsstuff/spielemitanderen/freewall.min.js"></script>
   <link rel="stylesheet" type="text/css" href="https://cdn.jsdelivr.net/gh/recon88/boardsstuff/spielemitanderen/recap.min.css">
   <script type="text/javascript">
      $(function() {
      	var myLazyLoad = new LazyLoad();
      	$("html body .backdrop .header").attr("style","background:url(https://lolstatic-a.akamaihd.net/apollo/assets/custom/ezreal_2019.png)!important;background-repeat:no-repeat!important");
      });
   </script>
   
    <script type="text/javascript">
      $(function() {
      	var wall = new Freewall("#freewall");
      	wall.reset({
      		selector: '.brick',
      		animate: true,
      		cellW: 160,
      		cellH: 160,
           gutterY: 8,
           gutterX: 8,
      		fixSize: 0,
      		onResize: function() {
      			wall.refresh();
      		}
      	});
                                   wall.fitZone();
                                   wall.filter(".na");
      	$(".filter-label").click(function() {
      		$(".filter-label").removeClass("active");
      		var filter = $(this).addClass('active').data('filter');
      		if (filter) {
      			wall.filter(filter);
      		} else {
      			wall.unFilter();
      		}
      	});
      
      	wall.fitWidth();
      });
   </script>
   <script type="text/javascript" src="https://static.boards.lol/js/ganalytics.js"></script>
}