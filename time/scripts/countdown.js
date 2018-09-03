const dw = $device.info.screen.width
const dh = $device.info.screen.height

const bodyView={
	type:"view",
	props:{
		title:"创建倒计日",
	    bgcolor: $color("#fefefe"),
	    navButtons:[{
	      title:"关闭",
	      icon: "015",
	      handler:()=>{
	        $("add").remove()
	      }
	    }]
	},
	views:[
		{
			type: "input",
			props: {
			  id:"startInput",
			  placeholder: "倒计日名称"
			},
			layout: (make,view)=> {
			  make.height.equalTo(60)
			  make.width.equalTo(dw-20)
			  make.centerX.equalTo(view.super)
			},
			events: {
			  returned: (sender)=> {
			   
			  }
			}	
		},
		{
			type: "label",
			props: {
			  id:"startTitle",
			  text: "起始日期",
			  align: $align.left,
			  bgcolor:$color("#f1f1f1"),
			  color:$color("gray"),
			  smoothRadius:5,
			},
			layout: (make,view)=> {
			  make.top.equalTo($("startInput").bottom).offset(10)
			  make.height.equalTo($("startInput"))
			  make.width.equalTo(dw-20)
			  make.centerX.equalTo(view.super)
			},
			events: {
			  	tapped:(sender)=>{
			  		$pick.date({
		                handler: (date) =>{
		                  $ui.toast(date)
		                  $("startTitle").text = date
		                }
	              	})
			  	}
			}
		},
		{
			type: "label",
			props: {
			  id:"endTitle",
			  text: "目标日期",
			  align: $align.left,
			  bgcolor:$color("#f1f1f1"),
			  color:$color("gray"),
			  smoothRadius:5,
			},
			layout: (make,view)=> {
			  make.top.equalTo($("startTitle").bottom).offset(10)
			  make.height.equalTo($("startTitle"))
			  make.width.equalTo(dw-20)
			  make.centerX.equalTo(view.super)
			},
			events: {
			  	tapped:(sender)=>{
			  		$pick.date({
		                handler: (date)=> {
		                  $ui.toast(date)
		                  $("endTitle").text = date
		                }
	              	})
			  	}
			}
		},
		{
			type: "input",
			props: {
			  id:"mask",
			  placeholder: "备注",
			   smoothRadius:5,
			},
			layout: (make,view)=> {
			  make.top.equalTo($("endTitle").bottom).offset(10)
			  make.height.equalTo($("startTitle"))
			  make.width.equalTo(dw-20)
			  make.centerX.equalTo(view.super)
			},
			events: {
			  returned: (sender)=> {
			   
			  }
			}	
		},
		{
			type: "scroll",
			props: {
			  id: "color_scroll",
			  bgcolor: $color("#F9F9F9"),
			   smoothRadius:5,
			},
			layout: (make,view)=>{
			  make.top.equalTo($("mask").bottom).offset(10)
			  make.height.equalTo($("startTitle"))
			  make.width.equalTo(dw-20)
			  make.centerX.equalTo(view.super)

			},
			views:[
				{
					type:"view",
					props:{
						id:"colorList"
					},
					views:[
						{
							type: "scroll",
							props: {
							  id: "rank_scroll",
							  alpha: 1,
							  contentOffset: $point(30, 0),
							  showsHorizontalIndicator: false,
							  alwaysBounceVertical: false,
							  pagingEnabled: true,
							  contentSize: $size(dw * 10, 0)
							},
							layout: function(make, view) {
							  make.left.equalTo(view.super)
							  make.size.equalTo($size(dw, 245))
							  make.top.equalTo(view.prev)
							},
							views:[
								{
								  type: "view",
								  props: {
								    id: "rank_view",
								  },
								  layout: function(make, view) {
								    make.top.equalTo(view.super)
								    make.left.equalTo(view.super).offset(-20)
								    make.size.equalTo($size(25, 25))
								  },
								  views: [{
								    type: "view",
								    layout: function(make, view) {
								      make.top.equalTo(view.super)
								      make.left.equalTo(view.super)
								    }
								  }]
								}
							]
						}
					]
				}

			]
			
		}
	]
}

function add_rank_views(data) {
  //自动push排行的views
  for (let j = 0; j < data.length; j++) {
    const rank_num = j + 1
    const viewplate_rank = {
      type: "view",
      props: {
        id: "rank_views_" + j,
        alpha: 0,
        bgcolor: $color("#f1f1f1")
      },
      views: [
      {
        type: "label",
        props: {
          color: $color("white"),
          align: $align.center,
          font: $font("AvenirNext-HeavyItalic", 50),
          bgcolor:$color(data[j])
        },
        layout: function(make, view) {
          make.centerX.equalTo(view.super)
          make.top.equalTo(view.super).offset(10)
          make.size.equalTo($size(25, 25))
        }
      }, 
      
      ],
      layout: function(make, view) {
        make.left.equalTo(view.prev.right).offset(40)
        make.centerY.equalTo(view.super).offset(-5)
        make.size.equalTo($size(dw - 40, 220))
      },
      events: {
        tapped: function(sender) {
          $device.taptic(0)
        }
      }
    }
    //逐个添加动画
    $("rank_view").add(viewplate_rank)
    $ui.animate({
      duration: 0.375,
      animation: function() {
        $("rank_views_" + j).alpha = 1
      },
      delay: j * 0.075
    })
  }
  //重新设置显示区域
  $("rank_scroll").contentSize = $size(data.length * dw, 0)
  $("rank_view").updateLayout(function(make) {
    make.size.equalTo($size(data.length * dw, 25))
  })
}

const arr=["#9E2DA4", "#FE2E01", "#FE8209", "#164781", "#FF9999", "#FF9900", "#FF9D1D", "#0069D2", "#00A81B", "#A80001", "#00888C", "#89A800", "#5700A8", "#004C00", "#38004C", "#5E468C", "#35A8AE", "#E76466"]

function renderUI(){
	$ui.push(bodyView)
	add_rank_views(arr)
}
module.exports = {
  add: renderUI
}