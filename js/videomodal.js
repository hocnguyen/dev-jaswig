var modal = new Vue({
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
