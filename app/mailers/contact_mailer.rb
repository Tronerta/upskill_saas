class ContactMailer < ActionMailer::Base
  default to: 'tronerta.web@gmail.com'

  def contact_email(name, email, body)
    @name = name
    @email = email
    @body = bodys

    mail(from: email, subject: 'Contact Form Message')
  end
end