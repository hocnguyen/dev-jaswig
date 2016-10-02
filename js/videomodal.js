$(document).on('ready', function() {
  window.video_modal = new Vue({
    el: '#vue-modal',

    data: {
      modal: false,
      iframeSrc: null
    },

    methods: {
      openModal: function (src) {
        this.modal = true;
        this.iframeSrc = src;
      },

      closeModal: function () {
        this.modal = false;
      }
    }
  });
})

$(document).on('click', '.play-video', function(event) {
  event.preventDefault();
  var video = $(this).data('video');
  window.video_modal.openModal(video);
});
