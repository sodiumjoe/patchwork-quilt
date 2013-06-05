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

# License

The MIT License (MIT)

Copyright (c) 2013 Joe Moon

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in
all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
THE SOFTWARE.
