import { Flex, Text, Avatar } from '@chakra-ui/react'

import { LoadMonitorings } from '@/domain/usecases'

type Props = {
  monitoring: LoadMonitorings.Model
}

const fullDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']

export const MonitoringItem = ({ monitoring }: Props): JSX.Element => {
  return (
    <Flex
      as='li'
      flex='0 0 250px'
      borderRadius='15px'
      bg='white'
      alignItems='center'
      direction='column'
      p='24px 35px'
      boxShadow='rgb(0 0 0 / 2%) 0px 3.5px 5.5px'
      mr='4'
      data-testid='monitoring-item'
    >
      <Avatar size='xl' name={monitoring.monitor.name} mb='4' bg='purple.500' />
      <Text data-testid='monitor-name'>{monitoring.monitor.name} </Text>
      <Text fontSize='lg' fontWeight='medium' data-testid='subject'>
        {monitoring.subject}
      </Text>
      <Text data-testid='weekday'>{fullDays[monitoring.weekday]}</Text>
      <Text fontSize='sm' data-testid='period'>
        Das {monitoring.initHour}h até {monitoring.endHour}h
      </Text>
      <Text data-testid='room'>{monitoring.room}</Text>
    </Flex>
  )
}
