const wd = $device.info.screen.width
const wh = $device.info.screen.height
const appID = '17805ef4205f7051084afdf56296a3811b0d98deb7cf68688554bc54562cf222' 
const config = require("scripts/config")
const info = require("scripts/info")
let photos = []
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
            fetchData(page,'https://api.unsplash.com/search/collections?query='+sender.text)
          } else {
            sender.text = "输入图片/作者/类名进行搜索"
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
    layout: function(make, view) {
      make.center.equalTo(view.super)
    }
  },
  {
      type: "scroll",
      props: {
        id: "scr",
        alpha: 1
      },
      layout: function(make, view) {
        make.top.equalTo($("searchInput").bottom).inset(20)
        make.left.right.bottom.inset(0)
      },
      views: [{
        type: "view",
        props: {
          id: "result",
        },
        layout: function(make, view) {
          make.top.equalTo(view.super)
          make.centerX.equalTo(view.super)
          make.size.equalTo(view.super)
        },
        views: [{
          type: "view",
          layout: function(make, view) {
            make.top.equalTo(view.super)
          }
        }]
      }],
      events:{
        didEndDecelerating: function(sender) {
         
           $ui.toast("请求数据中...") 
           $device.taptic(1) 
           page++; 
           fetchData(page,'https://api.unsplash.com/search/collections?query='+searchTxt)
        }
      }
    }
  
  ]
}



function addviews(data) {
  js = data
  var arr = []
  for (let i = 0; i < js.length; i++) {
    var viewplate = {
      type: "view",
      props: {
        id: "search" + i,
        alpha: 0,
        bgcolor: $color("white"),
        smoothRadius:10,
      },
      views: [{
        type: "image",
        props: {
          bgcolor: $color("clear"),
          src:js[i].cover_photo.urls.regular
        },
        layout: function(make, view) {
          make.top.equalTo($("searchInput").bottom)
          make.bottom.inset(0)
          make.left.right.inset(0)
        }
      }],
      layout: function(make, view) {
        make.top.equalTo(view.prev.bottom).offset(20)
        make.centerX.equalTo(view.super)
        make.size.equalTo($size(wd - 30, 300))
      },
      events: {
        tapped: (sender)=> {
          $device.taptic(0)
          console.log(i)
          $ui.push({ 
            props: { 
              title: "image" 
            }, 
            views: [{ 
              type: "image", 
              props: { 
                id:"img",
                src:js[i].cover_photo.urls.regular,
                smoothRadius:10,
              }, 
              layout: (make,view)=>{
                make.width.equalTo(wd-10)
                make.height.equalTo(wh-150)
                make.centerX.equalTo(view.super)
              },
              
            },
            {
             type:"label",
             props:{
               text:"下载",
               align: $align.center,
               bgcolor:$color("#222"),
               smoothRadius:10,
               color:$color("#fff")

             },
             layout:(make,view)=>{
                 make.height.equalTo(50)
                 make.width.equalTo(wd-10)
                 make.centerX.equalTo(view.super)
                 make.bottom.equalTo(0
                   )
             },
              events: { 
                tapped: (sender)=> { 
                  $http.download({ 
                    url: js[i].cover_photo.urls.regular, 
                    handler: function(resp) { 
                      $share.universal(resp.data) 
                      $app.tips("下载完成")
                    } 
                  }) 
                } 
              }
            }
            ] 
          }) 
        }
      }
    }

    $("result").add(viewplate)
    $ui.animate({
      duration: 0.375,
      animation: function() {
        $("search" + i).alpha = 1
      },
      delay: i * 0.075
    })
  }
  const h = js.length * 320 + 20
  $("scr").contentSize = $size(0, h)
  $("result").updateLayout(function(make) {
    make.size.equalTo($size(wd, h))
  })
}




function fetchData(page,reqUrl){ 
  
  let url =reqUrl+"&client_id="+appID+"&page="+page
  $ui.loading(true) 
  $http.get({ 
    url:url, 
    handler: (resp)=> { 
      $ui.loading(false) 
      console.log(resp.data)
      photos = photos.concat(resp.data.results)
      _render(photos) 
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
   addviews(data)
   // info.getView(data)
  }
}


module.exports = {
  page: searchPage
 
}