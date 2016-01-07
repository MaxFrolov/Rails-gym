class Order < ActiveRecord::Base
  belongs_to :user
  has_many :order_items
  before_save :update_subtotal

  enum order_status: { in_progress: 0, placed: 1, shipped: 2, cancelled: 3}


  def subtotal
    order_items.collect { |oi| oi.valid? ? (oi.quantity * oi.unit_price) : 0 }.sum
  end
  private

  def update_subtotal
    self[:subtotal] = subtotal
  end

end
