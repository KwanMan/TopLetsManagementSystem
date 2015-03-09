module.exports = function (grunt){

  grunt.initConfig({
    clean: {
      build: ["public/build"]
    },
    copy: {
      build: {
        files: [{
          expand: true,
          cwd: "public/static",
          src: ["**"],
          dest: "public/build"
        }]
      }
    },
    browserify: {
      dev: {
        files: {
          "public/build/app.js": ["public/js/main.jsx"]
        },
        options: {
          transform: ["reactify", "pkgify"]
        }
      }
    },
    less: {
      dev: {
        files: {
          "public/build/temp/styles.css": "public/less/main.less"
        }
      }
    },
    autoprefixer: {
      build: {
        src: "public/build/temp/styles.css",
        dest: "public/build/styles.css"
      }
    },
    watch: {
      client: {
        files: ["public/js/**/*.js", "public/js/**/*.jsx", "public/less/**/*.less", "public/static/**/*.html"],
        tasks: ["build"],
        options: {
          livereload: {
            port: 9000
          }
        }
      }
    },
    serve: {
      port: 8000,
      livereload: 9000
    },
    concurrent: {
      dev: {
        tasks: ["serve", "watch:client"],
        options: {
          logConcurrentOutput: true
        }
      }
    }
  });

  require("load-grunt-tasks")(grunt);
  grunt.loadTasks("tasks");

  grunt.registerTask("build", ["clean:build", "copy:build", "less:dev", "autoprefixer:build", "browserify:dev", "sync-database"]);
  grunt.registerTask("test-api", ["sync-database", "serve"]);
  grunt.registerTask("default", ["build", "concurrent:dev"]);
};