import { Box, useColorModeValue } from '@chakra-ui/react'
import { ReactNode } from 'react'

function SimpleCard({
  children,
  w,
  mt,
  maxW,
}: {
  children: ReactNode
  w?: string
  mt?: string
  maxW?: string
}) {
  const styles = {
    margin: '5px',
    minHeight: '100px',
    width: w || '100%',
    marginTop: mt || '0px',
    maxWidth: maxW || '800px',
    color: 'white',
    fontSize: '18px',
    padding: '20px',
    fontFamily: 'Consolas,Courier New,monospace',
    backdropFilter: 'blur(4px) saturate(180%)',
    WebkitBackdropFilter: 'blur(16px) saturate(180%)',
    // backgroundColor: '#111928bf',
    borderRadius: '12px',
    border: '1px solid rgba(255,255,255,.125)',
  }
  return (
    <Box
      style={styles}
      bg={useColorModeValue('', '#111928bf')}
      boxShadow={'md'}
    >
      {children}
    </Box>
  )
}

export default SimpleCard
