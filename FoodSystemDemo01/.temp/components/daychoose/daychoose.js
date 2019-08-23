import Nerv from "nervjs";
import Taro, { Component } from "@tarojs/taro-h5";
import { View, Button, Picker } from '@tarojs/components';
import "./daychoose.scss";

export default class DayChoose extends Component {
  config = {};
  constructor(props) {
    super(props);
    this.state = {
      date: new Date()
    };
  }

  componentWillMount() {}

  componentDidMount() {}

  componentWillUnmount() {}

  componentDidShow() {}

  componentDidHide() {}

  render() {
    return <View className="containerdatechoose">
                <View className="prevday-view">
                    <Button className="pre-btn">前一天</Button>
                </View>
                <View className="day-view">
                    <Picker mode="date">
                        <View className="picker">
                          {this.state.date}
                        </View>
                    </Picker>
                </View>
                <View className="nextday-view">
                    <Button className="next-btn">后一天</Button>
                </View>
          </View>;
  }
}