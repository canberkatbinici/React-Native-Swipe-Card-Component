import React, { Component } from 'react'
import { View, Animated, PanResponder, Dimensions, LayoutAnimation, UIManager } from 'react-native'

const SCREEN_WIDTH = Dimensions.get('window').width
const SWIPE_TRASHOLD = SCREEN_WIDTH * 0.25
const SWIPE_OUT_DURATION  = 250;

class Deck extends Component {
    static defaultProps = {
        onSwipeRight : () => {},
        onSwipeLeft : () => {},
        renderNoMoreCards: () => {},
    }
  constructor(props) { 
    super(props)
    this.renderCards = this.renderCards.bind(this)
    this.getCardsStyle = this.getCardsStyle.bind(this)

    const position = new Animated.ValueXY(0, 0)
    const panResponder = PanResponder.create({
      onStartShouldSetPanResponder: () => true,
      onPanResponderMove: (event, gesture) => {
        position.setValue({ x: gesture.dx, y: gesture.dy })
      },
      onPanResponderRelease: (event, gesture) => {
        if (gesture.dx > SWIPE_TRASHOLD) {
          this.forceSwipe('right')
        } else if (gesture.dx < -SWIPE_TRASHOLD) {
            this.forceSwipe('left')
        } else {
          this.resetPosition()
        }
      },
    })
    this.state = {
      panResponder,
      position,
      index: 0
    }
  }
  static getDerivedStateFromProps(nextProps, prevState) {
    if (nextProps.data && nextProps.data !== prevState.data) {
      return ({ data: nextProps.data,
                index: 0 }) 
    }
    return null
  }
  shouldComponentUpdate(){
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true)
      LayoutAnimation.spring();
      return true;
  }
  forceSwipe(direction) {
      const x = direction == 'right' ? SCREEN_WIDTH : -SCREEN_WIDTH
      Animated.timing(this.state.position, {
          toValue : { x: x, y:0},
          duration: SWIPE_OUT_DURATION
      }).start(() => this.onSwipeComplate())
  }
  onSwipeComplate(direction){
      const {onSwipeRight, onSwipeLeft, data} = this.props
      const item = data[this.state.index]
      direction === 'right' ? onSwipeRight() : onSwipeLeft()
      this.state.position.setValue({x:0, y:0})
      this.setState({index: this.state.index + 1 })
  }
  resetPosition() {
    Animated.spring(this.state.position, {
      toValue: { x: 0, y: 0 },
    }).start()
  }
  getCardsStyle() {
    const { position } = this.state
    const rotate = position.x.interpolate({
      inputRange: [-1.5 * SCREEN_WIDTH, 0, 1.5 * SCREEN_WIDTH],
      outputRange: ['-120deg', '0deg', '120deg'],
    })
    return {
      ...position.getLayout(),
      transform: [{ rotate: rotate }],
    }
  }

  renderCards() {
        const {renderNoMoreCards, data, renderCard} = this.props
      if(this.state.index >= data.length) return renderNoMoreCards()

    return data.map((item, index) => {
        if(index < this.state.index) return null; 
      if (index === this.state.index) {
        return (
          <Animated.View {...this.state.panResponder.panHandlers} style={[this.getCardsStyle(),styles.cardStyle]} key={item.id}>
            {renderCard(item)}
          </Animated.View>
        )
      }
      return (<Animated.View key={item.id} style={[styles.cardStyle,{top: 10 * (index-this.state.index)}]}>{renderCard(item)}</Animated.View>)
    }).reverse()
  }
  //   pan = new Animated.ValueXY();

  render() {
    return (
      <Animated.View>
        {this.renderCards()}
      </Animated.View>
    )
  }
}
const styles = {
    cardStyle:{
        position: "absolute",
        width: SCREEN_WIDTH,
        zIndex: 1
    }
}
export default Deck
