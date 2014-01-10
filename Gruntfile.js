module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),
        sass: {
            dist : {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/css/main.css': 'assets/scss/main.scss'
                }
            } 
        },
        
        concat: {
            dist: {
                src: [
                    'assets/js/vendor/jquery-2.0.3.js',
                    'assets/js/vendor/raphael.js',
                    'assets/js/vendor/g.raphael-min.js',
                    'assets/js/vendor/g.pie.js',
                    'assets/js/items/*.js',
                    'assets/js/main.js'
                ],
                dest: 'public/js/app.js',
            }
        },
    
        uglify: {
            build: {
                src: 'public/js/app.js',
                dest: 'public/js/app.min.js'
            }
        },
    
        watch: {
            scripts: {
                files: ['assets/js/*.js', 'assets/js/items/*.js'],
                tasks: ['concat', 'uglify'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['assets/scss/*.scss'],
                tasks: ['sass'],
                options: {
                    spawn: false,
                }
            }
        }
    
    });
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['watch']);

};