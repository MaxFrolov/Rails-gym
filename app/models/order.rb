class Order < ActiveRecord::Base
  has_many :order_items, inverse_of: :order
  belongs_to :ordered_user

  accepts_nested_attributes_for :order_items, allow_destroy: true

  enum order_status: { in_progress: 0, placed: 1, shipped: 2, cancelled: 3}
  enum payment_type: { c_o_d: 0, online_pay: 1 }

  scope :not_cancelled, -> { where.not(status: Order.order_status[:cancelled])}

end
