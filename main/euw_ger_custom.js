/*!
 * League of Legends Boards Revamp Project (EUW) - Retouch GER
 * Version: 1.0.1 LTR
 * Requires: jQuery 2.1.0+
 *
 * Developed primarily and exclusively for Riot Games, 
 * for use on the League of Legends Apollo Boards.
 *
 */
(function($,global,localStorage){
	// Block 1 | Initialize Base Variables
	var currentVersion = '5.3.0';
	var isBoardIndex = document.getElementsByClassName('discussion-list').length > 0;
	var isChronoView = document.getElementsByClassName('muted').length > 0;
	var isAuthenticated = document.getElementsByClassName('logged-in').length > 0;
	var isBoardHome = document.getElementsByClassName('site-name').length < 1;
	var currentDate = Date.now();
	var region = global.location.href.split('.')[1];
	var apolloBaseUrl = 'https://apollo.' + region + '.leagueoflegends.com/apollo';
	try {
		var lang = document.getElementById('search-form').getAttribute('action').substring(1,3);
	} catch(e){
		if(isBoardHome || !isBoardIndex){
			var lang = document.getElementById('breadcrumbs').getElementsByTagName('h2')[0].getElementsByTagName('a')[0].getAttribute('href').substring(1,3);
		} else {
			var lang = document.getElementById('breadcrumbs').getElementsByClassName('site-name')[0].getElementsByTagName('a')[0].getAttribute('href').substring(1,3);
		}
	}
	var locale = {
		en: {
			commentDisable_1: "This thread has been archived.",
			commentDisable_2: "Create a new thread instead?",
			commentDeleted: "Sorry! The comment you have requested is no longer available.",
			goToComment: "GO TO COMMENT",
			show: "Show",
			hide: "Hide",
			responseTo: "Response To",
			voteSuffix: "vote",
			votesSuffix: "votes",
			unreadMessage_1: "You have ",
			unreadMessage_2: " unread moderation message(s)!",
			other: "Other",
			comments: function(role){
				 return role + " Comments";
			},
			spoiler: "Hover to reveal spoiler"
		},
		ru: {
			commentDisable_1: "Это обсуждение было архивировано.",
			commentDisable_2: "Cоздать новое обсуждение взамен?",
			commentDeleted: "Извините, запрашиваемый вами комментарий больше не доступен.",
			goToComment: "ПЕРЕЙТИ К КОММЕНТАРИЮ",
			show: "Показать",
			hide: "Скрыть",
			responseTo: "В ответ на",
			voteSuffix: "голос",
			votesSuffix: "голоса",
			unreadMessage_1: "У вас ",
			unreadMessage_2: " непрочитанных сообщений о модерации",
			other: "Other",
			comments: function(role){
				 return "Комментарии сотрудника " + role;
			},
			spoiler: "Hover to reveal spoiler"
		},
		pl: {
			// POLISH LOCALIZATION - EU PL
			commentDisable_1: "Ten wątek został zamknięty.",
			commentDisable_2: "Aby kontynuować dyskusję, stwórz nowy wątek.",
			commentDeleted: "Przepraszamy! Żądany komentarz nie jest już dostępny.",
			goToComment: "PRZEJDŹ DO KOMENTARZA",
			show: "Pokaż",
			hide: "Ukryj",
			responseTo: "Odpowiedź do",
			voteSuffix: "głos",
			votesSuffix: "głosy",
			unreadMessage_1: "Posiadasz ",
			unreadMessage_2: " nieprzeczytanych powiadomień!",
			other: "Inne",
			comments: function(role){
				 return "Komentarze " + role;
			},
			spoiler: "Najedź myszką aby zobaczyć spojler"
		},
		es: {
			// SPANISH LOCALIZATION - LATAM/EU SPAIN
			commentDisable_1: "Esta discusión ha sido archivada.",
			commentDisable_2: "¿Crear una nueva discusión en su lugar?",
			commentDeleted: "¡Lo sentimos! El comentario que intentas ver ya no esta disponible.",
			goToComment: "IR A COMENTARIO",
			show: "Mostrar",
			hide: "Esconder",
			responseTo: "En respuesta a",
			voteSuffix: "voto",
			votesSuffix: "votos",
			unreadMessage_1: "¡Tienes ",
			unreadMessage_2: " mensajes de moderación sin leer!",
			other: "Other",
			comments: function(role){
				 return "Comentarios de " + role;
			},
			spoiler: "Mostrar Spoiler"
		},
		hu: {
			// HUNGARIAN LOCALIZATION - EU HU
			commentDisable_1: "A téma archiválva lett.",
			commentDisable_2: "Létrehozol helyette egy új témát?",
			commentDeleted: "Sajnos az általad keresett hozzászólás már nem elérhető.",
			goToComment: "UGRÁS A HOZZÁSZÓLÁSRA",
			show: "Mutat",
			hide: "Elrejt",
			responseTo: "Válasz neki",
			voteSuffix: "szavazat",
			votesSuffix: "szavazat",
			unreadMessage_1: "Van(nak) ",
			unreadMessage_2: " olvasatlan moderálási üzenete(i)d!",
			other: "Other",
			comments: function(role){
				 return role + " hozzászólás";
			},
			spoiler: "Spoiler megtekintése"
		},
		ro: {
			// ROMANIAN LOCALIZATION - EU RO
			commentDisable_1: "Această postare a fost arhivată.",
			commentDisable_2: "Creezi o nouă postare?",
			commentDeleted: "Ne pare rău! Comentariul pe care îl cauți nu mai este disponibil.",
			goToComment: "MERGI LA COMENTARIU",
			show: "Arată",
			hide: "Ascunde",
			responseTo: "Răspunde-i lui",
			voteSuffix: "vot",
			votesSuffix: "voturi",
			unreadMessage_1: "Ai ",
			unreadMessage_2: " mesaje necitite de la moderatori!",
			other: "Other",
			comments: function(role){
				 return "Comentarii ale " + role;
			},
			spoiler: "Vezi spoilerul"
		},
		pt: {
			// PORTUGESE LOCALIZATION - EU PT/LATAM PT
			commentDisable_1: "Esta discussão foi arquivada.",
			commentDisable_2: "Criar uma nova discussão em vez disso?",
			commentDeleted: "Sorry! The comment you have requested is no longer available.",
			goToComment: "IR PARA COMENTÁRIO",
			show: "Show",
			hide: "Hide",
			responseTo: "Response To",
			voteSuffix: "vote",
			votesSuffix: "votes",
			unreadMessage_1: "You have ",
			unreadMessage_2: " unread moderation message(s)!",
			other: "Other",
			comments: function(role){
				 return "Comentários de " + role;
			},
			spoiler: "Hover to reveal spoiler"
		},
		fr: {
			// FRENCH LOCALIZATION - EU FR
			commentDisable_1: "Cette discussion a été archivée.",
			commentDisable_2: "Vuoi creare una nuova discussione?",
			commentDeleted: "Désolé ! Le commentaire que vous souhaitez visionner n'est plus disponible.",
			goToComment: "SE RENDRE AU COMMENTAIRE",
			show: "Afficher",
			hide: "Cacher",
			responseTo: "Réponse à",
			voteSuffix: "vote",
			votesSuffix: "votes",
			unreadMessage_1: "Vous avez ",
			unreadMessage_2: " notifications de modération non lues!",
			other: "Autres",
			comments: function(role){
				 return "Commentaires de " + role;
			},
			spoiler: "Survoler pour révéler les spoilers !"
		},
		it: {
			// ITALIAN LOCALIZATION - EU IT
			commentDisable_1: "Questa discussione è stata archiviata.",
			commentDisable_2: "Creare un nuovo topic?",
			commentDeleted: "Spiacenti! Il commento che vorresti visualizzare non è più disponibile.",
			goToComment: "VAI AL COMMENTO",
			show: "Mostra",
			hide: "Nascondi",
			responseTo: "In risposta a",
			voteSuffix: "vota",
			votesSuffix: "voti",
			unreadMessage_1: "Hai ",
			unreadMessage_2: " messaggi di moderazione non letti!",
			other: "Other",
			comments: function(role){
				 return "Commenti dei " + role;
			},
			spoiler: "Visualizza anteprima"
		},
		de: {
			// GERMAN LOCALIZATION - EU DE
			commentDisable_1: "Diese Diskussion wurde archiviert.",
			commentDisable_2: "Soll eine neue Diskussion erstellt werden?",
			commentDeleted: "Sorry! Der Kommentar den du angefragt hast ist leider nicht mehr verfügbar.",
			goToComment: "ZUM KOMMENTAR",
			show: "Anzeigen",
			hide: "Verstecken",
			responseTo: "Antwort an",
			voteSuffix: "voten",
			votesSuffix: "votes",
			unreadMessage_1: "Du hast ",
			unreadMessage_2: " ungelesene Moderations-Nachrichten!",
			other: "Sonstiges",
			comments: function(role){
				 return "Kommentare von " + role;
			},
			spoiler: "Spoiler anzeigen"
		},
		el: {
			// GREEK LOCALIZATION - EU EL
			commentDisable_1: "Αυτή η συζήτηση έχει μπει στο αρχείο.",
			commentDisable_2: "Δημιουργία νέας συζήτησης;",
			commentDeleted: "Προσοχή! Το σχόλιο που αναζητείτε δεν είναι πλέον διαθέσιμο.",
			goToComment: "ΜΕΤΑΒΑΣΗ ΣΤΟ ΣΧΟΛΙΟ",
			show: "Εμφάνιση",
			hide: "Απόκρυψη",
			responseTo: "Απάντηση στο",
			voteSuffix: "Ψήφος",
			votesSuffix: "Ψήφοι",
			unreadMessage_1: "Έχετε ",
			unreadMessage_2: " μη διαβασμένα μηνύματα από τη διαχείριση!",
			other: "Other",
			comments: function(role){
				 return "σχόλια από " + role;
			},
			spoiler: "Περάστε το ποντίκι από πάνω για να δείτε το Spoiler!"
		},
		cs: {
			// CZECH LOCALIZATION - EU CS
			commentDisable_1: "Tato diskuze byla archivována.",
			commentDisable_2: "Chceš vytvořit novou diskuzi?",
			commentDeleted: "Omlouváme se, ale požadovaný komentář již není k dispozici.",
			goToComment: "PŘEJÍT NA KOMENTÁŘ",
			show: "Zobrazit",
			hide: "Skrýt",
			responseTo: "Reakce na",
			voteSuffix: "hlas",
			votesSuffix: "hlasů",
			unreadMessage_1: "Máš ",
			unreadMessage_2: " nepřečtených zpráv od moderátorů!",
			other: "Ostatní",
			comments: function(role){
				 return "Komentáře " + role;
			},
			spoiler: "Zobrazit spoiler"
		},
		tr: {
			// TURKISH LOCALIZATION - TURKEY
			commentDisable_1: "Bu konu arşivlenmiştir.",
			commentDisable_2: "Yeni konu açmak ister misiniz?",
			commentDeleted: "Özür dileriz! Cevap vermeye çalıştığınız yorum artık mevcut değil.",
			goToComment: "Yoruma git",
			show: "Göster",
			hide: "Gizle",
			responseTo: "Şu kişiye cevap olarak",
			voteSuffix: "oy",
			votesSuffix: "oy",
			unreadMessage_1: "Okunmamış ",
			unreadMessage_2: " moderasyon mesajınız var!",
			other: "Other",
			comments: function(role){
				 return role + " Yorumları";
			},
			spoiler: "Spoiler'i Göster"
		}
	};	
	var APIendpoints = {
		na: {
			groupAPI: apolloBaseUrl + "/applications/PEr1qIcT",
			syncTarget: apolloBaseUrl + "/applications/6heBIhQc/discussions/r3jELeTB/comment/0025/vote"
		},
		oce: {
			groupAPI: apolloBaseUrl + "/applications/WVnBe8UU",
			syncTarget: apolloBaseUrl + "/applications/FjGAIbRv/discussions/m2szHz4X/comment/0000/vote"
		},
		ru: {
			groupAPI: apolloBaseUrl + "/applications/YxZxFq5Y",
			syncTarget: apolloBaseUrl + "/applications/3EnEFfqX/discussions/2Fii5tER/comment/0000/vote"
		},
		lan: {
			groupAPI: apolloBaseUrl + "/applications/yEGyAjrt",
			syncTarget: apolloBaseUrl + "/applications/u6Ecmayv/discussions/ZopE8BEJ/comment/0000/vote"
		},
		las: {
			groupAPI: apolloBaseUrl + "/applications/mKBkZy5X",
			syncTarget: apolloBaseUrl + "/applications/rWxtxX6h/discussions/igGEf9PV/comment/0000/vote"
		},
		tr: {
			groupAPI: apolloBaseUrl + "/applications/Fq2PpZPl",
			syncTarget: apolloBaseUrl + "/applications/NBuAdq1X/discussions/B36cQIMh/comment/0000/vote"
		},
		eu: {
			syncTarget: apolloBaseUrl + "/applications/2BfrHbKG/discussions/kXb9Ypae/comment/0000/vote",
			en: {
				groupAPI: apolloBaseUrl + "/applications/0oazE84H"
			},
			pl: {
				groupAPI: apolloBaseUrl + "/applications/sIEqJJVp"
			},
			es: {
				groupAPI: apolloBaseUrl + "/applications/qxYYk3X8"
			},
			hu: {
				groupAPI: apolloBaseUrl + "/applications/q98U6Ykw"
			},
			ro: {
				groupAPI: apolloBaseUrl + "/applications/c39j7NcX"
			},
			fr: {
				groupAPI: apolloBaseUrl + "/applications/FRrE0ye4"
			},
			it: {
				groupAPI: apolloBaseUrl + "/applications/VYn4uGyi"
			},
			de: {
				groupAPI: apolloBaseUrl + "/applications/6EJWUPYU"
			},
			el: {
				groupAPI: apolloBaseUrl + "/applications/LgAALjkc"
			},
			cs: {
				groupAPI: apolloBaseUrl + "/applications/adFfUN3R"
			}
		}
	};

	// Block 2 | Initialize Apollo CORS Bridge
	var xdmScriptPath = apolloBaseUrl + '/cors/easyXDM.min.js';
	var xdmRemotePath = apolloBaseUrl + '/cors/index.html';
	var xdmSwfPath = apolloBaseUrl + '/easyXDM.swf';
	var xdmHelperPath = apolloBaseUrl + '/name.html';
	var xhr;
	$.getScript(xdmScriptPath, function() {
		xhr = new easyXDM.Rpc({
			remote: xdmRemotePath,
			swf: xdmSwfPath,
			remoteHelper: xdmHelperPath
		}, {
			remote: {
				request: {}
			}
		});
		requests.process();
		User.checkSync();
	});
	var requests = {
		check: function(requestURI,ref,itemKey,currentItem,callback){
			if(!xhr){
				requests.enqueue(requestURI,ref,itemKey,currentItem,callback);
			} else {
				CORS.request(requestURI,ref,itemKey,currentItem,callback);
			}
		},
		apollo: [],
		enqueue: function(requestURI,ref,itemKey,currentItem,callback){
			var o = {};
			o.requestURI = requestURI;
			o.ref = ref;
			o.key = itemKey;
			o.item = currentItem;
			o.callback = callback;
			requests.apollo.push(o);
		},
		process: function(){
			while(requests.apollo.length > 0){
				var n = requests.apollo.shift();
				CORS.get(n.requestURI,n.ref,n.key,n.item,n.callback);
			}
		}
	};
	var Groups = {
		data: null,
		flares: function(targetNode){
			var d = targetNode.getAttribute('data-discussion-id');
			var a = targetNode.getAttribute('data-application-id');
			var t = localStorage[region+lang+"_"+a+"_"+d]
			if(t && JSON.parse(t).expire > currentDate){
				Page.processThread(targetNode,t);
			} else {
				var req = apolloBaseUrl + '/applications/' + a + '/discussions/' + d + '?page_size=0&';
				if(!xhr){				
					requests.enqueue(req,'threadInfo',a+'_'+d,targetNode,Page.processThread);
				} else {
					CORS.get(req,'threadInfo',a+'_'+d,targetNode,Page.processThread);
				}
			}
		},
		checkCache: function(){
			var groupAPI = localStorage[region+lang+'_groups'];
			if(groupAPI && JSON.parse(groupAPI).expire > currentDate){
				Groups.data = JSON.parse(groupAPI);
				Groups.processQueue();
			} else {
				Groups.pull();
			}
		},
		pull: function(){
			var realm = region;
			if(region === 'eune' || region === 'euw'){
				realm = 'eu';
				requests.check(APIendpoints[realm][lang].groupAPI,'userGroups','userGroups',null,Groups.processQueue);
			} else {
				requests.check(APIendpoints[realm].groupAPI,'userGroups','userGroups',null,Groups.processQueue);
			}			
		},
		pullRioter: function(node){
			var n = node.getElementsByClassName('inline-profile')[0].getElementsByTagName('a')[0];
			var m = n.getAttribute('data-apollo-pvpnet-id');
			var k = n.getAttribute('data-apollo-pvpnet-realm');
			var l = Groups.data.groupsUser[m];
			var r = apolloBaseUrl+'/users/'+k+'/'+m;
			var o7 = localStorage[region+lang+'_'+m];
			if(o7 && JSON.parse(o7).expire > currentDate){
				Groups.riotTag(o7,node);
			} else {
				if(!xhr){
					requests.enqueue(r,'riotTag',m,node,Groups.riotTag);
				} else {
					CORS.get(r,'riotTag',m,node,Groups.riotTag);
				}
			}
		},
		riotTag: function(data,node){
			var a = JSON.parse(data);
			var n = node.getElementsByClassName('inline-profile')[0].getElementsByTagName('a')[0];
			if(a.title){
				var groupTag = document.createElement('span');
				groupTag.className = 'tags';
				groupTag.appendChild(document.createTextNode(a.title));
				groupTag.setAttribute('style','background-color:#801c0c');
				n.parentElement.parentElement.insertBefore(groupTag,n.parentElement.nextSibling);
			}
		},
		process: function(node){
			try {
				var n = node.getElementsByClassName('inline-profile')[0].getElementsByTagName('a')[0];
				var m = n.getAttribute('data-apollo-pvpnet-id');
				var l = Groups.data.groupsUser[m];
			} catch(e){
				console.log(e);
			}
			if(!isBoardIndex && n && n.parentElement.classList.contains('isRioter')){
				//node.setAttribute('style','background-color:red');
				Groups.pullRioter(node);
			} else {
				var abg;
				if(n && l){
					n.getElementsByClassName('username')[0].setAttribute('style','color:'+l.color);
					var b = n.getElementsByClassName('icon');
					if(!isBoardIndex && l.icon && b.length){
						b[0].getElementsByTagName('img')[0].setAttribute('src',l.icon);
					}
					//n.getElementsByClassName('username')[0].setAttribute('style','color:red');
					if(!isBoardIndex){
						var groupTag = document.createElement('span');
						abg = groupTag;
						groupTag.className = 'tags';
						groupTag.appendChild(document.createTextNode(l.name));
						groupTag.setAttribute('style','background-color:'+l.color);
						n.parentElement.parentElement.insertBefore(groupTag,n.parentElement.nextSibling);
						if(node.classList.contains('nested-comment')){
							var triangle = document.createElement('span');
							triangle.className = 'ttriangle';
							triangle.setAttribute('style','border-top:25px solid '+l.color);
							node.getElementsByClassName('masthead')[0].appendChild(triangle);
							if(!node.classList.contains('glow') && !node.classList.contains('flat')){
								node.setAttribute('style','border-top:1px solid '+l.color);
							}
						}
					}
				}
				if(!isBoardIndex && n.getAttribute("data-apollo-user-group-name") && n.getAttribute("data-apollo-user-group-name").length){
					var gName = n.getAttribute("data-apollo-user-group-name");
					var gColor = n.getAttribute("data-apollo-user-group-color");
					var groupTag = document.createElement('span');
					groupTag.className = 'tags';
					groupTag.appendChild(document.createTextNode(gName));
					groupTag.setAttribute('style','background-color:'+gColor);
					if(abg){
						groupTag.className += ' subtag';
						n.parentElement.parentElement.insertBefore(groupTag,abg.nextSibling);
					} else {
						n.parentElement.parentElement.insertBefore(groupTag,n.parentElement.nextSibling);
					}
				}
			}
		},
		queue: [],
		processQueue: function(){
			while(Groups.queue.length > 0){
				var n = Groups.queue.shift();
				n.callback(n.item);
			}
		}
	};
	var User = {
		checkSync: function(){
			if(!isBoardIndex && isAuthenticated && document.apolloPageBootstrap){
				Page.data = document.apolloPageBootstrap[document.apolloPageBootstrap.length-1].data;
				var lastUpdate = Page.data.user.modifiedAt;
				var epoch = new Date(lastUpdate).valueOf();
				if(currentDate > epoch + 1000 * 60 * 60 * 24 * 3){
					console.log('Re-syncing Apollo Profile');
					CORS.syncProfile();
				} else if(currentDate > epoch + 1000 * 60 * 60 * 24 * .5 && Page.data.user.lolSummonerLevel < 5){
					console.log('Re-syncing Apollo Profile');
					CORS.syncProfile();
				}
			}
		},
		checkPerms: function(){
			if(!isBoardIndex && isAuthenticated && Page.data){
				var level = Page.data.user.lolSummonerLevel;
				var minComment = Page.data.discussion.application.commentSummonerLevel;
				var minVoting = Page.data.discussion.application.voteSummonerLevel;
				console.log(level,minComment,minVoting);
				if(level < minComment || level < minVoting || true){
					var body = document.getElementsByTagName('body')[0];
					var div = document.createElement('div');
					div.className = 'req-min';
					var p = document.createElement('p');
					var b = document.createElement('b');
					b.appendChild(document.createTextNode('NOTE: '));
					p.appendChild(b);
					p.appendChild(document.createTextNode('You do not meet the requirements to vote and/or comment.'))
					p.appendChild(document.createElement('br'));
					p.appendChild(document.createTextNode('You must be at least level ' + minVoting + ' to vote and level ' + minComment + ' to comment.'));
					
					//p.appendChild(document.createElement('br'));
					var a1 = document.createElement('a');
					a1.setAttribute('href','javascript:;');
					a1.appendChild(document.createTextNode('Dismiss'));
					var a2 = document.createElement('a');
					a2.setAttribute('href','javascript:;');
					a2.appendChild(document.createTextNode('Dismiss Permanently'));
					
					div.appendChild(p);
					body.appendChild(div);
				}
			}
		},
		notifications: function(){
			var url = 'https://notifications.leagueoflegends.com/api/1.0/messages?read_state=unread&count=true';
			var realm = document.cookie.split('PVPNET_REGION=')[1].split(';')[0];
			var o = document.cookie.match("PVPNET_TOKEN_" + realm.toUpperCase() + "=(.*?)(;|$)");
			$.ajax({
				url: url,
				type: "GET",
				dataType: "json",
				//async: !0,
				beforeSend: function(n) {
					n.setRequestHeader("Content-Type", "application/json"), n.setRequestHeader("X-PVPNET", realm.toUpperCase() + ':' + o[1])
				},
				success: function(o) {
					if(o.total > 0){
						var t = locale[lang].unreadMessage_1 + o.total + locale[lang].unreadMessage_2;
						var x = document.getElementById('riot-apollo-tooltip-container');
						x.style.display = '';
						x.addEventListener('click',function(){
							document.getElementById('riotbar-notification-count').click();
							x.style.display = 'none';
						});
						x.appendChild(document.createTextNode(t));
					}
				}
			});
		},
	};
	var CORS = {
		get: function(requestURI,ref,itemKey,currentItem,callback){
			xhr.request({
				url: requestURI,
				method: 'GET',
			}, function(response){
				// Success!
				CORS.cache(response.data,ref,itemKey,currentItem,callback);
			}, function(response){
				// Error callback //
				console.log(response);
			});
		},
		syncProfile: function(){
			var realm = document.cookie.split('PVPNET_REGION=')[1].split(';')[0];
			var o = document.cookie.match("PVPNET_TOKEN_" + realm.toUpperCase() + "=(.*?)(;|$)");
			var shortRegion;
			if(["euw","eune"].indexOf(region) > -1){
				shortRegion = 'eu';
			} else {
				shortRegion = region;
			}
			xhr.request({
				url: APIendpoints[shortRegion].syncTarget,
				method: 'PUT',
				headers: {
					'Content-Type': 'application/json',
					'X-Client': 'riot__apollo__js',
					'X-PVPNET': realm.toUpperCase() + ':' + o[1]
				}, 
				data: {
					direction: "up"
				}
			}, function(response){
				// Success!
				console.log('Apollo Profile Synced!');
			}, function(response){
				// Error callback //
				console.log(response);
			});
		},
		cache: function(data,ref,key,item,callback){
			var toHours = 1000 * 60 * 60;
			if(ref === 'userGroups'){
				var p = JSON.parse(data).application.metadata;
				var q = {};
				//q.groups = p.groups;
				q.groups = {};
				var b = Object.keys(p.groups);
				for(y in b){
					q.groups[p.groups[b[y]].name] = p.groups[b[y]].color;
				}
				q.groupsUser = {};
				var a = Object.keys(p.groupsUser);
				for(x in a){
					q.groupsUser[a[x].split(':')[1]] = p.groups[p.groupsUser[a[x]]];
				}
				q.expire = currentDate + 12 * toHours;
				Groups.data = q;
				var r = JSON.stringify(q);
				//localStorage.setItem(region+lang+'_groups',r);
				Page.localStorage(region+lang+'_groups',r);
				callback();
			} else if(ref === 'riotTag'){
				var p = JSON.parse(data).user.profile;
				var n = {};
				n.expire = currentDate + 8 * toHours;
				if(p && p.data && p.data.title){
					n.title = p.data.title;
				}
				var b = JSON.stringify(n);
				localStorage.setItem(region+lang+'_'+key,b);
				callback(b,item);
			} else if(ref === 'threadInfo'){
				var p = JSON.parse(data).discussion;
				var q = {};
				q.commenting = p.commentCreationEnabled;
				q.expire = currentDate + 0.25 * toHours;
				q.author = null;
				//console.log(p.user);
				if(p.user){
					q.author = p.user.id;
				}
				var n;
				if(p.content.pinned){
					q.pinned = p.content.pinned;
					var app = p.application.id;
					var disc = p.id;
					var z = apolloBaseUrl + '/applications/' + app + '/discussions/' + disc + '/comment/' + q.pinned;
					CORS.get(z,'flareGroup',key,item,Page.processThread);
					n = JSON.stringify(q);
				} else {
					n = JSON.stringify(q);
					callback(item,n);
				}
				Page.localStorage(region+lang+'_'+key,n);
				//localStorage.setItem(region+lang+'_'+key,n);
			} else if(ref === 'flareGroup'){
				var a = JSON.parse(data).user.id;
				var b = localStorage[region+lang+'_'+key];
				var c = JSON.parse(b);
				c.user = a;
				var d = JSON.stringify(c);
				localStorage.setItem(region+lang+'_'+key,d);
				callback(item,d);
			} else if(ref === 'commentParent'){
				var f = JSON.parse(data);
				var k = {};
				k.message = f.message;
				k.deleted = f.deleted;
				k.userName = f.user.name;
				k.userRealm = f.user.realm;
				k.id = f.id;
				k.expire = currentDate + 1.5 * toHours;
				var y = JSON.stringify(k);
				Page.localStorage(region+lang+'_'+key,y);
				//localStorage.setItem(region+lang+'_'+key,y);
				callback(y,item);
				//console.log(k);
			}
		}
	};
	var Page = {
		disableDown: {
			comment: false,
			thread: false
		},
		pinnedOnly: {
			enable: false,
			boards: []
		},
		localizeSpoiler: function(){
			var css = document.createElement("style");
			var cssContent = "blockquote > h3::before {content: \"" + locale[lang].spoiler + "\"}";
			css.appendChild(document.createTextNode(cssContent));
			document.body.appendChild(css);
		},
		report: function(){
			var report = document.getElementsByClassName('report-widget')[0].getElementsByClassName('report-types')[0];
			var reportType = document.createElement('a');
			reportType.className = 'report-type';
			reportType.setAttribute('data-value','o');
			reportType.appendChild(document.createTextNode(locale[lang].other));
			reportType.setAttribute('href','javascript:;');
			report.appendChild(reportType);
		},
		threads: [],
		ready: function(callback){
			if(document.readyState !== 'loading'){
				callback();
			} else if(document.addEventListener){
				document.addEventListener('DOMContentLoaded',callback);
			} else {
				document.attachEvent('onreadystatechange',function(){
					if(document.readyState !== 'loading'){
						callback();
					}
				});
			}
		},
		archived: function(){
			if(!isBoardIndex && isAuthenticated && Page.data && !Page.data.discussion.commentCreationEnabled && Page.active){
				var lockLink = document.createElement('a');
				lockLink.className = "requires-auth";
				var createLink = document.getElementsByClassName('new-discussion-box')[0].getElementsByTagName('a')[0].getAttribute('href');
				lockLink.setAttribute("href",createLink);
				lockLink.appendChild(document.createTextNode(locale[lang].commentDisable_2));
				var lockSpan = document.createElement('span');
				lockSpan.className = 'icon-lock-brown';
				
				var warning = document.getElementsByClassName('cant-comment-warning')[1];
				while (warning.firstChild) {
					warning.removeChild(warning.firstChild);
				}
				warning.appendChild(lockSpan);
				warning.appendChild(document.createTextNode(locale[lang].commentDisable_1 + ' '));
				warning.appendChild(lockLink);
			}
		},
		data: null,
		appId: null,
		discId: null,
		active: true,
		processThread: function(node,data){
			var t = JSON.parse(data);
			var n = node.getElementsByClassName('voting')[0];
			var a = node.getAttribute('data-application-id');
			var d = node.getAttribute('data-discussion-id');
			if(Page.pinnedOnly.enable || (Page.pinnedOnly.boards.indexOf(a) > -1)){
				if(t.pinned){
					node.removeAttribute('style');
				} else {
					node.remove();
				}
			}
			
			if(!t.commenting && n && !n.getElementsByClassName('pin').length){
				while (n.firstChild) {
					n.removeChild(n.firstChild);
				}
				var lock = document.createElement('div');
				lock.className = 'locked';
				lock.title = 'Commenting is disabled';
				n.appendChild(lock);
			}
			if((Groups.data.groupsUser[t.author] || t.pinned) && !node.classList.contains('has-rioter-comments')){
				Page.applyFlare(node,t,a,d);
			}
		},
		applyFlare: function(node,data,a,d){
			if(true){
				var riotCommented = node.getElementsByClassName('riot-commented')[0];
				var b = document.createElement('a');
				b.className = 'dtb-fist opaque';
				var x = Groups.data.groupsUser[data.user];
				var y = Groups.data.groupsUser[data.author];
				var role;
				if(region === 'tbd'){
					b.setAttribute('style','background-image:url(https://i.imgur.com/9yUHWIY.png)!important');
				} else if(y && y.icon){
					role = locale[lang].comments(y.name);
					b.setAttribute('style','background-image:url('+y.icon+')!important');
					b.setAttribute('title',role);
				} else if(data.user && x && x.icon){
					role = locale[lang].comments(x.name);
					b.setAttribute('style','background-image:url('+x.icon+')!important');
					b.setAttribute('title',role);
				} else if(!data.user){
					var z = apolloBaseUrl + '/applications/' + a + '/discussions/' + d + '/comment/' + data.pinned;
					if(!xhr){				
						requests.enqueue(z,'flareGroup',a+'_'+d,node,null);
					} else {
						CORS.get(z,'flareGroup',a+'_'+d,node,null);
					}
					role = 'Pinned Comment';
					b.setAttribute('title',role);
				} else {
					role = 'Pinned Comment';
					b.setAttribute('title',role);
				}
				b.appendChild(document.createTextNode(' '));
				if(y){
					b.href = '/f/' + a + '/d/' + d;
				} else {
					b.href = '/f/' + a + '/d/' + d + '?comment=' + data.pinned;
				}
				riotCommented.appendChild(b);
				riotCommented.getElementsByTagName('span')[0].remove();
				var span = document.createElement('span');
				span.appendChild(document.createTextNode(role));
				riotCommented.appendChild(span);
				node.className += ' hasPinned';
			}
		},
		renderComment: function(data,node){
			var d = JSON.parse(data);
			var message;
			//console.log(d);
			if(d.deleted){
				message = document.createElement('span');
				message.className = 'msg-deleted';
				message.appendChild(document.createTextNode(locale[lang].commentDeleted));
			} else {
				message = document.createTextNode(d.message);
			}
			var ref = node.getElementsByClassName('low-quality')[0];
			var b = document.createElement('div');
			b.className = 'op-ref';
			b.setAttribute('style','display:none');
			var p = document.createElement('p');
			p.appendChild(message);
			var a = document.createElement('a');
			a.className = 'footer';
			a.setAttribute('href','?show=flat&comment='+d.id);
			a.appendChild(document.createTextNode(locale[lang].goToComment));
			b.appendChild(p);
			b.appendChild(a);
			node.getElementsByClassName('body')[0].insertBefore(b,ref);
			
			var z = node.getElementsByClassName('byline')[0];
			var y = document.createElement('span');
			y.className = 'op-ref-bar';
			y.appendChild(document.createTextNode(locale[lang].responseTo+": "));
			var x = document.createElement('a');
			x.setAttribute('href','https://boards.'+region+'.leagueoflegends.com/'+lang+'/player/'+d.userRealm+'/'+d.userName);
			x.appendChild(document.createTextNode(d.userName));
			y.appendChild(x);
			y.appendChild(document.createTextNode(' ('+d.userRealm+') ('));
			var w = document.createElement('a');
			w.setAttribute('href','javascript:;');
			w.appendChild(document.createTextNode(locale[lang].show));
			w.addEventListener('click',function(){
				var n = this.parentElement.parentElement.parentElement.getElementsByClassName('op-ref')[0];
				if(n.getAttribute('style') === 'display:none'){
					this.textContent = locale[lang].hide;
					n.setAttribute('style','display:block');
				} else {
					this.textContent = locale[lang].show;
					n.setAttribute('style','display:none');
				}
			});
			y.appendChild(w);
			y.appendChild(document.createTextNode(')'));
			z.appendChild(y);
		},
		garbageCollection: function(flag){
			var lastVersion = localStorage[region+lang+'_version'];
			if(!lastVersion || lastVersion !== currentVersion || flag){
				//  || !Page.storageAvailable('localStorage')
				// Page.storageAvailable('localStorage',key,data)
				var t = localStorage.getItem('_burry_stores_');
				localStorage.clear();
				if(t && JSON.parse(t)){
					localStorage.setItem('_burry_stores_',t);
				}
				localStorage.setItem(region+lang+'_version',currentVersion);
			}
		},
		localStorage: function(key,data){
			// Mozilla's Feature-detecting Storage function
			// From: https://developer.mozilla.org/en-US/docs/Web/API/Web_Storage_API/Using_the_Web_Storage_API
			try {
				localStorage.setItem(key, data);
			} catch(e) {
				Page.garbageCollection(true);
				return e instanceof DOMException && (
					// everything except Firefox
					e.code === 22 ||
					// Firefox
					e.code === 1014 ||
					// test name field too, because code might not be present
					// everything except Firefox
					e.name === 'QuotaExceededError' ||
					// Firefox
					e.name === 'NS_ERROR_DOM_QUOTA_REACHED') &&
					// acknowledge QuotaExceededError only if there's something already stored
					localStorage.length !== 0;
			}
		}
	}
	
	
	
	function main(){
		//console.log(Page.storageAvailable('localStorage'));
		Page.garbageCollection();
		if(global.boardsUpdates){
			if(global.boardsUpdates.disableDown){
				Page.disableDown = global.boardsUpdates.disableDown;
			}
			if(global.boardsUpdates.pinnedOnly){
				Page.pinnedOnly = global.boardsUpdates.pinnedOnly;
			}
		}
		if(!isBoardIndex){
			var apm = document.getElementById('discussion').getElementsByClassName('view-in-mod-tool')[0].getElementsByTagName('a')[0].getAttribute('href').split('/');
			var app = apm[4];
			var disc = apm[6];
			Page.appId = app;
			Page.discId = disc;
			Page.ready(Page.report);
			Page.localizeSpoiler();
		}
		// Begins watching nodes and processing initial functions
		attachTarget();
		/** Removes empty discussion creation boxes **/
		try {
			var newThread = document.getElementsByClassName('new-discussion-box')[0];
			var link = newThread.getElementsByTagName('a');
			if(!link.length){
				newThread.remove();
				Page.active = false;
			}
		} catch(e){
			Page.active = false;
		}
		Groups.checkCache();
		Page.ready(Page.archived);
		//Page.ready(User.checkPerms);
	}
	
	// Block 3 | Establish Process Queue
	function ProcessTarget(targetNode){
		this.targetNode = targetNode;
		this.profileHover = function(){
			if(Groups.data){
				var p = targetNode.getElementsByClassName('title')[0].textContent.trim();
				var bColor = Groups.data.groups[p];
				if(bColor){
					targetNode.style.borderTopColor = bColor;
					targetNode.style.borderTopWidth = '4px';
					targetNode.style.borderTopStyle = 'solid';
					targetNode.getElementsByClassName('summoner-name')[0].setAttribute('style','color:'+bColor);
					targetNode.getElementsByClassName('title')[0].setAttribute('style','color:#6dc0cd');
				}
			}
		};
		this.parentComment = function(){
			if(isChronoView){
				var cid = targetNode.getAttribute('id');
				if(cid && cid.length && cid.length > 12){
					var s = cid.slice(8,-4);
					//console.log(s);
					var key = Page.appId+'_'+Page.discId+'_'+s;
					var g = localStorage[region+lang+"_"+key];
					if(g && JSON.parse(g).expire > currentDate){
						Page.renderComment(g,targetNode);
					} else {
						var r = apolloBaseUrl + '/applications/' + Page.appId + '/discussions/' + Page.discId + '/comment/' + s;
						if(!xhr){
							requests.enqueue(r,'commentParent',key,targetNode,Page.renderComment);
						} else {
							CORS.get(r,'commentParent',key,targetNode,Page.renderComment);
						}
					}
				}
			}
		};
		this.userGroups = function(){
			if(Groups.data){
				Groups.process(targetNode);
			} else {
				var x = {};
				x.item = targetNode;
				x.callback = Groups.process;
				Groups.queue.push(x);
			}
		};
		this.threadInfo = function(){
			if(Groups.data){
				Groups.flares(targetNode);
			} else {
				var x = {};
				x.item = targetNode;
				x.callback = Groups.flares;
				Groups.queue.push(x);
			}
		};
		this.commentVoting = function(){
			if(Page.disableDown.comment && targetNode.parentNode.classList.contains('small')){
				targetNode.getElementsByClassName('down-vote')[0].remove();
				//console.log(targetNode.parentNode.classList.contains('small'));
			} else if(Page.disableDown.thread && targetNode.parentNode.classList.contains('masthead')){
				targetNode.getElementsByClassName('down-vote')[0].remove();
			}
			var up = targetNode.getAttribute('data-apollo-up-votes');
			var down = targetNode.getAttribute('data-apollo-down-votes');
			var net = up-down;
			var color;
			if(net === 1){
				color = '#13bbc1';
			} else {
				if(net === 0){
					color = '#13bbc1';
				} else if(net > 5){
					color = '#22b722';
				} else if([2,3].indexOf(net) > -1){
					color = '#9fca68';
				} else if([-1,-2].indexOf(net) > -1){
					color = '#ffda4e';
				} else if([-3,-4].indexOf(net) > -1){
					color = '#ffa51b';
				} else if(net < -4){
					color = '#fd3b3b';
				} else if([4,5].indexOf(net) > -1){
					color = '#86bf00';
				}
			}
			if(net > 999 || net < -999){
				net = (net/1000).toFixed(1) + 'k';
			}
			if(up > 999){
				up = (up/1000).toFixed(1) + 'k';
			}
			if(down > 999){
				down = (down/1000).toFixed(1) + 'k';
			}
			var n = targetNode.getElementsByClassName('total-votes')[0];
			n.setAttribute('style','color:'+color);
			
			var breakdown = document.createElement('li');
			breakdown.setAttribute('style','display:none');
			breakdown.className = 'vote-breakdown';
			
			var upSpan = document.createElement('span');
			var downSpan = document.createElement('span');
			upSpan.setAttribute('style','color:#22b722');
			upSpan.appendChild(document.createTextNode(up));
			downSpan.setAttribute('style','color:#fd3b3b');
			downSpan.appendChild(document.createTextNode(down));
			
			breakdown.appendChild(upSpan);
			var divider = document.createElement('span');
			divider.appendChild(document.createTextNode(' | '));
			breakdown.appendChild(divider);
			breakdown.appendChild(downSpan);
			
			n.parentElement.insertBefore(breakdown,n.nextSibling);
			n.addEventListener('mouseover',function(){
				this.style.display = 'none';
				this.nextSibling.style.display = 'block';
			});
			breakdown.addEventListener('mouseover',function(){
				this.style.display = 'block';
				this.previousSibling.style.display = 'none';
			});
			n.addEventListener('mouseout',function(){
				this.style.display = 'block';
				this.nextSibling.style.display = 'none';
			});
			breakdown.addEventListener('mouseout',function(){
				this.style.display = 'none';
				this.previousSibling.style.display = 'block';
			});
		};
		this.threadVoting = function(){
			var isPinned = targetNode.getElementsByClassName('pin').length > 0;
			var nx = targetNode.getElementsByClassName('voting')[0];
			if(!isPinned && nx && nx.children[0]){
				var target = nx.children[0];
				var vote = target.getAttribute('data-apollo-user-vote');
				var upVotes = target.getAttribute('data-apollo-up-votes');
				var downVotes = target.getAttribute('data-apollo-down-votes');
				var totalVotes = upVotes - downVotes;
				if(vote === 'up'){
					targetNode.getElementsByClassName('voting')[0].setAttribute('style','border-left:2px solid #009700');
				} else if(vote === 'down'){
					targetNode.getElementsByClassName('voting')[0].setAttribute('style','border-left:2px solid #e23636');
				}
				var suffix;
				var color;
				if(totalVotes === 1){
					color = '#13bbc1';
					suffix = locale[lang].voteSuffix;
				} else {
					suffix = locale[lang].votesSuffix;
					if(totalVotes === 0){
						color = '#13bbc1';
					} else if(totalVotes > 5){
						color = '#22b722';
					} else if([2,3].indexOf(totalVotes) > -1){
						color = '#9fca68';
					} else if([-1,-2].indexOf(totalVotes) > -1){
						color = '#ffda4e';
					} else if([-3,-4].indexOf(totalVotes) > -1){
						color = '#ffa51b';
					} else if(totalVotes < -4){
						color = '#fd3b3b';
					} else if([4,5].indexOf(totalVotes) > -1){
						color = '#86bf00';
					}
				}
				if(totalVotes > 999 || totalVotes < -999){
					totalVotes = (totalVotes/1000).toFixed(1) + 'k';
				}
				if(upVotes > 999){
					upVotes = (upVotes/1000).toFixed(1) + 'k';
				}
				if(downVotes > 999){
					downVotes = (downVotes/1000).toFixed(1) + 'k';
				}
				var votingDiv = targetNode.getElementsByClassName('voting')[0];
				while (votingDiv.firstChild) {
					votingDiv.removeChild(votingDiv.firstChild);
				}
				var voting1 = document.createElement('div');
				voting1.className = 'riot-apollo voting';
				var voting2 = document.createElement('ul');
				voting2.className = 'riot-voting';
				var breakdown = document.createElement('li');
				breakdown.className = 'vote-breakdown';
				breakdown.setAttribute('style','display:none');
				var upSpan = document.createElement('span');
				var downSpan = document.createElement('span');
				upSpan.setAttribute('style','color:#22b722');
				upSpan.appendChild(document.createTextNode(upVotes));
				downSpan.setAttribute('style','color:#fd3b3b');
				downSpan.appendChild(document.createTextNode(downVotes));
				
				breakdown.appendChild(upSpan);
				var divider = document.createElement('span');
				divider.appendChild(document.createTextNode(' | '));
				breakdown.appendChild(divider);
				breakdown.appendChild(downSpan);
				
				var totalLi = document.createElement('li');
				totalLi.className = 'vote-total';
				totalLi.setAttribute('style','color:'+color);
				totalLi.appendChild(document.createTextNode(totalVotes));
				suffixLi = document.createElement('li');
				suffixLi.appendChild(document.createTextNode(suffix));
				voting2.appendChild(document.createElement('li'));
				voting2.appendChild(breakdown);
				voting2.appendChild(totalLi);
				voting2.appendChild(document.createElement('li'));
				voting2.appendChild(suffixLi);
				voting1.appendChild(voting2);
				votingDiv.appendChild(voting1);
			} else if(nx) {
				if(targetNode.getElementsByClassName('pin').length === 0){
					var votingDiv = targetNode.getElementsByClassName('voting')[0];
					var lockDiv = document.createElement('div');
					lockDiv.className = 'voting-locked';
					lockDiv.setAttribute('title','Voting is disabled');
					votingDiv.appendChild(lockDiv);
				}
			}
		};
	}
	
	
	/** Nodes **/
	function observeTarget(targetNode,observeSubtree){
		var observer = new MutationObserver(function(mutations){
			mutations.forEach(function(mutation){
				for(var i=0; i<mutation.addedNodes.length;i++){
					if(targetNode.classList.contains('apollo')){
						if(mutation.addedNodes[i].classList && mutation.addedNodes[i].classList.contains('profile-hover')){
							var processTarget = new ProcessTarget(mutation.addedNodes[i]);
							processTarget.profileHover();
						} else if(isAuthenticated && mutation.addedNodes[i].id === 'riot-apollo-tooltip-container'){
							User.notifications();
						}
					} else if(isBoardIndex){
						var d = mutation.addedNodes[i].getAttribute('data-discussion-id');
						var a = mutation.addedNodes[i].getAttribute('data-application-id');
						//console.log(Page.threads.indexOf(d));
						if(Page.threads.indexOf(d) < 0){
							Page.threads.push(d);
							// instance 2 of 2
							if(Page.pinnedOnly.enable || Page.pinnedOnly.boards.indexOf(a) > -1){
								mutation.addedNodes[i].setAttribute('style','display:none');
							}
							var processTarget = new ProcessTarget(mutation.addedNodes[i]);
							processTarget.threadVoting();
							processTarget.userGroups();
							processTarget.threadInfo();
						} else {
							mutation.addedNodes[i].remove();
						}
					} else if(mutation.addedNodes[i].className && mutation.addedNodes[i].classList.contains('nested-comment')){
						var processTarget = new ProcessTarget(mutation.addedNodes[i]);
						processTarget.userGroups();
						//processTarget.threadInfo();
						processTarget.parentComment();
					} else if(mutation.addedNodes[i].className && mutation.addedNodes[i].classList.contains('riot-voting')){
						var processTarget = new ProcessTarget(mutation.addedNodes[i].parentElement);
						processTarget.commentVoting();
					}
				}
			});
		});
		observer.observe(targetNode,{childList:true,subtree:observeSubtree});
	}
	function attachTarget(){
		var targetNode;
		if(isBoardIndex && document.getElementById('discussion-list')){
			targetNode = document.getElementById('discussion-list');
			var discussions = targetNode.getElementsByClassName('discussion-list-item');
			for(var n=0;n<discussions.length;n++){
				var d = discussions[n].getAttribute('data-discussion-id');
				Page.threads.push(d);
				var a = discussions[n].getAttribute('data-application-id');
				// instance 1 of 2
				if(Page.pinnedOnly.enable || Page.pinnedOnly.boards.indexOf(a) > -1){
					discussions[n].setAttribute('style','display:none');
				}
				var processTarget = new ProcessTarget(discussions[n]);
				processTarget.threadVoting();
				processTarget.userGroups();
				processTarget.threadInfo();
			}
			var sticky = document.getElementById('discussions').getElementsByClassName('sticky')[0];
			if(sticky){
				var stickyList = sticky.getElementsByClassName('discussion-list-item');
				for(var i=0;i<stickyList.length;i++){
					var processTarget = new ProcessTarget(stickyList[i]);
					processTarget.userGroups();
					processTarget.threadInfo();
				}
			}
			observeTarget(targetNode,false);
		} else if(!isBoardIndex){
			var cList = document.getElementById('comments').getElementsByClassName('nested-comment');
			if(cList && cList.length > 0){
				for(var i=0;i<cList.length;i++){
					var processTarget = new ProcessTarget(cList[i]);
					processTarget.userGroups();
					processTarget.parentComment();
				}
			}
			var processTarget = new ProcessTarget(document.getElementById('discussion'));
			processTarget.userGroups();
			targetNode = document.getElementById('comments');
			observeTarget(targetNode,true);
			targetNode2 = document.getElementById('discussion').getElementsByClassName('masthead')[0];
			observeTarget(targetNode2,true);
		}
		var body = document.getElementsByTagName('body')[0];
		observeTarget(body,false);
	}
	main();
}(jQuery,this,this.localStorage));

