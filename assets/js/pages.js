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
      website: 'https://summergarden.com/',
      email: 'info@summergarden.com',
      phone: null,
      facebook: null,
      twitter: null,
      instagram: null,
    },
    {
      name: 'The Arlington Players',
      desc: 'Arlington, VA',
      image: 'assets/img/speakers/tap.png',
      website: 'http://www.thearlingtonplayers.org/',
      email: 'tap@thearlingtonplayers.org',
      phone: '703-549-1063',
      facebook: 'https://www.facebook.com/TheArlingtonPlayers',
      twitter: 'https://twitter.com/TheArlPlayers',
      instagram: null,
    },
    {
      name: 'The City of Fairfax Theatre Company',
      desc: 'Fairfax, VA',
      image: 'assets/img/speakers/cftc.jpg',
      website: 'http://www.fairfaxcitytheatre.org/',
      email: 'fairfaxcitytheatre@gmail.com',
      phone: null,
      facebook: 'https://www.facebook.com/CityofFairfaxTheatre',
      twitter: 'https://twitter.com/CFTC_Fairfax',
      instagram: null,
    },
    {
      name: 'The Colonial Players of Annapolis',
      desc: 'Annapolis, MD',
      image: 'assets/img/speakers/cpa.png',
      website: 'http://thecolonialplayers.org/',
      email: 'info@thecolonialplayers.org',
      phone: '410-268-7373',
      facebook: 'https://www.facebook.com/thecolonialplayers',
      twitter: 'https://twitter.com/CFTC_Fairfax',
      instagram: null,
    },
    {
      name: 'The Hard Bargain Players',
      desc: 'Accokeek, MD',
      image: 'assets/img/speakers/hbp.jpg',
      website: 'https://hbplayers.wordpress.com/',
      email: 'hbpartisticdirector@gmail.com',
      phone: '301-653-4806',
      facebook: 'https://www.facebook.com/HardBargainPlayers',
      twitter: 'https://twitter.com/HBPlayers',
      instagram: null,
    },
    {
      name: 'Kensington Arts Theatre',
      desc: 'Kensington, MD',
      image: 'assets/img/speakers/kat.jpg',
      website: 'http://www.katonline.org/',
      email: 'PR@katonline.org',
      phone: '240-621-0528',
      facebook: 'https://www.facebook.com/kensingtonartstheatre',
      twitter: 'https://twitter.com/kensingtonarts',
      instagram: null,
    },
    {
      name: 'Laurel Mill Playhouse',
      desc: 'Laurel, MD',
      image: 'assets/img/speakers/lmp.jpg',
      website: 'https://www.laurelmillplayhouse.org/',
      email: 'maureencrogers@gmail.com',
      phone: '301-452-2557',
      facebook: 'https://www.facebook.com/groups/515696845110865',
      twitter: null,
      instagram: null,
    },
    // {
    //   name: 'Port Tobacco Players',
    //   desc: 'La Plata, MD',
    // },
    {
      name: 'Prince William Little Theatre',
      desc: 'Manassas, VA',
      image: 'assets/img/speakers/pwlt.png',
      website: 'https://www.pwlt.org/',
      email: 'info@pwlt.org',
      phone: '571-208-2560',
      facebook: 'https://www.facebook.com/PrinceWilliamLittleTheatre',
      twitter: 'https://twitter.com/PWLT1984',
      instagram: null,
    },
    {
      name: 'Reston Community Players',
      desc: 'Reston, VA',
      image: 'assets/img/speakers/rcp.jpg',
      website: 'https://restonplayers.org/',
      email: 'communityrelations@restonplayers.org',
      phone: null,
      facebook: 'https://www.facebook.com/restonplayers',
      twitter: 'https://twitter.com/RestonPlayers',
      instagram: null,
    },
    {
      name: 'Rockville Little Theatre',
      desc: 'Rockville, MD',
      image: 'assets/img/speakers/rlt.png',
      website: 'http://www.rlt-online.org/',
      email: 'info@rlt-online.org',
      phone: '240-242-9735',
      facebook:
        'https://www.facebook.com/Rockville-Little-Theatre-244869465561008',
      twitter: null,
      instagram: null,
    },
    {
      name: 'Silver Spring Stage',
      desc: 'Silver Spring, MD',
      image: 'assets/img/speakers/sss.png',
      website: 'http://www.ssstage.org/',
      email: 'contact@ssstage.org',
      phone: '301-593-6036',
      facebook: 'https://www.facebook.com/SilverSprStage',
      twitter: 'https://twitter.com/SilverSprStage',
      instagram: null,
    },
    {
      name: 'Sterling Playmakers',
      desc: 'Sterling, VA',
      image: 'assets/img/speakers/sp.png',
      website: 'https://www.sterlingplaymakers.org/',
      email: 'membership@sterlingplaymakers.org',
      phone: '703-437-6117',
      facebook: null,
      twitter: 'https://twitter.com/SPlaymakers',
      instagram: null,
    },
    {
      name: 'The Victorian Lyric Opera Company',
      desc: 'Rockville, MD',
      image: 'assets/img/speakers/vloc.jpg',
      website: 'http://www.vloc.org/',
      email: 'victorianlyricopera@gmail.com',
      phone: null,
      facebook: 'https://www.facebook.com/VictorianLyricOperaCompany',
      twitter: 'https://twitter.com/TheVLOC',
      instagram: null,
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
