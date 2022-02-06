(function(){
	var games = {
		$:function(ele){
			return document.querySelectorAll(ele);
		},
		
		"showList": function(){
			var showBtn = this.$('.gamelist')[0];
			var btnText = this.$('.gamelist-Text')[0];
			var showList = this.$('.showlist')[0];
			var hideBtn = this.$('.banner_game_list_footer')[0];
			var index = 0;
			
			showBtn.onclick = function(){
				index++;
				if(index%2==1){
					btnText.style.display = 'none';
				}
				else{
					btnText.style.display = 'block';
				}
				this.classList.toggle('gamechange');
				showList.classList.toggle('showing');
			};
			showBtn.onmousedown = function(){
				return false;
			};
			showList.onclick = function(e){
				e.cancelBubble = true;
			};
			hideBtn.onclick = function(){
				index = 0;
				btnText.style.display = 'block';
				showBtn.classList.remove('gamechange');
				showList.classList.remove('showing');
			};
		},
		
		"slider": function(){
			var allLi = this.$('.banner_ul')[0].children;
			var allBtn = this.$('.banner_ol')[0].children;
			var timer =null;
			var preBtn = this.$('.banner_prebtn')[0];
			var nxtBtn = this.$('.banner_nxtbtn')[0];
			var num = 0;
			var contArr = [
				{
					"bg": "images/bb351359-e561-4e5b-9041-96f42a6fb75d.jpeg",
					"title": "漫威超级战争",
					"text": "灭霸卷土重来"
				},
				{
					"bg": "images/b44514e7-2e31-4567-8e75-2b9ea9583e4e.jpeg",
					"title": "《零号任务》",
					"text": "2v4手游对抗抢险"
				},
				{
					"bg": "images/17c5610b-b620-4849-84eb-13c30edeec08.jpeg",
					"title": "网易游戏点卡",
					"text": "网易入驻淘宝天猫"
				},
				{
					"bg": "images/fb2c2ca9-1c42-46a5-a3a0-538d2058a387.jpeg",
					"title": "哈利波特：魔法",
					"text": "全平台正式上线"
				},
				{
					"bg": "images/bca3d7d2-79f8-4ba1-b624-740f15d55718.jpeg",
					"title": "宝可梦最新剧场",
					"text": "影游联动开启"
				}
			];
			
			function fn(){
				for(var i=0;i<allLi.length;i++){
					allLi[i].classList.remove('active');
					allBtn[i].classList.remove('active');
				}
				allLi[num].classList.add('active');
				allBtn[num].classList.add('active');
			}
			
			for(var i=0;i<allBtn.length;i++){
				allBtn[i].index = i;
				allBtn[i].onclick = function(){
					for(var i=0;i<allBtn.length;i++){
						allBtn[i].classList.remove('active');
						allLi[i].classList.remove('active');
					}
					this.className = 'active';
					allLi[this.index].classList.add('active');
					start();
				};
			};
			start();
			function start(){
				clearInterval(timer);
				timer = setInterval(function(){
					num++;
					if(num == allLi.length)num = 0;
					fn();
				},5000);
			}
			
			preBtn.onclick = function(){
				num--;
				if(num == -1)num = allLi.length - 1;
				fn();
				start();
				preBtn.onmouseenter();
				nxtBtn.onmouseenter();
			};
			nxtBtn.onclick = function(){
				num++;
				if(num == allLi.length)num = 0;
				fn();
				start();
				preBtn.onmouseenter();
				nxtBtn.onmouseenter();
			};
			
			preBtn.onmouseenter = function(){
				var pre = num - 1;
				if(pre == -1)pre = allLi.length - 1;
				this.children[0].children[0].style.backgroundImage = "url(" + contArr[pre].bg + ");";
				this.children[0].children[1].innerText = contArr[pre].title;
				this.children[0].children[2].innerText = contArr[pre].text;
			};
			nxtBtn.onmouseenter = function(){
				var nxt = num + 1;
				if(nxt == allLi.length)nxt = 0;
				this.children[0].children[0].style.backgroundImage = "url(" + contArr[nxt].bg + ");";
				this.children[0].children[1].innerText = contArr[nxt].title;
				this.children[0].children[2].innerText = contArr[nxt].text;
			};
		},
		
		"info": function(){
			var allBtn = this.$('.info_left')[0].children;
			var allLi = this.$('.info_center')[0].children;
			
			for(var i=0;i<allBtn.length;i++){
				allBtn[i].index = i;
				allBtn[i].onclick = function(){
					for(var i=0;i<allBtn.length;i++){
						allBtn[i].className = '';
						allLi[i].classList.remove('active');
					};
					this.className = 'active';
					allLi[this.index].classList.add('active');
				}
			};
		},
		
		"group": function(){
			//触碰li
			var liNode = this.$('.cont_left_cet_ul')[0].children;
			var preBtn = this.$('.cont_left_pre')[0];
			var nxtBtn = this.$('.cont_left_nxt')[0];
			//移动ul
			var ul = this.$('.cont_left_cet_ul')[0];
			var num = liNode.length;
			var lastnum = num % 5;
			ul.innerHTML += ul.innerHTML;
			
			ul.style.width = liNode[0].offsetWidth * ul.children.length + 'px';
			
			//右滚
			nxtBtn.onclick = function(){
				num -= 5;
				nleft = ul.style.left.replace('px','');
				if(num >= 5){
					nleft = nleft - 810;
					ul.style.left = nleft + 'px';
				}
				else if(num>0 && num<5){
					nleft = nleft - lastnum * liNode[0].offsetWidth;
					ul.style.left = nleft + 'px';
				}
				else{
					nleft = nleft - 810;
					ul.style.left = nleft + 'px' ;
					num = 17;
					setTimeout(function(){
						ul.style.transition = '0s';
						setTimeout(function(){
							ul.style.left = 0;
							setTimeout(function(){
								ul.style.transition = '1s';
							},100);
						},5);
					},1010);
				};
				for(var i=0;i<liNode.length;i++){
					liNode[i].classList.remove('active');
				}
			};
			//左滚
			preBtn.onclick = function(){
				var nleft = ul.style.left.replace('px','');
				if(num == 17){
					ul.style.transition = '0s';
					nleft = nleft - num * liNode[0].offsetWidth;
					ul.style.left = nleft + 'px';
					num = 7;
					setTimeout(function(){
						ul.style.transition = '1s';
						nleft = nleft - (-810) - lastnum * (-liNode[0].offsetWidth);
						ul.style.left = nleft + 'px';
					},10);
				}
				else{
					num += 5;
					nleft = nleft - (-810);
					ul.style.left = nleft + 'px';
				};
				for(var i=0;i<liNode.length;i++){
					liNode[i].classList.remove('active');
				}
			};
			
			for(var i=0;i<liNode.length;i++){
				liNode[i].onmouseenter = function(){
					for(var i=0;i<liNode.length;i++){
						liNode[i].classList.remove('active');
					};
					this.classList.add('active');
				}
			};
		},
		
		"change": function(){
			var change = this.$('.turn')[0];
			var allLi = this.$('.hotgame_cont')[0].children;
			var index = 6;
			var tag = false;
			var liArr = [
				{
					"img": "images/game-list-img.png",
					"h2": "《游戏王：决斗链接》",
					"text": "全新游戏王GX世界版本9月2号上线。",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "游戏类型：童话MMO手游",
				},
				{
					"img": "images/game-list-img.png",
					"h2": "《游戏王：决斗链接》",
					"text": "全新游戏王GX世界版本9月2号上线。",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "游戏类型：童话MMO手游",
				},
				{
					"img": "images/67ecf0ee-2ab0-433b-9eb8-ae1f826e8a59.jpeg",
					"h2": "《决战平安京》",
					"text": "返校·稚语。剪刀石头布——我~出~锤！",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "决战平安京",
				},
				{
					"img": "images/game-list-img.png",
					"h2": "《游戏王：决斗链接》",
					"text": "全新游戏王GX世界版本9月2号上线。",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "游戏类型：童话MMO手游",
				},
				{
					"img": "images/game-list-img.png",
					"h2": "《游戏王：决斗链接》",
					"text": "全新游戏王GX世界版本9月2号上线。",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "游戏类型：童话MMO手游",
				},
				{
					"img": "images/game-list-img.png",
					"h2": "《游戏王：决斗链接》",
					"text": "全新游戏王GX世界版本9月2号上线。",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "游戏类型：童话MMO手游",
				},
				{
					"img": "images/67ecf0ee-2ab0-433b-9eb8-ae1f826e8a59.jpeg",
					"h2": "《决战平安京》",
					"text": "返校·稚语。剪刀石头布——我~出~锤！",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "决战平安京",
				},
				{
					"img": "images/game-list-img.png",
					"h2": "《游戏王：决斗链接》",
					"text": "全新游戏王GX世界版本9月2号上线。",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "游戏类型：童话MMO手游",
				},
				{
					"img": "images/67ecf0ee-2ab0-433b-9eb8-ae1f826e8a59.jpeg",
					"h2": "《决战平安京》",
					"text": "返校·稚语。剪刀石头布——我~出~锤！",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "决战平安京",
				},
				{
					"img": "images/14556651-311f-4e04-891c-b88dcc840798.jpeg",
					"h2": "《阴阳师：妖怪屋》",
					"text": "一周年庆开启，活动得100抽！SP赤影妖刀姬",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "100抽参与周年庆活动",
				},
				{
					"img": "images/game-list-img.png",
					"h2": "《游戏王：决斗链接》",
					"text": "全新游戏王GX世界版本9月2号上线。",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "游戏类型：童话MMO手游",
				},
				{
					"img": "images/14556651-311f-4e04-891c-b88dcc840798.jpeg",
					"h2": "《阴阳师：妖怪屋》",
					"text": "一周年庆开启，活动得100抽！SP赤影妖刀姬",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "100抽参与周年庆活动",
				},
				{
					"img": "images/14556651-311f-4e04-891c-b88dcc840798.jpeg",
					"h2": "《阴阳师：妖怪屋》",
					"text": "一周年庆开启，活动得100抽！SP赤影妖刀姬",
					"ewmimg": "images/games_ewm.png",
					"ewmtop": "100抽参与周年庆活动",
				}
			];
			
			change.onclick = function(){
				if(tag)return;
				tag = true;
				setTimeout(function(){
					tag = false;
				},1050);
				for(var i=0;i<allLi.length;i++){
					(function(i){
						setTimeout(function(){
							allLi[i].classList.add('scale');
							setTimeout(function(){
								if(index == liArr.length)index = 0;
								allLi[i].children[0].style.backgroundImage = 'url(' + liArr[index].img + ')';
								allLi[i].children[1].children[0].children[0].src = liArr[index].ewmimg;
								allLi[i].children[1].children[1].children[0].innerText = liArr[index].ewmtop;
								allLi[i].children[2].innerText = liArr[index].h2;
								allLi[i].children[3].innerText = liArr[index].text;
								index++;
								allLi[i].classList.remove('scale');
							},500);
						},i*100);
					})(i);
				};
			};
		},
		
		"morelist": function(){
			var moreBtn = this.$('.center_btn')[0];
			var hg = this.$('.tree')[0];
			
			moreBtn.onclick = function(){
				if(this.innerText == "查看更多"){
					this.innerText = "收起";
					hg.classList.add('active');
				}
				else{
					this.innerText = "查看更多";
					hg.classList.remove('active');
				}
			};
		}
		
	}
	
	games.showList();
	
	games.slider();
	
	games.info();
	
	games.group();
	
	games.change();
	
	games.morelist();
})();