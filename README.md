Quilt
=====

Quilt is the presentation piece of [Patchwork](http://patchworkcms.com). It's a simple web server that serves content from a database that's updated by [Thread](https://github.com/joebadmo/patchwork-thread). It's built with: 

* [Node](http://nodejs.org/)
* [Express](http://expressjs.com/)
* [Jade](http://jade-lang.com/)
* [Twitter Bootstrap](http://twitter.github.com/bootstrap/)

### Usage

Note: The canonical deployment for Patchwork is on [AppFog](http://www.appfog.com). This also assumes you've already deployed [Thread](https://github.com/joebadmo/patchwork-thread) and indexed your content.

#### 1. Clone this repo. 

#### 2. Copy the `config.yml.example` file to `config.yml`.

    $ cp config.yml.example config.yml

#### 3. Modify `config.yml` to point at your content repo.

#### 4. Push to AppFog.

    $ af push patchwork-quilt

When it asks if you want to bind an existing service, say yes and choose the one you already have bound to Thread.

That's it, visit Quilt's URL (e.g. patchwork-quilt.aws.af.cm). 
