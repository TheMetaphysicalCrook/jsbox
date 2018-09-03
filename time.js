const CN_MENU=['index','about']

const vcolor="#222"
const wid = $device.info.screen.width
const hig = $device.info.screen.height
const pages = ["index", "about"]
const icons = ["125", "109"]
const DEFAULT_ = ["0", "0", "0", "#007AFF"]
const SETTING_ = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_)) : JSON.parse(file.string)

function renderBody(){
	$ui.render({
		props:{
			title:"time",
			navButtons:[{
		      title:"添加",
		      icon: "030",
		      handler:()=>{
		        addView()
		      }
		    }]
		},
		views:[
			{
	            type: "view",
	            props: {
	            	id:"loading",
	                bgcolor: $color("#fff")
	            },
	            layout: (make, view) => {
	                make.height.equalTo(view.super);
	                make.width.equalTo(view.super);
	            },
	            views: [{
	                type: "label",
	                props: {
	                    text: "time",
	                    font: $font("ChalkboardSE-Light", 30),
	                    color: $color("#000"),
	                    align: $align.center
	                },
	                layout: $layout.center
	            }]
        	},
        	{
        	  type: "view",
        	  props: {
        	    id: "main_view_bg",
        	    alpha: 1,
        	    bgcolor: $color("#F9F9F9")
        	  },
        	  layout: function(make, view) {
        	    make.top.inset(SETTING_[0] === "0" ? ($device.isIphoneX === true ? 40 : 20) : ($device.isIphoneX === true ? 75 : 65))
        	    make.left.right.bottom.inset(0)
        	  },
        	  views: []
        	},
        	{
        		type: "scroll",
        		props: {
        		  id: "home_scroll",
        		  bgcolor: $color("#F9F9F9")
        		},
        		layout: $layout.fill,
        		views:[]
        	},
        	{
		      type: "menu",
		      props: {
		        id: "menu",
		        alpha: 0,
		        borderWidth: 0.5,
		        borderColor: $color("#D3D3D3")
		      },
		      layout: function(make, view) {
		        make.left.right.equalTo(0)
		        make.bottom.equalTo(view.super.bottom).offset(2)
		        make.height.equalTo($device.isIphoneX === true ? 82 : 52)
		      },
		      views: [
		        //首页按钮
		        {
		          type: "button",
		          props: {
		            bgcolor: $color("clear")
		          },
		          layout: function(make, view) {
		            make.top.equalTo(view.super).offset(5)
		            make.centerX.equalTo(view.super).offset(-wid /8 * 2)
		            make.size.equalTo($size(wid / 2, 50))
		          },
		          views: [
		          	{
		              type: "image",
		              props: {
		                id: "btn0",
		                icon: $icon("125", $color(vcolor), $size(20, 20)),
		                bgcolor: $color("clear")
		              },
		              layout: function(make, view) {
		                make.top.equalTo(view.super).offset(3)
		                make.centerX.equalTo(view.super)

		              }
		            },
		            {
		              type: "label",
		              props: {
		                id: "lab0",
		                text: "首页",
		                font: $font("bold", 12),
		                color: $color(vcolor)
		              },
		              layout: function(make, view) {
		                var prev = view.prev
		                make.top.equalTo(prev.bottom).offset(3)
		                make.centerX.equalTo(prev)
		              }
		            }
		          ],
		          events: {
		            tapped: function() {
	            	  $device.taptic(1)
		              activemenu("index")
		            }
		            
		          }
		        },
		        {
		          type: "button",
		          props: {
		            bgcolor: $color("clear")
		          },
		          layout: function(make, view) {
		            make.top.equalTo(view.super).offset(5)
		            make.centerX.equalTo(view.super).offset(wid / 8 * 2)
		            make.size.equalTo($size(wid / 2, 50))
		          },
		          views: [{
		              type: "image",
		              props: {
		                id: "btn1",
		                icon: $icon("109", $color("lightGray"), $size(20, 20)),
		                bgcolor: $color("clear")
		              },
		              layout: function(make, view) {
		                make.top.equalTo(view.super).offset(3)
		                make.centerX.equalTo(view.super)
		              }
		            },
		            {
		              type: "label",
		              props: {
		                id: "lab1",
		                text: "关于",
		                font: $font("bold", 12),
		                color: $color("lightGray")
		              },
		              layout: function(make, view) {
		                var prev = view.prev
		                make.top.equalTo(prev.bottom).offset(3)
		                make.centerX.equalTo(prev)
		              }
		            }
		          ],
		          events: {
		            tapped: function() {
		              $device.taptic(1)
		              activemenu("about")
		            }
		          }
		        }
		      ]
		    },
		]
	})
}




function activemenu(page) {
  //页面切换
  $device.taptic(0)
  for (let i = 0; i < pages.length; i++) {
    if (page == pages[i]) {
      var idx = i
    }
    $("btn" + i).icon = $icon(icons[i], $color("lightGray"), $size(20, 20))
  }
  $("btn" + idx).icon = $icon(icons[idx], $color(vcolor), $size(20, 20))
  $("lab" + idx).textColor = $color(vcolor)
  
}
renderBody()
// 延迟动画
$delay(1,()=>{
 	$ui.animate({
	    duration: .4,
	    animation: ()=> {
	    	$("loading").alpha =0
	        $("menu").alpha =1
	    }
	});
})