import { Flex, Text, Avatar } from '@chakra-ui/react'

import { LoadMonitorings } from '@/domain/usecases'

type Props = {
  monitoring: LoadMonitorings.Model
}

const fullDays = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado']
const colors = ['blue.400', 'purple.500']

export const MonitoringItem = ({ monitoring }: Props): JSX.Element => {
  return (
    <Flex
      as='li'
      borderRadius='15px'
      bg='white'
      alignItems='center'
      direction='column'
      p='24px 35px'
      boxShadow='rgb(0 0 0 / 2%) 0px 3.5px 5.5px'
      data-testid='monitoring-item'
      transition='transform ease .2s'
      _hover={{
        transform: 'scale(1.02)',
      }}
    >
      <Avatar size='xl' name={monitoring.monitor.name} mb='4' color='white' bg={colors[monitoring.weekday % 2]} />
      <Text data-testid='monitor-name'>{monitoring.monitor.name} </Text>
      <Text fontSize='lg' fontWeight='medium' data-testid='subject'>
        {monitoring.subject}
      </Text>
      <Text data-testid='weekday'>{fullDays[monitoring.weekday]}</Text>
      <Text data-testid='period'>
        Das {monitoring.initHour}h até {monitoring.endHour}h
      </Text>
      <Text data-testid='room'>{monitoring.room}</Text>
    </Flex>
  )
}
