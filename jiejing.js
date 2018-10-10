const __version = "1.0.0v"
// getNewVersion()
const dw = $device.info.screen.width
const colorArr = ["#ff3b30","#ff9500","#ffcc00","#4cd964","#5ac8fa","#007aff","#5856d6","#ff2d55","#04040f","#888","#777"]
const dh = $device.info.screen.height
const jiejingData=[
	{
		name:"勿扰模式",
		author:"virusdefender",
		url:"https://www.icloud.com/shortcuts/7462c4948383477bb40f7f2ca0ca3b11"
	},{
		name:"Add to Aria2",
		author:"Axel",
		url:"https://www.icloud.com/shortcuts/8c55b5f1286841bc9b01f4835ef273b1"
	},{
		name:"小新工具箱",
		author:"小新",
		url:"https://www.icloud.com/shortcuts/9afc3741a237480c8c7850f827cf3bfe"
	},{
		name:"Day Count",
		author:"网友",
		url:"https://www.icloud.com/shortcuts/f139cc03daa943fba7192b09651a6d99"
	},{
		name:"播放私人FM-网易云音乐",
		author:"网友",
		url:"https://www.icloud.com/shortcuts/81def331584245a28e555923cbf5e4a1"
	},{
		name:"播放音乐",
		author:"网友",
		url:"https://www.icloud.com/shortcuts/7e1b0173e31c43e4979130f094faf7e3"
	},
	{
		name:"全网音乐平台搜索",
		author:"网友",
		url:"https://www.icloud.com/shortcuts/679bbeb8482e435f897bd9f6bc82d095"
	},{
		name:'追书神器v1.1.3',
		author:"网友",
		url:"https://www.icloud.com/shortcuts/573c2704e7414f1080aa7c6e93bed637"
	},{
		name:"ss签到",
		author:"网友",
		url:"https://www.icloud.com/shortcuts/5f9422f2a9a14882bbc5bc60ada32c04"
	},{
		name:"联通资费",
		author:"网友",
		url:"https://www.icloud.com/shortcuts/349cf070ca394e22af7fbced02bb6792"
	},{
		name:'Backup Your Shortcuts',
		author:"网友",
		url:"https://www.icloud.com/shortcuts/87f0b02da2644aabb295aaab943d9398"
	},
	{
		name:"王境泽",
		author:"网友",
		url:"https://www.icloud.com/shortcuts/e4ab446b0e0b4b1e91bccb60bb366a01"
	},
	{
		name:"Social Media Downloader",
		author:"网友",
		url:"https://www.icloud.com/shortcuts/44b42d925c964e298d49c54dad5134e2"
	},{
		name:"BetterNotch 1.0",
		author:"网友",
		url:"https://www.icloud.com/shortcuts/56408031f901435eb153e51af750a3db"
	},{
		name:"Iliad",
		author:"网友",
		url:"https://www.icloud.com/shortcuts/17a6acde1f0c4023bca536ec4c2b90a5"
	},
	{
		name:"骂人宝典",
		author:"网友",
		url:'https://www.icloud.com/shortcuts/0ae4051b4c664bb995e252dc229fcb10'
	}
]
let authors = []

