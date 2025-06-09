import React, { useState } from 'react'
import './PurchaseStocks.css'

export default function PurchaseStocks() {
  const [searchQuery, setSearchQuery] = useState('')
  const [stockData, setStockData] = useState(null)
  const [quantity, setQuantity] = useState(1)
  const [netWorth, setNetWorth] = useState(874782903.54)
  const [purchasedStocks, setPurchasedStocks] = useState([])

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

  const handlePurchase = () => {
    if (!stockData || !stockData.c || quantity <= 0) return

    const cost = stockData.c * quantity
    if (cost > netWorth) {
      alert('Insufficient funds!')
      return
    }

    const newPurchase = {
      symbol: stockData.symbol,
      price: stockData.c,
      quantity,
      total: cost.toFixed(2)
    }

    setNetWorth(prev => prev - cost)
    setPurchasedStocks(prev => [...prev, newPurchase])

    // Send purchase to backend
    fetch('/api/purchase', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        user: 'demoUser', // Replace with actual user from auth if available
        symbol: stockData.symbol,
        price: stockData.c,
        quantity,
        total: cost.toFixed(2)
      })
    })
      .then(res => {
        if (!res.ok) throw new Error('Failed to store purchase')
        return res.json()
      })
      .then(data => {
        // Optionally handle response
      })
      .catch(err => {
        console.error(err)
        alert('Failed to store purchase in backend')
      })

    alert(`Purchased ${quantity} shares of ${stockData.symbol}`)
  }

  return (
    <div className="container">
      <div className="header">
        <h1 className="title">📈 Purchase Stocks</h1>
        <div className="netWorth">
          Net Worth: ${netWorth.toLocaleString(undefined, { minimumFractionDigits: 2 })}
        </div>
      </div>

      <div className="card">
        <h2 className="cardTitle">Search Stock</h2>
        <div className="searchRow">
          <input
            type="text"
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            placeholder="e.g., AAPL"
            className="input"
          />
          <button onClick={handleSearch} className="button">Search</button>
        </div>
      </div>

      {stockData && stockData.c && (
        <div className="card">
          <h2 className="cardTitle">{stockData.symbol} - ${stockData.c.toFixed(2)}</h2>
          <div className="stockCard">
            <p>High: ${stockData.h.toFixed(2)} | Low: ${stockData.l.toFixed(2)}</p>
            <div className="searchRow">
              <input
                type="number"
                min="1"
                value={quantity}
                onChange={e => setQuantity(parseInt(e.target.value))}
                className="input"
              />
              <button onClick={handlePurchase} className="button">+ Purchase</button>
            </div>
            <p>Total Cost: <strong>${(stockData.c * quantity).toFixed(2)}</strong></p>
          </div>
        </div>
      )}

      {purchasedStocks.length > 0 && (
        <div>
          <h2 className="cardTitle">Your Purchases</h2>
          <div className="purchaseList">
            {purchasedStocks.map((stock, index) => (
              <div key={index} className="purchaseItem">
                <h3>{stock.symbol}</h3>
                <p>Quantity: {stock.quantity}</p>
                <p>Price: ${stock.price.toFixed(2)}</p>
                <p>Total: ${stock.total}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
