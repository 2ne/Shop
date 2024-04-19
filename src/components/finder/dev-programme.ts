const Skills = [
  {
    level: 1,
    questions: [
      "Can they enter the water safely?",
      "Can they move forward for a distance of 5 metres?",
      "Can they move backwards for a distance of 5 metres?",
      "Can they move sideways for a distance of 5 metres?",
      "Can they scoop the water and wash the face?",
    ],
    media: [
      {
        type: "video",
        src: "./src/assets/enter-pool.mp4",
      },
      {
        type: "video",
        src: "./src/assets/swimming.mp4",
      },
    ],
  },
  {
    level: 2,
    questions: [
      "Can they jump in from poolside safely?",
      "Can they blow bubbles a minimum of three times with nose and mouth submerged?",
      "Can they move from a flat floating position on the back and return to standing without support?",
      "Can they move from a flat floating position on the front and return to standing without support?",
      "Can they push from a wall and glide on the back?",
    ],
  },
  {
    level: 3,
    questions: [
      "Can they jump in from poolside and submerge?",
      "Can they sink, push away from wall and maintain a streamlined position?",
      "Can they push and glide on the front with arms extended and log roll onto the back?",
      "Can they push and glide on the back with arms extended and log roll onto the front?",
      "Can they travel 5 metres on the front, perform a tuck to rotate onto the back and return on the back?",
    ],
  },
];

export default Skills;
