const wd = $device.info.screen.width
const wh = $device.info.screen.height
const config = require("scripts/config")

let res = []
let obj = {}
let menu_arr = []
let page = 1
const indexPage = {
  type: "view",
  props: {
    id: "main",
    bgcolor: $color("white"),
  },
  layout: $layout.fill,
  views: [{
      type: "label",
      props: {
        text: "最新",
        id: "new",
        font: $font("bold", 30)
      },
      layout: function (make, view) {
        make.top.offset(15)
        make.left.offset(15)
      }
    },
    {
      type: "menu",
      props: {
        index: 0,
        alpha: 0,
        id: "menu_view"
      },
      layout: (make, view) => {
        make.top.equalTo($("new").bottom).offset(15);
        make.height.equalTo(44)
        make.width.equalTo(view.super);
      },
      events: {
        changed: (sender) => {
          $device.taptic(0)
          let items = sender.items
          let index = sender.index
          _render(items[index])
        }
      }
    }, {
      type: "matrix",
      props: {
        id: "lists",
        bgcolor: $color("#fff"),
        align: $align.center,
        columns: 1,
        itemHeight: 100,
        spacing: 10,
        template: [{
            type: "view",
            props: {
              bgcolor: $color("#222"),
              smoothRadius: 10,
            },
            layout: $layout.fill
          },
          {
            type: "image",
            props: {
              bgcolor: $color("clear"),
              icon: $icon("053")
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
              id: "jr_title",
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
              id: "jr_author",
              font: $font(15),
              textColor: $color("#fff")
            },
            layout: (make, view) => {
              make.left.equalTo(view.prev)
              make.top.equalTo(view.prev.bottom).offset(5)
              make.width.equalTo(wd - 115)
            }
          }
        ]
      },

      layout: (make, view) => {
        make.centerX.equalTo(view.super)
        make.top.equalTo(view.prev.bottom).offset(20)
        make.width.equalTo(wd)
        make.height.equalTo(440)
      },


      events: {
        didSelect: (sender, indexPath, data) => {
          $device.taptic(0)
          $safari.open({
            url: data.jr_title.url,
            entersReader: false

          })
        }
      }
    }
  ]
}




function renderUi() {
  dataArr = []
  $http.post({
    url: "http://gank.io/api/today",
    handler: function (resp) {

      obj = resp.data.results
      menu_arr = resp.data.category
      $("menu_view").items = menu_arr
      $ui.animate({
        duration: 0.375,
        animation: function () {
          $("menu_view").alpha = 1
        },
      })
      _render(menu_arr[0])
    }

  })
}

function _render(data) {
  console.log(data)
  let dataList = []
  if (data == 'Android') {
    dataList = obj.Android
  } else if (data == 'App') {
    dataList = obj.App
  } else if (data == 'iOS') {
    dataList = obj.iOS
  } else if (data == '休息视频') {
    dataList = obj.休息视频
  } else if (data == '前端') {
    dataList = obj.前端
  } else if (data == '拓展资源') {
    dataList = obj.拓展资源
  } else if (data == '福利') {
    dataList = obj.福利
  }
  $("lists").data = dataList.map((i) => {
    return {
      jr_title: {
        text: i.desc,
        url: i.url
      },
      jr_author: {
        text: i.who + " • " + i.type
      }
    }
  })


}
renderUi()

module.exports = {
  page: indexPage,
  renderView: renderUi
}