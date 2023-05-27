import { CustomTimelineEvent } from "../../shared/models/timeline-event.interface";

export const timelineData: CustomTimelineEvent[] = [
  {
    id: 'gather',
    done: false,
    title: 'Gather Documents',
    template: 'GatherDocumentsComponent',
    description: 'You will need to get get some documents ready to kick off the process',
    timestamp: new Date(),
  },
  {
    id: '1',
    done: false,
    template: 'UnabridgedInformationComponent',
    title: 'Unabridged certificates',
    description: 'You’ll need to apply for your unabridged birth and/or marriage certificate from the Department of Home Affairs',
    timestamp: new Date(),
    duration: {
      minimum: 3,
      maximum: 6,
      average: 4.5
    },
    alternatives: [
      {
        title: 'Using a third party',
        description: 'You can use a third party to apply for your unabridged birth and/or marriage certificate',
        duration: {
          minimum: 1,
          maximum: 6,
          average: 3.5
        },
      },
      {
        title: 'Doing it yourself',
        description: 'You can apply for your unabridged birth and/or marriage certificate yourself ath the Department of Home Affairs',
        duration: {
          minimum: 6,
          maximum: 12,
          average: 9
        },
        cost: {
          minimum: 0,
          maximum: 3000,
          average: 0
        }
      },
    ]
  }, {
    id: '2',
    done: false,
    title: 'Apostille Documents',
    template: 'ApostilleComponent',
    description: 'The apostille is a validation stamp ensuring that a particular document is recognized in certain foreign countries. IE Netherlands',
    timestamp: new Date(),
  }, {
    id: '3',
    done: false,
    title: 'Police Clearance',
    description: 'You’ll need to apply for your police clearance certificate from the South African Police Service',
    template: 'PoliceClearanceComponent',
    timestamp: new Date(),
  }, {
    id: 'flight',
    done: false,
    title: 'Flight tickets',
    description: `You'll need to book your flight tickets.`,
    timestamp: new Date(),
  },
  {
    id: 'pets',
    done: false,
    title: 'Pets',
    description: `We all love our furry little friends, but they can be a bit of a hassle to get them to the Netherlands. You'll need to get them ready for the trip.`,
    timestamp: new Date(),
  }
]
