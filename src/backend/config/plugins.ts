module.exports = ({ env }) => ({
  ckeditor5: {
    enabled: true,
    config: {
      editor: {
        toolbar: {
          items: [
            'heading', '|',
            'bold', 'italic', 'link', 'fontColor', 'fontBackgroundColor', 'bulletedList', 'numberedList', '|',
            'blockQuote', 'insertTable', 'mediaEmbed', '|',
            'undo', 'redo'
          ]
        },
        language: 'pl',
        // Inne opcje, jeśli są wymagane
      }
    }
  },
  email: {
    config: {
      provider: 'nodemailer',
      providerOptions: {
        host: env('SMTP_HOST'),
        port: env.int('SMTP_PORT', 587),
        auth: {
          user: env('SMTP_USERNAME'),
          pass: env('SMTP_PASSWORD'),
        },
      },
      settings: {
        defaultFrom: env('SMTP_USERNAME'), // Gmail musi mieć zgodność
        defaultReplyTo: env('SMTP_USERNAME'),
      },
    },
  },
});