$('.thumbnail-fallback').each( function() {
	$(this).attr('style', 'background-image: none !important');

});

$(window).on("load", function(){
	$('.inline-profile .icon img').each( function() {
		if ($(this).prop("currentSrc").indexOf("lolstatic") == -1) {
			$(this).attr('style', 'height: 28px !important');
			$(this).attr('style', 'width: 28px !important');
			$(this).parent().attr('style', 'height: 28px !important');
			$(this).parent().attr('style', 'width: 28px !important');
		} else {
			$(this).attr('style', 'height: 28px !important');
			$(this).attr('style', 'width: 50px !important');
			$(this).parent().attr('style', 'height: 28px !important');
			$(this).parent().attr('style', 'width: 50px !important');
		}
	});
});








//Mod and Post Notifications
$(window).on("load", function(){
    var buttonContainer = document.createElement("div");
    buttonContainer.id = "notificationBar";
    createOpenButton(buttonContainer);
    createInfoButton(buttonContainer);
    var body = document.getElementById("riotbar-bar-content");
    body.appendChild(buttonContainer);
});

function getData() {
    var token = getApolloToken();
    var url = "https://notifications.leagueoflegends.com/api/1.0/messages?read_state=all&limit=10&offset=0";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("X-PVPNET", token);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            var data = JSON.parse(xhttp.responseText);
            var body = document.getElementsByTagName("body")[0];
            var wrapper = createWrapper();
            var textCont = createTextContainer();
            var tableCont = createTableContainer();
            var header = createHeader();
            var footer = createFooter();
            var blocker = createBlocker();
            wrapper.appendChild(header);
            wrapper.appendChild(textCont);
            tableCreate(data, wrapper, textCont, tableCont);
            wrapper.appendChild(footer);
            body.appendChild(wrapper);
            body.appendChild(blocker);
            header.addEventListener("click", () => {
                wrapper.remove();
                blocker.remove();
            });
            showText(0, textCont, data);
        }
    };
    xhttp.send(null);
}

