/*jslint eqeq: true*/

// GENERATED FILE, DO NOT COPY INTO PROJECT
// THIS IS SOLELY FOR THE DUMMY APP SINCE IT
// DOES NOT GO THROUGH THE BROCCOLI PLUGIN
// WHICH PARSES OUT THE CLDR DATA BELOW
export default {
    locale: "fr",
    fields: { year: { displayName: "année", relative: { "0": "cette année", "1": "l’année prochaine", "-1": "l’année dernière" }, relativeTime: { future: { one: "dans {0} an", other: "dans {0} ans" }, past: { one: "il y a {0} an", other: "il y a {0} ans" } } }, month: { displayName: "mois", relative: { "0": "ce mois-ci", "1": "le mois prochain", "-1": "le mois dernier" }, relativeTime: { future: { one: "dans {0} mois", other: "dans {0} mois" }, past: { one: "il y a {0} mois", other: "il y a {0} mois" } } }, day: { displayName: "jour", relative: { "0": "aujourd’hui", "1": "demain", "2": "après-demain", "-1": "hier", "-2": "avant-hier" }, relativeTime: { future: { one: "dans {0} jour", other: "dans {0} jours" }, past: { one: "il y a {0} jour", other: "il y a {0} jours" } } }, hour: { displayName: "heure", relativeTime: { future: { one: "dans {0} heure", other: "dans {0} heures" }, past: { one: "il y a {0} heure", other: "il y a {0} heures" } } }, minute: { displayName: "minute", relativeTime: { future: { one: "dans {0} minute", other: "dans {0} minutes" }, past: { one: "il y a {0} minute", other: "il y a {0} minutes" } } }, second: { displayName: "seconde", relative: { "0": "maintenant" }, relativeTime: { future: { one: "dans {0} seconde", other: "dans {0} secondes" }, past: { one: "il y a {0} seconde", other: "il y a {0} secondes" } } } },
    pluralRuleFunction: function (n, ord) {
      if (ord) return n == 1 ? "one" : "other";return n >= 0 && n < 2 ? "one" : "other";
    }
};
