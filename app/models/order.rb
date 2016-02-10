class Order < ActiveRecord::Base
  has_many :order_items, inverse_of: :order
  belongs_to :ordered_user

  before_save :update_subtotal

  accepts_nested_attributes_for :order_items, allow_destroy: true

  enum order_status: { in_progress: 0, placed: 1, shipped: 2, cancelled: 3}

  scope :not_cancelled, -> { where.not(status: Order.order_statuses[:cancelled])}


  def subtotal
    order_items.collect { |oi| oi.valid? ? (oi.quantity * oi.unit_price) : 0 }.sum
  end
  private

  def update_subtotal
    self[:subtotal] = subtotal
  end

end
