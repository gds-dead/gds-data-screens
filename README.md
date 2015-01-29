gds-data-screens
================

http://gds-screens-slides.herokuapp.com/

## What is it

It's a little Ruby / Sinatra app that gathers (and then polls) data from the GOV.UK performance platform.

### Getting started

Make sure you have Ruby (RVM or similar is good), Node, NPM, Grunt installed.

``` gem install ``` and ``` npm install ```

The server / proxy is a Ruby app. Frontend asset compilation (and the offline build) are done with Grunt.

So ``` ruby ./server.rb ``` and ``` grunt ``` will get you running locally on :4567 with sass compilation etc.

### The offline version

```grunt offline``` will package up the app in a single html file. It will use _yesterday's_ realtime data.
