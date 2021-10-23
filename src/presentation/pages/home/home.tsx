import { Flex, Text, Button } from '@chakra-ui/react'
import { useEffect, useState } from 'react'

import { LoadMonitorings } from '@/domain/usecases'
import { useErrorHandler } from '@/presentation/hooks'
import { AdminLayout } from '@/presentation/layouts'

import { MonitoringItem } from './monitoring-item/monitoring-item'

type Props = {
  loadMonitorings: LoadMonitorings
}

export const Home = ({ loadMonitorings }: Props): JSX.Element => {
  const handleError = useErrorHandler((error) => {
    setState((prevState) => ({ ...prevState, error: error.message }))
  })
  const [state, setState] = useState({
    monitorings: [] as LoadMonitorings.Result,
    error: '',
    reload: false,
  })
  const handleReload = (): void => {
    setState((prevState) => ({ ...prevState, reload: !prevState.reload, error: '' }))
  }
  useEffect(() => {
    loadMonitorings
      .load()
      .then((monitorings) => setState((prevState) => ({ ...prevState, monitorings })))
      .catch(handleError)
  }, [state.reload])
  return (
    <AdminLayout>
      <Text as='h2' fontSize='2xl' fontWeight='medium' mb='4'>
        Monitorias
      </Text>
      {!!state.error && (
        <Flex align='center' justify='center' direction='column' py='8'>
          <Text fontWeight='medium' fontSize='xl' data-testid='error' mb='4'>
            {state.error}
          </Text>
          <Button data-testid='reload' onClick={handleReload}>
            Tentar novamente
          </Button>
        </Flex>
      )}
      {!state.error && (
        <Flex as='ul' data-testid='monitoring-list'>
          {state.monitorings.map((monitoring) => (
            <MonitoringItem key={monitoring.id} monitoring={monitoring} />
          ))}
        </Flex>
      )}
    </AdminLayout>
  )
}
