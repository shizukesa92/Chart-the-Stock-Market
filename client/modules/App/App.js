import React, {
	Component
} from 'react'
import {
	connect
} from 'react-redux'
import io from 'socket.io-client';
const URL = process.env.HEROKU || 'http://127.0.0.1:3000';
const socket = io(URL);

import {
	sendData,
	storeData,
	init,
	deleteStock,
	deleteLocalStock
} from '../Chart/ChartActions'

import Chart from '../Chart/Chart'

class Main extends Component {
	constructor() {
		super()
		this.sendData = this.sendData.bind(this)
		socket.on('sendData', (data) => {

			this.props.storeData(data)
		})
		socket.on('deleteStock', (symbol) => {
			const payload = this.props.symbols.filter((data) => {
				return data !== symbol
			})

			const series = this.props.config.series.filter((data) => {
				return data.symbol !== symbol
			})
			console.log(series)
			const data = {
				series: series,
				payload: payload
			}
			this.props.deleteLocalStock(data)
		})



		this.deleteStock = this.deleteStock.bind(this)

	}

	componentWillMount() {
		this.props.init()
	}



	render() {
		return (
			<Chart  
               symbols={this.props.symbols}
              exists={this.props.exists}
               config = {this.props.config}
               sendData = {this.sendData}
               deleteStock = {this.deleteStock}
                />
		)
	}

	//functions

	sendData() {

		const symbol = document.getElementById('symbol').value
		this.props.sendData({
			'symbol': symbol
		})

	}
	deleteStock(symbol) {


		this.props.deleteStock(symbol)

	}



}

const mapStateToProps = (state) => {
	return {
		exists: state.chart.exists,
		config: state.chart.config,
		symbols: state.chart.symbols

	}
}
const mapDispatchToProps = (dispatch) => {
	return {
		sendData: (symbol) => {
			dispatch(sendData(symbol))
		},
		storeData: (data) => {
			dispatch(storeData(data))
		},
		init: () => {
			dispatch(init())
		},
		deleteStock: (symbol, payload) => {
			dispatch(deleteStock(symbol, payload))
		},
		deleteLocalStock: (payload) => {
			dispatch(deleteLocalStock(payload))
		}
	}
}

export default connect(mapStateToProps, mapDispatchToProps)(Main)
