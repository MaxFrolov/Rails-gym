class Liqpay
  include FrontendHelper
  include Rails.application.routes.url_helpers
  default_url_options[:host] = ENV['HOST']

  PRIVATE_KEY = ENV['LIQPAY_PRIVATE_KEY']
  PUBLIC_KEY = ENV['LIQPAY_PUBLIC_KEY']
  LIQPAY_PRODUCTION_MODE = ENV['LIQPAY_PRODUCTION_MODE'] == 'yes'

  def initialize(params = {})
    @default_params = {
        version: 3,
        action: 'pay',
        currency: 'UAH',
        language: 'ru',
        sandbox: !LIQPAY_PRODUCTION_MODE,
        server_url: callback_url
    }

    @params = @default_params.merge(params)
  end

  def order_data(order)
    json = @default_params.merge({
        public_key: PUBLIC_KEY,
        amount: order.total,
        description: 'Заказ на AP-fit', # TODO make more intelligent
        order_id: order.id,
        # product_url: frontend_url(path: '/lunches/1'),
        result_url: frontend_url(path: "/order-review/#{order.id}"),
        sender_first_name: order.ordered_user.first_name #, order.user.name
        # sender_country_code - https://ru.wikipedia.org/wiki/ISO_3166-1
        # sender_city
        # sender_address
    }).to_json

    data = Base64.strict_encode64(json)

    { data: data, signature: self.class.generate_signature(data) }
  end

  def self.generate_signature(data)
    Base64.strict_encode64(Digest::SHA1.digest("#{PRIVATE_KEY}#{data}#{PRIVATE_KEY}"))
  end

  def callback_url
    ENV['LIQPAY_CALLBACK_URL'] || url_for(
        controller: 'liqpay_callbacks',
        action: :create,
        host: "#{ENV['PROTOCOL']}://#{ENV['HOST']}"
    )
  end
end
