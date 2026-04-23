export const trip = {
  name: "Quiet Arrow",
  subtitle: "Lake Arrowhead getaway",
  dates: {
    start: "2026-04-30T12:00:00-07:00",
    end: "2026-05-03T13:00:00-07:00",
  },
  anchor: {
    title: "1042 Inspiration Drive, Lake Arrowhead",
    detail:
      "Cabin anchor updated from your booking screenshot: 1042 Inspiration Drive. Nearby picks are now framed from the house instead of from a generic Village center point.",
    address: "1042 Inspiration Drive, Lake Arrowhead, CA 92352",
    directionsUrl:
      "https://maps.apple.com/?address=1042%20Inspiration%20Drive,%20Lake%20Arrowhead,%20CA%2092352",
    airbnbUrl:
      "https://www.airbnb.com/rooms/1339834556963667356?unique_share_id=7950aa1b-0657-40df-93d3-87cdf2fcd092&viralityEntryPoint=1&s=76",
  },
  reminders: {
    checkIn:
      "Thursday, April 30 at 3:00 PM: grocery stop first if needed, then get the pugs settled at 1042 Inspiration Drive before anything else.",
    checkOut:
      "Sunday, May 3 at 11:00 AM: start a light tidy in the morning so checkout stays calm.",
  },
  weather: {
    summary:
      "Seeded mountain-weather placeholder based on seasonal norms. Expect cool mornings, mild afternoons, and chilly evenings. Swap this object for live API data later.",
    days: [
      { label: "Thu", condition: "Sun + clouds", high: 66, low: 45 },
      { label: "Fri", condition: "Clear", high: 68, low: 46 },
      { label: "Sat", condition: "Partly cloudy", high: 67, low: 47 },
      { label: "Sun", condition: "Bright + breezy", high: 65, low: 44 },
    ],
  },
  pugReminders: [
    "Short sniff walk before each writing block",
    "Portable water bowl within reach in the car and on the deck",
    "Midday downtime counts as an activity",
  ],
};

