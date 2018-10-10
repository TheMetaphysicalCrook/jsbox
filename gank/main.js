 const wid = $device.info.screen.width
 const hig = $device.info.screen.height
 const config = require("scripts/config")
 const CatsViews = require('scripts/CatsViews/UIViews');
 const index = require('scripts/index')
 const about = require('scripts/about')
 const search = require('scripts/search')
 const featured = require('scripts/featured')
 const items = [index, featured, search, about]
 const pages = ["index", "featured", "search", "about"]
 const icons = ["67", "067", "023", "109"]
 const vcolor = "#222"
 const file = $file.read("Setting.conf")
 const DEFAULT_ = ["0", "0", "0", "#007AFF"]
 const SETTING_ = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_)) : JSON.parse(file.string)
 const layouts = (make, view) => {
   make.center.equalTo(view.super)
   make.height.equalTo(30)
   make.left.right.inset(0)
 }


 function renderBody() {
   $ui.render({
     props: {
       id: "main",
       title: "gank"
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
         //  views: [{
         //    type: "label",
         //    props: {
         //      id: "loading",
         //      text: "gank",
         //      font: $font("ChalkboardSE-Light", 30),
         //      color: $color("#222"),
         //      align: $align.center
         //    },
         //    layout: $layout.center
         //  }]
         views: [CatsViews.rainbowText("rainbowText", "gank", layouts)]
       },
       //主背景
       {
         type: "view",
         props: {
           id: "main_view_bg",
           alpha: 0,
           bgcolor: $color("#F9F9F9")
         },
         layout: function (make, view) {
           make.top.inset(SETTING_[0] === "0" ? ($device.isIphoneX === true ? 40 : 20) : ($device.isIphoneX === true ? 75 : 65))
           make.left.right.bottom.inset(0)
         },
         views: []
       },


       {
         type: "menu",
         props: {
           id: "menu",
           alpha: 0,
           borderWidth: 0.5,
           borderColor: $color("#D3D3D3")
         },
         layout: function (make, view) {
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
             layout: function (make, view) {
               make.top.equalTo(view.super).offset(5)
               make.centerX.equalTo(view.super).offset(-wid / 8 * 3)
               make.size.equalTo($size(wid / 4, 50))
             },
             views: [{
                 type: "image",
                 props: {
                   id: "btn0",
                   icon: $icon("057", $color(vcolor), $size(20, 20)),
                   bgcolor: $color("clear")
                 },
                 layout: function (make, view) {
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
                 layout: function (make, view) {
                   var prev = view.prev
                   make.top.equalTo(prev.bottom).offset(3)
                   make.centerX.equalTo(prev)
                 }
               }
             ],
             events: {
               tapped: function () {
                 activemenu("index")
                 index.renderView()
               }

             }
           },
           {
             type: "button",
             props: {
               bgcolor: $color("clear")
             },
             layout: function (make, view) {
               make.top.equalTo(view.super).offset(5)
               make.centerX.equalTo(view.super).offset(-wid / 8 * 1)
               make.size.equalTo($size(wid / 4, 50))
             },
             views: [{
                 type: "image",
                 props: {
                   id: "btn1",
                   icon: $icon("067", $color("lightGray"), $size(20, 20)),
                   bgcolor: $color("clear")
                 },
                 layout: function (make, view) {
                   make.top.equalTo(view.super).offset(3)
                   make.centerX.equalTo(view.super)
                 }
               },
               {
                 type: "label",
                 props: {
                   id: "lab1",
                   text: "闲读",
                   font: $font("bold", 12),
                   color: $color("lightGray")
                 },
                 layout: function (make, view) {
                   var prev = view.prev
                   make.top.equalTo(prev.bottom).offset(3)
                   make.centerX.equalTo(prev)
                 }
               }
             ],
             events: {
               tapped: function () {
                 activemenu("featured")
                 featured.renderView()
               }
             }
           },
           {
             type: "button",
             props: {
               bgcolor: $color("clear")
             },
             layout: function (make, view) {
               make.top.equalTo(view.super).offset(5)
               make.centerX.equalTo(view.super).offset(wid / 8 * 1)
               make.size.equalTo($size(wid / 4, 50))
             },
             views: [{
                 type: "image",
                 props: {
                   id: "btn2",
                   icon: $icon("023", $color("lightGray"), $size(20, 20)),
                   bgcolor: $color("clear")
                 },
                 layout: function (make, view) {
                   make.top.equalTo(view.super).offset(3)
                   make.centerX.equalTo(view.super)
                 }
               },
               {
                 type: "label",
                 props: {
                   id: "lab2",
                   text: "搜索",
                   font: $font("bold", 12),
                   color: $color("lightGray")
                 },
                 layout: function (make, view) {
                   var prev = view.prev
                   make.top.equalTo(prev.bottom).offset(3)
                   make.centerX.equalTo(prev)
                 }
               }
             ],
             events: {
               tapped: function () {
                 activemenu("search")
               }
             }
           },
           {
             type: "button",
             props: {
               bgcolor: $color("clear")
             },
             layout: function (make, view) {
               make.top.equalTo(view.super).offset(5)
               make.centerX.equalTo(view.super).offset(wid / 8 * 3)
               make.size.equalTo($size(wid / 4, 50))
             },
             views: [{
                 type: "image",
                 props: {
                   id: "btn3",
                   icon: $icon("109", $color("lightGray"), $size(20, 20)),
                   bgcolor: $color("clear")
                 },
                 layout: function (make, view) {
                   make.top.equalTo(view.super).offset(3)
                   make.centerX.equalTo(view.super)
                 }
               },
               {
                 type: "label",
                 props: {
                   id: "lab3",
                   text: "设置",
                   font: $font("bold", 12),
                   color: $color("lightGray")
                 },
                 layout: function (make, view) {
                   var prev = view.prev
                   make.top.equalTo(prev.bottom).offset(3)
                   make.centerX.equalTo(prev)
                 }
               }
             ],
             events: {
               tapped: function () {
                 activemenu("about")
               }
             }
           }
         ]
       },
     ]
   })

   add_main_bg()

   config.getNetworkType()

   index.renderView()
 }

 function addAll() {
   const all_title = {
     type: "label",
     props: {
       id: "all_title",
       text: "全部",
       font: $font("bold", 30)
     },
     layout: function (make, view) {
       make.top.equalTo(view.prev.bottom).offset(5)
       make.left.offset(15)
     }
   }
   $("main_view_bg").add(all_title)
 }

 function add_main_bg() {

   for (let i = 0; i < 4; i++) {
     var bg = {
       type: "view",
       props: {
         id: "bg" + i,
         hidden: true
       },
       layout: function (make, view) {
         make.top.left.right.inset(0)
         make.bottom.inset($device.isIphoneX === true ? 80 : 50)
       },
       views: [items[i].page]
     }
     $("main_view_bg").add(bg)
   }
   $("bg0").hidden = false
 }

 function activemenu(page) {
   //页面切换
   $device.taptic(0)
   for (let i = 0; i < pages.length; i++) {
     if (page == pages[i]) {
       var idx = i
     }
     $("btn" + i).icon = $icon(icons[i], $color("lightGray"), $size(20, 20))
     $("bg" + i).hidden = true
   }
   $("btn" + idx).icon = $icon(icons[idx], $color(vcolor), $size(20, 20))
   $("lab" + idx).textColor = $color(vcolor)
   $("bg" + idx).hidden = false

 }





 renderBody()

 $delay(1, () => {
   $ui.animate({
     duration: .4,
     animation: () => {
       //  $("loading").alpha = 0
       $("menu").alpha = 1
       $("main_view_bg").alpha = 1
     }
   });
 })