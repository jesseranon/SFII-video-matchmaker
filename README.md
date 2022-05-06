# Street Fighter II Video Matchmaker
A clone of the SFII character select screen allows users to choose two fighters and watch a match between the chosen characters.

**Link to project:** https://efficacious-sudden-smoke.glitch.me/

<img width="1287" alt="sfii" src="https://user-images.githubusercontent.com/5935095/167144136-9a018337-9689-4f96-bc9c-d6b80ff5baec.png">

## How It's Made:

**Tech used:** HTML, CSS, JavaScript

This app makes use of many transparent png sprites and a few javascript listeners to push a single div around the map to display a colored flag.  Sound objects are created for hovering on a different character and choosing a character to enchance immersion along with the retro TV frame.

## Lessons Learned:

Use of JavaScript objects to store information for use of making listeners.  In order to make the character select interactive, I had to create grids of listener divs that were offset just enough to allow 1P/2P frames to float perfectly over a fighter portrait.  Figuring out how to get the click function to select the correct fighter was also another sticking point as I was not well-versed in event listeners.  It ended up being that the chosen fighter was tied to the mouseover listener and locked into place by the click event not allowing the mouseover listener to operate on the chosen character.

Even generating the 2P portrait involved a bit of spriting to isolate the name plate so that only the character's bust flipped horizontally.

I also learned that iFrame src can be populated dynamically.

All in all I learned that character select screens are complicated affairs and came away with an appreciation for the design.
