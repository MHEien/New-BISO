import React, {useRef, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';
import axios from 'axios';


import { View, useThemeColor, Text } from '../components/Themed';


interface Props {
    navigation: any;
}

const EventsScreen: React.FC<Props> = ({navigation}) => {
    const theme = useThemeColor({}, 'background');
    const [events, setEvents] = React.useState([
        {
            "id": 0,
            start_date_details: {
                year: 2020,
                month: 10,
                day: 1
            },
            venue: {
                venue: "BISO"
            },
            title: "Loading...",
            numTickets: 0
        }
    ]);
    const [isLoading, setIsLoading] = React.useState(true);

    const fetchEvents = async () => {
        const response = await axios.get('https://www.biso.no/wp-json/tribe/events/v1/events');
        const events = response.data.events;
        setEvents(events);
        setIsLoading(false);
    }

    React.useEffect(() => {
        fetchEvents();
    }, []);



    
    const todaysDate = new Date().toISOString().split('T')[0];

    const onCalendarToggled = useCallback((calendarOpened: any) => {
        if (calendarOpened) {
           
        }
    }, []);

    const onDateChanged = useCallback(({date}) => {
        
    }, []);

    return (
        <View style={styles.container}>
            <CalendarProvider
                date={todaysDate}
                showTodayButton
                disabledOpacity={0.6}
                theme={{todayButtonTextColor: '#6d925b'}}
                todayBottomMargin={16}
            >
                <ExpandableCalendar
  style={styles.calendar}
  markedDates={
    events.reduce((markedDates, event) => {
      const date = event.start_date_details.date;
      if (!markedDates[date]) {
        markedDates[date] = { dots: [] };
      }
      markedDates[date].dots.push({ key: event.id, color: 'blue' });
      return markedDates;
    }, {})
  }
  theme={{ todayButtonTextColor: '#6d925b' }}
/>

                <AgendaList
                    sections={[]}
                    extraData={events}
                    renderItem={({item}) => {
                        return (
                            <View style={styles.item}>
                                <Text>{item.title}</Text>
                            </View>
                        );
                    }}
                    keyExtractor={(item) => item.id}
                />
            </CalendarProvider>
        </View>
    );
};


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#f5fcff',
    },
    calendar: {
    },
    text: {
        textAlign: 'center',
        borderColor: '#bbb',
        padding: 10,
        backgroundColor: '#eee',
    },
    item: {
        backgroundColor: 'white',
        flex: 1,
        borderRadius: 5,
        padding: 10,
        marginRight: 10,
        marginTop: 17,
    },
    emptyDate: {
        height: 15,
        flex: 1,
        paddingTop: 30,
    },
});

export default EventsScreen;