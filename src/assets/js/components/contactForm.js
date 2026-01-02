export const initContactForm = () => {
  window.contactForm = () => {
    return {
      shown: false,
      submitting: false,
      success: false,
      error: null,
      showForm: true,
      hasServiceValue: false,

      init() {
        // Inicializace proběhne při scrollování díky x-intersect
      },

      onIntersect() {
        // Aktivuje se při scrollování do sekce
        this.shown = true;
      },

      submitForm(formElement) {
        if (!formElement) {
          return;
        }

        this.submitting = true;
        this.error = null;

        const formData = new FormData(formElement);
        if (!formData.has('form-name')) {
          formData.append('form-name', formElement.getAttribute('name') || 'contact');
        }

        fetch('/', {
          method: 'POST',
          headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
          body: new URLSearchParams(formData).toString()
        })
        .then(response => {
          if (response.ok) {
            this.success = true;
            this.showForm = false;
          } else {
            throw new Error('Submission failed');
          }
        })
        .catch(() => {
          this.error = 'Při odesílání zprávy došlo k chybě. Zkuste to prosím znovu.';
        })
        .finally(() => {
          this.submitting = false;
        });
      },

      resetForm() {
        this.success = false;
        this.showForm = true;
        this.error = null;
        this.hasServiceValue = false;

        const form = this.$refs.contactForm;
        if (form) {
          form.reset();
        }

        window.dispatchEvent(new CustomEvent('reset-select'));
      },

      updateServiceValue(event) {
        this.hasServiceValue = event.target.value !== '';
      }
    };
  };
};
