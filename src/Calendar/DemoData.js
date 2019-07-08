const DemoData = {
    resources: [
        {
            id: 'r1',
            name: 'První',
        },
        {
            id: 'r2',
            name: 'Druhý',
        },
        {
            id: 'r3',
            name: 'Oba',
        },{
            id: 'rV',
            name: '--výplň--',
            disabled:true
        },
     
    ],
    events: [
        {
            id: 1,
            start: '2017-12-18 09:30:00',
            end: '2017-12-19 23:30:00',
            resourceId: 'r1',
            title: 'I am finished',
            bgColor: '#D9D9D9',
            showPopover: false,
            movable: false,
            resizable: false
        },
        {
            id: 2,
            start: '2017-12-18 12:30:00',
            end: '2017-12-26 23:30:00',
            resourceId: 'r2',
            title: 'I am not resizable',
            resizable: false
        },
        {
            id: 3,
            start: '2017-12-19 12:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r3',
            title: 'I am not movable',
            movable: false
        },
        {
            id: 4,
            start: '2017-12-19 14:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r4',
            title: 'I am not start-resizable',
            startResizable: false,
        },
        {
            id: 5,
            start: '2017-12-19 15:30:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r5',
            title: 'I am not end-resizable',
            endResizable: false
        },
        {
            id: 6,
            start: '2017-12-19 15:35:00',
            end: '2017-12-19 23:30:00',
            resourceId: 'r6',
            title: 'I am normal'
        },
        {
            id: 7,
            start: '2017-12-19 15:40:00',
            end: '2017-12-20 23:30:00',
            resourceId: 'r7',
            title: 'I am exceptional',
            bgColor: '#FA9E95'
        },
        {
            id: 8,
            start: '2017-12-19 15:50:00',
            end: '2017-12-20 11:00:00',
            resourceId: 'r1',
            title: 'I am locked',
            movable: false,
            resizable: false,
            bgColor: 'red'
        },

        {
            id: 12,
            start: '2017-12-20 14:00:00',
            end: '2017-12-21 11:00:00',
            resourceId: 'r1',
            title: 'R1 has many tasks 4'
        },
        {
            id: 13,
            start: '2017-12-21 14:00:00',
            end: '2017-12-24 23:30:00',
            resourceId: 'r1',
            title: 'R1 has many tasks 5'
        },
        {
            id: 14,
            start: '2017-12-23 18:30:00',
            end: '2017-12-27 23:30:00',
            resourceId: 'r1',
            title: 'R1 has many tasks 6'
        },
    ],
    
}

export default DemoData
