let appID = '17805ef4205f7051084afdf56296a3811b0d98deb7cf68688554bc54562cf222' 
let page=1,perPage=12,photos=[]; 
$ui.render({
  props: {
    title: "unsplash-search"
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
      }
    },
    
    {
      type: "matrix",
      props: {
        columns: 2,
        itemHeight: 250,
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
  console.log(keyword)
  $("input").blur()
  var url = "https://api.unsplash.com/search/collections?query="+keyword+"&client_id="+appID+"&page="+page
  $ui.loading(true)
  $http.get({
    url:url,
    handler: function(resp) {
      $ui.loading(false)
      photos = photos.concat(resp.data)
      render(photos)
    }
  })
}

function render(data) {
  data.map(function(item) {
       $("matrix").data =item.results.map((i)=>{
          console.log(i.cover_photo.urls.regular)
          return { image: { src: i.cover_photo.urls.regular } } 
      })
  })
}

$("input").focus()

