import gulp from 'gulp';
import sass from 'gulp-sass';
import dartSass from 'sass';
import cleanCSS from 'gulp-clean-css';
import uglify from 'gulp-uglify';
import imagemin from 'gulp-imagemin';
import browserSync from 'browser-sync';

// Налаштування gulp-sass
const sassProcessor = sass(dartSass);

// Таски
export const html = () => {
  return gulp.src('app/*.html')
    .pipe(gulp.dest('dist'))
    .pipe(browserSync.stream());
};

export const scss = () => {
  return gulp.src('app/scss/*.scss')
    .pipe(sassProcessor().on('error', sassProcessor.logError))
    .pipe(cleanCSS())
    .pipe(gulp.dest('dist/css'))
    .pipe(browserSync.stream());
};

export const js = () => {
  return gulp.src('app/js/*.js')
    .pipe(uglify())
    .pipe(gulp.dest('dist/js'))
    .pipe(browserSync.stream());
};

export const img = () => {
  return gulp.src('app/img/*', {encoding: false})
    .pipe(imagemin())
    .pipe(gulp.dest('dist/img'));
};

export const copyJson = () => {
  return gulp.src('./app/data/*.json')
    .pipe(gulp.dest('./dist/data'))
    .pipe(browserSync.stream());
};

export const serve = () => {
  browserSync.init({
    server: {
      baseDir: './dist'
    }
  });
  gulp.watch('app/*.html', html);
  gulp.watch('app/scss/*.scss', scss);
  gulp.watch('app/js/*.js', js);
  gulp.watch('app/img/*', img);
  gulp.watch('./app/data/*.json', copyJson);
};

export default gulp.series(html, scss, js, img, serve);