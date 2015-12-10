# @fix-it
# @see https://github.com/excon/excon/issues/239
require 'excon'
Excon.ssl_verify_peer = false

MandrillMailer.configure do |config|
  config.api_key = ENV['MANDRILL_API_KEY']
  config.default_url_options = { host: ENV['HOST'] }
end
