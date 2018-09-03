const perPage=12
const wd = $device.info.screen.width
const wh = $device.info.screen.height
const url = "http://gank.io/api/xiandu/"
const sizes = [$size(550, 850),$size(1000, 665), $size(1024, 689),$size(640, 427),]
// 自定义判断元素类型JS
function toType(obj) {
  return ({}).toString.call(obj).match(/\s([a-zA-Z]+)/)[1].toLowerCase()
}
// 参数过滤函数
function filterNull(o) {
  for (var key in o) {
    if (o[key] === null) {
      delete o[key];
    }
    if (toType(o[key]) === "string") {
      o[key] = o[key].trim();
    } else if (toType(o[key]) === "object") {
      o[key] = filterNull(o[key]);
    } else if (toType(o[key]) === "array") {
      o[key] = filterNull(o[key]);
    }
  }
  return o;
}
function _post(type,callBack) {
	$ui.loading(true) 
	$http.post({ 
	  url:url+type, 
	  handler: (resp)=> { 
	    $ui.loading(false) 
      if (resp.data.error === false) {
          callBack(resp.data);
      } else {
        if (failure) {
          failure(resp.data);
        } else {
          $ui.toast("error: " + JSON.stringify(res.data));
        }
      }
	  } 
	}) 
}
function _get(type,callBack) {
  $ui.loading(true) 
  $http.post({ 
    url:url+type, 
    handler: (resp)=> { 
      $ui.loading(false) 
      if (resp.data.error === false) {
          callBack(resp.data);
      } else {
          $ui.toast("error: " + JSON.stringify(resp.data));
      }
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



module.exports = {
  $post: _post,
  $get: _get,
  size:sizes,
  getNetworkType:_fetchNetworkType,
}