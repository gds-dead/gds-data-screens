module.exports = function(grunt) {

    grunt.initConfig({
        pkg: grunt.file.readJSON('package.json'),

        // CSS
        sass: {
            dev : {
                options: {
                    style: 'expanded'
                },
                files: {
                    'public/css/main.css': 'assets/scss/main.scss'
                }
            },
            dist : {
                options: {
                    style: 'compressed'
                },
                files: {
                    'public/css/main.css': 'assets/scss/main.scss'
                }
            } 
        },

        // JS
        concat: {
            dist: {
                // the files to concatenate
                src: [
                    'assets/js/vendor/jquery-2.0.3.js',
                    'assets/js/vendor/raphael.js',
                    'assets/js/vendor/g.raphael-min.js',
                    'assets/js/vendor/g.pie.js',
                    'assets/js/items/*.js',
                    'assets/js/*.js'
                ],
                // the location of the resulting JS file
                dest: 'public/js/app.js'
            }
        },
        uglify: {
            dist: {
                files: {
                    '<%= concat.dist.dest %>': ['<%= concat.dist.dest %>']
                }
            }
        },
        
        clean: ["public/css/*", "public/js/*"],

        hashres: {
          options: {
            fileNameFormat: '${name}-${hash}.${ext}'
          },
          prod: {
            src: [
              'public/js/app.js',
              'public/css/main.css'],
            dest: 'public/index.html',
          }
        },
    
        watch: {
            scripts: {
                files: ['assets/js/*.js', 'assets/js/items/*.js'],
                tasks: ['concat', 'hashres'],
                options: {
                    spawn: false,
                },
            },
            css: {
                files: ['assets/scss/*.scss'],
                tasks: ['sass:dev', 'hashres'],
                options: {
                    spawn: false,
                }
            }
        }
    
    });
    
    grunt.loadNpmTasks('grunt-contrib-sass');
    grunt.loadNpmTasks('grunt-contrib-concat');
    grunt.loadNpmTasks('grunt-contrib-uglify');
    grunt.loadNpmTasks('grunt-contrib-clean');
    grunt.loadNpmTasks('grunt-hashres');
    grunt.loadNpmTasks('grunt-contrib-watch');
    
    grunt.registerTask('default', ['watch']);
    
    grunt.registerTask('test', ['sass:dev', 'concat', 'hashres']);
    grunt.registerTask('build', ['clean', 'sass:dist', 'concat', 'uglify', 'hashres']);

};