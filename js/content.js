/* ============================================================
   MOVEMENT CHURCH — CONTENT
   ------------------------------------------------------------
   This is the only file you need to touch to change what the
   site says. It holds no logic — just lists of text and photos.

   Rules of thumb:
     • Keep the quotes "like this" around every piece of text.
     • Keep the commas between items.
     • If you add a photo, drop the file into the img/ folder
       first, then reference it as "img/yourfile.jpg".
     • &mdash; makes a long dash (—). &rsquo; makes an apostrophe (’).
       Plain ' and - work fine too.

   If the page ever goes blank after an edit, you almost
   certainly dropped a comma or a quote mark. Open the browser
   console (Right-click → Inspect → Console) and it will tell
   you which line.
   ============================================================ */

var CONTENT = {

  /* ----------------------------------------------------------
     1. THE PHOTO RAIL
     The draggable row of photos, and the viewer that opens
     when you tap one.
       file    – the image, inside the img/ folder
       caption – what shows along the bottom of the card
     Reorder these lines to reorder the rail.
     ---------------------------------------------------------- */
  photos: [
    { file: "img/baptism.jpg",      caption: "Baptism Sunday &mdash; up out of the water" },
    { file: "img/doors.jpg",        caption: "Walking in on a Sunday morning" },
    { file: "img/room.jpg",         caption: "The room, mid-service" },
    { file: "img/crowd.jpg",        caption: "Hands up in the back half" },
    { file: "img/singer.jpg",       caption: "Leading worship on a Sunday" },
    { file: "img/pray.jpg",         caption: "Praying through a song" },
    { file: "img/team.jpg",         caption: "The Club56 team, getting set up" },
    { file: "img/camera.jpg",       caption: "Our camera team working the floor" },
    { file: "img/welcome.jpg",      caption: "Coffee from the cafe" },
    { file: "img/handlight.jpg",    caption: "A hand raised during worship" },
    { file: "img/congregation.jpg", caption: "A full room on a Sunday" },
    { file: "img/prayer2.jpg",      caption: "Praying for each other at the front" },
    { file: "img/watoto-choir-1.jpg", caption: "The Watoto Children&rsquo;s Choir, visiting on a Sunday", alt: "The visiting Watoto Children&rsquo;s Choir performing on stage at Movement Church" },
    { file: "img/candle.jpg",       caption: "Candles up at Christmas" }
        
  ],


  /* ----------------------------------------------------------
     2. THE SERVICE TIMES
     Used by the planner to work out arrival and finish times.
     ---------------------------------------------------------- */
  services: [
    { label: "9:00 AM",  arrive: "8:45 AM",  out: "about 10:15 AM" },
    { label: "11:00 AM", arrive: "10:45 AM", out: "about 12:15 PM" }
  ],

  /* How long a service runs. Shown in the "Out by" line. */
  serviceLength: "about 70 minutes",


  /* ----------------------------------------------------------
     3. THE PLANNER OPTIONS
     One entry per button under "Who's coming with you?".
       label – the button text
       title – the heading on the result card
       photo – the picture on the result card
       walk  – the "Walk in" line
       kids  – the "Your kids" line
       note  – the sentence at the bottom of the card
     You can use <b>bold</b> inside walk / kids / note.
     ---------------------------------------------------------- */
  plans: [
    {
      label: "Just me",
      title: "Walking in on your own",
      photo: "img/doors.jpg",
      walk:  "Front doors. There&rsquo;s a team in lanyards who will spot you and walk you in.",
      kids:  "Not applicable &mdash; it&rsquo;s just you.",
      note:  "Sitting alone is completely normal here, and nobody will make you stand up or introduce yourself."
    },
    {
      label: "Me + little kids",
      title: "Coming with little ones",
      photo: "img/welcome.jpg",
      walk:  "Kids check-in kiosk, just inside the lobby. It takes about two minutes.",
      kids:  "<b>Newborn to Grade 4</b> get checked in and you get a matching pickup tag. They have their own service.",
      note:  "Movement Kids runs at both services, so whichever one you pick, they&rsquo;re covered."
    },
    {
      label: "With a teenager",
      title: "Bringing a teenager",
      photo: "img/pray.jpg",
      walk:  "Front doors together. Grades 5&ndash;6 have Club 56; Grades 7&ndash;12 sit in the main service.",
      kids:  "<b>Grades 5 &amp; 6</b> head to Club 56. <b>Grades 7&ndash;12</b> stay with you, then connect at Youth midweek.",
      note:  "If they&rsquo;d rather not talk to anyone on day one, that&rsquo;s genuinely fine. No one will corner them."
    },
    {
      label: "The whole crew",
      title: "Bringing everybody",
      photo: "img/room.jpg",
      walk:  "Kids check-in first, then grab a coffee and find seats together.",
      kids:  "<b>Newborn&ndash;Grade 4</b> to Movement Kids, <b>Grade 5&ndash;6</b> to Club 56, <b>Grade 7+</b> in with you.",
      note:  "Give yourself the full 15 minutes &mdash; check-in plus coffee plus finding seats goes quicker than you think."
    }
  ],


  /* ----------------------------------------------------------
     4. THE MINISTRY TILES
     The six squares under "Everyone gets somewhere to land".
       age   – the small line above the name
       name  – the heading
       text  – shows when someone taps the tile
       url   – where a second tap sends them
     ---------------------------------------------------------- */
  ministries: [
    {
      photo: "img/movement-kids-checkin.jpg",
      alt:   "A Movement Kids volunteer welcoming a family at the kids check-in desk",
      age:   "Newborn &ndash; Grade 4",
      name:  "Movement Kids",
      text:  "Safe, loud and genuinely fun. Secure check-in at both services, with a team your kids will talk about all week.",
      url:   "kids.html"
    },
    {
      photo: "img/team.jpg",
      age:   "Grades 5 &amp; 6",
      name:  "Club 56",
      text:  "The in-between years get their own room &mdash; for the age where kids&rsquo; church feels young and youth feels big.",
      url:   "club56.html"
    },
    {
      photo: "img/worship.jpg",
      age:   "Grades 7 &ndash; 12",
      name:  "Movement Youth",
      text:  "Students who actually want to be here. Worship, small groups, camps, and leaders who know their names.",
      url:   "youth.html"
    },
    {
      photo: "img/hug.jpg",
      age:   "All ages",
      name:  "Groups",
      text:  "Church gets small around a kitchen table. Groups meet across Woodstock through the week &mdash; drop into any of them.",
      url:   "groups.html"
    },
    {
      photo: "img/prayer2.jpg",
      age:   "Whenever you need it",
      name:  "Care",
      text:  "Grief, marriage, a hospital stay, a week that fell apart. Pastor Ken and the care team are here. Just reach out.",
      url:   "care.html"
    },
    {
      photo: "img/handlight.jpg",
      age:   "Serve",
      name:  "Teams",
      text:  "Cameras, worship, kids, hospitality, parking. The fastest way to stop feeling new here is to get on a team.",
      url:   "teams.html"
    }
  ]

};