function tableCreate(data, parent, textCont, tdiv) {
    var tbl = document.createElement("table");
    var tblBody = document.createElement("tbody");
    for (var j = 0; j < data.messages.length; j++) {
        var row = document.createElement("tr");
        var cell = document.createElement("td");
        var readstate = data.messages[j].readState == "unread";
        var cellText = "";
        if (!readstate) {
            //cellText = "Ungelesen: "
            row.classList.add("notification_unread");
        } else {
            row.classList.add("notification_read");
        }

        cellText = cellText + "<span class=\"subject\" style=\"display: block;\">" + data.messages[j].subject + "</span><span class=\"time\" style=\"display: block;\">" + realTime(data.messages[j].publishedAt) + "</span>";
        cell.innerHTML = cellText;
        row.appendChild(cell);
        row.id = "actionOverview" + j;
        var createClickHandler =
            function(row, textCont, j, data) {
                return function() {
                    var cell = row.getElementsByTagName("td")[0];
                    var id = cell.innerHTML;
                    showText(j, textCont, data);
                };
            };
        row.onclick = createClickHandler(row, textCont, j, data);
        tblBody.appendChild(row);
    }
    tbl.appendChild(tblBody);
    tbl.id = "actionOverview";
    tdiv.appendChild(tbl);
    parent.append(tdiv);
}

