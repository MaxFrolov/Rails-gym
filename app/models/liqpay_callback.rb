require 'base64'
require 'digest/sha1'
require 'json'

STATUSES = [
    # The final payment statuses
    :success,         # successful payment
    :failure,         # unsuccessful payment
    :error,           # Failed payment. Data is incorrect
    :subscribed,      # Subscribed successfully framed
    :unsubscribed,    # Subscribed successfully deactivated
    :reversed,        # Payment reversed
    :sandbox,         # test payment

    # Statuses that require confirmation of payment
    :otp_verify,      # Требуется OTP подтверждение клиента. OTP пароль отправлен на номер телефона Клиента.
    # Для завершения платежа, требуется выполнить otp_verify.
    :"3ds_verify",    # Требуется 3DS верификация.
    # Для завершения платежа, требуется выполнить 3ds_verify.
    :cvv_verify,      # Требуется ввод CVV карты отправителя.
    # Заполните параметр card_cvv и повторите запрос.
    :sender_verify,   # Требуется ввод данных отправителя.
    # Заполните параметры sender_first_name, sender_last_name, sender_country_code, sender_city,
    # sender_address, sender_postal_code и повторите запрос.
    :receiver_verify, # Требуется ввод данных получателя.
    # Заполните параметры receiver_first_name, receiver_last_name и повторите запрос.

    # Statuses that is waiting of handling of payment
    :wait_bitcoin,    # Ожидается перевод bitcoin от клиента
    :wait_secure,     # pending approval
    :wait_accept,     # Money from a client written off, but the store has not yet been tested
    :wait_lc,         # Letter of Credit. Money from a client written off, confirmation expected delivery
    :hold_wait,       # сумма успешно заблокирована на счету отправителя
    :cash_wait,       # Ожидается оплата наличными в ТСО.
    :wait_qr,         # Ожидается сканировани QR-кода клиентом.
    :wait_sender,     # Ожидается подтверждение оплаты клиентом в приложении Privat24/Sender.
    :processing       # payment is processed
]

class LiqpayCallback < ActiveRecord::Base
  attr_accessor :signature
  attr_reader :data

  enum status: STATUSES

  belongs_to :order

  validates :decoded_data, :status, presence: true
  validate :validate_signature

  after_save :update_order_payment, if: :payment_success?

  def data=(data)
    decoded_data = JSON.parse(Base64.decode64(data), symbolize_names: true)
    self.decoded_data = decoded_data
    self.status = decoded_data[:status]
    self.order_id = decoded_data[:order_id]
    @data = data
  rescue
    self.decoded_data = self.status = self.order_id = @data = nil
  end

  def signature_valid?
    Liqpay.generate_signature(data) == signature
  end

  private

  def payment_success?
    success? || !Rails.env.production? && sandbox?
  end

  def validate_signature
    errors.add(:signature, :invalid_signature) unless signature_valid?
  end

  def private_key
    ENV['LIQPAY_PRIVATE_KEY']
  end

  def update_order_payment
    order && order.update(payed: true)
  end
end
