import React, { useState } from 'react'
import axios from 'axios'

const API_KEY = 'd13fn3hr01qs7glhabugd13fn3hr01qs7glhabv0'

export default function PurchaseStocks() {
  const [searchQuery, setSearchQuery] = useState('')
  const [stockData, setStockData] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [netWorth, setNetWorth] = useState(874782903.54)

  const handleSearch = async () => {
    if (!searchQuery) return
    try {
      const response = await axios.get(
        `https://finnhub.io/api/v1/quote?symbol=${searchQuery.toUpperCase()}&token=${API_KEY}`
      )
      setStockData({ symbol: searchQuery.toUpperCase(), ...response.data })
    } catch (err) {
      console.error('Stock fetch error:', err)
      setStockData(null)
    }
  }

  const handlePurchase = () => {
    if (!stockData || !stockData.c || quantity <= 0) return

    const cost = stockData.c * quantity
    if (cost > netWorth) {
      alert('Not enough funds!')
      return
    }

    setNetWorth(prev => prev - cost)
    alert(`Purchased ${quantity} shares of ${stockData.symbol} for $${cost.toFixed(2)}`)
  }

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-white via-blue-100 to-blue-200 text-gray-800">
      <h1 className="text-3xl font-bold mb-4">Purchase Stocks</h1>
      <p className="mb-6 text-lg font-medium">
        Net Worth: ${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}
      </p>

      <div className="flex gap-3 mb-6">
        <input
          type="text"
          value={searchQuery}
          onChange={e => setSearchQuery(e.target.value)}
          placeholder="Enter stock symbol (e.g., AAPL)"
          className="border px-4 py-2 rounded w-64"
        />
        <button
          onClick={handleSearch}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Search
        </button>
      </div>

      {stockData && stockData.c ? (
        <div className="bg-white rounded shadow p-4 max-w-md">
          <h2 className="text-xl font-semibold mb-2">{stockData.symbol}</h2>
          <p className="text-gray-700 mb-4">Current Price: ${stockData.c.toFixed(2)}</p>

          <div className="flex gap-3 items-center mb-2">
            <input
              type="number"
              min="1"
              value={quantity}
              onChange={e => setQuantity(parseInt(e.target.value))}
              className="border px-3 py-2 rounded w-24"
            />
            <button
              onClick={handlePurchase}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              + Purchase
            </button>
          </div>

          <p className="text-sm text-gray-600">
            Total: ${(stockData.c * quantity).toFixed(2)}
          </p>
        </div>
      ) : null}
    </div>
  )
}