function showText(ind, parent, data) {
    var subj = data.messages[ind].subject;
    var body = data.messages[ind].body;
    body = body.replace(/>.*?\[{quoted}\]\(.*?\)/g, "");
    body = body.replace(/{{((champion)|(summoner)|(item)|(sticker)):.*?}}/g, "");
    parent.innerHTML = "<h1>" + subj + "</h1><p>" + replaceMarkdown(body) + "</p>";
    markAsRead(data.messages[ind].id);
}

function createBlocker() {
    var blocker = document.createElement("div");
    blocker.id = "modContBlocker";
    return blocker;
}

function createTextContainer() {
    var textCont = document.createElement("div");
    textCont.id = "actionInfoCont";
    return textCont
}

function createWrapper() {
    var wrapper = document.createElement("div");
    wrapper.className = "modactionOverview";
    wrapper.id = "wrapper";
    return wrapper
}

function createTableContainer() {
    var tdiv = document.createElement("div");
    tdiv.id = "tableDiv";
    return tdiv;
}

function createHeader() {
    var header = document.createElement("div");
    header.id = "header";
    var button = createCloseButton();
    var h = document.createElement("H1");
    var t = document.createTextNode("MODERATIONSBENACHRICHTIGUNGEN");
    h.appendChild(t);
    header.appendChild(button);
    header.appendChild(h);
    return header;
}

