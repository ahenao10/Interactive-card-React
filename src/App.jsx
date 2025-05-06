import { useState, useRef } from 'react'
import CardDisplay from './components/CardDisplay'
import './App.css'

function App() {
  const [cardNumber, setCardNumber] = useState('')
  const [fragments, setFragments] = useState(['', '', '', ''])
  const inputRefs = Array(4).fill().map(() => useRef(null))

  const getCardType = (number) => {
    const cleaned = number.replace(/\D/g, '')
    if (!cleaned) return ''

    // Visa starts with 4
    if (cleaned.startsWith('4')) return 'VISA'
    
    // Mastercard starts with 51-55 or 2221-2720
    const mastercardRanges = [
      { start: '51', end: '55' },
      { start: '2221', end: '2720' }
    ]
    
    if (cleaned.length >= 2 && mastercardRanges.some(range => {
      const prefix = cleaned.substring(0, range.start.length)
      return prefix >= range.start && prefix <= range.end
    })) {
      return 'MASTERCARD'
    }
    
    return ''
  }

  const handleInputChange = (e, index) => {
    const value = e.target.value
    // Remove non-digit characters
    const cleaned = value.replace(/\D/g, '')
    
    // Update only the current fragment
    const newFragments = [...fragments]
    newFragments[index] = cleaned.slice(0, 4)
    
    // Move focus to next input if current is full
    if (cleaned.length === 4 && index < 3) {
      inputRefs[index + 1].current?.focus()
    }
    
    setFragments(newFragments)
    setCardNumber(newFragments.join(' '))
  }

  return (
    <div className="min-h-screen bg-gray-100 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="grid grid-cols-2 gap-8">
          <div>
            <CardDisplay cardNumber={cardNumber} cardType={getCardType(cardNumber)} />
          </div>
          <div className="space-y-4">
            <h1 className="text-2xl font-bold">Enter Credit Card Number</h1>
            <div className="space-y-2">
              <div className="flex gap-2">
                {fragments.map((fragment, index) => (
                  <input
                    key={index}
                    type="text"
                    value={fragment}
                    maxLength={4}
                    onChange={(e) => handleInputChange(e, index)}
                    className="flex-1 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-center"
                    placeholder="0000"
                    ref={inputRefs[index]}
                  />
                ))}
              </div>
              <p className="text-sm text-gray-500">Enter 16 digits in groups of 4</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default App
