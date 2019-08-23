import Taro, { Component } from '@tarojs/taro'
import { View, Text,Button,Picker,Input,Image} from '@tarojs/components'
import './index.scss'
import {AtNavBar,AtTabs, AtTabsPane,AtIcon,AtList,AtListItem,AtBadge,AtFloatLayout,AtActionSheet, AtActionSheetItem } from "taro-ui"
import foodlist from "../../components/foodlist/foodlist"
import getNextPreDate from "../../util/getdate"

const date=getNextPreDate(new Date())
const foodlists=foodlist

const tabList = [{ title: '早餐' }, { title: '中餐' }, { title: '晚餐' }]

export default class Index extends Component {

  config = {
    navigationBarTitleText: '首页'
  }
  constructor (props) {
    super(props)
    this.state = {
      current: 0,
      data:date,
      nochangedate:new Date().toLocaleDateString(),
      foodforlist:foodlists,//菜品列表
      isdiaplaymealfood:false,//控制是否显示饱餐导航
      foodcount:0,//总数量
      totalmoney:0.0,//总价钱
      floatisOpened:false//悬窗是否显示
    }
  }

  componentWillMount () { 
     
  }

  componentDidMount () { }

  componentWillUnmount () { }

  componentDidShow () { }

  componentDidHide () { }

  changeTab (value) {
    this.setState({
      current: value
    })
  }

  onDateChange = e => {
    this.setState({
      data: getNextPreDate(this.onchangedateformat(e.detail.value,"down")),
      nochangedate:e.detail.value
    },()=>{})
  }

  // 需要先转换为Wed Jul 05 2017 13:50:11 GMT+0800 (中国标准时间)这种型式
  onchangedateformat=(date,type)=>{
   
    if(type=="add")
    {
      let Arr = date.split("/");
      let now = new Date(Number(Arr['0']), (Number(Arr['1']) - 1), Number(Arr['2']));
      now.setDate(now.getDate() + 1)
      return now;
    }
    if(type=="jian")
    {
      let Arr = date.split("/");
      let now = new Date(Number(Arr['0']), (Number(Arr['1']) - 1), Number(Arr['2']));
      now.setDate(now.getDate() - 1)
      return now;
    }
    if(type=="down"){
      let Arr = date.split("-");
      let now = new Date(Number(Arr['0']), (Number(Arr['1']) - 1), Number(Arr['2']));
      return now;
    }
  }

  //前一天
  onNextDay(date){
    let data=getNextPreDate(this.onchangedateformat(date,"add"));
    this.setState({
      data:data,
      nochangedate:(this.onchangedateformat(date,"add")).toLocaleDateString()
    },()=>{})
  }

  //后一天
  onPrevDay(date){
    let data=getNextPreDate(this.onchangedateformat(date,"jian"));
    this.setState({
      data:data,
      nochangedate:(this.onchangedateformat(date,"jian")).toLocaleDateString()
    },()=>{})
  }
  //加
  onAdd=(e)=>{
    
    var index = e.target.dataset.index;//获取索引
    var foodforlist = this.state.foodforlist;//获取菜品列表信息
    var count = foodforlist[index].count;//获取当前索引的count值
    
    foodforlist[index].count++  //点击加按钮数量加一个
    foodforlist[index].Isdisplay=true;//设置数量和减按钮是否显示

    //计算总数量和总价钱


    this.setState({
      Isbtnjian:true,
      IsCount:true,
      foodforlist:foodforlist,
      isdiaplaymealfood:true,
      
    },()=>{})
       

      let price=parseFloat(foodlists[e.currentTarget.dataset.index].price.replace("￥","")); 
      
      this.oncalculateTotal(1,price,"add")
  }
//减
  onMinus=(e)=>{
    var index = e.target.dataset.index;
    var foodforlist = this.state.foodforlist;
    var count = foodforlist[index].count;
    foodforlist[index].count--
    var countnow= count-1;
    
    if(countnow<1)
    {
      foodforlist[index].Isdisplay=false;
      this.setState({
        Isbtnjian:false,
        IsCount:false,
        foodforlist:foodforlist,
     },()=>{})
    }
    else{
      this.setState({
        Isbtnjian:true,
        IsCount:true,
        foodforlist:foodforlist
     },()=>{})
    }
       let price=parseFloat(foodlists[e.currentTarget.dataset.index].price.replace("￥","")); 
       
       this.oncalculateTotal(1,price,"minus")

  }

  //计算总价钱和总个数
  oncalculateTotal=(count,price,type)=>{
       
    if(type=="add")
    {
      let moenyindex=String(price*count);
       
      this.setState({
        foodcount:this.state.foodcount+count,
        totalmoney:this.state.totalmoney+parseFloat(moenyindex)
      },()=>{})
    }
    else{
      let moenyindex=String(price*count);
      this.setState({
        foodcount:this.state.foodcount-count,
        totalmoney:this.state.totalmoney-parseFloat(moenyindex)
      },()=>{
        if(this.state.foodcount<1){
          this.setState({
            isdiaplaymealfood:false
        },()=>{})
        }
      })
    }
  }
//点击显示悬窗
  ondisplayfloatview=()=>{
    this.setState({
      floatisOpened:true
    },()=>{})
  }
 //取消悬窗
 oncancelfloatview=()=>{
  this.setState({
    floatisOpened:false
  },()=>{})
 }