export const itinerary = [
  {
    id: "thu",
    label: "Thursday",
    dateLabel: "April 30",
    dayIndex: 0,
    periods: {
      morning:
        "Leave without rushing. Coffee, final pack check, and one solid pug walk before heading up.",
      afternoon:
        "Stop at Stater Bros or Jensen's first, then head to 1042 Inspiration Drive for check-in, unloading, and a full dog decompression window before anything else.",
      evening:
        "Grill rosemary-garlic chicken thighs, corn, and potatoes. Keep the night soft with light writing notes only.",
      optional:
        "If you have energy, do a quick village stroll for orientation and snacks.",
      notes:
        "Arrival day should feel like exhale, not admin. The win condition is being stocked, fed, and settled.",
    },
    blocks: [
      { time: "1:30 PM", title: "Grocery stop", type: "grocery" },
      { time: "3:30 PM", title: "Check-in + dog decompression", type: "pugs" },
      { time: "6:30 PM", title: "First grill dinner", type: "meal" },
      { time: "8:30 PM", title: "Low-stakes writing notes", type: "writing" },
    ],
    writing: "8:30 PM light notes, scene cards, and zero drafting pressure.",
  },
  {
    id: "fri",
    label: "Friday",
    dateLabel: "May 1",
    dayIndex: 1,
    periods: {
      morning:
        "Sleep in, slow coffee, deck air, and a very casual pug walk. No alarms unless absolutely needed.",
      afternoon:
        "Primary writing session after brunch. Later, head into the Village or Blue Jay for coffee, supplies, or a relaxed browse if leaving the cabin sounds better than staying in.",
      evening:
        "Grill steak, asparagus, and garlic bread. Sunset dog hang, then either a movie or a read-through.",
      optional:
        "Tea & Coffee Exchange, lake views in the Village, or simply staying put if the cabin is winning.",
      notes:
        "This is the main page-count day. Keep the energy pointed toward fresh material before the day gets social.",
    },
    blocks: [
      { time: "9:30 AM", title: "Slow morning with the pugs", type: "pugs" },
      { time: "11:00 AM", title: "Deep writing block", type: "writing" },
      { time: "2:30 PM", title: "Coffee or scenic wander", type: "optional" },
      { time: "6:45 PM", title: "Steak night", type: "meal" },
    ],
    writing: "11:00 AM focused writing, ideally 90 minutes with a 50-minute timer first.",
  },
  {
    id: "sat",
    label: "Saturday",
    dateLabel: "May 2",
    dayIndex: 2,
    periods: {
      morning:
        "Another deliberate sleep-in. Breakfast at the cabin, then a gentler revision or outlining session.",
      afternoon:
        "Open-ended dog-friendly outing or cozy cabin loafing. Protect the fact that downtime is the point.",
      evening:
        "Classic cheeseburgers with grilled onions and zucchini. Good drinks, easy cleanup, low social pressure.",
      optional:
        "North Shore trail look, Lake Gregory detour, or pastries and back to the couch.",
      notes:
        "Saturday is the flex day. The plan is intentionally roomy so the weekend still feels restorative.",
    },
    blocks: [
      { time: "10:00 AM", title: "Sleep in and brunch", type: "meal" },
      { time: "11:30 AM", title: "Revision / outline block", type: "writing" },
      { time: "3:00 PM", title: "Dog-friendly stop or nap", type: "pugs" },
      { time: "5:45 PM", title: "Burger grill night", type: "meal" },
    ],
    writing: "11:30 AM lighter script work: revise, outline, or punch dialogue.",
  },
  {
    id: "sun",
    label: "Sunday",
    dateLabel: "May 3",
    dayIndex: 3,
    periods: {
      morning:
        "Final lazy morning with coffee, leftovers, and one last slow deck session with the dogs.",
      afternoon:
        "Pack in stages, wipe down the kitchen, and leave without scrambling.",
      evening:
        "Home again, hopefully with a few script pages, fewer tabs open in your brain, and tired happy pugs.",
      optional:
        "Grab pastries or road snacks on the way out only if that sounds nice.",
      notes:
        "Checkout days turn ugly when they get rushed. Keep the pace calm all the way to the car.",
    },
    blocks: [
      { time: "9:30 AM", title: "Final coffee + pug hang", type: "pugs" },
      { time: "10:30 AM", title: "Pack and tidy", type: "check-out" },
      { time: "12:00 PM", title: "Optional snack stop", type: "optional" },
      { time: "1:00 PM", title: "Drive out", type: "travel" },
    ],
    writing: "No heavy writing today. Capture last-minute ideas in notes before you leave.",
  },
];

