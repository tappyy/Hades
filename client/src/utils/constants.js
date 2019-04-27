export const dateFormat = 'Do MMMM YYYY - HH:mm'
export const searchResultsPerPage = 5;

// const TAGS = {
//   adult: "adult",
//   crypto: "crypto",
//   hacking: "hacking",
//   drugs: "drugs"
// }

export const tagDropdownOptions = [
  {
    key: 1,
    value: 'adult',
    text: 'Adult'
  },
  {
    key: 2,
    value: 'crypto',
    text: 'Crypto'
  },
  {
    key: 3,
    value: 'hacking',
    text: 'Hacking'
  },
  {
    key: 4,
    value: 'drugs',
    text: 'Drugs'
  },
  {
    key: 5,
    value: 'weapons',
    text: 'Weapons'
  },
]

export const ruleDropdownOptions = [
  {
    key: 1,
    value: 'keyword',
    text: 'Body Content'
  },
  {
    key: 2,
    value: 'tags',
    text: 'Tags'
  }
]

export const particleOptions = {
  "particles": {
    "number": {
      "value": 80,
      "density": {
        "enable": true,
        "value_area": 800
      }
    },
    "color": {
      "value": "#fff"
    },
    "shape": {
      "type": "circle",
      "stroke": {
        "width": 0,
        "color": "#fff"
      },
      "polygon": {
        "nb_sides": 5
      },
    },
    "opacity": {
      "value": 0.5,
      "random": false,
      "anim": {
        "enable": false,
        "speed": 1,
        "opacity_min": 0.1,
        "sync": false
      }
    },
    "size": {
      "value": 3,
      "random": true,
      "anim": {
        "enable": false,
        "speed": 40,
        "size_min": 0.1,
        "sync": false
      }
    },
    "line_linked": {
      "enable": true,
      "distance": 150,
      "color": "#fff",
      "opacity": 0.4,
      "width": 1
    },
    "move": {
      "enable": true,
      "speed": 2,
      "direction": "none",
      "random": false,
      "straight": false,
      "out_mode": "out",
      "bounce": false,
      "attract": {
        "enable": false,
        "rotateX": 600,
        "rotateY": 1200
      }
    }
  },
  "retina_detect": true
}

export const toast_types = {
  INFO: 'info',
  SUCCESS: 'success',
  WARNING: 'warning',
  ERROR: 'error'
}

export const toast_icons = {
  info: 'info',
  success: 'check',
  warning: 'warning',
  error: 'warning'
}