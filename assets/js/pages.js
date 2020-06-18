var templates = Handlebars.templates;
document.getElementById('header').innerHTML = templates.header();
document.getElementById('intro').innerHTML = templates.intro();
document.getElementById('about').innerHTML = templates.about();
document.getElementById('why').innerHTML = templates.why();
document.getElementById('contact').innerHTML = templates.contact();
document.getElementById('participants').innerHTML = templates.participants({
  speakers: [
    {
      name: 'Reston Community Players',
      desc: 'Reston, VA',
      image: 'assets/img/speakers/rcp.jpg',
      imageAlt: 'Reston Community Players',
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
// document.getElementById('footer').innerHTML = templates.footer();
