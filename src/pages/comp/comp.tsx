import React from 'react'

interface CompProps {
  onClick: (event: React.MouseEvent<HTMLDivElement>) => void
}

const Comp: React.FC<CompProps> = ({ onClick }) => {
  return <div onClick={onClick}>Clique</div>
}

export default Comp
