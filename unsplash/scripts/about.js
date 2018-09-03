 const wid = $device.info.screen.width
 const hig = $device.info.screen.height

 const version = 1.0
 const vcolor = $cache.get("vcolor")
 const disp_num = 3 
 const file = $file.read("Setting.conf")
 const DEFAULT_ = ["0", "0", "0", "#007AFF"]
 const SETTING_ = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_)) : JSON.parse(file.string)
 const vh = (SETTING_[2] === "1" ? (SETTING_[3] === "1" ? disp_num + 1 : disp_num + 2) : disp_num) * 42

 const thanks = {
  type: "view",
  layout: $layout.fill,
  views: [{
    type: "markdown",
    props: {
      id: "md",
      content: ""
    },
    layout: $layout.fill
  }]
}
 const aboutPage = {
  type: "scroll",
  layout: $layout.fill,
  props: {
    id: "settview",
    bgcolor: $color("#F9F9F9")
  },
  views: [{
      type: "label",
      props: {
        text: "设置",
        font: $font("bold", 30)
      },
      layout: function(make, view) {
        make.top.offset(15)
        make.left.offset(15)
      }
    },
    {
      type: "list",
      props: {
        id: "setting_list",
        scrollEnabled: false,
        font: $font(14),
        color: $color("gray"),
        data: [{
          title: "缓存",
          rows: ["清理网络缓存", "清理全部缓存"]
        }, {
          title: "关于",
          rows: ["关于",  "打赏支持", "领支付宝红包", "联系反馈", "关注extrastu"]
        },
         {
          title: "备份",
          rows: ["iCloud备份"]
        },
        {
          title: "其他作品",
          rows: ["unsplash","beeji-app"]
        },
         {
          title: "更新",
          rows: ["更新记录"]
        }],
        footer: {
          type: "label",
          props: {
            text: "本项目由extrastu开发，extrastu维护。\n 如果你喜欢,可以请我喝杯咖啡",
            lines: 3,
            textColor: $color("#AAAAAA"),
            align: $align.center,
            font: $font(12)
          }
        }
      },
      events: {
        didSelect: function(sender, indexPath, data) {
          about(data)
        }
      },
      layout: function(make, view) {
        make.top.equalTo(view.prev.bottom)
        make.size.equalTo($size(wid, hig+100))
      }
    }
  ]
}



function about(data) {
  switch (data) {
    case "关于":
      {
        $safari.open({ url: "https://blog.extrastu.xin/index.php/about.html" })
      }
      break
      case "unsplash":
      {
        $safari.open({ url: "https://xteko.com/redir?name=unsplash&url=http%3A%2F%2Fpduwrj0ot.bkt.clouddn.com%2Funsplash.js%3Fv1.6&icon=icon_051.png&types=15&version=1.6&author=extrastu&website=https%3A%2F%2Fblog.extrastu.xin" })
      }
      break
       case "beeji-app":
      {
        $safari.open({ url: "https://xteko.com/redir?name=beeji-app&url=http%3A%2F%2Fpduwrj0ot.bkt.clouddn.com%2Fbeeji-app.js&icon=icon_068.png&types=15&version=1.2&author=extrastu&website=https%3A%2F%2Fblog.extrastu.xin" })
      }
      break
    case "清理网络缓存":
      {
        clear_webcache()
      }
      break
    case "清理全部缓存":
      {
        clear_webcache()
        $cache.clear()
        $cache.set("time", 240)
      }
      break
    case "感谢名单":
      {
        $ui.push(thanks)
        $http.get({
          url: "",
          handler: function(resp) {
            var data = resp.data
            $("md").content = data
          }
        })
      }
      break
    case "打赏支持":
      {
        $ui.menu({
          items:["越花越有礼❤","请我喝杯咖啡❤"],
          handler:(title,idx)=>{
            switch(idx){
              case 0:
               $clipboard.text ='小伙伴们，给大家发红包喽！领完上App Store绑定支付宝就能用。6zKICt25e8 用完还能赢4999元购物津贴！#吱口令#长按复制此消息，打开支付宝就能领取！';
                $ui.alert({
                      title:"支持",
                      message:"apple store红包已复制到剪切板\n打开支付宝即可使用\n\n感谢您的支持❤"
                    })
               break;
              case 1:
                $app.openURL("https://www.buymeacoffee.com/extra")
                break;
            }
          }
        })
      }
      
      break
    case "领支付宝红包":
      {
        $clipboard.text ='小伙伴们，给大家发红包喽！领完上App Store绑定支付宝就能用。6zKICt25e8 用完还能赢4999元购物津贴！#吱口令#长按复制此消息，打开支付宝就能领取！';
        $ui.alert({
          title:"支持",
          message:"apple store红包已复制到剪切板\n打开支付宝即可使用\n\n感谢您的支持❤"
        })
      }
      break
    case "联系反馈":
      {
        $ui.menu({
          items: ["邮件"],
          handler: function(title, idx) {
            switch (idx) {
              case 0:
                {
                  $message.mail({
                    subject: "timebox反馈信息",
                    to: ["extrastu888@gmail.com"],
                    cc: [],
                    bcc: [],
                    body: "",
                    handler: function(result) {}
                  })
                }
                break
            }
          }
        })

      }
      break
    case "关注extrastu":
      {
        $safari.open({ url: "https://blog.extrastu.xin" })
      }
      break
    case "更新记录":
      {
        $safari.open({ url: "https://blog.extrastu.xin/index.php/archives/652.html" })
      }
      break
  }
}

function clear_webcache() {
  var date = $objc('NSDate').invoke('dateWithTimeIntervalSince1970', 0)
  $objc('NSURLCache').invoke('sharedURLCache').invoke('removeCachedResponsesSinceDate', date)

  var types = $objc('NSMutableSet').invoke('set')

  types.invoke('addObject', 'WKWebsiteDataTypeDiskCache')
  types.invoke('addObject', 'WKWebsiteDataTypeMemoryCache')
  types.invoke('addObject', 'WKWebsiteDataTypeOfflineWebApplicationCache')

  var handler = $block("void, void", function() {
    $ui.toast("缓存已清理！")
  })

  $objc('WKWebsiteDataStore').invoke('defaultDataStore').invoke('removeDataOfTypes:modifiedSince:completionHandler:', types, date, handler)
}

module.exports = {
  page: aboutPage,
}