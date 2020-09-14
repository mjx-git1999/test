<template>
    <div>
      <div class="search-bar">
         <van-row>
           <van-col span="3">
               <img :src="locationIcon" width="80%" class="location-icon"/>
            </van-col>
           <van-col span="16">
               <input type="text" class="search-input"/>
           </van-col>
           <van-col span="5">
             <van-button size="mini">查找</van-button>
           </van-col>
           </van-row>
        </div>  
        <!--swiper area-->
        <div  class="swiper-area">
            <van-swipe :autoplay="1000">
                <van-swipe-item v-for="(banner,index) in bannerPicArray" :key="index">
                  <img v-lazy="banner.image" width="100%"/>
                </van-swipe-item>
             </van-swipe>   
        </div>  
        <!--type bar-->
        <div class="type-bar">
          <div v-for="(cate,index) in category" :key="index">
            <img v-lazy="cate.image" width="90%">
            <span>{{cate.mallCategoryName}}</span>
          </div>
         </div>   

         <!--adbanner-->
           <div> 
              <img v-lazy="adBanner" width="100%">
            </div>
          <!--recommend goods area-->
        <div class="recommend-area">
            <div class="recommend-title"> 
               商品推荐
            </div>
            <div class="recommend-body"> 
                <swiper :options="swiperOption">
                    <swiper-slide v-for="(item,index) in recommendGoods" :key="index">
                        <div class="recommend-item">
                            <img :src="item.image" width="80%">
                            <div>{{item.goodsName}}</div>
                            <div>{{item.price|moneyFilter}}(￥{{item.mallPrice|moneyFilter}})</div>
                         </div>   
                    </swiper-slide>
                </swiper>
            </div>
        </div>
        <!--楼层-->
    <!-- <div class="floor"> 
            <div class="recommend-title">
                每日好货
             </div>   
             
        <div class="floor-anomaly">

            <div class="floor-one">
               <img :src="floor1_0.image" width="100%">
            </div>
            <div>
                <div class="floor-two">
                    <img :src="floor1_1.image" width="100%">
                </div>  
                <div >
                    <img :src="floor1_2.image" width="100%">
                </div>    
            </div>
        </div>  
        <div class="floor-rule">
           <div v-for="(item,index) in floor1.slice(3)" :key="index">
               <img :src="item.image" width="100%">
           </div>

        </div>  
    </div>  -->
    <floor-component :floorData="floor1" :floortitle="floorName.floor1"> </floor-component>
    <floor-component :floorData="floor2" :floortitle="floorName.floor2"> </floor-component>
    <floor-component :floorData="floor3" :floortitle="floorName.floor3"> </floor-component>
    
    <!--Hot Area-->
  <div class="hot-area">
    <div class="hot-title">热卖商品</div>
    <div class="hot-goods">
      <!--van-list-->
      <van-list>
          <van-row gutter="20">
              <van-col span="12" v-for="(item,index) in hotGoods" :key="index">
                <goods-info :goodsId="item.goodsId" :goodsImage="item.image" :goodsName="item.name" :goodsPrice="item.price">
                 </goods-info>   
               </van-col>   
          </van-row>    
      </van-list>    
    </div>
  </div>
 
    </div>
</template>

<script>
   import axios from 'axios'
   import 'swiper/dist/css/swiper.css'
   import {swiper,swiperSlide} from 'vue-awesome-swiper'
   import floorComponent from '../component/floorComponent'
   import {toMoney} from '@/filter/moneyFilter.js'
   import goodsInfo from '../component/goodsInfoComponent'
   import url from '@/serviceAPI.config.js'
    export default {
        data(){
            return{
                swiperOption:{
                    slidesPerView:3
                },
                msg:'Shopping Mall',
                locationIcon: require('../../assets/images/location.png'),
                // bannerPicArray:[
                //     //'http://imgb11.photophoto.cn/20170729/taobaolingshilunbotu-27497440_3.jpg'
                //     {imageUrl:require('../../assets/images/banner1.jpg')},
                //     {imageUrl:require('../../assets/images/banner2.jpg')},
                //     {imageUrl:require('../../assets/images/banner3.jpg')},
                // ],
                bannerPicArray:[],
                category:[],
                adBanner:'',
                recommendGoods:[],
                floor1:[],
                floor2:[],
                floor3:[],
                // floor1_0:{},
                // floor1_1:{},
                // floor1_2:{},
                floorName:{},
                hotGoods:[],//热卖商品
            }
        },
        filters:{
            moneyFilter(money){
                return toMoney(money)
            }
        },
        components:{swiper,swiperSlide,floorComponent,goodsInfo},
        created(){
            axios({
                //url:'https://www.easy-mock.com/mock/5f5b5ebd3d434143058794e4/vuepro1/index',
                url:url.getShoppingMallInfo,
                method:'get',
            })
            //请求获得后
            .then(response =>{
                console.log(response)
                if(response.status == 200){
                    this.category=response.data.data.category;
                    this.adBanner=response.data.data.advertesPicture.PICTURE_ADDRESS;
                    this.bannerPicArray=response.data.data.slides;
                    this.recommendGoods=response.data.data.recommend;
                    this.floor1=response.data.data.floor1;
                    // this.floor1_0=this.floor1[0];
                    // this.floor1_1=this.floor1[1];
                    // this.floor1_2=this.floor1[2];
                    this.floorName=response.data.data.floorName;
                    this.floor2=response.data.data.floor2;
                    this.floor3=response.data.data.floor3;
                    this.hotGoods=response.data.data.hotGoods;
                    

                }
            })
            .catch(error =>{
                console.log(error);
            })
        }
    }
</script>

<style  scoped>
   .search-bar{
       height:2.2rem;
       background-color:#e5017d;
       line-height:2.2rem;
       overflow:hidden;
   }
   .search-input{
       width:100%;
       height:1.3rem;
       border-top:0px;
       border-left:0px;
       border-right:0px;      
       border-bottom:1px solid #fff !important;
       background-color:#e5017d;
       color:#fff;
   }
   .location-icon{
     
      padding-left:.2rem;
   }
   .swiper-area{
       clear:both;
       max-height:15rem;
       overflow:hidden;
   }
   .type-bar{
       background-color:#fff;
       margin:0 .3rem .3rem .3rem;
       border-radius: .3rem;
       font-size:14px;
       display:flex;
       flex-direction:row;
       flex-wrap:nowrap;
   }
   .type-bar div{
       padding:.3rem;
       font-size:12px;
       text-align:center;
       flex:1;
       
   }
   .recommend-area{
       background-color:#fff;
       margin-top:.3rem;

   }
   .recommend-title{
       border-bottom:1px solid #eee;
       font-size:14px;
       padding:.2rem;
       color:#e5017d;
   }
   .recommend-body{
       border-bottom:1px solid #eee;

   }
   .recommend-item{
       width:99%;
       border-right:1px solid #eee;
       font-size:12px;
       text-align:center;
   }
   .hot-area{
      text-align: center;
      font-size:14px;
      height: 1.8rem;
      line-height:1.8rem;
     }
    .hot-goods{
        height:130rem;
        overflow:hidden;
        background-color:#fff;
    }
</style>