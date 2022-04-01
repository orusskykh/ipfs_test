import React from 'react'

const FileExplorer = ({data}) => {
  return (
      <ul className="gallery">
        {data.map(item => {
          console.log(item)
          return <li key={item.path}>
            <img src={`https://ipfs.infura.io/ipfs/${item.path}`} alt={item.path}/>
            <div className="gallery-item-overflow">
                <p>{`item path: ${item.path}`}</p>
                <p>{`item size: ${item.size}`}</p>
            </div>
          </li>
        })}
      </ul>
  )
}

export default FileExplorer