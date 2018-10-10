const wd = $device.info.screen.width
const wh = $device.info.screen.height
const config = require("scripts/config")
let photos = []
let page = 1
const indexPage = {
  type: "matrix",
  props: {
    id: "listView",
    columns: 2,
    spacing: 10,
    selectable: true,
    waterfall: true,
    square: false,
    alpha: 1,
    template: [{
      type: "image",
      props: {
        id: "image",
        smoothRadius: 10,
        info: "unsplash"
      },
      layout: $layout.fill
    }]
  },
  layout: function (make) {
    make.left.bottom.right.equalTo(0)
    make.top.equalTo(0)
  },
  events: {
    itemSize: (sender, indexPath) => {
      return config.size[indexPath.item % 4]
    },
    didSelect: function (sender, indexPath, object) {
      $ui.push({
        props: {
          title: "image"
        },
        views: [{
            type: "image",
            props: {
              id: "img",
              src: object.image.src,
              smoothRadius: 10,
            },
            layout: (make, view) => {
              make.width.equalTo(wd - 10)
              make.height.equalTo(wh - 150)
              make.centerX.equalTo(view.super)
            },

          },
          {
            type: "label",
            props: {
              text: "下载",
              align: $align.center,
              bgcolor: $color("#222"),
              smoothRadius: 10,
              color: $color("#fff")

            },
            layout: (make, view) => {
              make.height.equalTo(50)
              make.width.equalTo(wd - 10)
              make.centerX.equalTo(view.super)
              make.bottom.equalTo(0)
            },
            events: {
              tapped: (sender) => {
                $http.download({
                  url: object.image.src,
                  handler: function (resp) {
                    $share.universal(resp.data)
                    $app.tips("下载完成")
                  }
                })
              }
            }
          }
        ]
      })
    },
    didReachBottom: function (sender) {
      $ui.toast("请求数据中...")
      $device.taptic(1)
      page++;

      config.$get("photos", page, (data) => {
        photos = photos.concat(data.data)
        _render(photos, "listView")
      })

      $delay(1.5, function () {
        sender.endFetchingMore()
      })
    }
  }
}




function renderUi() {
  config.$get("photos", "1", (data) => {
    photos = photos.concat(data.data)
    _render(photos, "listView")
  })
}

function _render(data, id) {
  if (data == "") {
    // $ui.alert("暂未匹配到结果")
    // return false
  } else {
    $("listView").data = data.map(function (item) {
      return {
        image: {
          src: item.urls.regular
        }
      }
    })
  }
}
renderUi()

module.exports = {
  page: indexPage,
  renderView: renderUi
}