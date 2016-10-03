class UserMailer < BaseMailer
  def confirmation_instructions(record, token, opts={})
    assign(:email, opts[:to] || record.email,)
    assign(:confirmation_url, frontend_url(path: "users/confirm/#{token}"))

    mail(
        email_id: 'tem_LqvXSmTAgXzTtT7m8bPH5P',
        recipient_address: opts[:to] || record.email,
    )
  end

  def reset_password_instructions(record, token, opts={})
    assign(:confirmation_url, frontend_url(path: "recovery/#{token}"))

    mail(
        email_id: 'tem_PBQAtJJsFKfWw5LWm8B2jM',
        recipient_address: opts[:to] || record.email,
    )
  end

  def unlock_instructions(record, token, opts={})
    mandrill_mail(
        template: 'unlock-instructions',
        subject: 'Unlock instructions',
        to: opts[:to] || record.email,
        vars: {
            RESET_URL: ''
        }
    )
  end
end
