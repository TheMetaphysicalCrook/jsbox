const appID = '17805ef4205f7051084afdf56296a3811b0d98deb7cf68688554bc54562cf222' 
const perPage=12
const wd = $device.info.screen.width
const wh = $device.info.screen.height
const URL = 'https://api.unsplash.com/'
const sizes = [$size(550, 850),$size(1000, 665), $size(1024, 689),$size(640, 427),]

function _get(type,page,callBack) {
	$ui.loading(true) 
	$http.get({ 
	  url:URL+type+"?client_id="+appID+"&per_page="+perPage+"&page="+page, 
	  handler: (resp)=> { 
	    $ui.loading(false) 
	    callBack(resp) 
	  } 
	}) 
}


function _fetchNetworkType(){
  const networkType = $device.networkType
  if(networkType ==0){
    $ui.alert("您当前无网络,请检查后再试")
  }else if(networkType ==1){
    $ui.toast("您正在使用wifi网络")
  }else{
    $ui.toast("您正在使用蜂窝数据网络")
  }
}

function _render (data,id){
  if(data ==""){
    // $ui.alert("暂未匹配到结果")
    return false
  }else{
   $("listView").data = data.map(function(item) { 
        return { image: { src: item.urls.regular } } 
    })
  }
}

module.exports = {
  $get: _get,
  size:sizes,
  getNetworkType:_fetchNetworkType,
  renderUi :_render
}