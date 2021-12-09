import React from 'react'
import { FaCheck } from 'react-icons/fa'

export const AddToCartColors: React.FC<{
  colors: string[] | undefined
  colorIndex: number
  setColorIndex: React.Dispatch<React.SetStateAction<number>>
}> = ({ colors, colorIndex, setColorIndex }) => {
  return (
    <>
      {colors && (
        <div className='colors'>
          <span>colors :</span>
          <div>
            {colors?.map((color, index) => {
              return (
                <button
                  key={`${color}_${index}`}
                  style={{ background: color }}
                  className={
                    index === colorIndex ? 'color-btn active' : 'color-btn'
                  }
                  onClick={() => setColorIndex(index)}
                >
                  {colorIndex === index && (
                    <FaCheck
                      style={
                        color === '#FFFFFF' ? { color: 'black' } : undefined
                      }
                    />
                  )}
                </button>
              )
            })}
          </div>
        </div>
      )}
    </>
  )
}