$ui.render({
	props: {
		title: "myshortcuts",
		id:"jiejing",
		navBarHidden: true,
        statusBarStyle: 1,
	},
	layout: $layout.fill,
	views: [{
		type: "view",
		props: {
			bgcolor: $color("#fff"),
		},
		layout: $layout.fill,
		views: [{
			type: "label",
			props: {
				id: "loading",
				text: "捷径",
				font: $font("ChalkboardSE-Light", 30),
				color: $color("#222"),
				align: $align.center,
				alpha:0
			},
			layout: $layout.center
		}]
	}, 
	 {
        type: "view",
        props: {
            font: $font("bold", 30),
            align: $align.center,
            bgcolor:$color("#fff")
        },
        layout: function (make, view) {
            make.width.equalTo(view.super)
            make.height.equalTo(60)
        },
        views:[
        	{
        	    type: "image",
        	    props: {
        	        id: "logo",
        	       	src:"https://blog-1253418896.cos.ap-chengdu.myqcloud.com/jsbox/icon/%E5%BE%AE%E4%BF%A1%E6%88%AA%E5%9B%BE_20180920194545.png",
        	       	radius: 10
        	    },
        	    layout: function (make, view) {
        	        make.left.equalTo(view.super).offset(15)
        	        make.top.equalTo(view.super).offset(15)
        	    }
        	},
        ]
    },
    {
		type: "matrix",
		props: {
			id: "app",
			bgcolor: $color("#fff"),
			align: $align.center,
			columns: 2,
			itemHeight: 100,
			spacing: 10,
			alpha: 0,
			template: [
				{
					type: "view",
					props: {
						bgcolor: $color(colorArr[Math.floor(Math.random() * 10)]),
						smoothRadius: 10,

					},
					layout: $layout.fill,
				},
				{
					type: "button",
					props: {
						bgcolor: $color("clear"),
						icon: $icon("013", $color("#fff"), $size(20, 20)),
						font: $font(12),

					},
					layout: (make, view) => {
						make.left.equalTo(view.super).offset(10)
						make.size.equalTo($size(30, 30))
						make.top.equalTo(10)
					}
				},
				{
					type: "label",
					props: {
						id: "jr_title",
						font: $font("bold", 12),
						color: $color("#fff")
					},
					layout: (make, view) => {
						make.left.equalTo(view.prev.right).offset(10)
						make.top.equalTo(view.super).offset(20)
						make.width.equalTo(dw/2 - 115)
					}
				},
				// {
				// 	type: "image",
				// 	props: {
				// 		id:"avatar",
				// 		bgcolor: $color("#fff"),
				// 		smoothRadius: 16,
				// 	},
				// 	layout: (make, view) => {
				// 		make.left.equalTo(view.super).offset(10)
				// 		make.size.equalTo($size(30, 30))
				// 		make.top.equalTo(view.super).offset(50)
				// 	}
				// },
				{
					type: "label",
					props: {
						id: "jr_author",
						font: $font(12),
						textColor: $color("#fff"),
						lines: 0
					},
					layout: (make, view) => {
						make.left.equalTo(view.super).offset(15)
						make.top.equalTo(view.super).offset(40)
						make.height.equalTo(60)
						make.width.equalTo(50)
					}
				}
				// {
				// 	type: "button",
				// 	props: {
				// 		id: "weibo",
				// 		font: $font(12),
				// 		titleColor: $color("#fff"),
				// 		lines: 0,
				// 		icon: $icon("071", $color("#fff")),
				// 		bgcolor: $color(colorArr[Math.floor(Math.random() * 10)]),
				// 		alpha: 1
				// 	},
				// 	layout: (make, view) => {
				// 		make.left.equalTo(view.super).offset(10)
				// 		make.top.equalTo(view.prev.bottom).offset(10)
				// 		make.size.equalTo($size(dw/2 - 35, 50))
				// 	},
				// 	events: {
				// 		tapped: (sender) => {
				// 			console.log(sender)
				// 		}
				// 	}
				// }

			]
		},
		layout: (make,view)=>{
			make.top.equalTo(60)
            make.size.equalTo($size(dw, dh-110))
		},
		events: {
			didSelect: (sender, indexPath, data) => {
				$device.taptic(0)
				$ui.alert({
					title: "是否要下载",
					message: data.jr_title.text,
					actions: [{
							title: "下载",
							handler: function () {
								$safari.open({
									url: data.jr_title.url,
									entersReader: true
								})
							}
						},
						{
							title: "取消",
							handler: function () {
									$ui.toast("好的")
							}
						}
					]
				})
				// jiejingDetail(data.jr_title.url)
			}
		}
	},
	{
		type: "matrix",
		props: {
			id: "jiejingList",
			bgcolor: $color("#fff"),
			align: $align.center,
			columns: 2,
			itemHeight: 100,
			spacing: 10,
			alpha: 0,
			template: [
				{
					type: "view",
					props: {
						bgcolor: $color(colorArr[Math.floor(Math.random() * 10)]),
						smoothRadius: 10,

					},
					layout: $layout.fill,
				},
				{
					type: "button",
					props: {
						bgcolor: $color("clear"),
						icon: $icon("013", $color("#fff"), $size(20, 20)),
						font: $font(12),

					},
					layout: (make, view) => {
						make.left.equalTo(view.super).offset(10)
						make.size.equalTo($size(30, 30))
						make.top.equalTo(10)
					}
				},
				{
					type: "label",
					props: {
						id: "jr_title",
						font: $font("bold", 12),
						color: $color("#fff")
					},
					layout: (make, view) => {
						make.left.equalTo(view.prev.right).offset(10)
						make.top.equalTo(view.super).offset(20)
						make.width.equalTo(dw/2 - 115)
					}
				},
				// {
				// 	type: "image",
				// 	props: {
				// 		id:"avatar",
				// 		bgcolor: $color("#fff"),
				// 		smoothRadius: 16,
				// 	},
				// 	layout: (make, view) => {
				// 		make.left.equalTo(view.super).offset(10)
				// 		make.size.equalTo($size(30, 30))
				// 		make.top.equalTo(view.super).offset(50)
				// 	}
				// },
				{
					type: "label",
					props: {
						id: "jr_author",
						font: $font(12),
						textColor: $color("#fff"),
						lines: 0
					},
					layout: (make, view) => {
						make.left.equalTo(view.super).offset(15)
						make.top.equalTo(view.super).offset(40)
						make.height.equalTo(60)
						make.width.equalTo(50)
					}
				}
				// {
				// 	type: "button",
				// 	props: {
				// 		id: "weibo",
				// 		font: $font(12),
				// 		titleColor: $color("#fff"),
				// 		lines: 0,
				// 		icon: $icon("071", $color("#fff")),
				// 		bgcolor: $color(colorArr[Math.floor(Math.random() * 10)]),
				// 		alpha: 1
				// 	},
				// 	layout: (make, view) => {
				// 		make.left.equalTo(view.super).offset(10)
				// 		make.top.equalTo(view.prev.bottom).offset(10)
				// 		make.size.equalTo($size(dw/2 - 35, 50))
				// 	},
				// 	events: {
				// 		tapped: (sender) => {
				// 			console.log(sender)
				// 		}
				// 	}
				// }

			]
		},
		layout: (make,view)=>{
			make.top.equalTo(60)
            make.size.equalTo($size(dw, dh-160))
		},
		events: {
			didSelect: (sender, indexPath, data) => {
				$device.taptic(0)
				$ui.alert({
					title: "是否要下载",
					message: data.jr_title.text,
					actions: [{
							title: "下载",
							handler: function () {
								$safari.open({
									url: data.jr_title.url,
									entersReader: true
								})
							}
						},
						{
							title: "取消",
							handler: function () {
									$ui.toast("好的")
							}
						}
					]
				})
				// jiejingDetail(data.jr_title.url)
			}
		}
	}
	,{
      type: "menu",
      props: {
        items: ["myshortcuts", "jiejing"]
      },
      layout: function(make) {
        make.left.bottom.right.equalTo(0)
        make.height.equalTo(50)
      },
      events: {
        changed: function(sender) {
          var items = sender.items
          var index = sender.index
          $device.taptic(0)
          switch (index){
          	case 0:
          	{
          		$("app").alpha = 1
          		$("jiejingList").alpha = 0
          	}
          	break;
          	case 1:
          	{
          		$("app").alpha = 0
          		$("jiejingList").alpha = 1
          		  $("jiejingList").data = jiejingData.map((i) => {
					return {
							app_logo: {
								src: i.name
							},
							jr_title: {
								text: i.name,
								url: i.url
							},
							jr_author: {
								text: i.author
							}
							
						}
				 })
          	}
          }
        }
      }
    }]
})


