import gulp from 'gulp';
import fileInclude from 'gulp-file-include';
import cssnano from 'gulp-cssnano';
import autoprefixer from 'gulp-autoprefixer';
import imagemin from 'gulp-imagemin';
import concat from 'gulp-concat';
import uglify from 'gulp-uglify';
import rename from 'gulp-rename';
import browserSync from 'browser-sync';
import * as sass from 'sass';
import gulpSass from 'gulp-sass';

const sassCompiler = gulpSass(sass);

// Обробка HTML
gulp.task('html', function () {
    return gulp.src('src/app/*.html')
        .pipe(fileInclude({
            prefix: '@@',
            basepath: '@file'
        }))
        .pipe(gulp.dest('dist'))
        .pipe(browserSync.stream());
});

// Обробка SCSS
gulp.task('scss', function () {
    return gulp.src('src/app/scss/**/*.scss')
        .pipe(sassCompiler().on('error', sassCompiler.logError))
        .pipe(autoprefixer({
            overrideBrowserslist: ['last 2 versions'],
            cascade: false
        }))
        .pipe(cssnano())  // Мінімізація CSS
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/css'))
        .pipe(browserSync.stream());
});

// Копіювання Bootstrap
gulp.task('bootstrap', function () {
    return gulp.src([
        'node_modules/bootstrap/dist/css/bootstrap.min.css',
        'node_modules/bootstrap/dist/js/bootstrap.bundle.min.js'
    ], { base: 'node_modules/bootstrap/dist' })
        .pipe(gulp.dest('dist'));
});

// Об'єднання і мінімізація скриптів
gulp.task('scripts', function () {
    return gulp.src('src/app/js/*.js')
        .pipe(concat('scripts.js'))
        .pipe(uglify())
        .pipe(rename({suffix: '.min'}))
        .pipe(gulp.dest('dist/js'))
        .pipe(browserSync.stream());
});

// Оптимізація зображень
gulp.task('images', function () {
    return gulp.src("src/app/img/*.+(jpg|jpeg|png|gif|svg)", { encoding: false })
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{ removeViewBox: false }],
            interlaced: true
        }))
        .pipe(gulp.dest('dist/img'))
        .pipe(browserSync.stream());
});

// Копіювання JSON файлів
gulp.task('json', function () {
    return gulp.src('src/app/data/**/*.json')  // Шлях до JSON файлів
        .pipe(gulp.dest('dist/data'))  // Копіюємо їх в dist/data
        .pipe(browserSync.stream());  // Оновлення браузера
});

// Watcher для відстеження змін
gulp.task('watch', function () {
    browserSync.init({
        server: {
            baseDir: 'dist'  // Вказуємо базову директорію для сервера
        },
    });
    gulp.watch('src/app/*.html', gulp.series('html')).on('change', browserSync.reload);
    gulp.watch('src/app/components/*.html', gulp.series('html')).on('change', browserSync.reload);
    gulp.watch('src/app/scss/**/*.scss', gulp.series('scss'));
    gulp.watch('src/app/js/*.js', gulp.series('scripts'));
    gulp.watch('src/app/img/*.+(jpg|jpeg|png|gif|svg)', gulp.series('images'));
    gulp.watch('src/app/data/**/*.json', gulp.series('json'));  // Watch JSON файли
});

// Default task
gulp.task('default', gulp.series('html', 'scss', 'scripts', 'images', 'json', 'bootstrap', 'watch'));
