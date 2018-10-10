const config = require("scripts/config")
const CatsViews = require('scripts/CatsViews/UIViews');
const wd = $device.info.screen.width
const wh = $device.info.screen.height
let statusRect = $objc("UIApplication").$sharedApplication().$statusBarFrame();

let dataArr = [],
	menuArr = [],
	resArr = [],
	listArr = []
let h = 1250

function resView(res, data) {
	console.log(data)
	$ui.toast(res)
	$ui.push({
		props: {
			title: res
		},
		views: [{
				type: "view",
				props: {
					id: "mainView",
					bgcolor: $color("#fff")
				},
				layout: (make, view) => {
					make.height.equalTo(view.super);
					make.width.equalTo(view.super);
				},
				views: [CatsViews.rainbowText("rainbowText", "gank", config.layouts)],

			},
			{
				type: "menu",
				props: {
					index: 0,
					items: data,
					alpha: 0,
					id: "menu_view"
				},
				layout: (make, view) => {
					make.bottom.equalTo(view.super);
					make.height.equalTo(44)
					make.width.equalTo(view.super);
				},
				events: {
					changed: (sender) => {
						$device.taptic(0)
						let items = sender.items
						let index = sender.index
						remove_all_views()

						getNews(items[index])
						$delay(3.0, function () {
							CatsViews.addLoading($("mainView"), 80)

						});
					}
				}
			}, {
				type: "scroll",
				props: {
					id: "home_scroll"
				},
				views: [{
					type: "view",
					props: {
						id: "news_view",
					},
					views: [{
						type: "view",
						layout: function (make, view) {
							make.top.equalTo(view.super)
						}
					}],
					layout: (make, view) => {
						make.top.equalTo(view.super)
						make.centerX.equalTo(view.super)
						make.size.equalTo(view.super)
					}
				}],
				layout: (make, view) => {
					make.height.equalTo(view.super).offset(-statusRect.height - 44);
					make.width.equalTo(view.super)
					make.top.equalTo(view.super).offset(statusRect.height)
				}
			}
		],
		layout: (make, view) => {
			make.center.equalTo(view.super)
			make.size.equalTo(view.super)
		}
	})
	getNews(data[0])
}

function add_news_view(data) {

	let js = data
	console.log(js)
	for (let i = 0; i < js.length; i++) {
		const viewplate = {
			type: "view",
			props: {
				id: "all_views_" + i,
				alpha: 0,
				bgcolor: $color("tint"),
				smoothRadius: 10
			},
			views: [{
					type: "image",
					props: {
						bgcolor: $color("clear"),
						src: js[i].site.icon
					},
					layout: (make, view) => {
						make.left.equalTo(view.super).offset(10)
						make.centerY.equalTo(view.super)
						make.size.equalTo($size(50, 50))
					}
				},
				{
					type: "label",
					props: {
						text: js[i].title,
						font: $font("bold", 18),
						color: $color("#fff")
					},
					layout: (make, view) => {
						make.left.equalTo(view.prev.right).offset(20)
						make.top.equalTo(view.super).offset(27)
						make.width.equalTo(wd - 115)
					}
				},
				{
					type: "label",
					props: {
						text: js[i].site.name + " • " + js[i].site.desc,
						font: $font(15),
						textColor: $color("#fff")
					},
					layout: (make, view) => {
						make.left.equalTo(view.prev)
						make.top.equalTo(view.prev.bottom).offset(5)
						make.width.equalTo(wd - 115)
					}
				}
			],
			layout: (make, view) => {
				make.top.equalTo(view.prev.bottom).offset(20)
				make.centerX.equalTo(view.super)
				make.size.equalTo($size(wd - 30, 100))
			},
			events: {
				tapped: (sender) => {
					$device.taptic(1)
					console.log(js[i])
					$safari.open({
						url: js[i].url
					})
				}
			}
		}


		$("news_view").add(viewplate)
		$ui.animate({
			duration: 0.375,
			animation: function () {
				$("all_views_" + i).alpha = 1
				$("all_title").alpha = 1
				$("menu_view").alpha = 1
				// $("loading").alpha = 0
			},
			delay: i * 0.075
		})
	}


	$("home_scroll").contentSize = $size(wd, h)
	$("news_view").updateLayout(function (make) {
		make.size.equalTo($size(wd, h))
	})

}


function getNews(type) {
	$ui.loading(true)
	console.log(type)
	const all_title = {
		type: "label",
		props: {
			id: "all_title",
			text: type,
			font: $font("bold", 30),
			alpha: 0
		},
		layout: function (make, view) {
			make.top.equalTo(view.prev.bottom).offset(5)
			make.left.offset(15)
		}
	}
	$("news_view").add(all_title)
	let arr = []
	config.$get("data/id/" + type + "/count/10/page/1", (res) => {
		$ui.loading(false)
		add_news_view(arr.concat(res.results))
	})
}

function remove_all_views() {
	const t = $("news_view").views.length - 2
	console.log(t)
	for (let i = 0; i < t; i++) {
		$("all_views_" + i).remove()
	}

	$("all_title").remove()
}

function fetchNews(data) {
	let strIndex = data.indexOf(">")
	let type = data.substring(strIndex + 1)
	let title = data.substring(0, strIndex)
	menuArr = []
	config.$get("category/" + type, (res) => {
		dataArr = dataArr.concat(res.results)
		for (const value of res.results) {
			menuArr.push(value.id)
		}
		resView(title, menuArr)
	})




}

module.exports = {
	getView: fetchNews
}