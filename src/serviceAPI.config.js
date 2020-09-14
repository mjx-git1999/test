const BASEURL = "https://www.easy-mock.com/mock/5f5b5ebd3d434143058794e4/vuepro1/"
const LOCALURL = "http://localhost:3000/"
const URL={
    getShoppingMallInfo:BASEURL+'index',//商城首页
    getGoodsInfo:BASEURL+'getGoodsInfo',
    registerUser : LOCALURL+'user/register', //用户注册接口
    login : LOCALURL+'user/login', //用户注册接口
    //获取商品详情
    getDetailGoodsInfo : LOCALURL +'goods/getDetailGoodsInfo',
    getCateGoryList : LOCALURL +'goods/getCateGoryList',//得到大类信息
    getCateGorySubList : LOCALURL +'goods/getCategorySubList',//得到小类信息
    getGoodsListByCategorySubID:LOCALURL+'goods/getGoodsListByCategorySubID',//得到小类商品信息
}

module.exports = URL;