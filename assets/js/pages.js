var templates = Handlebars.templates;
document.getElementById('header').innerHTML = templates.header();
document.getElementById('intro').innerHTML = templates.intro();
document.getElementById('about').innerHTML = templates.about();
document.getElementById('speakers').innerHTML = templates.speakers({
  speakers: [
    {
      name: 'Brenden Legros',
      desc: 'What a great speaker',
      image: 'assets/img/speakers/1.jpg',
      imageAlt: 'Speaker 1',
    },
    {
      name: 'Hubert Hirthe',
      desc: 'What a great speaker',
      image: 'assets/img/speakers/2.jpg',
      imageAlt: 'Speaker 2',
    },
    {
      name: 'Cole Emmerich',
      desc: 'What a great speaker',
      image: 'assets/img/speakers/3.jpg',
      imageAlt: 'Speaker 3',
    },
    {
      name: 'Jack Christiansen',
      desc: 'What a great speaker',
      image: 'assets/img/speakers/4.jpg',
      imageAlt: 'Speaker 4',
    },
    {
      name: 'Alejandrin Littel',
      desc: 'What a great speaker',
      image: 'assets/img/speakers/5.jpg',
      imageAlt: 'Speaker 5',
    },
    {
      name: 'Willow Trantow',
      desc: 'What a great speaker',
      image: 'assets/img/speakers/6.jpg',
      imageAlt: 'Speaker 6',
    },
  ],
});
// document.getElementById('schedule').innerHTML = templates.schedule({
//   event1: [
//     {
//       time: '09:30 AM',
//       title: 'Registration',
//       desc: 'Fugit voluptas iusto maiores temporibus autem numquam magnam.',
//       image: null,
//       imageAlt: null,
//       speaker: null,
//     },
//     {
//       time: '10:00 AM',
//       title: 'Keynote',
//       desc: 'Facere provident incidunt quos voluptas.',
//       image: 'assets/img/speakers/1.jpg',
//       imageAlt: 'Brenden Legros',
//       speaker: 'Brenden Legros',
//     },
//   ],
//   event2: [
//     {
//       time: '09:30 AM',
//       title: 'Start Day 2',
//       desc: 'Fugit voluptas iusto maiores temporibus autem numquam magnam.',
//       image: null,
//       imageAlt: null,
//       speaker: null,
//     },
//     {
//       time: '10:00 AM',
//       title: 'Keynote',
//       desc: 'gewefewfewfew.',
//       image: 'assets/img/speakers/1.jpg',
//       imageAlt: 'Brenden Legros',
//       speaker: 'Brenden Legros',
//     },
//   ],
//   event3: [
//     {
//       time: '09:30 AM',
//       title: 'Start Day 3',
//       desc: 'feqwfewfe3524wrfsbcswfwewe.',
//       image: null,
//       imageAlt: null,
//       speaker: null,
//     },
//     {
//       time: '10:00 AM',
//       title: 'Keynote',
//       desc: 'Facere provident incidunt quos voluptas.',
//       image: 'assets/img/speakers/1.jpg',
//       imageAlt: 'Brenden Legros',
//       speaker: 'Brenden Legros',
//     },
//   ],
// });
// document.getElementById('venue').innerHTML = templates.venue();
// document.getElementById('hotels').innerHTML = templates.hotels();
// document.getElementById('gallery').innerHTML = templates.gallery();
// document.getElementById('supporters').innerHTML = templates.supporters();
// document.getElementById('faq').innerHTML = templates.faq();
// document.getElementById('subscribe').innerHTML = templates.subscribe();
// document.getElementById('buy-tickets').innerHTML = templates.buyTickets();
// document.getElementById('donate').innerHTML = templates.donate();
document.getElementById('footer').innerHTML = templates.footer();
