import { Flex, Text, Avatar } from '@chakra-ui/react'

type Props = {
  monitorName: string
  subject: string
  weekday: string
  initHour: string
  endHour: string
  room: string
}

export const MonitoringItem = ({ monitorName, subject, weekday, initHour, endHour, room }: Props): JSX.Element => {
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
      <Avatar size='xl' name={monitorName} mb='4' bg='purple.500' />
      <Text>{monitorName} </Text>
      <Text fontSize='lg' fontWeight='medium'>
        {subject}
      </Text>
      <Text>{weekday}</Text>
      <Text fontSize='sm'>
        Das {initHour}h até {endHour}h
      </Text>
      <Text>{room}</Text>
    </Flex>
  )
}
