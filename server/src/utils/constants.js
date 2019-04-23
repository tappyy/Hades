const BCRYPT_SECRET = 'bF9yWtgQBorzkjgKRONs'
const MONGO_CONNECTION_STRING = 'mongodb://localhost:27020'
const ELASTIC_CONNECTION_STRING = 'localhost:9200'
const SERVER_PORT = 9000
const RESULTS_PER_PAGE = 5
const SNIPPET_LENGTH = 25

const ADULT_KEYWORDS = [
  "porn",
  "pornography",
  "adult",
  "celebrity"
]
const CRYPTO_KEYWORDS = [
  "bitcoin",
  "crypto",
  "monero"
]
const HACKING_KEYWORDS = [
  "leaked",
  "hacked",
  "hack",
  "passwords",
  "exploit"
]
const DRUGS_KEYWORDS = [
  "drugs",
  "weed",
  "marijuana",
  "cannabis",
  "cocaine",
  "ketamine",
  "pills",
  "heroin",
  "acid",
  "meth",
  "amphetamine"
]
const WEAPONS_KEYWORDS = [
  "firearms",
  "fire arms",
  "weapons",
  "guns",
  "rifle",
  "pistol",
  "handgun",
  "shotgun",
  "ammo",
  "ammunition"
]

const KEYWORDS = {
  adult: ADULT_KEYWORDS,
  crypto: CRYPTO_KEYWORDS,
  hacking: HACKING_KEYWORDS,
  drugs: DRUGS_KEYWORDS,
  weapons: WEAPONS_KEYWORDS
}

const TAGS = {
  adult: "adult",
  crypto: "crypto",
  hacking: "hacking",
  drugs: "drugs",
  weapons: "weapons"
}

const ELASTIC_CONFIG = {
  pagesIndex: 'pages',
  pagesType: 'page'
}

module.exports = {
  BCRYPT_SECRET: BCRYPT_SECRET,
  MONGO_CONNECTION_STRING: MONGO_CONNECTION_STRING,
  ELASTIC_CONNECTION_STRING: ELASTIC_CONNECTION_STRING,
  ELASTIC_CONFIG,
  SERVER_PORT: SERVER_PORT,
  KEYWORDS: KEYWORDS,
  TAGS: TAGS,
  RESULTS_PER_PAGE: RESULTS_PER_PAGE,
  SNIPPET_LENGTH: SNIPPET_LENGTH
}