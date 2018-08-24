$ui.render({
  props: {
    title: "逗比拯救世界--专业的表情包搜索网站"
  },
  views: [
    {
      type: "button",
      props: {
        title: "搜索"
      },
      layout: function(make) {
        make.right.top.inset(10)
        make.size.equalTo($size(64, 32))
      },
      events: {
        tapped: function(sender) {
          search()
        }
      }
    },
    {
      type: "input",
      props: {
        placeholder: "输入关键字"
      },
      layout: function(make) {
        make.top.left.inset(10)
        make.right.equalTo($("button").left).offset(-10)
        make.height.equalTo($("button"))
      },
      events: {
        returned: function(sender) {
          search()
        }
      }
    },
    
    {
      type: "matrix",
      props: {
        columns: 3,
        itemHeight: 150,
        spacing: 10,
        template: [
          {
            type: "image",
            props: {
              id: "image",
            },
            layout: $layout.fill
          }
        ]
      },
      layout: function(make) {
        make.left.bottom.right.equalTo(0)
        make.top.equalTo($("input").bottom).offset(10)
      },
      events: {
        didSelect: function(sender, indexPath, object) {
          $http.download({
            url: object.image.src,
            handler: function(resp) {
              $share.universal(resp.data)
            }
          })
        }
      }
    }
  ]
})

function search() {
  var keyword = $("input").text
  $("input").blur()
  var url = "http://www.bee-ji.com:9000/search/json?w=" + encodeURIComponent(keyword)
  $ui.loading(true)
  $http.get({
    url:url,
    handler: function(resp) {
      var data = resp.data
      console.log(data)
      $ui.loading(false)
      render(data)
    }
  })
}

function render(data) {
  $("matrix").data = data.map(function(item) {
      item = "http://image.bee-ji.com/" + item.id
      console.log(item)
      return { image: { src: item } }
  })
}

//随机表情

let set = new Set();
while(set.size<20){
    set.add( {"id":Math.random().toString().slice(-5)});
}
let arr = Array.from(set);
render(arr)
$("input").focus()

