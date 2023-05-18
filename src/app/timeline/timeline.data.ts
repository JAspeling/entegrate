export const timelineData = [
  {
    id: '1',
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
    title: 'Event 2',
    timestamp: new Date(),
  }, {
    id: '3',
    title: 'Event 3',
    timestamp: new Date(),
  }, {
    id: '4',
    title: 'Event 4',
    timestamp: new Date(),
  }
]
