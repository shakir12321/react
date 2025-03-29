# React Polarion Widget Starter Kit

## Install react dependecies

`npm install`

## Run in debug mode

First add your Personal Access Token to `.env`. Also change the root URL of your polarion in `Details.js` and `Table.js` and run `npm run start`

## Packaging into a Widget

Modify according your needs the folder `widgetSource` filling any properties texts/icons of your widget

Run `npm run build` that will generate the `widgetOutput` folder that can be commited into SVN as a widget (see a widget SDK for more help.)