function jiejingDetail(url){
			console.log(url)
			$http.request({
			    method: "GET",
			    url: url,
			    header: {
			      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.0 Mobile/14G60 Safari/602.1"
			    },
			    handler: function(resp) {
			   	 let html = resp.data
      			 let regexDis = /<p>(\S*)<\/p>/g
      			 let regexInsUrl = /href="\/shortcut\/install\/(.*?)"/g
      			 let regexName = /<h1 class="shortcut-name" style="color:#7b72e9" itemprop="name">(\S*)<\/h1>/g
  			     let regexAuthor = /<span class="shortcut-author-name" itemprop="name">(\S*)<\/span>/g
  			     let regexCount =/<span class="shortcut-install-count mr-2">(\S*)<\/span>/g
      			 let matchDis = regexDis.exec(html)
      			 let matchInsUrl = regexInsUrl.exec(html)
      			 let matchName = regexName.exec(html)
      			 let matchAuthor = regexAuthor.exec(html)
      			 let matchCount = regexCount.exec(html)
      			 let jiejingObj = {}
      			 while (matchDis != null && matchInsUrl != null&& matchName != null && matchAuthor != null && matchCount != null) {
      			 	jiejingObj ={
			      		name: matchName[1],
			      		author: matchAuthor[1],
			      		url:"https://myshortcuts.app/shortcut/install/"+matchInsUrl[1],
			      		count:matchCount[1],
			      		dis:matchDis[1]
			      	}	
			        matchDis = regexDis.exec(html)
			        matchInsUrl = regexInsUrl.exec(html)
			        matchName = regexName.exec(html)
			        matchAuthor = regexAuthor.exec(html)
			        matchCount = regexCount.exec(html)
			       
			      }
			       console.log(jiejingObj.dis)
			  }
			})

}



