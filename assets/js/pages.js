var templates = Handlebars.templates;
document.getElementById('header').innerHTML = templates.header();
document.getElementById('intro').innerHTML = templates.intro();
document.getElementById('about').innerHTML = templates.about();
document.getElementById('why').innerHTML = templates.why();
document.getElementById('contact').innerHTML = templates.contact();
document.getElementById('participants').innerHTML = templates.participants({
  speakers: [
    {
      name: 'Annapolis Summer Garden Theatre',
      desc: 'Annapolis, MD',
      image: 'assets/img/speakers/asgt.jpg',
    },
    {
      name: 'City of Fairfax Theatre Company',
      desc: 'Fairfax, VA',
      image: 'assets/img/speakers/cftc.jpg',
    },
    {
      name: 'Colonial Players of Annapolis',
      desc: 'Annapolis, MD',
      image: 'assets/img/speakers/cpa.png',
    },
    {
      name: 'Hard Bargain Players',
      desc: 'Accokeek, MD',
    },
    {
      name: 'Kensington Arts Theatre',
      desc: 'Kensington, MD',
      image: 'assets/img/speakers/kat.jpg',
    },
    {
      name: 'Laurel Mill Playhouse',
      desc: 'Laurel, MD',
    },
    {
      name: 'Port Tobacco Players',
      desc: 'La Plata, MD',
    },
    {
      name: 'Prince William Little Theatre',
      desc: 'Manassas, VA',
    },
    {
      name: 'Reston Community Players',
      desc: 'Reston, VA',
      image: 'assets/img/speakers/rcp.jpg',
    },
    {
      name: 'Rockville Little Theatre',
      desc: 'Rockville, MD',
    },
    {
      name: 'Silver Spring Stage',
      desc: 'Silver Spring, MD',
    },
    {
      name: 'Sterling Playmakers',
      desc: 'Sterling, VA',
      image: 'assets/img/speakers/sp.png',
    },
    {
      name: 'The Victorian Lyric Opera Company',
      desc: 'Rockville, MD',
      image: 'assets/img/speakers/vloc.jpg',
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
