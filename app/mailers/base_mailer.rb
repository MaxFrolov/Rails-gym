class BaseMailer < SendWithUsMailer::Base
  include FrontendHelper
  default from: ENV['EMAIL_SENDER_EMAIL'], locale: 'ru-RU', from_name: ENV['EMAIL_SENDER_NAME']
end
