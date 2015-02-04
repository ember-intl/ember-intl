Packaging and Releasing
=======================

If you're using ember-cli, you probably don't need anything in this
directory, even if you want to work with the latest unreleased master
branch. You can run directly against master like this:

git clone https://github.com/yahoo/ember-intl
cd ember-intl
npm install
bower install
sudo npm link
cd YOUR_APP
npm link ember-intl

Building for non-ember-cli apps
-------------------------------

sudo npm install -g broccoli-cli

And doing a Broccoli build in this directory:

broccoli build ./dist