const dw = $device.info.screen.width
const dh = $device.info.screen.height
const countDown = require('scripts/countdown')
const addView ={
	type:"view",
	props: {
      title: "创建",
      id:"add",
      bgcolor: $color("#f1f1f1"),
      navButtons:[{
 	      title:"关闭",
 	      icon: "015",
 	      handler:()=>{
 	        $("add").remove()
 	      }
 	    }]
    },
	layout:$layout.fill,
	views:[
		{
			type: "view",
	        props: {
	          id:"addStart",
	          align: $align.center,
	          font: $font("AvenirNext-HeavyItalic", 20),
	          bgcolor:$color("#ee4d5c"),
	          shadowColor:$color("#222"),
	          color: $color("#fff"),
	          radius:10
	        },
	        layout: (make, view) =>{
	          make.centerX.equalTo(view.super)
	          make.height.equalTo(100)
	          make.width.equalTo(dw-10)
	          make.top.equalTo(dh-550)
	        },
	        events:{
	        	 tapped: (sender)=>{
        	 	    $device.taptic(0)
	        	 	countDown.add()
	        	 }
	        },
	        views:[
	        	{
	        		type:"label",
	        		props:{
	        			id:"title",
	        			text:"创建|倒计日",
	        			font: $font("bold", 18),
	        			align:$align.center,
	        			color:$color("#fff")
	        		},
	        		layout: (make,view)=>{
	        			make.left.equalTo(view.super).offset(20)
	        			make.centerY.equalTo(view.super)
	        		}
	        	},
	        	{
	        		type:"label",
	        		props:{
	        			text:"目标日期:今日或未来日",
	        			font: $font("bold", 12),
	        			align:$align.center,
	        			color:$color("#f4949d")
	        		},
	        		layout: (make,view)=>{
	        			make.left.equalTo(view.super).offset(20)
	        			make.top.equalTo($("title").bottom).offset(5)
	        			
	        		}
	        	},
	        	{
			        type: "image",
			        props: {
			          bgcolor: $color("#fff"),
			          icon: $icon("104")
			        },
			        layout: (make, view) => {
			          make.right.equalTo(10)
			          make.size.equalTo($size(5, 5))
			        }
		        }

	        ]
		},
		{
			type: "view",
	        props: {
	          id:"addEnd",
	          align: $align.center,
	          font: $font("AvenirNext-HeavyItalic", 20),
	          bgcolor:$color("#1769fe"),
	          shadowColor:$color("#222"),
	          radius:10
	        },
	        layout: (make, view) =>{
	          make.centerX.equalTo(view.super)
	          make.height.equalTo(100)
	          make.width.equalTo(dw-10)
	          make.top.equalTo($("addStart").bottom).offset(10)
	        },
	        events:{
	        	 tapped: (sender)=>{
        	 	    $device.taptic(0)
	        	 	addEnd()
	        	 }
	        },
	        views:[
	        	{
	        		type:"label",
	        		props:{
	        			id:"title",
	        			text:"创建|累计日",
	        			font: $font("bold", 18),
	        			align:$align.center,
	        			color:$color("#fff")
	        		},
	        		layout: (make,view)=>{
	        			make.left.equalTo(view.super).offset(20)
	        			make.centerY.equalTo(view.super)
	        		}
	        	},
	        	{
	        		type:"label",
	        		props:{
	        			text:"目标日期:历史日或今日",
	        			font: $font("bold", 12),
	        			align:$align.center,
	        			color:$color("#5893fe")
	        		},
	        		layout: (make,view)=>{
	        			make.left.equalTo(view.super).offset(20)
	        			make.top.equalTo($("title").bottom).offset(5)
	        			
	        		}
	        	},
	        	{
			        type: "image",
			        props: {
			          bgcolor: $color("#fff"),
			          icon: $icon("104")
			        },
			        layout: (make, view) => {
			          make.right.equalTo(10)
			          make.size.equalTo($size(5, 5))
			        }
		        }

	        ]
		}
	]
}




function renderAdd(){
	$ui.push(addView)
}
module.exports = {
  add: renderAdd
}