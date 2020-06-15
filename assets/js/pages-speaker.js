var templates = Handlebars.templates;
document.getElementById('header').innerHTML = templates.header();
document.getElementById(
  'speakers-details'
).innerHTML = templates.speakerDetails();
document.getElementById('footer').innerHTML = templates.footer();
