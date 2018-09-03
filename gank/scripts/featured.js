const wd = $device.info.screen.width
const wh = $device.info.screen.height
const config = require("scripts/config")
const info = require("scripts/info")
let dataArr = []
let page = 1
const featuredPage = {
   type: "view",
   props: {
     bgcolor: $color("white"),
   },
   layout: $layout.fill,
   views:[{
      type: "label",
      props: {
        text: "闲读",
        font: $font("bold", 30)
      },
      layout: function(make, view) {
        make.top.offset(15)
        make.left.offset(15)
      }
   },{
    type: "list",
    props: {
        bgcolor: $color("#fefefe"),
        textColor: $color("#abb2bf"),
        align: $align.center,
        font: $font(32)
    },
    layout: (make, view) =>{
        make.centerX.equalTo(view.super)
        make.top.equalTo(view.prev.bottom).offset(20)
        make.size.equalTo($size(wd,wh))
    },
    events:{
      didSelect: (sender, indexPath, data) =>{
          $device.taptic(0)
          info.getView(data)
      }
    }
   }]
}



function renderUi(){
  dataArr=[]
  config.$post("categories",(data)=>{
   
    _render(data.results)
  })
}

function _render (data){
  if(data ==""){
    $ui.toast("暂未匹配到结果")
    return false
  }else{
    $("list").data= data.map((item)=>{
      return item.name+">"+item.en_name
    })
    
  }
}



module.exports = {
  page: featuredPage,
  renderView:renderUi
}