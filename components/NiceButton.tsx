import React from 'react'
import { Button } from "@/components/ui/button"

const NiceButton = ({ children, ...props }) => {
    return (
        <Button 
          className="relative overflow-hidden bg-blue-600 text-white font-bold py-2 px-6 transform -skew-x-12 group border-2 border-black shadow-comic halftone-shadow"
          {...props}
        >
          <span className="relative z-10 transform skew-x-12 inline-block text-2xl comic-text">
            {children}
          </span>
          <span className="absolute inset-0 bg-green-600 transform translate-x-full group-hover:translate-x-0 transition-transform duration-200 ease-in-out" />
        </Button>
      )
    
  }
  
  export default NiceButton