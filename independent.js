const __version = "1.1v"
getNewVersion()
const dw = $device.info.screen.width
const dh = $device.info.screen.height
let authors =[]

$ui.render({
	props:{
		title:"中国独立开发者图鉴",
	},
	layout: $layout.fill,
	views:[{
            type: "view",
            props: {
                bgcolor: $color("#fff")
            },
            layout: (make, view) => {
                make.height.equalTo(view.super);
                make.width.equalTo(view.super);
            },
            views: [{
                type: "label",
                props: {
                    id:"loading",
                    text: "独立",
                    font: $font("ChalkboardSE-Light", 30),
                    color: $color("#222"),
                    align: $align.center
                },
                layout: $layout.center
            }]
        },{
	    type: "matrix",
	    props: {
	     	 id:"app",
	         bgcolor: $color("#e9ecef"),
	         align: $align.center,
	         columns: 1,
	         itemHeight: 180,
	         spacing: 10,
	         alpha:0,
	         template:[
	         	{
	              type: "view",
	              props: {
	                bgcolor: $color("#222"),
	                smoothRadius:10,
	              },
	              layout: $layout.fill
	            },
	         	{
			        type: "image",
			        props: {
			          id:"app_logo",
			          bgcolor: $color("clear"),
			        },
			        layout: (make, view)=> {
			          make.left.equalTo(view.super).offset(10)
			          make.size.equalTo($size(50, 50))
			          make.top.equalTo(27)
			        }
		        }, 
		        {
			        type: "label",
			        props: {
			          id:"jr_title",
			          font: $font("bold", 18),
			          color: $color("#fff")
			        },
			        layout: (make, view)=> {
			          make.left.equalTo(view.prev.right).offset(20)
			          make.top.equalTo(view.super).offset(27)
			          make.width.equalTo(dw - 115)
			        }
		        }, 
		      	{
			        type: "label",
			        props: {
			          id:"jr_author",
			          font: $font(15),
			          textColor: $color("#fff"),
			          lines:0
			        },
			        layout: (make, view)=> {
			          make.left.equalTo(view.prev)
			          make.top.equalTo(view.prev.bottom).offset(5)
			          make.height.equalTo(60)
			          make.width.equalTo(dw - 115)
			        }
		        },
		        {
			        type: "button",
			        props: {
			          id:"weibo",
			          font: $font(16),
			          titleColor: $color("#fff"),
			          lines:0,
			          icon:$icon("071",$color("#fff")),
			          bgcolor:$color("#17a2b8"),
			          alpha:1
			        },
			        layout: (make, view)=> {
			          make.left.equalTo(view.super).offset(10)
			          make.top.equalTo(view.prev.bottom).offset(10)
			          make.size.equalTo($size(dw-40, 50))
			        },
			        events:{
			        	tapped: (sender)=> {
  							console.log(sender)
  						}
			        }
		        }
		        
	        ]
		},
	    layout:$layout.fill,
	    events:{
	       didSelect: (sender, indexPath, data) =>{

	           $device.taptic(0)
	            
	             $ui.alert({
				  title: "在App Store中打开",
				  message: data.jr_title.text,
				  actions: [
				    {
				      title: "打开",
				      handler: function() {
				      	 $safari.open({
			                url: data.jr_title.url,
			                entersReader: false
			              })	
				      }
				    },
				    {
				      title: "取消",
				      handler: function() {

				      }
				    }
				  ]
				})
	       },
	       didLongPress: function(sender, indexPath, data) {
	       		console.log(data.weibo.url)
	       		$device.taptic(0)
	            
	             $ui.alert({
				  title: "打开",
				  message: data.weibo.title+"微博",
				  actions: [
				    {
				      title: "打开",
				      handler: function() {
				      	 $safari.open({
			                url: data.weibo.url
			              })	
				      }
				    },
				    {
				      title: "取消",
				      handler: function() {

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
  handler: function(resp) {
    let data = resp.data
    let index = data.indexOf("=")
    authors =JSON.parse(data.substring(index+1,data.length))
    get_app(authors)
  }
})

function get_app(authors){
  let arr=[]
  for(let c of authors){
  	$http.get({
	  url: "https://itunes.apple.com/lookup?id=" + c.artistId + "&entity=software&lang=zh-CN&country=CN",
	  handler: function(resp) {
	    let res = resp.data
	    let obj ={}
	    if(res.results[1].averageUserRating || res.results[1].artworkUrl100=="undefined"){
	    	obj={
		    	app_logo:res.results[1].artworkUrl100,
	    		app_title:res.results[1].trackName,
	    		app_url:res.results[1].trackViewUrl ,
	    		app_description:res.results[1].description,
	    		app_time:res.results[1].currentVersionReleaseDate,
	    		app_author:c.name,
	    		app_weibo:c.weibo,
	    		app_level:res.results[1].averageUserRating
	    	}
	    }
	    // console.log(new Date(obj.app_time))
        arr.push(obj)
        arr.sort((a, b)=>{
        	let dateA = new Date(a.app_time)
            let dateB = new Date(b.app_time)
            return dateB-dateA
        })
		
	    $("app").data = arr.map((i)=>{

	    		return {

	    			app_logo:{
		    			src:i.app_logo
		    		},
		    		jr_title:{
		    			text:i.app_title+"★"+i.app_level+"星级",
		    			url:i.app_url 
		    		},
		    		jr_author:{
		    			text:i.app_description
		    		},
		    		weibo:{
		    			title:"  "+i.app_author,
		    			url:i.app_weibo
		    		}
		    	}
	    })
	    $ui.animate({
		      duration: 0.375,
		      animation: function() {
		        $("loading").alpha =0
		        $("app").alpha =1
		      }
	    })
	  }
	})
  }
}


function getNewVersion() {
	 $ui.loading(true)
    $http.get({
        url: "http://blog.extrastu.xin/jsbox/independent.js?v=123",
        handler: function (resp) {
            let data = resp.data
            let versionItem = new RegExp('const __version = "(.*?)v"', "g")
            let version = versionItem.exec(data)[1]
            if (version > __version) {
                $ui.alert({
                    title: "检测到新版本",
                    message: "是否现在更新到最新版本",
                    actions: [
                        {
                            title: "更新",
                            handler:  () =>{
                            	let updatedUrl = "jsbox://install?url=${encodeURI('http://blog.extrastu.xin/jsbox/independent.js?v=123')}"
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