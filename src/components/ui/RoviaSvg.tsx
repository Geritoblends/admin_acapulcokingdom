import React, { useState } from 'react'

interface RoviaSvgProps {
    fill: string,
    ratio: number
}

export const RoviaSvg: React.FC<RoviaSvgProps> = ({fill, ratio}) => {
    
  return (
    <div style={{display: "flex", alignItems: "center", justifyContent: "center"}}>
        <svg
            xmlns="http://www.w3.org/2000/svg"
            xmlSpace="preserve"
            width={218.306 * 0.2}
            height={284.224 * 0.2}
            viewBox="0 0 57.76 75.201"
            fill='orange'
        >
            <g fill="none">
            <path
                d="m109.145 108.393 4.642-4.893-9.283-9.41-27.6 27.475 27.6 27.475 27.349-27.6-8.657-8.656 9.911-9.911-27.349-27.475-27.224 27.475 8.406 8.656"
                style={{
                fill: "#000",
                fillOpacity: 0,
                stroke: "#000",
                strokeWidth: 2.2,
                strokeDasharray: "none",
                strokeOpacity: 1,
                }}
                transform="translate(-76.124 -74.618)"
            />
            <path
                d="m101.367 115.669-4.767 5.27 9.284 9.157 17.398-17.39"
                style={{
                fill: "#000",
                fillOpacity: 0,
                stroke: "#000",
                strokeWidth: 2.2,
                strokeDasharray: "none",
                strokeOpacity: 1,
                }}
                transform="translate(-76.124 -74.618)"
            />
            </g>
        </svg>
        <p style={{color: "black", fontWeight: 300, fontSize: 20}}>rovia</p>
    </div>
  )
}
