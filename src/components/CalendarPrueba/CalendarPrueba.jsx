import React, { useState, useRef, useCallback, useMemo } from "react"
import subDays from "date-fns/subDays"
import DateRange from "react-date-range/dist/components/DateRange"
import "react-date-range/dist/styles.css"
import "./CalendarPrueba.scss"
import { Container } from "react-bootstrap"


const DatePicker = (props) => {
    const now = useRef(new Date());
    const [endDate, setEndDate] = useState(now.current);
    const [startDate, setStartDate] = useState(subDays(now.current, 0));

    const handleSelect = useCallback(({ selection: { startDate, endDate } }) => {
        setStartDate(startDate);
        setEndDate(endDate);
    });

    const ranges = useMemo(() => {
        return [
            {
                startDate: startDate,
                endDate: endDate,
                key: "selection"
            }
        ];
    }, [startDate, endDate]);

    return (
        <Container>
            {/* <p>{startDate.toDateString()} - {endDate.toDateString()}</p><br /> */}
            <DateRange
                moveRangeOnFirstSelection={false}
                ranges={ranges}
                onChange={handleSelect}
                showDateDisplay={true}
                minDate={new Date()}
                // Use your current booking dates to disable dates in the calendar
                disabledDates={[new Date()]}
                {...props}
            />
        </Container>
    );
};

export default DatePicker
