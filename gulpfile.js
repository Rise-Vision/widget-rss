( ( console ) => {
  "use strict";

  const bower = require("gulp-bower"),
    bump = require("gulp-bump"),
    colors = require("colors"),
    del = require("del"),
    eslint = require("gulp-eslint"),
    env = process.env.NODE_ENV || "prod",
    factory = require("widget-tester").gulpTaskFactory,
    gulp = require("gulp"),
    gulpif = require("gulp-if"),
    gutil = require("gulp-util"),
    minifyCSS = require("gulp-minify-css"),
    path = require("path"),
    rename = require("gulp-rename"),
    runSequence = require("run-sequence"),
    sourcemaps = require("gulp-sourcemaps"),
    usemin = require("gulp-usemin"),
    uglify = require("gulp-uglify"),
    wct = require("web-component-tester").gulp.init(gulp);

  const appJSFiles = [
    "src/**/*.js",
    "!./src/components/**/*"
  ],
    htmlFiles = [
      "./src/settings.html",
      "./src/widget.html"
    ],
    vendorFiles = [
      "./src/components/tinymce/plugins/**/*",
      "./src/components/tinymce/skins/**/*",
      "./src/components/tinymce/themes/**/*",
      "./src/components/tinymce/tinymce*.js",
      "./src/components/jquery/dist/**/*",
      "./src/components/gsap/src/minified/TweenLite.min.js",
      "./src/components/gsap/src/minified/plugins/CSSPlugin.min.js",
      "./src/components/gsap/src/minified/utils/Draggable.min.js",
      "./src/components/gsap/src/minified/plugins/ScrollToPlugin.min.js",
      "./src/components/angular/angular*.js",
      "./src/components/angular/*.gzip",
      "./src/components/angular/*.map",
      "./src/components/angular/*.css"
    ];

  gulp.task("clean-bower", (cb) => {
    del(["./src/components/**"], cb);
  });

  gulp.task("clean", (cb) => {
    del(['./dist/**'], cb);
  });

  gulp.task("config", () => {
    let configFile = (env === "dev" ? "dev.js" : "prod.js");

    gutil.log("Environment is", env);

    return gulp.src(["./src/config/" + configFile])
      .pipe(rename("config.js"))
      .pipe(gulp.dest("./src/config"));
  });

  gulp.task("lint", () => {
    return gulp.src( [ "src/**/*.js", "test/**/*.js" ] )
      .pipe( eslint() )
      .pipe( eslint.format() )
      .pipe( eslint.failAfterError() );
  });

  gulp.task("source", ["lint"], () => {
    let isProd = (env === "prod");

    return gulp.src(htmlFiles)
      .pipe(gulpif(isProd,
        // Minify for production.
        usemin({
          css: [sourcemaps.init(), minifyCSS(), sourcemaps.write()],
          js: [sourcemaps.init(), uglify(), sourcemaps.write()]
        }),
        // Don't minify for staging.
        usemin({})
      ))
      .pipe(gulp.dest("dist/"));
  });

  gulp.task("unminify", () => {
    return gulp.src(htmlFiles)
      .pipe(usemin({
        css: [rename(function (path) {
          path.basename = path.basename.substring(0, path.basename.indexOf(".min"))
        }), gulp.dest("dist")],
        js: [rename(function (path) {
          path.basename = path.basename.substring(0, path.basename.indexOf(".min"))
        }), gulp.dest("dist")]
      }))
  });

  gulp.task("fonts", () => {
    return gulp.src("src/components/common-style/dist/fonts/**/*")
      .pipe(gulp.dest("dist/fonts"));
  });

  gulp.task("images", () => {
    gulp.src([
      "src/components/rv-bootstrap-formhelpers/img/bootstrap-formhelpers-googlefonts.png",
      "src/img/**/*"
    ])
      .pipe(gulp.dest("dist/img"));
  });

  gulp.task("layouts", () => {
    return gulp.src("src/widget/layouts/*.html")
      .pipe(gulp.dest("dist/layouts"));
  });

  gulp.task("i18n", () => {
    return gulp.src(["src/components/rv-common-i18n/dist/locales/**/*"])
      .pipe(gulp.dest("dist/locales"));
  });

  gulp.task("vendor", () => {
    return gulp.src(vendorFiles, {base: "./src/components"})
      .pipe(gulp.dest("dist/js/vendor"));
  });

  gulp.task("rise-rss", () => {
    return gulp.src([
      "src/components/webcomponentsjs/webcomponents*.js",
      "src/components/rise-rss/rise-rss.html",
      "src/components/rise-data/rise-data.html",
      "src/components/rise-logger/rise-logger.html",
      "src/components/rise-logger/rise-logger-utils.html",
      "src/components/rise-rss/modules.js",
      "src/components/underscore/*.js",
      "src/components/polymer/*.*{html,js}",
      "src/components/promise-polyfill/promise-polyfill-lite.html",
      "src/components/promise-polyfill/Promise.js",
      "src/components/iron-ajax/iron-ajax.html",
      "src/components/iron-ajax/iron-request.html"
    ], {base: "./src/"})
      .pipe(gulp.dest("dist/"));
  });

  gulp.task("webdriver_update", factory.webdriveUpdate());

  // ***** e2e Testing ***** //
  gulp.task("e2e:server-close", factory.testServerClose());

  gulp.task("html:e2e:settings", factory.htmlE2E());

  gulp.task( "html:e2e:settings", factory.htmlE2E( {
    files: [ "./src/settings.html" ],
    e2eTinymce: "components/tinymce/tinymce.js"
  } ) );

  gulp.task("e2e:server:settings", ["config", "html:e2e:settings"], factory.testServer());

  gulp.task("test:e2e:settings:run", ["webdriver_update"], factory.testE2EAngular({
    testFiles: "test/e2e/settings.js"}
  ));

  gulp.task("test:e2e:settings", (cb) => {
    runSequence(["e2e:server:settings"], "test:e2e:settings:run", "e2e:server-close", cb);
  });

  gulp.task("test:e2e", (cb) => {
    runSequence("test:e2e:settings", cb);
  });

  // ****** Unit Testing ***** //
  gulp.task("test:unit:settings", factory.testUnitAngular(
    {testFiles: [
      "src/components/jquery/dist/jquery.js",
      "src/components/angular/angular.js",
      "src/components/angular-load/angular-load.js",
      "src/components/angular-mocks/angular-mocks.js",
      "src/components/angular-translate/angular-translate.js",
      "src/components/angular-translate-loader-static-files/angular-translate-loader-static-files.js",
      "src/components/angular-ui-tinymce/src/tinymce.js",
      "src/components/rv-angular-bootstrap-colorpicker/js/bootstrap-colorpicker-module.js",
      "node_modules/widget-tester/mocks/common-mock.js",
      "src/components/bootstrap-sass-official/assets/javascripts/bootstrap.js",
      "src/components/angular-bootstrap/ui-bootstrap-tpls.js",
      "src/components/xmlToJSON.js/lib/xmlToJSON.js",
      "src/components/widget-settings-ui-components/dist/js/**/*.js",
      "src/components/widget-settings-ui-core/dist/*.js",
      "src/components/component-storage-selector/dist/storage-selector.js",
      "src/components/bootstrap-form-components/dist/js/**/*.js",
      "test/data/w3c-invalid-xml.js",
      "test/data/w3c-invalid-json.js",
      "test/data/w3c-valid-xml.js",
      "test/data/w3c-valid-json.js",
      "src/config/test.js",
      "src/settings/settings-app.js",
      "src/settings/**/*.js",
      "test/unit/settings/**/*spec.js"]}
  ));

  gulp.task("test:unit:widget", factory.testUnitAngular(
    {testFiles: [
      "src/components/underscore/underscore.js",
      "src/widget/content.js",
      "src/widget/utils.js",
      "src/widget/images.js",
      "test/unit/widget/content-spec.js",
      "test/unit/widget/utils-spec.js",
      "test/unit/widget/images-spec.js"
    ]}
  ));

  gulp.task("test:unit", (cb) => {
    runSequence("test:unit:settings", "test:unit:widget", cb);
  });

  // ***** Integration Testing ***** //
  gulp.task("test:integration", (cb) => {
    runSequence("test:local", cb);
  });

  // ***** Primary Tasks ***** //
  gulp.task("bower-clean-install", ["clean-bower"], (cb) => {
    return bower().on("error", (err) => {
      console.log(err);
      cb();
    });
  });

  gulp.task("bower-update", (cb) => {
    return bower({ cmd: "update"}).on("error", (err) => {
      console.log(err);
      cb();
    });
  });

  gulp.task("build", (cb) => {
    runSequence(["clean", "config", "bower-update"], ["source", "fonts", "images", "layouts", "i18n", "vendor", "rise-rss"], ["unminify"], cb);
  });

  gulp.task("bump", () => {
    return gulp.src(["./package.json", "./bower.json"])
      .pipe(bump({type:"patch"}))
      .pipe(gulp.dest("./"));
  });

  gulp.task("test", (cb) => {
    runSequence("test:unit", "test:e2e", "test:integration", cb);
  });

  gulp.task("default", [], () => {
    console.log("********************************************************************".yellow);
    console.log("  gulp bower-clean-install: delete and re-install bower components".yellow);
    console.log("  gulp build: build a distribution version".yellow);
    console.log("  gulp bump: increment the version".yellow);
    console.log("  gulp test: run e2e and unit tests".yellow);
    console.log("********************************************************************".yellow);
    return true;
  });

})(console);
