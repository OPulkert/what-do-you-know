var gulp = require('gulp');
var argv = require('yargs').argv;
var del = require('del');
var sass = require('gulp-ruby-sass');
var notifier = require('node-notifier');
var sourcemaps = require('gulp-sourcemaps');
var browserify = require('browserify');
var esteWatch = require('este-watch');
var uglify = require('gulp-uglify');
var source = require('vinyl-source-stream');
var runSequence = require('run-sequence');
var rename = require("gulp-rename");
var sprity = require('sprity');
var gulpif = require('gulp-if');
var browserSync = require('browser-sync').create();
var preprocess = require('gulp-preprocess');

var settings = {
    del: ["./_build/", "./styles/*.css", "./script/*.js", "./*.html"],

    sass: {
        entry: "./styles/app.scss",
        dest: "./styles/",
        options: { quiet: true, sourcemap: !argv.build, style: argv.build ? "compressed" : "nested"},
        name: argv.build ? "styles.min.css" : "styles.css"
    },

    sprites: {
        entry: "./assets/images/sprites/*.{png,jpg}",
        dest: "./assets/images",
        sass: "./styles/app"
    },

    preprocess: { entry: "./pages/*.html", dest: "./" },

    javascript: {
        entry:  "./scripts/app/app.js",
        dest: "./scripts/",
        bundle: 'scripts.js'
    },

    browserSync: {  notify: false, open: false, server: { baseDir: "./" } },

    watch: {
        dirs: [
            "./styles/app/",
            "./pages/",
            "./scripts/app/",
            "./assets/images/sprites" ]
    }
};

/* DELETE
 *******************************/

gulp.task('del', function() {
    del(settings.del, { force: true } );
});

/* SASS
 *******************************/

gulp.task('sass', function() {
    return sass(settings.sass.entry, settings.sass.options)
        .on('error', function (err) {
            notifier.notify({ 'title': 'Sass', 'message': err.message });
            console.error('Error!', err.message);
        })
        .pipe(sourcemaps.write())
        .pipe(rename(settings.sass.name))
        .pipe(gulp.dest(settings.sass.dest))
        .pipe( browserSync.stream() );
});

/* PREPROCESS
 *******************************/

gulp.task('preprocess', function() {
    return gulp.src( settings.preprocess.entry )
        .pipe( preprocess() )
        .pipe( gulp.dest( settings.preprocess.dest ) )
        .pipe( browserSync.stream() );
});

/* SPRITES
 *******************************/
gulp.task('sprites', function () {
    return sprity.src({
        src: settings.sprites.entry,
        processor: 'sass',
        style: 'sprites.scss',
        template: './png.hbs',
        'lwip-interpolation': 'cubic',
        dimension: [{ ratio: 1, dpi: 192 }, { ratio: 2, dpi: 192 }]
    })
        .pipe( gulpif('*.png', gulp.dest(settings.sprites.dest), gulp.dest(settings.sprites.sass)) );
});

/* JAVA SCRIPT
 *******************************/

gulp.task('javascript', function() {
    return browserify({ debug: !argv.build, extensions: ['.js'] })
        .require(settings.javascript.entry, { entry: true })
        .bundle()
        .on('error', function handleError(err) {
            notifier.notify({ 'title': 'Javascript', 'message': err.toString()});
            console.error(err.toString());
            this.emit('end');
        })
        .pipe(source('scripts.js'))
        .pipe(gulp.dest(settings.javascript.dest))
        .pipe( browserSync.stream() );
});

gulp.task('uglify', function() {
    gulp.src(folders.assets + '/scripts/*.js')
        .pipe(uglify())
        .pipe(rename("scripts.min.js"))
        .pipe(gulp.dest(folders.assets + '/scripts'));
});

/* WATCH
 *******************************/

gulp.task('watch', function() {
    var watch = esteWatch(settings.watch.dirs, function(e) {
        switch (e.extension) {
            case 'scss':
                gulp.start('sass');
                break;
            case 'html':
                gulp.start('preprocess');
                break;
            case 'js':
                gulp.start('javascript');
                break;
            case 'png':
                gulp.start('sprites');
                break;
        }
    });
    watch.start();
});

gulp.task('browserSync', function(){
    browserSync.init(settings.browserSync);
});

/* RUN
 ***************************z*v*/

gulp.task('compile', ['browserSync','sass','javascript','preprocess','sprites'], function() {
    gulp.start('watch');
});

gulp.task('build', function() {
    runSequence('del', 'sass', 'javascript', 'uglify');
});

gulp.task('development', ['del', 'compile']);

gulp.task('default', function() {
    var env = argv.build ? 'build' : 'development';
    gulp.start(env);
});