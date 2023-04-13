import React, {useRef, useCallback} from 'react';
import {StyleSheet} from 'react-native';
import {ExpandableCalendar, AgendaList, CalendarProvider, WeekCalendar} from 'react-native-calendars';


import { View, useThemeColor, Text } from '../components/Themed';


interface Props {
    navigation: any;
}

const EventsScreen: React.FC<Props> = ({navigation}) => {
    const theme = useThemeColor({}, 'background');
    const events = [
        {
            id: 1,
            title: 'Event 1',
            start: '2023-04-14T10:00:00',
            end: '2023-04-14T12:00:00',
            color: 'red',
        },
        {
            id: 2,
            title: 'Event 2',
            start: '2023-04-14T12:00:00',
            end: '2023-04-14T13:00:00',
            color: 'blue',
        },
        {
            id: 3,
            title: 'Event 3',
            start: '2023-04-14T13:00:00',
            end: '2023-04-14T14:00:00',
            color: 'green',
        }
    ];

    const todaysDate = new Date().toISOString().split('T')[0];

    const onCalendarToggled = useCallback((calendarOpened) => {
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
                markedDates={{
                    [events[0].start]: {selected: true, disableTouchEvent: true, selectedDotColor: 'orange'},
                    [events[1].start]: {marked: true, dotColor: events[1].color},
                    [events[2].start]: {marked: true, dotColor: events[2].color}
                }}
                theme={{todayButtonTextColor: '#6d925b'}}
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