 const wid = $device.info.screen.width
 const hig = $device.info.screen.height


 const vcolor = $cache.get("vcolor")

 const file = $file.read("Setting.conf")
 const DEFAULT_ = ["0", "0", "0", "#007AFF"]
 const SETTING_ = (typeof file == "undefined") ? JSON.parse(JSON.stringify(DEFAULT_)) : JSON.parse(file.string)

 const indexPage = {
  type: "scroll",
  props: {
    id: "home_scroll",
    bgcolor: $color("#F9F9F9")
  },
  layout: $layout.fill,
  views: [
    //scroll必须嵌套一个view显示，否则会出现bug
    {
    type: "view",
    props: {
      id: "home_view",
    },
    views: [],
    layout: function(make, view) {
      make.top.equalTo(view.super)
      make.centerX.equalTo(view.super)
    }
  }],
  events: {
    pulled: function(sender) {
      //下拉刷新，移除所有views重新添加
      $("home_scroll").endRefreshing()
    }
  }
}



function add_all_views(data) {
  //单独增加“全部”标题
  const all_title = {
    type: "label",
    props: {
      id: "all_title",
      text: "全部",
      font: $font("bold", 30)
    },
    layout: function(make, view) {
      make.top.equalTo(view.prev.bottom).offset(5)
      make.left.offset(15)
    }
  }
  $("home_view").add(all_title)

  //自动push全部脚本的views
  const js = data
  for (let i = 0; i < js.length; i++) {
    const viewplate = {
      type: "view",
      props: {
        id: "all_views_" + i,
        alpha: 0,
        bgcolor: $color("white")
      },
      views: [{
        type: "image",
        props: {
          bgcolor: $color("clear"),
          icon: $icon(js[i].icon, $color(vcolor), $size(25, 25))
        },
        layout: function(make, view) {
          make.left.equalTo(view.super).offset(20)
          make.centerY.equalTo(view.super)
          make.size.equalTo($size(25, 25))
        }
      }, {
        type: "label",
        props: {
          text: js[i].name,
          font: $font("bold", 18),
          color: $color(vcolor)
        },
        layout: function(make, view) {
          make.left.equalTo(view.prev.right).offset(20)
          make.top.equalTo(view.super).offset(27)
        }
      }, {
        type: "label",
        props: {
          text: js[i].author + " • " + js[i].describe,
          font: $font(15),
          textColor: $color("gray")
        },
        layout: function(make, view) {
          make.left.equalTo(view.prev)
          make.top.equalTo(view.prev.bottom).offset(5)
          make.width.equalTo(wid - 115)
        }
      }],
      layout: function(make, view) {
        make.top.equalTo(view.prev.bottom).offset(20)
        make.centerX.equalTo(view.super)
        make.size.equalTo($size(wid - 30, 100))
        detail.shadow(view)
      },
      events: {
        tapped: function(sender) {
          $device.taptic(0)
          $ui.push(detail.push_detail)
          detail.add_detail_bg(js[i].icon)
          detail.add_detailinfo(js[i])
          detail.get_counts_num(js[i].id)
        }
      }
    }

    $("home_view").add(viewplate)
    $ui.animate({
      duration: 0.375,
      animation: function() {
        $("all_views_" + i).alpha = 1
      },
      delay: i * 0.075
    })
  }
  $("home_scroll").contentSize = $size(0, js.length * 120 + 360)
  $("home_view").updateLayout(function(make) {
    make.size.equalTo($size(wid, js.length * 120 + 360))
  })
}


module.exports = {
  page: indexPage,
}