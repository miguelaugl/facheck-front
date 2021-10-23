import { AddIcon } from '@chakra-ui/icons'
import { Text, useColorModeValue, useDisclosure } from '@chakra-ui/react'
import { useContext } from 'react'

import { ApiContext } from '@/presentation/contexts'

import { LinkButton } from '../link-button'
import { AddMonitoringModal } from './add-monitoring-modal'

export const MonitorSection = (): JSX.Element => {
  const activeColor = useColorModeValue('gray.700', 'white')
  const { getCurrentAccount } = useContext(ApiContext)
  const account = getCurrentAccount()
  const { isOpen, onOpen, onClose } = useDisclosure()
  if (account.role === 'monitor') {
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
