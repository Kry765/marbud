'use strict';

module.exports = {
  async send(ctx) {
    const { name, email, phone, message } = ctx.request.body;

    try {
      await strapi.plugins['email'].services.email.send({
        to: 'krzysztofkleka91@gmail.com',
        from: 'krzysztofkleka91@gmail.com',
        subject: 'Nowa wiadomość z formularza kontaktowego',
        text: `
          Imię: ${name}
          Email: ${email}
          Telefon: ${phone}
          Wiadomość: ${message}
        `,
      });

      ctx.send({ message: "Email wysłany" });
    } catch (err) {
      ctx.throw(500, err);
    }
  },
};