/*jslint eqeq: true*/

// GENERATED FILE, DO NOT COPY INTO PROJECT
// THIS IS SOLELY FOR THE DUMMY APP SINCE IT
// DOES NOT GO THROUGH THE BROCCOLI PLUGIN
// WHICH PARSES OUT THE CLDR DATA BELOW
export default {
    locale: "es",
    fields: { year: { displayName: "Año", relative: { "0": "este año", "1": "el próximo año", "-1": "el año pasado" }, relativeTime: { future: { one: "dentro de {0} año", other: "dentro de {0} años" }, past: { one: "hace {0} año", other: "hace {0} años" } } }, month: { displayName: "Mes", relative: { "0": "este mes", "1": "el próximo mes", "-1": "el mes pasado" }, relativeTime: { future: { one: "dentro de {0} mes", other: "dentro de {0} meses" }, past: { one: "hace {0} mes", other: "hace {0} meses" } } }, day: { displayName: "Día", relative: { "0": "hoy", "1": "mañana", "2": "pasado mañana", "-1": "ayer", "-2": "antes de ayer" }, relativeTime: { future: { one: "dentro de {0} día", other: "dentro de {0} días" }, past: { one: "hace {0} día", other: "hace {0} días" } } }, hour: { displayName: "Hora", relativeTime: { future: { one: "dentro de {0} hora", other: "dentro de {0} horas" }, past: { one: "hace {0} hora", other: "hace {0} horas" } } }, minute: { displayName: "Minuto", relativeTime: { future: { one: "dentro de {0} minuto", other: "dentro de {0} minutos" }, past: { one: "hace {0} minuto", other: "hace {0} minutos" } } }, second: { displayName: "Segundo", relative: { "0": "ahora" }, relativeTime: { future: { one: "dentro de {0} segundo", other: "dentro de {0} segundos" }, past: { one: "hace {0} segundo", other: "hace {0} segundos" } } } },
    pluralRuleFunction: function (n, ord) {
      if (ord) return "other";return n == 1 ? "one" : "other";
    }
};