export const recipes = [
  {
    id: "chicken",
    title: "Rosemary-Garlic Chicken Thighs",
    prep: "15 min + optional marinate",
    grill: "12-14 min",
    fit: "Perfect first-night meal: forgiving, flavorful, and low stress after the drive.",
    ingredients: [
      "1.5-2 lb boneless chicken thighs",
      "2 lemons",
      "4 garlic cloves",
      "2 tbsp olive oil",
      "2 tsp chopped rosemary",
      "Salt and black pepper",
      "Corn and baby potatoes on the side",
    ],
    steps: [
      "Toss chicken with oil, lemon juice, garlic, rosemary, salt, and pepper.",
      "Grill over medium-high heat for 5-7 minutes per side.",
      "Serve with grilled corn and foil-pack potatoes.",
    ],
  },
  {
    id: "steak",
    title: "Steak with Asparagus and Garlic Bread",
    prep: "10 min",
    grill: "8-12 min",
    fit: "Feels like a cabin treat without adding complexity or cleanup.",
    ingredients: [
      "2 ribeyes or New York strips",
      "1 bunch asparagus",
      "1 loaf crusty bread",
      "Butter",
      "Garlic",
      "Parsley",
      "Salt, pepper, chili flakes",
    ],
    steps: [
      "Season steaks well and let them sit while the grill heats.",
      "Grill asparagus with oil, salt, pepper, and chili flakes until crisp-tender.",
      "Butter the bread, add garlic and parsley, then toast it on the grill.",
    ],
  },
  {
    id: "burgers",
    title: "Classic Cheeseburgers with Grilled Onions",
    prep: "15 min",
    grill: "10 min",
    fit: "Easy final-night comfort food with leftovers that actually help on Sunday.",
    ingredients: [
      "1.5 lb ground beef or 4 patties",
      "Cheddar slices",
      "Burger buns",
      "Yellow onion",
      "Zucchini",
      "Lettuce, tomato, pickles",
      "Mustard and mayo",
    ],
    steps: [
      "Season patties simply with salt and pepper.",
      "Grill onions and zucchini alongside the burgers.",
      "Melt cheddar on the patties and toast the buns before building.",
    ],
  },
  {
    id: "breakfast",
    title: "Cabin Breakfast Sandwiches",
    prep: "10 min",
    grill: "0 min",
    fit: "Fast, cozy, and realistic for slow mornings before a writing block.",
    ingredients: [
      "Eggs",
      "Bagels or English muffins",
      "Cheese slices",
      "Butter",
      "Hot sauce if you want it",
    ],
    steps: [
      "Toast the bread, scramble or fry the eggs, and layer with cheese.",
      "Eat on the deck with coffee and do not schedule anything ambitious for 30 minutes.",
    ],
  },
];

export const groceryGroups = [
  {
    title: "Produce",
    items: [
      "2 lemons",
      "1 head garlic",
      "1 bunch rosemary",
      "1 bunch parsley",
      "1 bag baby potatoes",
      "4 ears corn",
      "1 bunch asparagus",
      "2 zucchini",
      "2 yellow onions",
      "1 tomato",
      "1 head lettuce",
    ],
  },
  {
    title: "Meat / Protein",
    items: [
      "Boneless chicken thighs",
      "2 steaks",
      "Ground beef or burger patties",
      "Eggs",
    ],
  },
  {
    title: "Dairy",
    items: [
      "Cheddar slices",
      "Butter",
      "Half-and-half or oat milk",
    ],
  },
  {
    title: "Pantry",
    items: [
      "Olive oil",
      "Salt",
      "Black pepper",
      "Chili flakes",
      "Mustard",
      "Mayonnaise",
      "Pickles",
      "Hot sauce",
    ],
  },
  {
    title: "Buns / Bread",
    items: [
      "Burger buns",
      "Crusty bread",
      "Bagels or English muffins",
    ],
  },
  {
    title: "Snacks",
    items: [
      "Potato chips",
      "Sparkling water",
      "Trail mix or nuts",
      "Something sweet for late writing sessions",
    ],
  },
  {
    title: "Drinks",
    items: [
      "Coffee",
      "Still water",
      "Favorite evening drink",
    ],
  },
  {
    title: "Dog-related",
    items: [
      "Treats",
      "Extra waste bags",
      "Portable water bowl",
    ],
  },
  {
    title: "Misc Cabin Basics",
    items: [
      "Foil for grill packets",
      "Paper towels",
      "Dish soap if needed",
      "Firestarter or lighter if the grill setup is fussy",
    ],
  },
];

