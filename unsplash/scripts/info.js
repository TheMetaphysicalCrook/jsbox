
const config = require("scripts/config")
function resView(res) {
	$ui.toast(res)
 $ui.push({
 	props: {
        title: res
    },
    views:[
        
    ],
    layout:(make,view)=>{
    	 // make.bottom.top.right.left.equalTo(0)
    	 make.center.equalTo(view.super)
		 make.size.equalTo(view.super)
    }
  })
}

module.exports = {
    getView: resView
}