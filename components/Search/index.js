import React, { Component } from 'react'
import { StyleSheet } from 'react-native'
import { Icon, Item, Input, View } from 'native-base'
import { connect } from 'react-redux'

import { Colors, Ranges } from '../../constants'
import { getStock, setSymbol, showAutoSuggest } from '../../store/actions/'

class Search extends Component {
  state = { hideAutoSuggest: false }

  onChangeText = symbol => {
    this.props.setSymbol(symbol)
    this.props.showAutoSuggest(true)
  }

  onSubmitEditing = () => {
    if (this.props.symbol) {
      this.props.getStock(this.props.symbol, Ranges.ONE_MONTH)
      this.props.showAutoSuggest(false)
    }
  }

  componentDidMount = () => setTimeout(() => this.input._root.focus(), 150)

  componentDidUpdate = () => {
    if (this.props.stock.error) {
      this.input._root.focus()
    }
    if (!this.props.symbol) {
      this.props.showAutoSuggest(false)
    }
  }

  render = () => (
    <View style={styles.container}>
      <Item searchBar style={styles.input}>
        <Icon name="ios-search" style={styles.icon} />
        <Input
          autoCapitalize="characters"
          autoCorrect={false}
          clearButtonMode="always"
          keyboardAppearance="dark"
          onChangeText={symbol => this.onChangeText(symbol)}
          onSubmitEditing={this.onSubmitEditing}
          placeholder="Search by stock symbol"
          ref={ref => (this.input = ref)}
          returnKeyType="search"
          spellCheck={false}
          value={this.props.symbol}
        />
      </Item>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    zIndex: 1
  },
  input: {
    backgroundColor: Colors.BLUE2,
    paddingLeft: 20,
    marginLeft: 0
  },
  icon: {
    color: Colors.TEXT_NORMAL
  }
})

const mapStateToProps = state => ({
  stock: state.stock,
  symbol: state.symbol
})

const mapDispatchToProps = {
  getStock,
  setSymbol,
  showAutoSuggest
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search)
