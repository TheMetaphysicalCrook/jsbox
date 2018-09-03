const wd = $device.info.screen.width
const hg = $device.info.screen.height

$ui.render({
  props: {
    id: "main",
    navBarHidden: true,
    bgcolor: $color("#000"),
    statusBarStyle: 1
  },
  views: [
    //主背景
    {
      type: "view",
      props: {
        id: "main_view_bg",
        alpha: 1,
        bgcolor: $color("#000")
      },
      layout:  (make, view) =>{
        make.height.equalTo(view.super);
        make.width.equalTo(view.super);
      },
      views: []
    },
   
  ]
})