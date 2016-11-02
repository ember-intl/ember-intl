
Addon support
==============================================================================

As of 2.8.0, translations can be bundled with addons.  Addon's define their
translations similar to an application, but creating a folder in the addon
root `/translations` (not `/app/translations` or `/addon/translations`).

At build time, the translations are reduced with the application's
translations.  In the event that an addon translation key collides with one
defined on the application already, the application's translation wins out
in that scenario.
