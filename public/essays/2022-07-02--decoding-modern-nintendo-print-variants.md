---
publish_date: 2022-07-02
title: Decoding Modern Nintendo Print Variants
description: Gone are the days of memorizing every dot on a box; in are the days
  of standardized print data!
---

With the release of GameCube and DS, Nintendo made identifying game prints much easier. While they still use(d) major revision differences in "player's choice," they also began using new data points in the form of UPC satellite codes and product codes. These are typically positioned very close to the game's primary UPC on the back of a case/box.

Thankfully, these codes have persisted even to the most recent generation of games, so they appear here to stay!

In this article, I'll show you how to read this information on your game to identify the exact print run you own, including its region of manufacture and intended locale. It's taken me some time to understand the nuances of how Nintendo annotates their games, and now that I think I have a decent grasp of it, I'm here to share the goodness.

If you see any information that looks inaccurate, feel free to reach out (email at the end of the post).

## Game Data Breakdown

Let's start with _Hyrule Warriors_ on the Switch as a reference:

![Hyrule Warriors for Nintendo Switch game case showing model part number, satellite, and product codes.](/uploads/upc-info.jpg)

Let's explain these details a bit:

- **Part (variant) code:** This is a unique identifier for the specific iteration of a game. For first and second party Nintendo games, this is a numerical value (five to six digits) representing the form of the game (e.g., retail standalone, limited edition, etc), followed by a single letter suffix, indicating the production revision. The revision suffix will always be in order, starting at `A` (first print), then to `B`, and so on.
- **Satellite code**: A simple five-digit code denoting the region of production (third digit) and iteration of the game (0, 1, 2, etc). You'll often see the revision suffix in the product code correlate to this value, but not always.
- **Model Part # (MPN)**: Similar to the product code, this is a custom code used to track the game on the open market. What's useful for our purposes is that it also denotes the intended region of distribution, e.g., `USA` (USA specific), `USZ` (USA and Canada/Mexico), or `CAN` (Canada), to name a few.
- **Country of manufacture**: The physical country/region the game was manufactured in. For most games, Japan or USA. This should match the middle digit of the satellite code (`0` is USA, `1` is Japan), although there are exceptions (we'll cover that in a few moments).

## Examples

First, let's take a look at the anatomy of a UPC label on modern Nintendo games.

![Pokemon UltraMoon manufacturing and product info, highlighting the satellite and product codes.](/uploads/pokemon-ultra-moon-revision.jpg)

Although you can't see the rest of the game, this is a standard retail version of _Pokemon UltraMoon_. Based on the info we already talked about, the B on the product code denotes this as a revision, aka the second printing of the retail copy. The 1 on the satellite code confirms that as well, in addition to its country of manufacture (Japan) and distribution (USA).

Here are additional examples on various Nintendo consoles. It's always the same combination of data, but laid out slightly different.

### Nintendo GameCube

![Nintendo GameCube print details on the back and bottom of the game.](/uploads/img-0048.jpg)

_The Legend of Zelda: The Wind Waker_, retail first print, made in and distributed in USA.

Something interesting of note on GameCube is that these product codes didn't start until shortly after GameCube's launch. That's why you'll see release titles, such as Super Smash Bros. Melee, have only the satellite code.

GameCube product codes are sometimes to the far left on the bottom, but occasionally are located right above the main UPC, under the "WARNING" label.

### Nintendo DS

![Nintendo DS print details aligned completely to the right of the UPC](/uploads/pokemon_white_2.jpg)

_Pokemon White 2 Version_, retail first print, made in Japan, distributed in USA.

### Nintendo 3DS

![Nintendo 3DS print details aligned completely to the right of the UPC](/uploads/pokemon-ultra-moon.jpg)

_Pokemon UltraMoon_, retail first print, made in Japan, distributed in USA.

### Nintendo Wii

![Nintendo Wii print details with product code on the left of the UPC, and satellite code on the right.](/uploads/skyward-sword.jpg)

_The Legend of Zelda: Skyward Sword_ for Nintendo Wii, retail first print, made in USA, distributed in USA and Canada (English, French, and Spanish packaging).

### Nintendo Wii U

![Nintendo Wii U print details just above the UPC.](/uploads/super-smash-wii-u.jpg)

_Super Smash Bros for Wii U_, retail first print, made in USA, distributed in USA and Canada (English, French, and Spanish packaging).

### Switch

![Nintendo Switch print details above and to the right of the UPC.](/uploads/smash_ultimate.jpg)

_Super Smash Bros Ultimate_ for Switch, retail first print, Made in Japan, distributed in Canada (see `CAN` MPN suffix). Notice that the product code here ends with `2A`, whereas on the USA print, it ends with `1A`.

### Gotchas

Although you might find a game that is the initial release, be careful: not all "first" prints are equal.

An example gotcha here is _The Legend of Zelda: Breath of the Wild_. It had a standalone retail release in addition to a bundled NFR version, on March 3rd, 2017. The latter of which was actually _re-used_ in the Explorer's Edition, which released on November 23rd, 2017.

Another scenario to be careful about is when there are multiple printings of a game across countries. A good example here is Super Smash Bros Melee, where available [print dates on redump](http://redump.org/disc/6910/) indicate Japan had been manufacturing the game roughly one week ahead of the USA (11/2/2001 and 11/8/2001, respectively). The caveats here being: this data is limited to the dumps available, and Japan and USA pressings of the game overlap starting when the USA factories began operating.

The takeaway here: always compare variants with the data available. Complete in box listings are great resources for this.

## Errors, Inconsistencies, and Bundles

Like all things, there have been and will be exceptions/mistakes where...

- A game is produced with the wrong info but the error was noticed too late in the production process, resulting in "error" copies. This can affect not just packaging details but the manufacturing data too (see examples below).
- The "first print" never actually hits the open market because of a production issue, resulting in the "second" print being the true "first" print.
- Third parties don't always respect the product code patterns on their first party game counterparts
- "Mismatching" product codes on a limited edition outer box compared to the pack-in game; they do not always match!

Let's look at some examples.

### Third-Party UPC

![Shows third-party published game missing satellite code and revision suffix on product code](/uploads/kingdom-hearts.jpg)

On _Kingdom Hearts: 358/2 Days_ for DS, third party publisher Square Enix omitted the revision suffix in the product code and entirely omitted the satellite code.

### "Missing" Product code

![Shows Metroid Prime: Hunters second print; first print never left the factory, likely due to an error.](/uploads/metroid_prime_hunters.jpg)

On _Metroid Prime: Hunters_ for DS, Nintendo never printed a version of the game with the product code `57096A`, which means `57096B` is the "first" print. As far as I have found, the "A" code doesn't exist. Again, likely an error during production that was caught quickly and thrown out.

### Incorrect Codes

![Bayonetta 2 on Wii U has mismatching satellite code versus country of manufacture](/uploads/bayonetta-2-wii-u.jpg)

On _Bayonetta 2_ for Wii U (2nd party developed), there is a `00000` satellite code accompanied by "Made in USA." I asked [ModernDB](https://www.instagram.com/Moderndatabase/), and apparently the publisher made this error on multiple games around this time.

### Bundles

![Boxed Wii U game bundle has locale text and product code, but no satellite code](/uploads/super-smash-bros-wii-u-bundle.jpg)

On _Super Smash Bros_ for Wii U (the controller bundle version) there is no satellite code, however the game on the inside _will_ have a satellite code, with product code 83665A. Since it's a bundle it'll also say "Not For Resale," of course.

The above pattern isn't a fast and hard rule for all bundles, though.

For instance, Pokemon HeartGold and SoulSilver (Pokewalker bundle) have all the critical info on the outer box, but the game inside simply says "Not For Resale" and no UPCs or product codes to be seen, just an MPN.

Ultimately, like all things in the world of data and commerce, your mileage may vary. To make matters more complicated, this information is likely to change in the future as inventory/product indexing methods advance.

## Conclusion

I hope this has been a helpful introduction to the concept of modern Nintendo game print variants. There really isn't any magic here; it's all about understanding the data distributors and even Nintendo use to track their products. Huge shoutout to the fine folks at [VideoGameSage](https://videogamesage.com) and in [SACK](https://discord.gg/Jcz7Vt48RQ) (Sealed and Collectibles Knowledge) as well for helping me understand this finicky subject.

Lastly, one more tip: I recommend perusing eBay to compile a list of product codes/variant data. There is a high chance the game you're interested in researching has dozens, if not hundreds of online listings.

(09/09/2022) Correction: changed introduction to note product codes started with GameCube.

(09/19/2022) Correction: specifies the correct pack-in product code for Super Smash Bros. for Wii U; Addition: adds GameCube game example and explainer; Addition: "Gotchas" section for first prints.