function createFooter() {
    var footer = document.createElement("div");
    footer.id = "modFooter";
    footer.innerHTML = "<span>Allgemeine Informationen über die Moderation des Forums findest du hier:<br><a href=\"https://boards.euw.leagueoflegends.com/de/c/spielerverhalten-de/L6Exerv1-einblicke-in-die-forenmoderation\">Einblicke in die Forenmoderation</a></span>";
    return footer
}

function createOpenButton(parent) {
    var button = document.createElement("button");
    button.id = "moderationOpenButton";
    parent.appendChild(button);
    getRemainingNotifications(button);
    button.addEventListener("click", getData);
}

function createInfoButton(parent){
    var button = document.createElement("button");
    button.id = "eventUpdates";
    parent.appendChild(button);
    getRemainingEvents(button);
    button.addEventListener("click", ()=>{window.open("https://boards.euw.leagueoflegends.com/de/myupdates")});
}

function createCloseButton() {
    var button = document.createElement("div");
    button.id = "closeImgContainer";
    var img = document.createElement("img");
    img.src = "https://cdn.leagueoflegends.com/apollo/assets/player-notifications/close_x.png"
    button.appendChild(img);
    return button
}

function realTime(timeString) {
    var timeInfo = new Date(timeString);
    return timeInfo.toLocaleString();
}

