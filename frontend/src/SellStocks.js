import React, { useState } from 'react'
import Card from './components/Card'

export default function SellStocks() {
  const [searchQuery, setSearchQuery] = useState('')
  const [stockData, setStockData] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [netWorth, setNetWorth] = useState(874782903.54)
  const [soldStocks, setSoldStocks] = useState([])
  const [holdings, setHoldings] = useState({
    AAPL: 10,
    TSLA: 5,
    GOOGL: 8,
    MSFT: 12,
    AMZN: 7,
    NVDA: 3,
    META: 6,
    JPM: 4,
    DIS: 9
  })

  const mockStocks = {
    AAPL: { symbol: 'AAPL', c: 186.25, h: 187.88, l: 185.75 },
    TSLA: { symbol: 'TSLA', c: 213.1, h: 215.0, l: 210.5 },
    GOOGL: { symbol: 'GOOGL', c: 129.6, h: 130.0, l: 128.4 },
    MSFT: { symbol: 'MSFT', c: 336.9, h: 340.0, l: 333.5 },
    AMZN: { symbol: 'AMZN', c: 121.6, h: 123.0, l: 119.8 },
    NVDA: { symbol: 'NVDA', c: 1085.25, h: 1100.0, l: 1062.3 },
    META: { symbol: 'META', c: 473.15, h: 478.0, l: 469.0 },
    JPM: { symbol: 'JPM', c: 196.8, h: 198.2, l: 194.5 },
    DIS: { symbol: 'DIS', c: 101.25, h: 103.0, l: 99.8 }
  }

  const handleSearch = () => {
    const symbol = searchQuery.toUpperCase()
    if (mockStocks[symbol]) {
      setStockData(mockStocks[symbol])
    } else {
      alert('Try symbols like AAPL, TSLA, GOOGL, etc.')
      setStockData(null)
    }
  }

  const handleSell = () => {
    if (!stockData || !stockData.c || quantity <= 0) return
    const symbol = stockData.symbol
    if (!holdings[symbol] || holdings[symbol] < quantity) {
      alert('Not enough shares to sell!')
      return
    }
    const revenue = stockData.c * quantity
    const newSale = {
      symbol: stockData.symbol,
      price: stockData.c,
      quantity,
      total: revenue.toFixed(2)
    }
    setNetWorth(prev => prev + revenue)
    setSoldStocks(prev => [...prev, newSale])
    setHoldings(prev => ({ ...prev, [symbol]: prev[symbol] - quantity }))
    alert(`Sold ${quantity} shares of ${stockData.symbol}`)
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8 font-inter">
      <div className="max-w-5xl mx-auto space-y-6">
        <h1 className="text-3xl font-bold text-gray-800">Sell Stocks</h1>
        <p className="text-lg text-gray-600">
          Net Worth:{' '}
          <span className="text-emerald-600 font-semibold">
            ${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}
          </span>
        </p>

        <Card title="Search Stock">
          <div className="flex gap-4">
            <input
              type="text"
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              placeholder="e.g., AAPL"
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
            <button
              onClick={handleSearch}
              className="bg-emerald-600 text-white px-4 py-2 rounded hover:bg-emerald-700 transition"
            >
              Search
            </button>
          </div>
        </Card>

        {stockData && stockData.c && (
          <Card title={stockData.symbol}>
            <div className="space-y-2 text-gray-700">
              <p>
                <strong>Price:</strong> ${stockData.c.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                High: ${stockData.h.toFixed(2)} | Low: ${stockData.l.toFixed(2)}
              </p>
              <p className="text-sm text-gray-500">
                You own: <strong>{holdings[stockData.symbol] || 0}</strong> shares
              </p>
              <div className="flex items-center gap-4 mt-4">
                <input
                  type="number"
                  min="1"
                  max={holdings[stockData.symbol] || 0}
                  value={quantity}
                  onChange={e => setQuantity(parseInt(e.target.value))}
                  className="w-24 px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500"
                />
                <button
                  onClick={handleSell}
                  className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700"
                >
                  - Sell
                </button>
              </div>
              <p className="text-sm mt-2">
                Total:{' '}
                <strong>${(stockData.c * quantity).toFixed(2)}</strong>
              </p>
            </div>
          </Card>
        )}

        {soldStocks.length > 0 && (
          <div className="space-y-6 mt-12">
            <h2 className="text-2xl font-semibold text-gray-800">Your Sales</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
              {soldStocks.map((stock, index) => (
                <div
                  key={index}
                  className="rounded-xl bg-red-50 shadow-sm p-5 text-gray-800 hover:shadow-md transition"
                >
                  <p className="text-xl font-bold mb-2">{stock.symbol}</p>
                  <p className="text-sm mb-1">Quantity: <span className="font-medium">{stock.quantity}</span></p>
                  <p className="text-sm mb-1">Price: <span className="font-medium">${stock.price.toFixed(2)}</span></p>
                  <p className="text-sm">Total: <span className="font-semibold">${stock.total}</span></p>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