$http.request({
    method: "GET",
    url: "https://myshortcuts.app/",
    header: {
      "User-Agent": "Mozilla/5.0 (iPhone; CPU iPhone OS 10_3_3 like Mac OS X) AppleWebKit/603.3.8 (KHTML, like Gecko) Version/10.0 Mobile/14G60 Safari/602.1"
    },
    handler: function(resp) {
      $ui.loading(false)
      let html = resp.data
      let regexUrl = /href="\/shortcut\/(.*?)"/g
      let regexName = /<div class="shortcut-name" itemprop="name">(\S*)<\/div>/g
      let regexAuthor = /<span class="shortcut-author-name" itemprop="name">(\S*)<\/span>/g
      let regexType = /  <h2 class="category-name">(\S*)<\/h2>/g
      let regexAvatar =/src="https:\/\/cdn.myshortcuts.app\/content\/avatar\/(.*?)"/g
      let jiejingArr = []
      let typeArr =[]
      let matchName = regexName.exec(html)
      let matchUrl = regexUrl.exec(html)
	  let matchAuthor = regexAuthor.exec(html)
	  let matchType = regexType.exec(html)
	  let matchAvatar = regexAvatar.exec(html)
	  let jiejing ={}
      while (matchUrl != null && matchName != null && matchAuthor != null ){
      	let str1 = matchUrl[1].substring(0,8)
      	let str2 = matchUrl[1].substring(8,12)
      	let str3= matchUrl[1].substring(12,17)
      	let str4= matchUrl[1].substring(17,matchUrl[1].length)

      	// if( matchAvatar == null){
      	// 	console.log("么有头像")
      	// 	matchAvatar =["123123","http://oz53lzns9.bkt.clouddn.com/18-9-14/62046385.jpg"]
      	// }
      	jiejing ={
      		name: matchName[1],
      		author: matchAuthor[1],
      		url:"https://myshortcuts.app/shortcut/install/"+str1+"-"+str2+"-"+str3+"-"+str4
      		// avatar: "https://cdn.myshortcuts.app/content/avatar/"+matchAvatar[1]
      	}
        jiejingArr.push(jiejing)
        matchUrl = regexUrl.exec(html)
        matchName = regexName.exec(html)
        matchAuthor = regexAuthor.exec(html)
        matchAvatar = regexAvatar.exec(html)
        
      }
      while (matchType != null) {
        typeArr.push(matchType[1])
        matchType = regexType.exec(html)
      }

     $("app").data = jiejingArr.map((i) => {
		return {
				app_logo: {
					src: i.name
				},
				jr_title: {
					text: i.name,
					url: i.url
				},
				jr_author: {
					text: i.author
				}
				
				
			}
		})
		$ui.animate({
			duration: 0.375,
			animation: function () {
				$("loading").alpha = 0
				$("app").alpha = .9
			},
		})
			
    }
})

