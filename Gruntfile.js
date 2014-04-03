module.exports = function (grunt) {

    grunt.loadNpmTasks('grunt-typescript');
    grunt.loadNpmTasks('grunt-contrib-less');
    grunt.loadNpmTasks('grunt-contrib-jshint');
    grunt.loadNpmTasks('grunt-contrib-requirejs');
    grunt.loadNpmTasks('grunt-contrib-watch');
    grunt.loadNpmTasks('grunt-express');

    grunt.initConfig({

        pkg: grunt.file.readJSON('package.json'),

        typescript: {
            compile: {
                src: 'src/ts/**/*.ts',
                dest: 'build/js/',
                options: {
                    module: 'amd',
                    comments: true,
                    base_path: 'src/ts/'
                }
            }
        },

        less: {
            development: {
                files: {
                    'build/css/main.css': 'src/less/main.less'
                }
            },
            production: {
                options: {
                    cleancss: true,
                },
                files: {
                    'dist/css/styles.min.css': 'src/less/main.less'
                }
            }
        },

        jshint: {
            build: 'build/js/**/*.js',
            options: {
                '-W004': false, // "<class name> is already defined"
                '-W093': false // "did you mean to return a conditional instead of an assignment?"
            },
        },

        requirejs: {
            dist: {
                options: {
                    baseUrl: 'build/js',
                    paths: {
                        angular: '../../bower_components/angular/angular',
                        uiBootstrap: '../../bower_components/angular-bootstrap/ui-bootstrap-tpls',
                        videojs: '../../bower_components/video.js/video'
                    },
                    shim: {
                        angular: { exports: 'angular' },
                        uiBootstrap: ['angular'],
                        videojs: { exports: 'videojs' }
                    },
                    name: '../../bower_components/almond/almond',
                    include: 'main',
                    out: 'dist/js/scripts.min.js'
                }

            }
        },

        express: {
            all: {
                options: {
                    port: 8080,
                    hostname: 'localhost',
                    bases: __dirname,
                    livereload: true
                }
            }
        },

        watch: {

        	typescript: {
        		files: 'src/ts/**/*.ts',
        		tasks: 'typescript',
                options: { livereload: true }
        	},
        	
        	jshint: {
        		files: 'build/js/**/*.js',
        		tasks: 'jshint',
                options: { livereload: true }
        	},

        	less: {
        		files: 'src/less/**/*.less',
        		tasks: 'less',
                options: { livereload: true }
        	},

            requirejs: {
                files: 'build/js/**/*.js',
                tasks: 'requirejs'
            }
        }

    });

    grunt.registerTask('default', ['watch']);
    grunt.registerTask('ts', ['typescript']);
    grunt.registerTask('hint', ['jshint']);
    grunt.registerTask('lss', ['less']);
    grunt.registerTask('compile', ['typescript', 'jshint', 'less', 'requirejs']);
    grunt.registerTask('server', ['express', 'watch']);

};