export const places = [
  {
    id: "stater",
    name: "Stater Bros. Markets",
    category: "Groceries",
    time: "About 8-10 min from the cabin",
    useful: "Best first-stop grocery run before check-in, with strong basics for grill nights and later hours.",
    address: "28100 CA-189, Lake Arrowhead, CA 92352",
    url: "https://maps.apple.com/?address=28100%20CA-189,%20Lake%20Arrowhead,%20CA%2092352",
  },
  {
    id: "jensens",
    name: "Jensen's Foods",
    category: "Groceries + bakery",
    time: "About 10-12 min",
    useful: "Great backup or splurge stop with bakery, nicer provisions, and an easy Blue Jay errand loop.",
    address: "27264 CA-189, Blue Jay, CA 92317",
    url: "https://maps.apple.com/?address=27264%20CA-189,%20Blue%20Jay,%20CA%2092317",
  },
  {
    id: "tea-coffee",
    name: "Tea & Coffee Exchange",
    category: "Coffee",
    time: "About 8-10 min",
    useful: "Easy Village coffee stop with pastries and a scenic walk right after pickup.",
    address: "28200 CA-189, Suite S-250, Lake Arrowhead, CA 92352",
    url: "https://maps.apple.com/?address=28200%20CA-189%20Suite%20S-250,%20Lake%20Arrowhead,%20CA%2092352",
  },
  {
    id: "starbucks",
    name: "Starbucks at Blue Jay",
    category: "Coffee",
    time: "About 10-12 min",
    useful: "Predictable coffee run if you just need caffeine and zero decision-making.",
    address: "27264 CA-189, Blue Jay, CA 92317",
    url: "https://maps.apple.com/?address=27264%20CA-189,%20Blue%20Jay,%20CA%2092317",
  },
  {
    id: "stone-creek",
    name: "Stone Creek Bistro",
    category: "Casual dinner",
    time: "About 10-12 min",
    useful: "Good fallback dinner if you decide not to grill one night.",
    address: "26824 CA-189, Blue Jay, CA 92317",
    url: "https://maps.apple.com/?address=26824%20CA-189,%20Blue%20Jay,%20CA%2092317",
  },
  {
    id: "taproom",
    name: "The Lakefront Taproom Bar & Kitchen",
    category: "Casual restaurant",
    time: "About 8-10 min",
    useful: "Village option with a lakefront setting when you want to be out without overcommitting.",
    address: "27984 CA-189 Unit E-200, Lake Arrowhead, CA 92352",
    url: "https://maps.apple.com/?address=27984%20CA-189%20Unit%20E-200,%20Lake%20Arrowhead,%20CA%2092352",
  },
  {
    id: "village",
    name: "Lake Arrowhead Village",
    category: "Scenic / stroll",
    time: "About 8-10 min",
    useful: "The easiest scenic wander from the cabin, with snacks, lake views, and a low-effort outing.",
    address: "28200 CA-189, Lake Arrowhead, CA 92352",
    url: "https://maps.apple.com/?address=28200%20CA-189,%20Lake%20Arrowhead,%20CA%2092352",
  },
  {
    id: "heaps-peak",
    name: "Heaps Peak Arboretum",
    category: "Dog-friendly outing",
    time: "About 18-20 min",
    useful: "An easier leash-friendly nature stop if the pugs want fresh air without committing to a longer trail day.",
    address: "Heaps Peak Arboretum Trail 3W05, Skyforest area",
    url: "https://maps.apple.com/?q=Heaps%20Peak%20Arboretum",
  },
];

export const packing = [
  {
    title: "Essentials",
    items: ["Wallet and ID", "Keys", "Prescription meds", "Comfy layers", "Sleep clothes"],
  },
  {
    title: "Food + Grill",
    items: ["Cooler bag", "Tongs", "Foil", "Seasonings if cabin is sparse", "Reusable water bottle"],
  },
  {
    title: "Writing Gear",
    items: ["Laptop", "Charger", "Notebook", "Headphones", "Any printed pages"],
  },
  {
    title: "Chargers / Tech",
    items: ["Phone charger", "Watch charger", "Portable battery", "Car charger"],
  },
  {
    title: "Cabin Nice-to-haves",
    items: ["Slippers", "Throw blanket", "Book", "Fireplace starter if wanted"],
  },
];

export const pugChecklist = [
  {
    title: "Dog Gear",
    items: ["Food", "Bowls", "Leashes", "Harnesses", "Waste bags", "Treats"],
  },
  {
    title: "Comfort",
    items: ["Favorite blanket", "Towels for muddy paws", "Portable water bowl", "Wipes"],
  },
  {
    title: "Daily Reminders",
    items: ["Morning potty walk", "Midday rest", "Evening sniff time", "Keep fresh water visible"],
  },
];
