import React, { useState, useRef, useCallback, useMemo, useEffect } from "react"
import subDays from "date-fns/subDays"
import DateRange from "react-date-range/dist/components/DateRange"
import "react-date-range/dist/styles.css"
import "./Calendar.scss"
import { Container } from "react-bootstrap"
import BookingButton from '../../components/BookingButton/BookingButton'
import carService from '../../services/car.services'
import TotalPay from "../TotalPay/TotalPay"

const DatePicker = ({ car_id }) => {

    const now = useRef(new Date())
    const [endDate, setEndDate] = useState(now.current);
    const [startDate, setStartDate] = useState(subDays(now.current, 0))
    const [bookedDates, setBookedDates] = useState([])

    const handleSelect = useCallback(({ selection: { startDate, endDate } }) => {
        setStartDate(startDate)
        setEndDate(endDate)
    })

    const ranges = useMemo(() => {
        return [
            {
                startDate: startDate,
                endDate: endDate,
                key: "selection"
            }
        ];
    }, [startDate, endDate])

    useEffect(() => {
        carService
            .bookedDates(car_id)
            .then(({ data }) => {
                let dates = data.map(elm => new Date(elm))
                setBookedDates(dates)
            })
            .catch(err => console.log(err))
    }, [])

    return (
        <Container>
            <DateRange className='picker mb-5'
                moveRangeOnFirstSelection={false}
                ranges={ranges}
                onChange={handleSelect}
                showDateDisplay={true}
                disabledDates={bookedDates}
                minDate={new Date()}
            />
            <h3 className="mb-5">Datos de tu reserva</h3>
            <TotalPay car_id={car_id} ranges={ranges} />
            <BookingButton ranges={ranges} car_id={car_id} />
        </Container>
    )
}

export default DatePicker