function getRemainingNotifications(button) {
    var token = getApolloToken();
    var url = "https://notifications.leagueoflegends.com/api/1.0/messages?read_state=unread&count=true";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("X-PVPNET", token);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            var data = JSON.parse(xhttp.responseText);
            var inner = "";
            var tot = data.total;
            if (tot == 0) {
                inner = "Moderationsbenachrichtigungen: 0";
                button.id = "notificationButtonRead";
            } else {
                inner = "Ungelesene Moderationsbenachrichtigungen: " + tot;
                button.id = "modnotificationButtonUnread";
            }
            button.innerHTML = inner += "<br>";
            button.className = "notificationButton";
        }
    };
    xhttp.send(null);
}

function getRemainingEvents(button){
    var token = getApolloToken();
    var userID = getUserID();
    var url = "https://apollo.euw.leagueoflegends.com/apollo/users/updatesCount/EUW/"+userID+"/";
    var xhttp = new XMLHttpRequest();
    xhttp.open("GET", url, true);
    xhttp.setRequestHeader("X-PVPNET", token);
    xhttp.onreadystatechange = function() {
        if (xhttp.readyState === XMLHttpRequest.DONE && xhttp.status === 200) {
            var data = JSON.parse(xhttp.responseText);
			var unreadcount = data.searchResultsCount;
			if (unreadcount === 0) {
				button.className = "eventButton";
			} else {
				button.className = "eventButtonUnread";
			}
            button.innerHTML = "Ungelesene Updates: "+unreadcount;
        }
    };
    xhttp.send(null);
}

