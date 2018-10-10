const __version = "1.5.1v"
getNewVersion()
const dw = $device.info.screen.width
const colorArr = ["#ff3b30","#ff9500","#ffcc00","#4cd964","#5ac8fa","#007aff","#5856d6","#ff2d55","#04040f","#888","#777"]
const dh = $device.info.screen.height
let authors = []

$ui.render({
	props: {
		title: "中国独立开发者图鉴",
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
				text: "独立",
				font: $font("ChalkboardSE-Light", 30),
				color: $color("#222"),
				align: $align.center
			},
			layout: $layout.center
		}]
	}, 
	 {
        type: "view",
        props: {
            id: "title",
            text: "独立",
            font: $font("bold", 30),
            align: $align.center,
            bgcolor:$color("#e9ecef")
        },
        layout: function (make, view) {
            make.width.equalTo(view.super)
            make.height.equalTo(60)
        },
        views:[
        	{
        	    type: "label",
        	    props: {
        	        id: "title",
        	        text: "中国独立开发者图鉴",
        	        font: $font("bold", 25),
        	        align: $align.center,
        	        color: $color(colorArr[Math.floor(Math.random() * 10)])
        	    },
        	    layout: function (make, view) {
        	        make.left.equalTo(view.super).offset(15)
        	        make.top.equalTo(view.super).offset(15)
        	    }
        	},
        	{
        	    type: "label",
        	    props: {
        	        id: "title",
        	        text: "反馈",
        	        font: $font("bold", 25),
        	        align: $align.center,
        	        color: $color(colorArr[Math.floor(Math.random() * 10)])
        	    },
        	    layout: function (make, view) {
        	        make.right.equalTo(view.super).offset(-15)
        	        make.top.equalTo(view.super).offset(15)
        	    },
        	    events: {
				  tapped: function(sender) {
				  	$ui.menu({
				  	  items:["apple store红包❤","发邮件给我❤"],
				  	  handler:(title,idx)=>{
				  	    switch(idx){
				  	      case 0:
				  	       $clipboard.text ='小伙伴们，快来试手气赢新机购机红包喽！5huNwg25tU#吱口令#长按复制此消息，打开支付宝就能领取！';
				  	        $ui.alert({
				  	              title:"支持",
				  	              message:"apple store红包已复制到剪切板\n打开支付宝即可使用\n\n感谢您的支持❤"
				  	            })
				  	       break;
				  	      case 1:
				  	        {
			                  $message.mail({
			                    subject: "独立.js反馈信息",
			                    to: ["extrastu888@gmail.com"],
			                    cc: [],
			                    bcc: [],
			                    body: "",
			                    handler: function(result) {}
			                  })
			                }
			                break;
				  	    }
				  	  }
				  	})
				  }
				}
        	}
        ]
    },
    {
		type: "matrix",
		props: {
			id: "app",
			bgcolor: $color("#e9ecef"),
			align: $align.center,
			columns: 2,
			itemHeight: 180,
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
					type: "image",
					props: {
						id: "app_logo",
						bgcolor: $color("clear"),
					},
					layout: (make, view) => {
						make.left.equalTo(view.super).offset(10)
						make.size.equalTo($size(30, 30))
						make.top.equalTo(27)
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
						make.top.equalTo(view.super).offset(27)
						make.width.equalTo(dw/2 - 115)
					}
				},
				{
					type: "label",
					props: {
						id: "jr_author",
						font: $font(12),
						textColor: $color("#fff"),
						lines: 0
					},
					layout: (make, view) => {
						make.left.equalTo(view.prev)
						make.top.equalTo(view.prev.bottom).offset(5)
						make.height.equalTo(60)
						make.width.equalTo(dw - 115)
					}
				},
				{
					type: "button",
					props: {
						id: "weibo",
						font: $font(12),
						titleColor: $color("#fff"),
						lines: 0,
						icon: $icon("071", $color("#fff")),
						bgcolor: $color(colorArr[Math.floor(Math.random() * 10)]),
						alpha: 1
					},
					layout: (make, view) => {
						make.left.equalTo(view.super).offset(10)
						make.top.equalTo(view.prev.bottom).offset(10)
						make.size.equalTo($size(dw/2 - 35, 50))
					},
					events: {
						tapped: (sender) => {
							console.log(sender)
						}
					}
				}

			]
		},
		layout: (make,view)=>{
			make.top.equalTo(60)
            make.size.equalTo($size(dw, dh-60))
		},
		events: {
			didSelect: (sender, indexPath, data) => {

				$device.taptic(0)

				$ui.alert({
					title: "在App Store中打开",
					message: data.jr_title.text,
					actions: [{
							title: "打开",
							handler: function () {
								$safari.open({
									url: data.jr_title.url,
									entersReader: false
								})
							}
						},
						{
							title: "取消",
							handler: function () {

							}
						}
					]
				})
			},
			didLongPress: function (sender, indexPath, data) {
				console.log(data.weibo.url)
				$device.taptic(0)

				$ui.alert({
					title: "打开",
					message: data.weibo.title + "微博",
					actions: [{
							title: "打开",
							handler: function () {
								$safari.open({
									url: data.weibo.url
								})
							}
						},
						{
							title: "取消",
							handler: function () {

							}
						}
					]
				})
			}
		}
	}]
})

$http.get({
	url: "https://josephchang10.github.io/chinese-indie-hackers/data.js",
	handler: function (resp) {
		let data = resp.data
		let index = data.indexOf("=")
		authors = JSON.parse(data.substring(index + 1, data.length))
		get_app(authors)
	}
})

function get_app(authors) {
	let arr = []
	for (let c of authors) {
		$http.get({
			url: "https://itunes.apple.com/lookup?id=" + c.artistId + "&entity=software&lang=zh-CN&country=CN",
			handler: function (resp) {
				let res = resp.data
				let obj = {}

				obj = {
					app_logo: res.results[1].artworkUrl100,
					app_title: res.results[1].trackName,
					app_url: res.results[1].trackViewUrl,
					app_description: res.results[1].description,
					app_price:res.results[1].formattedPrice,
					app_time: res.results[1].currentVersionReleaseDate,
					app_author: c.name,
					app_weibo: c.weibo,
					app_level: res.results[1].averageUserRating
				}
				
				arr.push(obj)
				arr.sort((a, b) => {
					let dateA = new Date(a.app_time)
					let dateB = new Date(b.app_time)
					return dateB - dateA
				})

				$("app").data = arr.map((i) => {

					if(i.app_level ==="undefined"){
						i.app_level="3"
					}

					return {
						app_logo: {
							src: i.app_logo
						},
						jr_title: {
							text: i.app_title ,
							url: i.app_url
						},
						jr_author: {
							text: i.app_price+ "★" + i.app_level + "星级"
						},
						weibo: {
							title: "  " + i.app_author,
							url: i.app_weibo
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
	}
}


function getNewVersion() {
	$ui.loading(true)
	$http.get({
		url: "http://blog.extrastu.xin/jsbox/independent.js?v="+Math.floor(Math.random() * 10),
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
								let updatedUrl = "jsbox://install?url=${encodeURI('http://blog.extrastu.xin/jsbox/independent.js?v=456')}"
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