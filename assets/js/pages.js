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
      name: 'The Arlington Players',
      desc: 'Arlington, VA',
      image: 'assets/img/speakers/tap.png',
    },
    {
      name: 'The City of Fairfax Theatre Company',
      desc: 'Fairfax, VA',
      image: 'assets/img/speakers/cftc.jpg',
    },
    {
      name: 'The Colonial Players of Annapolis',
      desc: 'Annapolis, MD',
      image: 'assets/img/speakers/cpa.png',
    },
    {
      name: 'The Hard Bargain Players',
      desc: 'Accokeek, MD',
      image: 'assets/img/speakers/hbp.jpg',
    },
    {
      name: 'Kensington Arts Theatre',
      desc: 'Kensington, MD',
      image: 'assets/img/speakers/kat.jpg',
    },
    {
      name: 'Laurel Mill Playhouse',
      desc: 'Laurel, MD',
      image: 'assets/img/speakers/lmp.jpg',
    },
    // {
    //   name: 'Port Tobacco Players',
    //   desc: 'La Plata, MD',
    // },
    {
      name: 'Prince William Little Theatre',
      desc: 'Manassas, VA',
      image: 'assets/img/speakers/pwlt.png',
    },
    {
      name: 'Reston Community Players',
      desc: 'Reston, VA',
      image: 'assets/img/speakers/rcp.jpg',
    },
    {
      name: 'Rockville Little Theatre',
      desc: 'Rockville, MD',
      image: 'assets/img/speakers/rlt.png',
    },
    {
      name: 'Silver Spring Stage',
      desc: 'Silver Spring, MD',
      image: 'assets/img/speakers/sss.png',
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
document.getElementById('schedule').innerHTML = templates.schedule({
  event1: [
    {
      time: '06:30 PM',
      title: 'Welcome to the event!',
    },
    {
      time: '7:00 PM',
      title: 'Reston Community Players',
      image: 'assets/img/speakers/rcp.jpg',
    },
    {
      time: '8:00 PM',
      title: 'City of Fairfax Theatre Company',
      image: 'assets/img/speakers/logo_square/CFTC.png',
    },
    {
      time: '9:00 PM',
      title: 'Laurel Mill Playhouse',
      image: 'assets/img/speakers/logo_square/LMP.png',
    },
    {
      time: '10:00 PM',
      title: 'The Victorian Lyric Opera Company',
      image: 'assets/img/speakers/logo_square/VLOC.png',
    },
  ],
  event2: [
    {
      time: '10:00 AM',
      title: 'Reston Community Players',
      image: 'assets/img/speakers/rcp.jpg',
    },
    {
      time: '11:00 AM',
      title: 'The Colonial Players of Annapolis',
      image: 'assets/img/speakers/logo_square/CP.png',
    },
    {
      time: '12:00 PM',
      title: 'Silver Spring Stage',
      image: 'assets/img/speakers/logo_square/SSS.png',
    },
    {
      time: '1:00 PM',
      title: 'The Arlington Players',
      image: 'assets/img/speakers/logo_square/TAP.png',
    },
    {
      time: '2:00 PM',
      title: 'Rockville Little Theatre',
      image: 'assets/img/speakers/logo_square/RLT.png',
    },
    // {
    //   time: '3:00 PM',
    //   title: 'Port Tobacco Players',
    //   image: 'assets/img/speakers/logo_square/PTP.png',
    // },
    {
      time: '4:00 PM',
      title: 'Sterling Playmakers',
      image: 'assets/img/speakers/logo_square/SP.png',
    },
    {
      time: '5:00 PM',
      title: 'Prince William Little Theatre',
      image: 'assets/img/speakers/logo_square/PWLT.png',
    },
    {
      time: '6:00 PM',
      title: 'The Hard Bargain Players',
      image: 'assets/img/speakers/logo_square/HBP.png',
    },
    {
      time: '7:00 PM',
      title: 'Kensington Arts Theatre',
      image: 'assets/img/speakers/logo_square/KAT.png',
    },
    {
      time: '8:00 PM',
      title: 'Annapolis Summer Garden Theatre',
      image: 'assets/img/speakers/logo_square/ASGT.png',
    },
    {
      time: '09:00 PM',
      title: 'Thanks for watching!',
    },
  ],
});
// document.getElementById('venue').innerHTML = templates.venue();
// document.getElementById('hotels').innerHTML = templates.hotels();
// document.getElementById('gallery').innerHTML = templates.gallery();
// document.getElementById('supporters').innerHTML = templates.supporters();
// document.getElementById('faq').innerHTML = templates.faq();
// document.getElementById('subscribe').innerHTML = templates.subscribe();
// document.getElementById('buy-tickets').innerHTML = templates.buyTickets();
// document.getElementById('donate').innerHTML = templates.donate();
// document.getElementById('footer').innerHTML = templates.footer();