function getApolloToken() {
    var startStr = "PVPNET_TOKEN_EUW";
    var start = document.cookie.indexOf(startStr) + startStr.length + 1;
    var endStr = ";";
    var end = document.cookie.indexOf(endStr, start + 5);
    var token = document.cookie.substring(start, end);
    token = "EUW:" + token;
    return token;
}

function getUserID(){
    var startStr = "PVPNET_ID_EUW";
    var start = document.cookie.indexOf(startStr) + startStr.length + 1;
    var endStr = ";";
    var end = document.cookie.indexOf(endStr, start + 5);
    var id = document.cookie.substring(start,end);
    return id;
}

function markAsRead(id) {
    var token = getApolloToken();
    var url = "https://notifications.leagueoflegends.com/api/1.0/receipts";
    var par = "{\"message\_ids\":[{\"id\":\"" + id + "\"}]}";
    var params = JSON.parse(par);
    var xhttp = new XMLHttpRequest();
    xhttp.open("POST", url, true);
    xhttp.setRequestHeader("X-PVPNET", token);
    xhttp.setRequestHeader("Content-Type", "application/json");
    xhttp.onload = function() {};
    xhttp.send(par);
}

/***   Regex Markdown Parser by chalarangelo   ***/
// Replaces 'regex' with 'replacement' in 'str'
// Curry function, usage: replaceRegex(regexVar, replacementVar) (strVar)
const replaceRegex = function(regex, replacement) {
    return function(str) {
        return str.replace(regex, replacement);
    }
}
// Regular expressions for Markdown (a bit strict, but they work)
const codeBlockRegex = /((\n\t)(.*))+/g;
const inlineCodeRegex = /(`)(.*?)\1/g;
const imageRegex = /!\[([^\[]+)\]\(([^\)]+)\)/g;
const linkRegex = /\[([^\[]+)\]\(([^\)]+)\)/g;
const headingRegex = /\n(#+\s*)(.*)/g;
const boldItalicsRegex = /(\*{1,2})(.*?)\1/g;
const strikethroughRegex = /(\~\~)(.*?)\1/g;
const blockquoteRegex = /\n(&gt;|\>)(.*)/g;
const horizontalRuleRegex = /\n((\-{3,})|(={3,}))/g;
const unorderedListRegex = /(\n\s*(\-|\+|\*)\s.*)+/g;
const orderedListRegex = /(\n\s*([0-9]+\.)\s.*)+/g;
const paragraphRegex = /\n+(?!<pre>)(?!<h)(?!<ul>)(?!<blockquote)(?!<hr)(?!\t)([^\n]+)\n/g;
const urlRegex = /((([A-Za-z]{3,9}:(?:\/\/)?)(?:[-;:&=\+\$,\w]+@)?[A-Za-z0-9.-]+|(?:www.|[-;:&=\+\$,\w]+@)[A-Za-z0-9.-]+)((?:\/[\+~%\/.\w-_]*)?\??(?:[-\+=&;%@.\w_]*)#?(?:[\w]*))?)(?!.*?<\/a)/g;
// Replacer functions for Markdown
const codeBlockReplacer = function(fullMatch) {
    return '\n<pre>' + fullMatch + '</pre>';
}
const inlineCodeReplacer = function(fullMatch, tagStart, tagContents) {
    return '<code>' + tagContents + '</code>';
}
const imageReplacer = function(fullMatch, tagTitle, tagURL) {
    return '<img src="' + tagURL + '" alt="' + tagTitle + '" />';
}
const linkReplacer = function(fullMatch, tagTitle, tagURL) {
    return '<a href="' + tagURL + '">' + tagTitle + '</a>';
}
const headingReplacer = function(fullMatch, tagStart, tagContents) {
    return '\n<h' + tagStart.trim().length + '>' + tagContents + '</h' + tagStart.trim().length + '>';
}
const boldItalicsReplacer = function(fullMatch, tagStart, tagContents) {
    return '<' + ((tagStart.trim().length == 1) ? ('em') : ('strong')) + '>' + tagContents + '</' + ((tagStart.trim().length == 1) ? ('em') : ('strong')) + '>';
}
const strikethroughReplacer = function(fullMatch, tagStart, tagContents) {
    return '<del>' + tagContents + '</del>';
}
const blockquoteReplacer = function(fullMatch, tagStart, tagContents) {
    return '\n<blockquote class = "modActionQuote">' + tagContents + '</blockquote>';
}
const horizontalRuleReplacer = function(fullMatch) {
    return '\n<hr />';
}
const unorderedListReplacer = function(fullMatch) {
    let items = '';
    fullMatch.trim().split('\n').forEach(item => {
        items += '<li>' + item.substring(2) + '</li>';
    });
    return '\n<ul>' + items + '</ul>';
}
const orderedListReplacer = function(fullMatch) {
    let items = '';
    fullMatch.trim().split('\n').forEach(item => {
        items += '<li>' + item.substring(item.indexOf('.') + 2) + '</li>';
    });
    return '\n<ol>' + items + '</ol>';
}
const paragraphReplacer = function(fullMatch, tagContents) {
    return '<p>' + tagContents + '</p>';
}
const urlReplacer = function(fullMatch, urlContents) {
    return '<a href="' + urlContents + '">' + urlContents + '</a>'
}
// Rules for Markdown parsing (use in order of appearance for best results)
const replaceCodeBlocks = replaceRegex(codeBlockRegex, codeBlockReplacer);
const replaceInlineCodes = replaceRegex(inlineCodeRegex, inlineCodeReplacer);
const replaceImages = replaceRegex(imageRegex, imageReplacer);
const replaceLinks = replaceRegex(linkRegex, linkReplacer);
const replaceHeadings = replaceRegex(headingRegex, headingReplacer);
const replaceBoldItalics = replaceRegex(boldItalicsRegex, boldItalicsReplacer);
const replaceceStrikethrough = replaceRegex(strikethroughRegex, strikethroughReplacer);
const replaceBlockquotes = replaceRegex(blockquoteRegex, blockquoteReplacer);
const replaceHorizontalRules = replaceRegex(horizontalRuleRegex, horizontalRuleReplacer);
const replaceUnorderedLists = replaceRegex(unorderedListRegex, unorderedListReplacer);
const replaceOrderedLists = replaceRegex(orderedListRegex, orderedListReplacer);
const replaceParagraphs = replaceRegex(paragraphRegex, paragraphReplacer);
const replaceUrls = replaceRegex(urlRegex, urlReplacer);
// Fix for tab-indexed code blocks
const codeBlockFixRegex = /\n(<pre>)((\n|.)*)(<\/pre>)/g;
const codeBlockFixer = function(fullMatch, tagStart, tagContents, lastMatch, tagEnd) {
    let lines = '';
    tagContents.split('\n').forEach(line => {
        lines += line.substring(1) + '\n';
    });
    return tagStart + lines + tagEnd;
}
const fixCodeBlocks = replaceRegex(codeBlockFixRegex, codeBlockFixer);
// Replacement rule order function for Markdown
// Do not use as-is, prefer parseMarkdown as seen below
const replaceMarkdown = function(str) {
    return replaceParagraphs(replaceOrderedLists(replaceUnorderedLists(
        replaceHorizontalRules(replaceBlockquotes(replaceceStrikethrough(
            replaceBoldItalics(replaceHeadings(replaceUrls(replaceImages(
                replaceInlineCodes(replaceCodeBlocks(replaceLinks(str)))
            ))))
        )))
    )));
}
// Parser for Markdown (fixes code, adds empty lines around for parsing)
// Usage: parseMarkdown(strVar)
const parseMarkdown = function(str) {
    return fixCodeBlocks(replaceMarkdown('\n' + str + '\n')).trim();
}