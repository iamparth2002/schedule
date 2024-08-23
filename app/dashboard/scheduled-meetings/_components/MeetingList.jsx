import React from 'react';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { AlarmClock, ArrowRight, Calendar, Clock } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

const MeetingList = ({ meetingList }) => {
  return (
    <div className="px-4">
      {meetingList.length === 0 ? (
        <div className="flex flex-col justify-center items-center w-full h-[450px] text-center py-10">
          <p className="text-lg font-medium">You don’t have any meetings scheduled.</p>
          <Link href={'/create-meeting'}>
            <Button
              className="mt-4"
            >
              Create a Meeting <ArrowRight size={15} className="ml-4" />
            </Button>
          </Link>
        </div>
      ) : (
        meetingList.map((meeting) => (
          <Accordion key={meeting?.id} type="single" collapsible>
            <AccordionItem value={meeting?.id}>
              <AccordionTrigger>{meeting?.formatedDate}</AccordionTrigger>
              <AccordionContent>
                <h2 className="font-semibold text-2xl text-wrap">
                  {meeting?.eventName}
                </h2>
                <div className="mt-5 flex flex-col gap-4">
                  <h2 className="flex gap-2">
                    <Clock />
                    {meeting?.duration} Min
                  </h2>

                  <h2 className="flex gap-2">
                    <AlarmClock />
                    {meeting?.selectedTime}
                  </h2>

                  <h2 className="flex gap-2">
                    <Calendar />
                    {meeting?.formatedDate}
                  </h2>

                  <Link
                    href={meeting?.locationUrl}
                    className="text-pretty text-primary"
                  >
                    {meeting?.locationUrl}
                  </Link>
                </div>
              </AccordionContent>
            </AccordionItem>
          </Accordion>
        ))
      )}
    </div>
  );
};

export default MeetingList;
