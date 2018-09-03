const wd = $device.info.screen.width
const wh = $device.info.screen.height

const config = require("scripts/config")
const info = require("scripts/info")
let photos = []
let arr =[]
let page = 1
let searchTxt = ""
const searchPage = {
    type: "view",
    props: {
      bgcolor: $color("white"),
    },
    layout: $layout.fill,
    views: [
    {
        type: "label",
        props: {
          text: "搜索",
          font: $font("bold", 30)
        },
        layout: function(make, view) {
          make.top.offset(15)
          make.left.offset(15)
        }
      },
    {
      type: "input",
      props: {
        id:"searchInput",
        type:$kbType.search,
        placeholder: "搜索",
        radius: 10
      },
      layout: (make, view) =>{
        make.centerX.equalTo(view.super)
        make.top.equalTo(view.prev.bottom).offset(20)
        make.size.equalTo($size(wd - 30, 40))
      },
      events: {
        didBeginEditing:(sender)=>{
           $("no_result").alpha = 0
        },
        returned(sender) {
          sender.blur()
          if (sender.text) {
            searchTxt = sender.text
            $device.taptic(0);
            $ui.toast("正在为你查找中...")
            fetchData(sender.text)
          } else {
            sender.text = "输入关键词进行搜索"
          }
        }
      }
    }, 
    {
    type: "label",
    props: {
      id: "no_result",
      text: "无结果",
      font: $font(30),
      alpha: 0
    },
    layout: (make, view) =>{
      make.center.equalTo(view.super)
    }
  },
  {
      type: "scroll",
      props: {
        id: "scr",
        alpha: 1
      },
      layout: (make, view)=> {
        make.top.equalTo($("searchInput").bottom).inset(20)
        make.left.right.bottom.inset(0)
      },
      views: [{
        type: "view",
        props: {
          id: "result",
        },
        layout: (make, view)=> {
          make.top.equalTo(view.super)
          make.centerX.equalTo(view.super)
          make.size.equalTo(view.super)
        },
        views: [{
       type: "matrix",
       props: {
         id:"search_list",
           bgcolor: $color("#fff"),
           align: $align.center,
           columns: 1,
           itemHeight: 100,
           spacing: 10,
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
              bgcolor: $color("clear"),
              icon:$icon("053")
            },
            layout: (make, view)=> {
              make.left.equalTo(view.super).offset(10)
              make.centerY.equalTo(view.super)
              make.size.equalTo($size(50, 50))
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
              make.width.equalTo(wd - 115)
            }
          }, 
          {
            type: "label",
            props: {
              id:"jr_author",
              font: $font(15),
              textColor: $color("#fff")
            },
            layout: (make, view)=> {
              make.left.equalTo(view.prev)
              make.top.equalTo(view.prev.bottom).offset(5)
              make.width.equalTo(wd - 115)
            }
          }]
       },
       layout: (make, view) =>{
           make.centerX.equalTo(view.super)
           // make.top.equalTo(view.prev.bottom).offset(20)
           make.width.equalTo(wd)
           make.height.equalTo(440)
       },
       events:{
         didSelect: (sender, indexPath, data) =>{
             $device.taptic(0)
               $safari.open({
                  url: data.jr_title.url,
                  entersReader: false
                  
               })
         }
       }
    }]
      }],
      events:{
        didEndDecelerating: (sender) =>{
           $ui.toast("请求数据中...") 
           $device.taptic(1) 
           page++; 
           let url ="http://gank.io/api/search/query/"+searchTxt+"/category/Android/count/10/page/"+page 
            $ui.loading(true) 
            $http.get({ 
              url:url, 
              handler: (resp)=> { 
                $ui.loading(false) 
                console.log(resp.data)
                _render(resp.data.results) 
              } 
            }) 
        }
      },

    }
  
  ]
}






function fetchData(type){ 
  
  let url ="http://gank.io/api/search/query/"+type+"/category/Android/count/10/page/1" 
  $ui.loading(true) 
  $http.get({ 
    url:url, 
    handler: (resp)=> { 
      $ui.loading(false) 
      _render(resp.data.results) 
    } 
  }) 
 
}
function _render (data){
  if(data ==""){
    $ui.toast("暂未匹配到结果")
    $("no_result").alpha = 1
    return false
  }else{
   console.log(data)
   arr = arr.concat(data)
    $("search_list").data= arr.map((i)=>{
      return {
        jr_title:{
          text:i.desc,
          url:i.url
        },
        jr_author:{
          text:i.who+" • "+i.type
        }
      }
    })
  }
}


module.exports = {
  page: searchPage
 
}