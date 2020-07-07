import { createContext } from 'react'

interface PageContextProps {
  isMobile: boolean
}

const PageContext = createContext({} as PageContextProps)

export default PageContext
