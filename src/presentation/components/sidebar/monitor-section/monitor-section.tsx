import { AddIcon } from '@chakra-ui/icons'
import { Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useContext } from 'react'

import { AddMonitoringModal } from '@/presentation/components'
import { ApiContext } from '@/presentation/contexts'

import { LinkButton } from '../link-button'

export const MonitorSection = (): JSX.Element => {
  const activeColor = useColorModeValue('gray.700', 'white')
  const { getCurrentAccount } = useContext(ApiContext)
  const account = getCurrentAccount()
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (account.role === 'admin') {
    return (
      <>
        <Text
          color={activeColor}
          fontWeight='bold'
          mb={{
            xl: '12px',
          }}
          mx='auto'
          ps={{
            sm: '10px',
            xl: '16px',
          }}
          py='12px'
          textTransform='uppercase'
        >
          Monitor
        </Text>
        <LinkButton text='Nova monitoria' icon={<AddIcon />} mt='auto' onClick={onOpen} />
        <AddMonitoringModal isOpen={isOpen} onClose={onClose} />
      </>
    )
  }
  return null
}
