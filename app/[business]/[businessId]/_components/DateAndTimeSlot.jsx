'use client';
import React from 'react';
import { Button } from '@/components/ui/button';
import { Calendar } from '@/components/ui/calendar';

const DateAndTimeSlot = ({handleDateChange, date, timeSlot, enabledTimeSlots,handleTimeChange,timeSelected,prevBookings}) => {
  const checkTimeSlot = (time)=>{
    return (prevBookings.filter(p => p.selectedTime === time)).length > 0
  }
  return (
    <div className="col-span-1 md:col-span-2 flex flex-col items-center md:flex-row px-4">
      <div className="flex flex-col">
        <h2 className="font-semibold text-lg mb-4 max-md:text-center max-md:mt-5">Select Date and time</h2>
        <Calendar
          mode="single"
          selected={date}
          onSelect={(d) => handleDateChange(d)}
          className="rounded-md border"
          disabled={(date) => date < new Date()}
        />
      </div>
      <div
        className="flex flex-col w-full overflow-auto gap-4 p-5"
        style={{ maxHeight: '400px' }}
      >
        {timeSlot?.map((time, i) => (
          <Button
            disabled={!enabledTimeSlots || checkTimeSlot(time)}
            onClick={() => handleTimeChange(time)}
            key={i}
            className={`border-primary text-primary ${timeSelected==time && "bg-primary text-white"}`}
            variant="outline"
          >
            {time}
          </Button>
        ))}
      </div>
    </div>
  );
};

export default DateAndTimeSlot;
