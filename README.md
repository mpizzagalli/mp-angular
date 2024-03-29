Frontend Bootstrap
===============

Kickoff for web applications.

## Main Tools
+ [Bower](http://www.bower.io/)
+ [Babel](https://babeljs.io/)
+ [Sass](http://sass-lang.com)
+ [Jade](http://jade-lang.com)
+ [Gulp](http://gulpjs.com/)
+ [BrowserSync](http://www.browsersync.io/)

## First steps
#### Installing node
Get the latest version of node from the [official website](https://nodejs.org/) or using [nvm](https://github.com/creationix/nvm)

#### Getting the dev dependencies
Run ```npm install``` from rootpath of the project.

#### Bower and gulp. The right way
In the following step you will need to use bower, and during the project development you will probably use gulp every day, so let's use them in the right way.
A very popular way of getting these packages is simply tell npm to install them globally using the ```-g``` flag.
That's needless as gulp and bower are already in this project dependencies. A big problem can have place if the version of the packages that were installed globally do not match the versions that this project require.
The right way to execute these tools is using the binaries in the node_modules folder, that is ```node_modules/.bin/```.
To execute bower just use the following ```./node_modules/.bin/bower```. Same for gulp.
Adding an alias for these tools is highly recommended. Like the following:
```bash
alias gulp='node_modules/.bin/gulp'
alias bower='node_modules/.bin/bower'
```

#### Getting the project dependencies
The actual dependencies that will be used to develop the app are managed using bower. You can easily get them with the following command
```bash
bower install
```
You may be asking:  why don't we simply get these packages using npm?
Here are some articles I suggest reading about bower:

+ [Why Front-End Needs a Package Manager?](frontendbabel.info/articles/bower-why-frontend-package-manager/)
+ [Is bower useful?](http://benmccormick.org/2015/01/22/is-bower-useful)
+ [What's great about bower](https://css-tricks.com/whats-great-bower/)

#### Gulp
To start your app run ```gulp``` in the rootpath of the project. Then access your app at **localhost:port**. The port is logged in the console where you ran gulp.
Take a look at **GULP_TASKS.md** for a detailed explanation of the gulp tasks.

## Development

#### Vendors
To add a vendor simply install and save it using bower, then add the path of the source files, relative to the **bower_components** folder, to **vendorJs.js** or **vendorCss.js** depending on what you are adding.
i.e: Adding jquery
```
bower install --save jquery
```
This will generate the **jquery** folder inside **bower_components**. Then, add the source file of jquery to **vendorJs.js**. It should look like this:
```
module.exports = [
  'jquery/dist/jquery.js',
];
```

#### Testing

##### Unit testing
We combine the power of [Karma](http://karma-runner.github.io/) and [Jasmine](http://jasmine.github.io/) frameworks to develop our unit testing. You can find the configuration files in the ```test/unit``` folder and you can find the tests inside the ```test/unit/specs``` folder.

To run these specs execute the following:
```
npm run karma
```

#### Image compression

If you want to reduce your assets weight so that the build is ligther, you can turn on image compression option. To make this possible, set `imageCompression` variable as `true` in `gulp/config.js` file.

This is accomplished using the (webp)[https://developers.google.com/speed/webp/?hl=en] image format.

Things to take into account:
- If your assets include `.png` files, make sure `libpng` library is already installed.
- If your assets include `.jpeg` files, make sure `libjpeg` library is already installed.

If any of these were not installed before you will need reinstall the webp conversion tool:
```
npm remove gulp-webp
```
Now, install the missing libraries.

Finally, reinstall `gulp-webp` with the following command:
```
npm install
```

Remember that you now have to reference your assets with `.webp` extension.

## Errors
[Rollbar](https://rollbar.com/) is the tool we use to track errors. To set it up in the project follow these instructions:

- Install rollbar.js
```
bower install rollbar --save
```

- Add the rollbar snippet to ```vendorJs``` file
```
'rollbar/dist/rollbar.snippet.js'
```

- Add the rollbar credentials in each secrets file in the ```config``` folder at the root of the project.

- Add the `_rollbarConfig` configuration to the ```head``` of ```src/index.jade```
```jade
  script.
    _rollbarConfig = {
      accessToken: '<!-- @echo ROLLBAR_ACCESS_TOKEN -->',
      captureUncaught: true,
      payload: {
        environment: '<!-- @echo environment -->'
      }
    };
```

Rollbar is now monitoring your page for all unhandled exceptions and is available via the global `window.Rollbar` object.
Any further information can be found in the tracking tool [repository](https://github.com/rollbar/rollbar.js)

## Deploy

#### S3
In order to deploy you must first create **config/aws.js** file with the credentials for the Amazon S3 bucket, this file is already added to **.gitignore** so you don't compromise the keys by pushing them to the repository. The file needs to have to follow the format specified in *config/aws.js.example*

Then you just run ```gulp build``` followed by the deploy task ```gulp s3:staging``` or ```gulp :s3:production```

Finally, you need to add a custom routing rule so that s3 handles the 404 (or 403 depending or the bucket policy) to the s3 properties. In the **Static Website Hosting** panel, check the **Enable website hosting** option and complete the form with the following:
```
Index document: index.html
```
And add this redirect rule (Depending on the bucket policy the error code to handle can be either 404 or 403)
```
<RoutingRules>
    <RoutingRule>
        <Condition>
            <HttpErrorCodeReturnedEquals>404</HttpErrorCodeReturnedEquals>
        </Condition>
        <Redirect>
            <ReplaceKeyPrefixWith>#/</ReplaceKeyPrefixWith>
        </Redirect>
    </RoutingRule>
</RoutingRules>
```

#### Heroku
Pushing the desired branch to heroku should be enough.

## Troubleshooting

#### npm permissions
If you are struggling with permission problems when using npm, you can try the following commands to avoid using ```sudo``` every time you have this troubles.

```bash
sudo chown -R $USER ~/.npm
```
```bash
sudo chown -R $USER .
```

#### S3 deploy
NOTE: You must have the corrects AIM permissions, if not, amazon will report an Access Denied error

#### gulp watch
If having problems with ```gulp watch```, run ```echo fs.inotify.max_user_watches=524288 | sudo tee -a /etc/sysctl.conf && sudo sysctl -p```.
This solution was found [here](https://github.com/gulpjs/gulp/issues/217).

## Contributing

1. Fork it
2. Create your feature branch (`git checkout -b my-new-feature`)
3. Commit your changes (`git commit -am 'Add some feature'`)
4. Push to the branch (`git push origin my-new-feature`)
5. Create new Pull Request

## About

This project is maintained by [Sebastian Balay](https://github.com/sbalay) and it was written by [Wolox](http://www.wolox.com.ar).

![Wolox](https://raw.githubusercontent.com/Wolox/press-kit/master/logos/logo_banner.png)


## License

**frontend-bootstrap** is available under the MIT [license](LICENSE).

    Copyright (c) 2015 Sebastián Balay <sebastian.balay@wolox.com.ar>

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