  render () {
    return (
      <View className='containerview'>

          <View className="topnav">
            <View className="content">
                <AtNavBar color='#fff' leftIconType='chevron-left' title="报餐" customStyle="background-color:#fb5554;height:81px;" fixed={false} />
            </View>
          </View>
              
          <View className="daychange-view">
            <View className="daychange-view-content">
                <View className="prevday-view" >
                  <View className="pre-btn" onClick={this.onPrevDay.bind(this,this.state.nochangedate)}>前一天</View>
                </View>
                        
                <View className="dayviews">
                    <Picker mode="date" onChange={this.onDateChange} >
                            <View className='picker'>
                              <View className='calendariconview' >
                                <AtIcon value="calendar" size="20" color="#fff"></AtIcon>
                              </View>
                              <View className="datedisplayview">
                                <Input placeholder={this.state.data} value={this.state.data}></Input>
                              </View>
                              <View className='chevrondowniconview'>
                                <AtIcon value="chevron-down" size="20" color="#fff"></AtIcon>
                              </View>
                            </View>
                      </Picker>         
                </View>
                <View className="nextday-view">
                  <View className="next-btn"  onClick={this.onNextDay.bind(this,this.state.nochangedate)}>后一天</View>
                </View>
            </View>
          </View>
        
          <View className="tabview">
            <AtTabs current={this.state.current} tabList={tabList} onClick={this.changeTab.bind(this)}   >
                  <AtTabsPane current={this.state.current} index={0} >
                      {
                        this.state.foodforlist.map((food,i)=>
                        <View>
                              <View className="fooddisplayview"  >
                                <View className="image-view">
                                    <Image src={food.image} className="food-img"></Image>
                                </View>
                                <View className="food-description">
                                    <View className="food-name" key={food.id} data-index={i}>
                                    {food.name}
                                    </View>
                                    <View className="food-price" key={food.id} data-index={i}>
                                    {food.price}
                                    </View>
                                </View>
                                <View className="btnview">
                                    <View className="jianview">
                                        <View className={food.Isdisplay==true?"btnjian":"btnjianhidden"}  key={food.id} data-index={i} onClick={this.onMinus}>-</View>
                                    </View>
                                    <View className={food.Isdisplay==true?"countview":"countviewhidden"}>
                                      <Text key={food.id} data-index={i} >{food.count}</Text>
                                    </View>
                                    <View className="addview">
                                        <View className="btnadd" key={food.id} data-index={i} onClick={this.onAdd}>+</View>
                                    </View>
                              </View>
                              </View>
                              <View className="line"/>
                        </View>
                        )}
                  </AtTabsPane>
                  <AtTabsPane current={this.state.current} index={1}>
                    <View style='height:auto;background-color: #FAFBFC;text-align: center;'>标签页二的内容</View>
                  </AtTabsPane>
                  <AtTabsPane current={this.state.current} index={2}>
                    <View style='height:auto;background-color: #FAFBFC;text-align: center;'>标签页三的内容</View>
                  </AtTabsPane>
            </AtTabs>
          </View>

           
           <View className={this.state.isdiaplaymealfood==true?"mealfood-view-bottonnavr":"mealfood-view-bottonnavr-hidden"}>
                 <View className="mealfood-content">
                   <View className="leftcontent-view">
                         <View className="bage-icon">
                         <AtBadge value={this.state.foodcount} maxValue={99}>
                            <Image src="../../asset/image/index.jpg" className="icon-image" onClick={this.ondisplayfloatview}></Image>
                          </AtBadge>
                         </View>
                         <View className="totalmoney-view">
                                 <Text>￥{this.state.totalmoney}</Text>
                         </View>
                   </View>
                     
                   <View className="submitbuyfood-view">
                        报餐
                  </View>
                 </View>
           </View>
           
           {/* <AtActionSheet isOpened={this.state.floatisOpened} onClose={this.oncancelfloatview}>
              <AtActionSheetItem>
                按钮一
              </AtActionSheetItem>
              <AtActionSheetItem>
                按钮二
              </AtActionSheetItem>
            </AtActionSheet> */}
            <AtFloatLayout isOpened={this.state.floatisOpened}  onClose={this.oncancelfloatview} scrollY={true}>
                <View className="float-view-container">
                      <View className="onerow-content">
                           <View className="left-onerow-content">
                              已选菜品
                           </View>
                           <View className="right-onerow-content">
                               <View className="deleiconview">
                                  <AtIcon value="trash" size="20" color="#9f9f9f"></AtIcon>
                               </View>
                               <View className="celarlist-view">
                                   清空
                               </View>
                           </View>
                      </View>
                      <View className="tworow-content">

                      </View>
                </View>
            </AtFloatLayout>
           
      </View>
    )
  }
}
