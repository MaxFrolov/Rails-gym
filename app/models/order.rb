class Order < ActiveRecord::Base
  has_many :order_items, inverse_of: :order
  has_one :ordered_user, inverse_of: :order

  accepts_nested_attributes_for :order_items, allow_destroy: true
  accepts_nested_attributes_for :ordered_user, allow_destroy: true

  enum order_status: { in_progress: 0, placed: 1, shipped: 2, cancelled: 3}
  enum payment_type: { c_o_d: 0, online_pay: 1 }

  before_save :set_total

  scope :not_cancelled, -> { where.not(status: Order.order_status[:cancelled])}

  def liqpay_data
    Liqpay.new.order_data(self)
  end

  def set_total
    self.total = self.order_items.map(&:total_price_q).sum
  end
end
