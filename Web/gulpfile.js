//Підключаємо gulp
var gulp = require ("gulp");
var browserSync=require("browser-sync").create();
//додаткові плагіни Gulp
var sass = require ("gulp-sass"), //конвертує SASS в CSS
    cssnano = require ("gulp-cssnano"), //мінімізація CSS
    autoprefixer = require ('gulp-autoprefixer'), //додавання префіксів в
                                                  //CSS для підтримки 
                                                  //старих браузерів
    imagemin = require ('gulp-imagemin'), //стиснення зображень
    concat = require ("gulp-concat"), //об'єднання файлів - конкатенація
    uglify = require ("gulp-uglify"), //мінімізація javascript
    rename = require ("gulp-rename"); //перейменування файлів
//Створюємо тестовий таск
gulp.task ('hello', function (done) {
  console.log ('This is a test task!');
  done();
});
gulp.task('browserSync',function(){
    browserSync.init({
        watch:true,
        server:'app'
        
    })
})
//копіювання HTML файлів в папку dist
gulp.task ( "html", function () {
    return gulp.src ( "app/ *. html")
    .pipe (gulp.dest ( "dist"))
});

//об'єднання, компіляція Sass в CSS, додавання префіксів і подальша мінімізація коду
gulp.task ( "scss", function () {
    return gulp.src('app/sass/**/*.scss')
         .pipe (concat ( 'styles.scss'))
        .pipe (sass())
        .pipe (autoprefixer ({
            browsers: [ 'last 2 versions'],
            cascade: false
         }))
        .pipe (cssnano ())
        .pipe (rename ({suffix: '.min'}))
        .pipe(gulp.dest('app/css'))
});
// gulp.task( 'sass', function() {
//     return gulp.src('app/sass/**/*.scss')
//       .pipe(sass())
//       .pipe(gulp.dest('app/css'))
// });

//об'єднання і стиснення JS-файлів
gulp.task ( "scripts", function () {
    return gulp.src ( "app / js / *. js") //вихідна директорія файлів
        .pipe (concat ( 'scripts.js')) // конкатенація js-файлів в один
        .pipe (uglify ()) //стиснення коду
        .pipe (rename ({suffix: '.min'})) //перейменування файлу з
                                          //приставкою .min
        .pipe (gulp.dest ( "dist / js")) // директорія продакшена
});

//cтискання зображень
gulp.task ( 'imgs', function () {
    return gulp.src ( "app / images /*.+ (jpg | jpeg | png | gif)")
        .pipe (imagemin ({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            interlaced: true
        }))
        .pipe (gulp.dest ( "dist / images"))
});
gulp.task('js-watch', function (done) {
    browserSync.reload();
    done();
});
//відстежування за змінами у файлах
gulp.task ( "watch", function () {
    gulp.watch ( "app / *. html", gulp.series( "html"));
    gulp.watch ( "app / js / *. js", gulp.series( "scripts"));
    gulp.watch ( "app / sass / *. scss", gulp.series( "scss"));
    gulp.watch ( "app / images /*.+ (jpg | jpeg | png | gif)", gulp.series("imgs"));
   
});

//Запуск тасків за замовчуванням
//gulp.task ("default", gulp.series('browserSync'));
gulp.task('default', gulp.series(
    gulp.parallel('watch', 'browserSync') 
));