// function get_jiejing(data){
// 	let res =[]
// 	console.log(data)
// 	for( let a of data){
// 		console.log(a.url)
// 		$http.get({ url: a.url }).then(function(resp) {
			 
// 			   	let html = resp.data
//       			 let regexDis = /<p>(\S*)<\/p>/g
//       			 let regexInsUrl = /href="\/shortcut\/install\/(.*?)"/g
//       			 let regexName = /<h1 class="shortcut-name" style="color:#7b72e9" itemprop="name">(\S*)<\/h1>/g
//   			     let regexAuthor = /<span class="shortcut-author-name" itemprop="name">(\S*)<\/span>/g
//   			     let regexCount =/<span class="shortcut-install-count mr-2">(\S*)<\/span>/g
//       			 let matchDis = regexDis.exec(html)
//       			 let matchInsUrl = regexInsUrl.exec(html)
//       			 let matchName = regexName.exec(html)
//       			 let matchAuthor = regexAuthor.exec(html)
//       			 let matchCount = regexCount.exec(html)
//       			 let jiejingObj = {}
//       			 // console.log(a)
//       			 while (matchDis != null && matchInsUrl != null&& matchName != null && matchAuthor != null && matchCount != null) {
//       			 	jiejingObj ={
// 			      		name: matchName[1],
// 			      		author: matchAuthor[1],
// 			      		url:"https://myshortcuts.app/shortcut/install/"+matchInsUrl[1],
// 			      		count:matchCount[1],
// 			      		dis:matchDis[1]
// 			      	}	
			      	
// 			      	res.push(jiejingObj)
// 			      	console.log(res)
// 			        matchDis = regexDis.exec(html)
// 			        matchInsUrl = regexInsUrl.exec(html)
// 			        matchName = regexName.exec(html)
// 			        matchAuthor = regexAuthor.exec(html)
// 			        matchCount = regexCount.exec(html)
// 			      }

// 			    // console.log(res)
// 			    $("app").data = res.map((i) => {
// 					return {
// 							app_logo: {
// 								src: i.name
// 							},
// 							jr_title: {
// 								text: i.name,
// 								url: i.url
// 							},
// 							jr_author: {
// 								text: i.author
// 							}
							
// 						}
// 					})
// 					$ui.animate({
// 						duration: 0.375,
// 						animation: function () {
// 							$("loading").alpha = 0
// 							$("app").alpha = .9
// 						},
// 					})
// 		})
		
// 	}
// }

function getNewVersion() {
	$ui.loading(true)
	$http.get({
		url: "http://blog.extrastu.xin/jsbox/jiejing.js?v="+Math.floor(Math.random() * 10),
		handler: function (resp) {
			let data = resp.data
			let versionItem = new RegExp('const __version = "(.*?)v"', "g")
			let version = versionItem.exec(data)[1]
			if (version > __version) {
				$ui.alert({
					title: "检测到新版本",
					message: "是否现在更新到最新版本",
					actions: [{
							title: "更新",
							handler: () => {
								let updatedUrl = "jsbox://install?url=${encodeURI('http://blog.extrastu.xin/jsbox/jiejing.js?v=456')}"
								$app.openURL(updatedUrl)
								$ui.toast('正在安装更新...')
								$app.close()
							}
						},
						{
							title: "取消",
						}
					]
				})
			}
		}
	})
}