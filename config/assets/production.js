'use strict';

module.exports = {
  client: {
    lib: {
      css: [
        // bower:css
        // 'public/lib/bootstrap/dist/css/bootstrap.min.css',
        // 'public/lib/bootstrap/dist/css/bootstrap-theme.min.css'
        'public/lib/metro/build/css/metro.css',
        'public/lib/metro/build/css/metro-icons.css',
        'public/lib/metro/build/css/metro-responsive.css',
        'public/lib/metro/build/css/metro-schemes.css'
        // endbower
      ],
      js: [
        // bower:js
        'public/lib/jquery/dist/jquery.js',
        'public/lib/angular/angular.js',
        'public/lib/angular-resource/angular-resource.js',
        'public/lib/angular-animate/angular-animate.js',
        'public/lib/angular-messages/angular-messages.js',
        'public/lib/angular-ui-router/release/angular-ui-router.js',
        'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
        'public/lib/angular-file-upload/dist/angular-file-upload.js',
        'public/lib/angular-sanitize/angular-sanitize.js',
        'public/lib/owasp-password-strength-test/owasp-password-strength-test.js',
        'public/lib/metro/build/js/metro.js',
        'public/lib/datatables/media/js/jquery.dataTables.js',
        'public/lib/angular-datatables/dist/angular-datatables.js',
        'public/lib/angular-socket-io/socket.js',
        'public/lib/tinymce-dist/tinymce.js',
        'public/lib/angular-ui-tinymce/src/tinymce.js',
        'public/lib/checklist-model/checklist-model.js'
        // endbower
      ]
    },
    css: 'public/dist/application.min.css',
    js: 'public/dist/application.min.js'
  }
};
